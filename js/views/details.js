import {radarStages} from '../model.js';
import {article, button, countryName, element, formatDate, links, renderList} from '../ui.js';
import {renderComparison} from './comparison.js';
import {renderNetwork, relationSelector} from './network.js';
import {renderRadar} from './radar.js';

export const modes = {
  regulation: 'Réglementation',
  similarities: 'Similarités',
  contests: 'Projets et contestations',
  influences: 'Influences',
};

const tabs = {rules:'Règles', upcoming:'À venir', comparison:'Comparaison', actors:'Acteurs', events:'Événements'};
const modeTab = {similarities:'comparison', contests:'events', influences:'actors', radar:'upcoming'};

export function initialTab(mode) {
  return modeTab[mode] || 'rules';
}

function renderRules(target, atlas, state, rows) {
  const national = rows.filter(row => row.scope === 'national' && !radarStages.includes(row.stage));
  target.append(element('h3', 'Historique national'));
  renderList(target, atlas, national, 'Aucune règle nationale renseignée pour cette sélection.');
  const territorial = rows.filter(row => row.scope === 'territorial' && !radarStages.includes(row.stage));
  if (territorial.length) {
    target.append(element('h3', 'Règles territoriales'));
    renderList(target, atlas, territorial);
  }
  const {euMember, contextSourceIds} = atlas.countries.get(state.country);
  if (!state.year && !state.topic && contextSourceIds?.length) {
    target.append(element('h3', 'Sources de contexte'), links(atlas, contextSourceIds));
  }
  if (!euMember) return;
  target.append(element('h3', 'Cadre de l’Union européenne'));
  renderList(target, atlas, rows.filter(row => row.scope === 'eu' && !radarStages.includes(row.stage)));
}

function renderRelations(target, atlas, state, actions) {
  const all=[...atlas.relationsFor(state,state.country),...atlas.convergenceFor(state)];
  target.append(relationSelector(atlas,state,actions));
  const relations=all.filter(r=>!state.relationType||r.type===state.relationType);
  const active=relations.find(r=>r.id===state.relation)||relations[0];if(active)renderNetwork(target,atlas,active,state,actions);
  if (!relations.length) target.append(element('p', 'Aucune relation documentée pour cette sélection.', 'muted'));
  for (const relation of relations) {
    const node = element('details', '', 'relation');
    node.open = relation.id === state.relation;
    node.append(element('summary', relation.title), article(atlas, relation));
    if (relation.origin.startDate) {
      node.append(element('p', 'Dates annoncées · ' + formatDate(relation.origin.startDate) + ' – ' + formatDate(relation.origin.endDate || relation.origin.startDate), 'meta'));
    }
    node.append(element('p', relation.countries.map(countryName).join(' · '), 'meta'));
    const relatedActors = relation.origin.actorIds || relation.actorIds || [];
    for (const id of relatedActors) {
      const actor = atlas.actors.get(id);
      node.append(article(atlas, {...actor, title:actor.name, actorType:actor.type}));
    }
    if (state.mode === 'influences') {
      node.append(button(state.relation === relation.id ? 'Afficher toutes les relations' : 'Afficher ces pays sur la carte',
        () => actions.relation(state.relation === relation.id ? '' : relation.id)));
    }
    target.append(node);
  }
}

function renderActors(target, atlas, state, actions, rows) {
  const events = atlas.filter(state, atlas.data.events, state.country);
  const actorIds = new Set([...rows, ...events].flatMap(row => row.actorIds || []));
  const countryActors = atlas.data.actors.filter(actor => actorIds.has(actor.id)
    || (!state.year && !state.topic && actor.countries.includes(state.country)));
  target.append(element('h3', 'Acteurs associés'));
  renderList(target, atlas, countryActors.map(actor => ({...actor, title:actor.name, actorType:actor.type})), 'Aucun acteur national renseigné pour cette sélection.');
  target.append(element('h3', 'Relations documentées'));
  renderRelations(target, atlas, state, actions);
}

