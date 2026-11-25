import {isDocumentedBy} from './chronology.js';
export const levels={state:'État',local:'Municipalité / collectivité locale',regional:'Réseau régional',federal:'Niveau fédéral',context:'Contexte national',unclassified:'Périmètre à préciser'};
export const statuses={temporary:'Restriction temporaire documentée',effective:'Mesure en vigueur',published:'Texte publié · application à vérifier',pending:'Projet / consultation',historical:'Rejeté, expiré ou historique',local:'Mesure locale uniquement',empty:'Aucune règle d’État renseignée'};
export function statusOf(row,cutoff){
  if(row.effectiveUntil&&row.effectiveUntil<cutoff)return 'historical';
  if(row.effectiveFrom&&row.effectiveFrom>cutoff)return 'pending';
  if(row.stage==='temporary')return 'temporary';
  if(row.stage==='effective')return 'effective';
  if(row.stage==='published')return 'published';
  if(['emerging','announced','consultation','adopted'].includes(row.stage))return 'pending';
  return 'historical';
}
const order=['temporary','effective','published','pending','historical'];
export function createUSModel(atlas,index,geo){
  const rows=[...atlas.data.regulations,...atlas.data.events].filter(r=>r.countries.includes('US'));
  const scope=r=>index.jurisdictions[r.id]||{level:'unclassified',states:[]};
  const rules=new Set(atlas.data.regulations.map(r=>r.id));
  const isRule=r=>rules.has(r.id);
  function visible(filters){const cutoff=filters.cutoff||atlas.latestRevision;return rows.filter(r=>isDocumentedBy(r.date,filters.cutoff)&&(!filters.topic||r.topics.includes(filters.topic))&&(!isRule(r)||!filters.status||statusOf(r,cutoff)===filters.status)).sort((a,b)=>b.date.localeCompare(a.date));}
  function forState(filters,code){return visible(filters).filter(r=>scope(r).states.includes(code));}
  function snapshotFor(filters,code){return (!filters.cutoff||index.snapshot.date<=filters.cutoff)&&(!filters.topic||filters.topic==='planning'||filters.topic==='territory')?index.snapshot.rows.find(r=>r.state===code):undefined;}
  function paint(filters,code){
    const r=forState(filters,code),cutoff=filters.cutoff||atlas.latestRevision;
    const stateRules=r.filter(x=>isRule(x)&&scope(x).level==='state'),localRules=r.filter(x=>isRule(x)&&scope(x).level==='local');
    const kinds=order.filter(s=>stateRules.some(x=>statusOf(x,cutoff)===s));
    return {kind:kinds[0]||(localRules.length?'local':'empty'),kinds,local:localRules.length,snapshot:!!snapshotFor(filters,code),count:r.length,stateRules,localRules};
  }
  return {rows,scope,isRule,visible,forState,snapshotFor,paint,geo,index};
}
