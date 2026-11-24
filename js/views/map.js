import {radarStages} from '../model.js';
import {countryName, element, formatDate, get} from '../ui.js';

const namespace = 'http://www.w3.org/2000/svg';

function project(longitude, latitude) {
  const radians = Math.PI / 180;
  const lon = (longitude - 12) * radians;
  const lat = latitude * radians;
  const center = 53 * radians;
  const scale = 1030 * Math.sqrt(2 / (1 + Math.sin(center) * Math.sin(lat) + Math.cos(center) * Math.cos(lat) * Math.cos(lon)));
  return [
    435 + scale * Math.cos(lat) * Math.sin(lon),
    381 - scale * (Math.cos(center) * Math.sin(lat) - Math.sin(center) * Math.cos(lat) * Math.cos(lon)),
  ];
}

export function createMap(atlas, state, selectCountry) {
  const tooltip = get('tip');
  const legend = get('legend');
  const paths = new Map();
  let signals = new Map();
  const hideTip = () => { tooltip.hidden = true; };

  function showTip(code) {
    const signal = signals.get(code);
    tooltip.replaceChildren(element('strong', countryName(code)));
    if (signal) {
      if (signal.date) tooltip.append(element('div', formatDate(signal.date)));
      tooltip.append(element('div', signal.title), element('div', signal.summary));
    } else {
      tooltip.append('Aucun signal documenté pour cette sélection.');
    }
    tooltip.hidden = false;
  }

  get('map').setAttribute('viewBox', atlas.geo.viewBox);
  for (const [code, shape] of Object.entries(atlas.geo.paths)) {
    const path = document.createElementNS(namespace, 'path');
    path.setAttribute('d', shape);
    path.setAttribute('tabindex', '0');
    path.setAttribute('role', 'button');
    path.addEventListener('pointerenter', () => showTip(code));
    path.addEventListener('pointerleave', hideTip);
    path.addEventListener('focus', () => showTip(code));
    path.addEventListener('blur', hideTip);
    path.addEventListener('click', () => selectCountry(code, true));
    path.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectCountry(code, true);
      }
      if (event.key === 'Escape') hideTip();
    });
    paths.set(code, path);
    get('borders').append(path);
  }
  for (const [code, coordinate] of Object.entries(atlas.geo.labels)) {
    const [x, y] = project(...coordinate);
    const label = document.createElementNS(namespace, 'text');
    label.setAttribute('x', x);
    label.setAttribute('y', y);
    label.setAttribute('text-anchor', 'middle');
    label.textContent = code;
    get('labels').append(label);
  }

  function legendItem(color, text) {
    const item = element('span');
    const swatch = element('i', '', 'swatch-' + color);
    item.append(swatch, text);
    return item;
  }

  return function drawMap() {
    hideTip();
    signals = new Map();
    const related = state.mode === 'similarities' ? atlas.related(state) : [];
    const relations = state.mode === 'influences' ? atlas.relationsFor(state, state.country) : [];
    for (const [code, path] of paths) {
      const selected = code === state.country;
      let signal;
      let color = '';
      if (state.mode === 'radar') {
        signal = atlas.filter(state, atlas.data.regulations, code).find(row => radarStages.includes(row.stage));
        if (signal) color = 'covered';
      } else if (state.mode === 'regulation') {
        const rows = atlas.filter(state, atlas.data.regulations, code).filter(row => row.scope === 'national');
        signal = rows.find(row => ['effective', 'temporary', 'published'].includes(row.stage)) ?? rows[0];
        const cutoff = state.year ? state.year + '-12-31' : atlas.latestRevision;
        const activeTemporary = rows.some(row => row.stage === 'temporary' && (!row.effectiveUntil || row.effectiveUntil >= cutoff));
        color = activeTemporary ? 'temporary' : signal ? 'covered' : '';
      } else if (state.mode === 'contests') {
        signal = atlas.filter(state, atlas.data.events, code)[0];
        if (signal) color = 'covered';
      } else if (state.mode === 'influences') {
        signal = relations.find(row => row.countries.includes(code) && (!state.relation || row.id === state.relation));
        if (signal) color = 'related';
      } else {
        const match = related.find(row => row.code === code);
        if (match) {
          color = 'related';
          signal = {title: 'Mécanismes en commun', summary: match.criteria.map(row => row.criterion.label).join(' · ')};
        }
      }
      if (signal) signals.set(code, signal);
      path.setAttribute('class', ['country', color, selected && 'selected'].filter(Boolean).join(' '));
      path.setAttribute('aria-label', countryName(code) + (signal ? ' · ' + signal.title : ''));
      path.setAttribute('aria-pressed', String(selected));
    }
    const description = {
      regulation: ['covered','Signal national documenté'],
      radar: ['covered','Évolution à suivre, nationale ou européenne'],
      contests: ['covered','Événement documenté'],
      similarities: ['related','Mécanisme national comparable'],
      influences: ['related','Pays lié par une relation documentée'],
    };
    legend.replaceChildren(legendItem(...description[state.mode]));
    if (state.mode === 'regulation') legend.append(legendItem('temporary','Mesure temporaire'));
    legend.append(legendItem('empty','Aucun signal correspondant'));
    if (state.mode === 'similarities' && !state.country) {
      legend.append(element('span', 'Choisissez un pays de référence.'));
    }
  };
}
