import {loadAtlas} from './model.js';
import {addOption, button, countryName, element, formatDate, get} from './ui.js';
import {initialTab, modes, renderDetails} from './views/details.js';
import {createMap} from './views/map.js';
import {renderEuropeanFeed} from './views/feed.js';

function start(atlas) {
  const country = get('country');
  const topic = get('topic');
  const year = get('year');
  const details = get('details');
  const state = {country:'', topic:'', year:'', mode:'regulation', tab:'rules', comparison:[], relation:'', eventType:'', relationType:''};
  const codes = [...atlas.countries.keys()].sort((a, b) =>
    Number(atlas.countries.get(b).priority) - Number(atlas.countries.get(a).priority)
    || countryName(a).localeCompare(countryName(b), 'fr'),
  );
  for (const code of codes) addOption(country, code, countryName(code));
  for (const [key, label] of Object.entries(atlas.data.taxonomy.topics)) addOption(topic, key, label);
  const dates = [...atlas.data.regulations, ...atlas.data.events, ...atlas.data.relations].map(row => row.date.slice(0, 4));
  const firstYear = Math.min(...dates);
  const lastYear = Math.max(...dates);
  const currentYear=Math.max(lastYear,Number(atlas.latestRevision.slice(0,4))||lastYear),latest=currentYear+1;
  year.min=String(firstYear);year.max=String(latest);year.value=String(latest);
  get('first-year').textContent=String(firstYear);get('last-year').textContent=currentYear+' · À jour';
  for(const [key,label] of Object.entries(atlas.data.taxonomy.eventTypes))addOption(get('event-type'),key,label);
  get('event-type').addEventListener('change',()=>{state.eventType=get('event-type').value;render();});
  get('reset-year').addEventListener('click',()=>{state.year='';state.relation='';render();});

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
    relationType(type){state.relationType=type;state.relation='';render();details.querySelector('#relation-type')?.focus();},
    relation(id) {
      state.relation = id;
      render();
      (details.querySelector('.relation[open] summary') || details.querySelector('.relation summary'))?.focus();
    },
  };

  const modeButtons = new Map();
  const symbols={regulation:'▤',similarities:'◫',contests:'◉',influences:'⌘'};
  for (const [mode, label] of Object.entries(modes)) {
    const node = button('', () => {
      state.mode = mode;
      state.eventType='';state.relationType='';
      state.tab = initialTab(mode);
      state.relation = '';
      render();
    }, 'mode-button');
    const glyph=element('span',symbols[mode],'mode-glyph');glyph.setAttribute('aria-hidden','true');node.append(glyph,element('span',label));node.dataset.mode=mode;
    modeButtons.set(mode, node);
    get('modes').append(node);
  }

  get('radar').addEventListener('click',()=>{state.mode='radar';state.tab='upcoming';state.eventType='';state.relation='';state.relationType='';render();});
  const drawMap = createMap(atlas, state, selectCountry,actions);
  get('show-flags').addEventListener('change',drawMap);
  get('clear-filters').addEventListener('click',()=>{state.country='';state.topic='';state.year='';state.eventType='';state.relation='';state.relationType='';state.comparison=[];state.tab=initialTab(state.mode);topic.value='';writeHash();render();});
  function render() {
    country.value = state.country;
    get('workspace').dataset.mode=state.mode;
    year.value=state.year||String(latest);get('year-label').textContent=state.year?'31 décembre '+state.year:'Base au '+formatDate(atlas.latestRevision);year.setAttribute('aria-valuetext',get('year-label').textContent);
    get('radar').setAttribute('aria-pressed',String(state.mode==='radar'));get('event-filter').hidden=state.mode!=='contests';get('event-type').value=state.eventType;
    for (const [mode, node] of modeButtons) node.setAttribute('aria-pressed', String(state.mode === mode));
    drawMap();
    renderDetails(details, atlas, state, actions);
    renderEuropeanFeed(get('feed'),atlas,state,actions);
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
  year.addEventListener('input', () => {
    state.year=Number(year.value)===latest?'':year.value;
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
  const overview=get('overview');get('revision-label').textContent='Base au '+formatDate(atlas.latestRevision);
  for(const [n,label,desc] of [[atlas.countries.size,'Pays','Périmètre européen'],[atlas.data.regulations.length,'Réglementations','Textes et mesures'],[atlas.data.events.length,'Événements','Projets et mobilisations'],[atlas.data.sources.length,'Sources','Références documentaires']]){
    const item=element('div','','overview-item');item.append(element('strong',String(n)),element('span',label),element('small',desc));overview.append(item);
  }overview.hidden=false;
  get('workspace').hidden = false;
  get('feed').hidden=false;
  get('notice').hidden = true;
  readHash();
}

try {
  start(await loadAtlas());
} catch (error) {
  get('notice').textContent = 'Impossible de charger l’atlas. Actualisez la page ou consultez le site via un serveur HTTP.';
  console.error(error);
}
