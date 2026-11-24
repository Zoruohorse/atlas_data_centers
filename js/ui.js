const regions = new Intl.DisplayNames(['fr'], {type: 'region'});
const dateFormat = new Intl.DateTimeFormat('fr', {dateStyle: 'medium', timeZone: 'UTC'});
export const countryName = code => regions.of(code);
export const formatDate = date => date.length === 4 ? date : dateFormat.format(new Date(date));
export const get = id => document.getElementById(id);
export const flagUrl = code => 'https://flagcdn.com/w80/'+code.toLowerCase()+'.png';
export function flag(code){
  const node=element('span','','country-flag');node.setAttribute('aria-hidden','true');
  if(!/^[A-Z]{2}$/.test(code))return node;
  const fallback=element('span',code,'flag-fallback');
  const img=document.createElement('img');img.alt='';img.width=40;img.height=28;img.decoding='async';img.loading='eager';img.referrerPolicy='no-referrer';
  img.addEventListener('load',()=>{fallback.hidden=true;img.hidden=false;});
  img.addEventListener('error',()=>{fallback.hidden=false;img.hidden=true;});
  img.hidden=true;node.append(fallback,img);img.src=flagUrl(code);return node;
}
export function countryLabel(code, text=countryName(code)){
  const node=element('span','','country-label');node.append(flag(code),element('span',text));return node;
}

export function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  if (className) node.className = className;
  return node;
}

export function button(text, action, className) {
  const node = element('button', text, className);
  node.type = 'button';
  node.addEventListener('click', action);
  return node;
}

export function addOption(select, value, label) {
  const option = element('option', label);
  option.value = value;
  select.append(option);
}

export function links(atlas, sourceIds) {
  const container = element('div', '', 'links');
  for (const id of sourceIds) {
    const {label, url, type} = atlas.sources.get(id);
    const link = element('a', (type==='primary'?'Source primaire':'Analyse')+' · '+label);
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    container.append(link);
  }
  return container;
}

export function article(atlas, record) {
  const {stages, relations} = atlas.data.taxonomy;
  const node = element('article');
  node.className='document-card';
  if(record.stage)node.dataset.stage=record.stage;
  if(record.type)node.dataset.type=record.type;
  const metadata = [
    record.date && formatDate(record.date),
    record.scope === 'eu' && 'Union européenne',
    record.territory, relations[record.type] || atlas.data.taxonomy.eventTypes?.[record.type] || record.actorType,
  ].filter(Boolean).join(' · ');
  if (metadata||record.stage){const meta=element('div','','document-meta');if(record.stage)meta.append(element('span',stages[record.stage]||record.stage,'stage-tag'));if(metadata)meta.append(element('span',metadata,'meta'));node.append(meta);}
  node.append(element('strong', record.title, 'article-title'), element('p', record.summary));
  if (record.effectiveFrom && record.effectiveFrom !== record.date) {
    node.append(element('p', 'Application à partir du ' + formatDate(record.effectiveFrom), 'meta'));
  }
  if(record.effectiveUntil)node.append(element('p','Fin d’application documentée : '+formatDate(record.effectiveUntil),'meta'));
  if(record.milestone)node.append(element('p','Échéance / suivi · '+record.milestone,'meta'));
  if(record.stage==='published'&&!record.effectiveFrom)node.append(element('p','Date d’application non renseignée.','meta'));
  for (const [key, label] of [['operator','Pour l’opérateur'], ['grid','Pour le réseau']]) {
    if (!record.impacts?.[key]) continue;
    const impact = element('p', '', 'impact');
    impact.append(element('strong', label), record.impacts[key]);
    node.append(impact);
  }
  node.append(links(atlas, record.sourceIds));
  return node;
}

export function renderList(target, atlas, rows, message = 'Aucun signal documenté pour cette sélection.') {
  if (!rows.length) target.append(element('p', message, 'muted'));
  for (const row of rows) target.append(article(atlas, row));
}
