export const collections = [
  'countries', 'regulations', 'actors', 'events', 'campaigns',
  'relations', 'sources', 'assessments', 'taxonomy', 'changelog',
];

export const radarStages = ['emerging', 'announced', 'consultation', 'adopted'];
const benchmarkStages = new Set(['published', 'effective', 'temporary']);
const byId = rows => new Map(rows.map(row => [row.id, row]));

export async function loadAtlas() {
  async function read(path) {
    const response = await fetch(new URL(path, import.meta.url));
    if (!response.ok) throw new Error(path + ' · HTTP ' + response.status);
    return response.json();
  }
  const [entries, geo] = await Promise.all([
    Promise.all(collections.map(async key => [key, await read('../data/' + key + '.json')])),
    read('../geo/europe.json'),
  ]);
  return createAtlas(Object.fromEntries(entries), geo);
}

export function createAtlas(data, geo) {
  const countries = new Map(data.countries.map(country => [country.code, country]));
  const regulations = byId(data.regulations);
  const campaigns = byId(data.campaigns);
  const sources = byId(data.sources);
  const actors = byId(data.actors);
  const criteria = byId(data.taxonomy.criteria);
  const latestRevision = data.changelog.reduce((latest, change) => change.date > latest ? change.date : latest, '');

  function appliesTo(record, code) {
    return !code || (record.scope === 'eu' ? countries.get(code)?.euMember : record.countries.includes(code));
  }

  function filter(state, rows, code = '') {
    return rows.filter(record =>
      (!state.year || record.date.slice(0, 4) <= state.year)
      && (!state.topic || record.topics.includes(state.topic))
      && (!state.eventType || !data.events.includes(record) || record.type===state.eventType)
      && appliesTo(record, code),
    ).sort((a, b) => b.date.localeCompare(a.date));
  }

  function compare(state, codes, nationalOnly = false) {
    const documents = filter({...state, topic: ''}, data.regulations);
    const cutoff = state.year ? state.year + '-12-31' : latestRevision;
    const rows = data.taxonomy.criteria
      .filter(criterion => !state.topic || criterion.topic === state.topic)
      .map(criterion => ({
        criterion,
        values: codes.map(code => {
          const candidates = documents.filter(record =>
            benchmarkStages.has(record.stage) && (!nationalOnly || record.scope==='national')
            && (!record.effectiveFrom || !cutoff || record.effectiveFrom <= cutoff)
            && (!record.effectiveUntil || !cutoff || record.effectiveUntil >= cutoff)
            && appliesTo(record, code),
          );
          candidates.sort((a,b)=>Number(b.scope==='national')-Number(a.scope==='national') || b.date.localeCompare(a.date));
          for (const record of candidates) {
            const value = data.assessments.find(item => item.criterionId === criterion.id && item.regulationId === record.id);
            if (value) return {...value, record};
          }
          return null;
        }),
      }));
    const common = rows.filter(row => row.values.every(Boolean));
    const matching = common.filter(({values}) => values.every(value =>
      value.kind === values[0].kind && value.mechanism === values[0].mechanism,
    ));
    return {rows, common, matching};
  }

  function related(state) {
    if (!state.country) return [];
    return data.countries
      .filter(country => country.code !== state.country)
      .map(country => {
        const result = compare(state, [state.country, country.code], true);
        // Shared EU obligations are shown in the matrix, but do not rank national similarities.
        return {
          code: country.code,
          criteria:result.matching, common:result.common.length, score:result.common.length ? result.matching.length/result.common.length : null,
        };
      })
      .filter(row => row.criteria.length)
      .sort((a, b) => b.criteria.length - a.criteria.length || b.score-a.score || a.code.localeCompare(b.code));
  }

  function relationsFor(state, code = '') {
    return data.relations.flatMap(relation => {
      const origin = campaigns.get(relation.campaignId) ?? regulations.get(relation.regulationId) ?? relation;
      if ((state.year && relation.date.slice(0, 4) > state.year)
          || !filter(state, [origin], code).length) return [];
      const countriesInvolved = origin.scope === 'eu'
        ? data.countries.filter(country => country.euMember).map(country => country.code)
        : origin.countries;
      return [{...relation, countries: countriesInvolved, origin}];
    });
  }

  function convergenceFor(state){
    return related(state).map(match=>{
      const records=match.criteria.flatMap(row=>row.values.map(v=>v.record));
      return {id:'derived-'+state.country+'-'+match.code,type:'convergence',countries:[state.country,match.code],date:records.map(r=>r.date).sort().at(-1),title:'Convergence de mécanismes nationaux',summary:match.criteria.map(r=>r.criterion.label).join(' · ')+' — '+match.criteria.length+'/'+match.common+' critères communs concordants. Aucune causalité démontrée.',sourceIds:[...new Set(records.flatMap(r=>r.sourceIds))],origin:{actorIds:[]},derived:true};
    });
  }
  function radarFor(state,code=''){
    const cutoff=state.year?state.year+'-12-31':latestRevision;
    return filter(state,data.regulations,code).filter(r=>radarStages.includes(r.stage)||(['published','effective','temporary'].includes(r.stage)&&((r.effectiveFrom&&r.effectiveFrom>cutoff)||(r.milestone&&(!r.milestoneDate||r.milestoneDate>=cutoff)))));
  }
  return {data, geo, countries, sources, actors, criteria, latestRevision, filter, compare, related, relationsFor, convergenceFor, radarFor};
}