function renderFeed(target, atlas, state, actions) {
  target.append(element('h2', 'Derniers signaux'));
  target.append(element('p', 'Survolez un pays pour un aperçu ou sélectionnez-le pour ouvrir sa fiche.', 'muted'));
  const feed = atlas.filter(state, [...atlas.data.regulations, ...atlas.data.events]).slice(0, 6);
  if (!feed.length) target.append(element('p', 'Aucun signal documenté pour cette sélection.', 'muted'));
  for (const row of feed) {
    if (row.scope === 'eu' || row.countries.length !== 1) {
      target.append(article(atlas, row));
      continue;
    }
    const code = row.countries[0];
    const tab = row.type ? 'events' : radarStages.includes(row.stage) ? 'upcoming' : 'rules';
    const item = button('', () => actions.country(code, true, tab), 'recent');
    item.append(element('small', countryName(code) + ' · ' + formatDate(row.date)), element('strong', row.title));
    target.append(item);
  }
}

export function renderDetails(target, atlas, state, actions) {
  target.replaceChildren();
  target.scrollTop = 0;
  if (!state.country) {
    if (state.mode === 'regulation') return renderFeed(target, atlas, state, actions);
    target.append(element('h2',state.mode==='radar'?'Radar réglementaire':modes[state.mode]));
    if (state.mode === 'similarities') {
      renderComparison(target, atlas, state, state.comparison, actions.compare);
    } else if (state.mode === 'contests') {
      renderList(target, atlas, atlas.filter(state, atlas.data.events));
    } else if (state.mode === 'influences') {
      renderRelations(target, atlas, state, actions);
    } else {
      renderRadar(target,atlas,state,actions);
    }
    return;
  }

  const close = button('×', actions.close, 'close');
  close.setAttribute('aria-label', 'Fermer la fiche pays');
  const info = atlas.countries.get(state.country);
  const national = atlas.filter(state, atlas.data.regulations, state.country).filter(row => row.scope === 'national');
  const subnational = atlas.filter(state, atlas.data.regulations, state.country).find(row => row.scope === 'territorial');
  const latestEvent = atlas.filter(state, atlas.data.events, state.country)[0];
  const fallback = subnational ? 'Repère territorial · ' + subnational.title
    : latestEvent ? 'Événement documenté · ' + latestEvent.title : 'Couverture réglementaire nationale à compléter.';
  const subtitle = (!state.year && !state.topic && info.summary)
    || (national.length ? 'Dernier signal national · ' + national[0].title : fallback);
  target.append(close, element('h2', countryName(state.country)), element('p', subtitle, 'muted'));
  const metrics=element('div','','country-metrics');for(const [n,label] of [[national.length,'Textes nationaux'],[atlas.radarFor(state,state.country).length,'À suivre'],[atlas.filter(state,atlas.data.events,state.country).length,'Événements']]){const m=element('div');m.append(element('strong',String(n)),element('span',label));metrics.append(m);}target.append(metrics);

  const navigation = element('nav', '', 'tabs');
  navigation.setAttribute('aria-label', 'Rubriques de la fiche pays');
  for (const [key, label] of Object.entries(tabs)) {
    const item = button(label, () => actions.tab(key), 'tab-button');
    item.dataset.tab = key;
    item.setAttribute('aria-pressed', String(state.tab === key));
    navigation.append(item);
  }
  target.append(navigation);

  const regulations = atlas.filter(state, atlas.data.regulations, state.country);
  if (state.tab === 'rules') {
    renderRules(target, atlas, state, regulations);
  } else if (state.tab === 'upcoming') {
    target.append(element('h3','Radar réglementaire'));
    renderRadar(target,atlas,state,actions,state.country);
  } else if (state.tab === 'comparison') {
    const related = atlas.related(state);
    if (related.length) target.append(element('h3', 'Pays aux mécanismes comparables'));
    for (const match of related) {
      const label = countryName(match.code)+' · '+match.criteria.length+'/'+match.common+' concordances · '+match.criteria.map(row => row.criterion.label).join(', ');
      target.append(button(label, () => actions.compare([state.country, match.code]), 'compare'));
    }
    renderComparison(target, atlas, state, state.comparison.length ? state.comparison : [state.country], actions.compare);
  } else if (state.tab === 'actors') {
    renderActors(target, atlas, state, actions, regulations);
  } else {
    target.append(element('h3','Projets et mobilisations'),element('p','Un projet documenté ne signifie pas qu’il est contesté.','muted'));
    renderList(target, atlas, atlas.filter(state, atlas.data.events, state.country));
  }
}
