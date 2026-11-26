import {loadAtlas} from './model.js';
import {makeTimeline} from './chronology.js';
import {addOption, button, countryName, element, formatDate, get} from './ui.js';
import {initialTab, modes, renderDetails} from './views/details.js';
import {createMap} from './views/map.js';
import {renderEuropeanFeed} from './views/feed.js';

function start(atlas) {
  const world=atlas.view==='world';
  document.body.dataset.geography=atlas.view;
  document.title='Atlas '+(world?'mondial':'européen')+' des data centers';
  get('atlas-scope-label').textContent=world?'OBSERVATOIRE MONDIAL':'OBSERVATOIRE EUROPÉEN';
  get('map-panel').setAttribute('aria-label',world?'Carte mondiale':'Carte européenne');
  get('map').setAttribute('aria-label',world?'Pays et territoires du monde':'Pays d’Europe');
  get('map-caption').textContent=(world?'MONDE':'EUROPE')+' · VUE DOCUMENTAIRE';
  get('world-map-note').hidden=!world;
  get('feed').setAttribute('aria-label','Dernières évolutions '+(world?'mondiales':'européennes'));
  get('coverage-note').textContent=world?'Couverture mondiale progressive · '+atlas.countries.size+' fiches accessibles':'Vue européenne détaillée · '+atlas.countries.size+' fiches accessibles';
  const country = get('country');
  const topic = get('topic');
  const year = get('year');
  const details = get('details');
  const state = {country:'', topic:'', cutoff:'', mode:'regulation', tab:'rules', comparison:[], relation:'', eventType:'', relationType:''};
  const codes = [...atlas.countries.keys()].sort((a, b) =>
    Number(atlas.countries.get(b).priority) - Number(atlas.countries.get(a).priority)
    || countryName(a).localeCompare(countryName(b), 'fr'),
  );
  for (const code of codes) addOption(country, code, countryName(code));
  for (const [key, label] of Object.entries(atlas.data.taxonomy.topics)) addOption(topic, key, label);
  const dates=[...atlas.data.regulations,...atlas.data.events,...atlas.data.relations].map(row=>row.date);
  const periods=makeTimeline(dates,atlas.latestRevision),latest=periods.length-1;
  year.min='0';year.max=String(latest);year.value=String(latest);
  const ticks=get('timeline-ticks');
  // Repères annuels espacés : le curseur conserve un pas de trois mois.
  const first=Number(periods[0].date.slice(0,4)||atlas.latestRevision.slice(0,4));
  const last=Number(atlas.latestRevision.slice(0,4));
  const interval=Math.max(1,Math.ceil((last-first)/5));
  periods.forEach((period,index)=>{
    if(index===0||index===latest||(period.date.endsWith('03-31')&& (Number(period.date.slice(0,4))-first)%interval===0&&Number(period.date.slice(0,4))<last)){
      const tick=element('span',index===latest?'À jour':period.date.slice(0,4),'timeline-tick');
      tick.style.left=(latest?index/latest*100:100)+'%';
      if(index===0&&latest>0)tick.classList.add('first');
      if(index===latest)tick.classList.add('last');
      ticks.append(tick);
    }
  });
  function selectPeriod(index){
    const selected=Math.max(0,Math.min(latest,index));
    state.cutoff=periods[selected].date;state.relation='';render();
  }
  get('previous-quarter').addEventListener('click',()=>selectPeriod(Number(year.value)-1));
  get('next-quarter').addEventListener('click',()=>selectPeriod(Number(year.value)+1));
  for(const [key,label] of Object.entries(atlas.data.taxonomy.eventTypes))addOption(get('event-type'),key,label);
  get('event-type').addEventListener('change',()=>{state.eventType=get('event-type').value;render();});
  get('reset-year').addEventListener('click',()=>{state.cutoff='';state.relation='';render();});

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
  get('clear-filters').addEventListener('click',()=>{state.country='';state.topic='';state.cutoff='';state.eventType='';state.relation='';state.relationType='';state.comparison=[];state.tab=initialTab(state.mode);topic.value='';writeHash();render();});
  function render() {
    country.value = state.country;
    updateGeographicLinks();
    get('workspace').dataset.mode=state.mode;
    const index=state.cutoff?periods.findIndex(p=>p.date===state.cutoff):latest;
    year.value=String(index);
    get('year-label').textContent=state.cutoff?periods[index].label+' · '+formatDate(state.cutoff):'Base au '+formatDate(atlas.latestRevision);
    year.setAttribute('aria-valuetext',get('year-label').textContent);
    get('previous-quarter').disabled=index<=0;
    get('next-quarter').disabled=index>=latest;
    get('reset-year').disabled=index===latest;
    get('radar').setAttribute('aria-pressed',String(state.mode==='radar'));get('event-filter').hidden=state.mode!=='contests';get('event-type').value=state.eventType;
    for (const [mode, node] of modeButtons) node.setAttribute('aria-pressed', String(state.mode === mode));
    drawMap();
    renderDetails(details, atlas, state, actions);
    renderEuropeanFeed(get('feed'),atlas,state,actions);
  }

  function updateGeographicLinks(){
    for(const name of ['europe','world']){
      // Partir du lien HTML versionné, pas de l'adresse courante potentiellement ancienne.
      const link=get('view-'+name);
      const url=new URL(link.href);
      if(name==='europe'&&state.country&&!atlas.allCountries.get(state.country)?.europe)url.hash='';
      else url.hash=state.country;
      link.href=url.href;
    }
  }

  function writeHash() {
    const url = new URL(location.href);
    url.hash = state.country;
    if (url.href !== location.href) history.replaceState(null, '', url);
  }

  function selectCountry(code, focus = false, tab = initialTab(state.mode)) {
    if(code&&!atlas.countries.has(code)&&atlas.allCountries.has(code)){
      const url=new URL(get('view-world').href);url.hash=code;location.assign(url.href);return;
    }
    state.country = atlas.countries.has(code)?code:'';
    state.tab = tab;
    state.relation = '';
    state.comparison = code ? [code] : [];
    writeHash();
    render();
    if (focus) {details.focus({preventScroll:true});if(window.matchMedia('(max-width: 800px)').matches)details.scrollIntoView({block:'start',behavior:'auto'});}
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
  year.addEventListener('input',()=>selectPeriod(Number(year.value)));
  window.addEventListener('hashchange', readHash);

  const footer = get('footer');
  const national = new Set(atlas.data.regulations.filter(row => row.scope === 'national').flatMap(row => row.countries).filter(code=>atlas.countries.has(code)));
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
  get('revision-label').textContent='Base au '+formatDate(atlas.latestRevision);
  get('workspace').hidden = false;
  get('feed').hidden=false;
  get('notice').hidden = true;
  readHash();
}

try {
  const view=new URL(location.href).searchParams.get('view')==='world'?'world':'europe';
  // Afficher le choix de périmètre dès le démarrage, avant le chargement des données.
  for(const name of ['europe','world','usa']){
    const link=get('view-'+name);
    if(name===view)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');
  }
  get('coverage-note').textContent=view==='world'?'Couverture mondiale progressive':'Vue européenne détaillée';
  start(await loadAtlas(view));
} catch (error) {
  get('notice').textContent = 'Impossible de charger l’atlas. Actualisez la page ou consultez le site via un serveur HTTP.';
  console.error(error);
}
