import {addOption, countryName, element, links} from '../ui.js';

export function renderComparison(target, atlas, state, codes, changeCountries) {
  const selection = element('div', '', 'selection');
  const available = [...atlas.countries.keys()].sort((a, b) => countryName(a).localeCompare(countryName(b), 'fr'));
  for (let index = 0; index < Math.min(codes.length + 1, 4); index++) {
    const label = element('label');
    const select = element('select');
    const position = 'Pays ' + (index + 1);
    select.setAttribute('aria-label', position);
    addOption(select, '', position);
    for (const code of available) {
      if (!codes.includes(code) || code === codes[index]) addOption(select, code, countryName(code));
    }
    select.value = codes[index] || '';
    select.addEventListener('change', () => {
      const next = [...codes];
      next[index] = select.value;
      changeCountries(next.filter(Boolean), index);
    });
    label.append(select);
    selection.append(label);
  }
  target.append(selection);
  if (codes.length < 2) {
    target.append(element('p', 'Sélectionnez deux à quatre pays pour comparer leurs dispositifs.', 'muted'));
    return;
  }
  const {rows, common, matching} = atlas.compare(state, codes);
  const score = common.length
    ? matching.length + ' mécanisme(s) concordant(s) sur ' + common.length + ' critère(s) renseigné(s) pour tous les pays.'
    : 'Aucun critère renseigné pour tous les pays sélectionnés.';
  target.append(element('p', score), element('p', 'Une concordance indique un mécanisme de même nature. Consultez les seuils, les périmètres et les délais dans le tableau. Les données manquantes sont exclues du décompte.', 'muted'));
  const wrapper = element('div', '', 'table-wrap');
  wrapper.tabIndex = 0;
  wrapper.setAttribute('aria-label', 'Tableau défilant du comparateur');
  const table = element('table');
  const head = element('thead');
  const titles = element('tr');
  for (const title of ['Critère', ...codes.map(countryName)]) {
    const cell = element('th', title);
    cell.scope = 'col';
    titles.append(cell);
  }
  head.append(titles);
  const body = element('tbody');
  for (const {criterion, values} of rows) {
    const row = element('tr');
    const caption = element('th', criterion.label);
    caption.scope = 'row';
    row.append(caption);
    for (const value of values) {
      const cell = element('td', value?.detail || 'À documenter');
      if (value) {
        cell.append(element('small', atlas.data.taxonomy.kinds[value.kind], 'meta'));
        cell.append(links(atlas, value.record.sourceIds.slice(0, 1)));
      }
      row.append(cell);
    }
    body.append(row);
  }
  table.append(element('caption', 'Comparaison des critères documentés'), head, body);
  wrapper.append(table);
  target.append(wrapper);
}
