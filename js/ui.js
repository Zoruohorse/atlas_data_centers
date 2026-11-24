const regions = new Intl.DisplayNames(['fr'], {type: 'region'});
const dateFormat = new Intl.DateTimeFormat('fr', {dateStyle: 'medium', timeZone: 'UTC'});
export const countryName = code => regions.of(code);
export const formatDate = date => date.length === 4 ? date : dateFormat.format(new Date(date));
export const get = id => document.getElementById(id);

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
    const {label, url} = atlas.sources.get(id);
    const link = element('a', label);
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
  const metadata = [
    record.date && formatDate(record.date), stages[record.stage],
    record.scope === 'eu' && 'Union européenne',
    record.territory, relations[record.type] || atlas.data.taxonomy.eventTypes?.[record.type] || record.actorType,
  ].filter(Boolean).join(' · ');
  if (metadata) node.append(element('div', metadata, 'meta'));
  node.append(element('strong', record.title, 'article-title'), element('p', record.summary));
  if (record.effectiveFrom && record.effectiveFrom !== record.date) {
    node.append(element('p', 'Application à partir du ' + formatDate(record.effectiveFrom), 'meta'));
  }
  if (record.milestone) node.append(element('p', record.milestone, 'meta'));
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
