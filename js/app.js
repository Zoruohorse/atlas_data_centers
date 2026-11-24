import {loadAtlas} from './model.js';
import {addOption, button, countryName, element, formatDate, get} from './ui.js';
import {initialTab, modes, renderDetails} from './views/details.js';
import {createMap} from './views/map.js';

function start(atlas) {
  const country = get('country');
  const topic = get('topic');
  const year = get('year');
  const details = get('details');
  const state = {country:'', topic:'', year:'', mode:'regulation', tab:'rules', comparison:[], relation:''};
  const codes = [...atlas.countries.keys()].sort((a, b) =>
    Number(atlas.countries.get(b).priority) - Number(atlas.countries.get(a).priority)
    || countryName(a).localeCompare(countryName(b), 'fr'),
  );
  for (const code of codes) addOption(country, code, countryName(code));
  for (const [key, label] of Object.entries(atlas.data.taxonomy.topics)) addOption(topic, key, label);
  const dates = [...atlas.data.regulations, ...atlas.data.events, ...atlas.data.relations].map(row => row.date.slice(0, 4));
  const firstYear = Math.min(...dates);
  const lastYear = Math.max(...dates);
  if (Number.isFinite(firstYear)) {
    for (let value = lastYear; value >= firstYear; value--) addOption(year, String(value), 'Jusqu’à ' + value);
  }

  const actions = {
    country: selectCountry,
    close() { selectCountry(''); country.focus(); },
    tab(key) {
      state.tab = key;
      render();
      details.querySelector('[data-tab="' + key + '"]').focus();
    },
    compare(selected, index = 1) {
      state.comparison = selected;
      if (state.country && selected[0] !== state.country) {
        state.country = selected[0] || '';
        writeHash();
      }
      render();
      const selects = details.querySelectorAll('.selection select');
      selects[Math.min(index, selects.length - 1)]?.focus();
    },
    relation(id) {
      state.relation = id;
      render();
      (details.querySelector('.relation[open] summary') || details.querySelector('.relation summary'))?.focus();
    },
  };

  const modeButtons = new Map();
  for (const [mode, label] of Object.entries(modes)) {
    const node = button(label, () => {
      state.mode = mode;
      state.tab = initialTab(mode);
      state.relation = '';
      render();
    }, 'mode-button');
    modeButtons.set(mode, node);
    get('modes').append(node);
  }

  const drawMap = createMap(atlas, state, selectCountry);
  function render() {
    country.value = state.country;
    for (const [mode, node] of modeButtons) node.setAttribute('aria-pressed', String(state.mode === mode));
    drawMap();
    renderDetails(details, atlas, state, actions);
  }

  function writeHash() {
    const url = new URL(location.href);
    url.hash = state.country;
    if (url.href !== location.href) history.replaceState(null, '', url);
  }

  function selectCountry(code, focus = false, tab = initialTab(state.mode)) {
    state.country = code;
    state.tab = tab;
    state.relation = '';
    state.comparison = code ? [code] : [];
    writeHash();
    render();
    if (focus) details.focus();
  }

  function readHash() {
    const code = location.hash.slice(1).toUpperCase();
    state.country = atlas.countries.has(code) ? code : '';
    state.comparison = state.country ? [state.country] : [];
    state.tab = initialTab(state.mode);
    state.relation = '';
    render();
  }
  country.addEventListener('change', () => selectCountry(country.value));
  topic.addEventListener('change', () => {
    state.topic = topic.value;
    state.relation = '';
    render();
  });
  year.addEventListener('change', () => {
    state.year = year.value;
    state.relation = '';
    render();
  });
  window.addEventListener('hashchange', readHash);

  const footer = get('footer');
  const national = new Set(atlas.data.regulations.filter(row => row.scope === 'national').flatMap(row => row.countries));
  const changes = [...atlas.data.changelog].sort((a, b) => b.date.localeCompare(a.date));
  const attribution = element('a', atlas.geo.attribution);
  attribution.href = atlas.geo.url;
  footer.append(national.size + ' pays avec un signal réglementaire national · Fond cartographique ', attribution);
  if (changes.length) {
    const history = element('details', '', 'footer-changes');
    history.append(element('summary', 'Dernière mise à jour · ' + formatDate(changes[0].date)));
    for (const change of changes) history.append(element('p', formatDate(change.date) + ' · ' + change.title + '. ' + change.summary));
    footer.append(history);
  }
  get('workspace').hidden = false;
  get('notice').hidden = true;
  readHash();
}

try {
  start(await loadAtlas());
} catch (error) {
  get('notice').textContent = 'Impossible de charger l’atlas. Actualisez la page ou consultez le site via un serveur HTTP.';
  console.error(error);
}
