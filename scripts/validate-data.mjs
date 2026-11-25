import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {collections, createAtlas} from '../js/model.js';
import {makeTimeline,isDocumentedBy,quarterLabel} from '../js/chronology.js';

const read = async path => JSON.parse(await readFile(new URL(path, import.meta.url), 'utf8'));
const data = Object.fromEntries(await Promise.all(collections.map(async name => [name, await read('../data/' + name + '.json')])));
const geo = await read('../geo/europe.json');
const worldGeo=await read('../geo/world.json');
const unique = (values, label) => assert.equal(new Set(values).size, values.length, label + ' contient un doublon');
const required = (value, label) => assert(typeof value === 'string' && value.trim(), label + ' est obligatoire');
const validDate = (value, label, allowYear = false) => {
  assert(typeof value === 'string' && (allowYear ? /^\d{4}(?:-\d{2}-\d{2})?$/ : /^\d{4}-\d{2}-\d{2}$/).test(value), label + ' a une date invalide');
  if (value.length > 4) assert.equal(new Date(value).toISOString().slice(0, 10), value, label + ' a une date invalide');
};
const references = (values, index, label, minimum = 0) => {
  assert(Array.isArray(values) && values.length >= minimum, label + ' est incomplet');
  unique(values, label);
  for (const value of values) assert(index.has(value), label + ' référence un identifiant inconnu : ' + value);
};

for (const name of ['regulations', 'actors', 'events', 'campaigns', 'relations', 'sources']) {
  unique(data[name].map(row => row.id), name);
  for (const row of data[name]) assert(/^[a-z0-9-]+$/.test(row.id || ''), name + ' contient un identifiant invalide');
}
unique(data.countries.map(row => row.code), 'countries');
unique(data.taxonomy.criteria.map(row => row.id), 'criteria');
unique(data.sources.map(row => row.url), 'URL des sources');
const atlas = createAtlas(data, geo);
const ids = name => new Set(data[name].map(row => row.id));
const regulationIds = ids('regulations');
const campaignIds = ids('campaigns');
const actorIds = ids('actors');
const topics = new Set(Object.keys(data.taxonomy.topics));

for (const {code, euMember, priority, contextSourceIds} of data.countries) {
  assert(/^[A-Z]{2}$/.test(code), 'Code pays invalide');
  assert(typeof euMember === 'boolean' && typeof priority === 'boolean', code + ' doit qualifier le périmètre');
  assert(typeof atlas.countries.get(code).europe==='boolean',code+' · périmètre européen obligatoire');
  if (contextSourceIds) references(contextSourceIds, atlas.sources, code + ' · sources de contexte', 1);
}
references(Object.keys(geo.paths), atlas.countries, 'Tracés géographiques', 1);
references(Object.keys(geo.labels), new Set(Object.keys(geo.paths)), 'Libellés géographiques');
for (const source of data.sources) {
  required(source.label, source.id + ' · libellé');
  assert.equal(new URL(source.url).protocol, 'https:', source.id + ' · source HTTPS attendue');
  assert(['primary','analysis'].includes(source.type), source.id + ' · type de source invalide');
}
for (const name of ['regulations', 'actors', 'events', 'campaigns', 'relations']) {
  for (const row of data[name]) {
    required(row.title || row.name, row.id + ' · titre');
    required(row.summary, row.id + ' · résumé');
    references(row.sourceIds, atlas.sources, row.id + ' · sources', 1);
    if (name !== 'actors') validDate(row.date, row.id, true);
    if (name !== 'relations') references(row.countries, atlas.countries, row.id + ' · pays', Number(name === 'events' || name === 'campaigns'));
    if (name !== 'relations' && name !== 'actors') references(row.topics, topics, row.id + ' · thèmes', 1);
    if (row.actorIds) references(row.actorIds, actorIds, row.id + ' · acteurs');
  }
}
for (const row of data.regulations) {
  assert(['eu','national','territorial'].includes(row.scope), row.id + ' · périmètre invalide');
  assert(row.scope === 'eu' ? !row.countries.length : row.countries.length === 1, row.id + ' · renseigner le territoire');
  if (row.scope === 'territorial') required(row.territory, row.id + ' · territoire');
  assert(Object.hasOwn(data.taxonomy.stages, row.stage), row.id + ' · stade inconnu');
  assert(row.sourceIds.some(id => atlas.sources.get(id).type === 'primary'), row.id + ' · source primaire requise');
  if (row.effectiveFrom) validDate(row.effectiveFrom, row.id);
  if (row.effectiveUntil) validDate(row.effectiveUntil, row.id);
  if(row.milestoneDate){validDate(row.milestoneDate,row.id);required(row.milestone,row.id+' · échéance');}
  if (row.effectiveFrom && row.effectiveUntil) assert(row.effectiveFrom <= row.effectiveUntil, row.id + ' · dates d’application inversées');
}
for (const row of data.events) {
  required(row.type, row.id + ' · type');
  if (row.campaignId) references([row.campaignId], campaignIds, row.id + ' · campagne');
}
for (const row of data.campaigns) {
  validDate(row.startDate, row.id);
  if (row.endDate) {
    validDate(row.endDate, row.id);
    assert(row.startDate <= row.endDate, row.id + ' · dates de campagne inversées');
  }
}
for (const row of data.relations) {
  assert(Object.hasOwn(data.taxonomy.relations, row.type), row.id + ' · type inconnu');
  assert(!(row.campaignId && row.regulationId), row.id + ' · origine ambiguë');
  if (row.campaignId) references([row.campaignId], campaignIds, row.id + ' · campagne');
  if (row.regulationId) references([row.regulationId], regulationIds, row.id + ' · réglementation');
  if (!row.campaignId && !row.regulationId) {
    references(row.countries, atlas.countries, row.id + ' · pays', 2);
    references(row.topics, topics, row.id + ' · thèmes', 1);
  }
}
unique(data.assessments.map(row => row.regulationId + '/' + row.criterionId), 'Évaluations');
for (const row of data.assessments) {
  references([row.regulationId], regulationIds, 'Évaluation · réglementation', 1);
  references([row.criterionId], atlas.criteria, 'Évaluation · critère', 1);
  assert(Object.hasOwn(data.taxonomy.kinds, row.kind), 'Évaluation · nature inconnue');
  required(row.mechanism, 'Évaluation · mécanisme');
  required(row.detail, 'Évaluation · détail');
}
for (const criterion of data.taxonomy.criteria) {
  required(criterion.label, criterion.id + ' · libellé');
  assert(topics.has(criterion.topic), criterion.id + ' · thème inconnu');
}
for (const row of data.changelog) {
  validDate(row.date, 'Journal');
  required(row.title, 'Journal · titre');
  required(row.summary, 'Journal · résumé');
}

console.log('Données valides · ' + data.countries.length + ' pays, ' + data.regulations.length + ' entrées réglementaires et ' + data.sources.length + ' sources.');

const current={cutoff:'',topic:'',eventType:'',country:'ES'};
const national=atlas.compare(current,['ES','IE'],true);
assert(national.matching.some(r=>r.criterion.id==='renewable-additionality'));
assert(national.common.every(r=>r.values.every(v=>v.record.scope==='national')));
assert(!atlas.compare({...current,cutoff:'2024-12-31'},['ES','IE'],true).matching.length);
assert(atlas.convergenceFor(current).every(r=>r.type==='convergence'&&r.sourceIds.length));
assert(atlas.radarFor(current).some(r=>r.id==='eu-minimum-standards-consultation-2026'));
assert(atlas.filter({...current,eventType:'mobilisation'},data.events).every(r=>r.type==='mobilisation'));
console.log('Régressions du modèle OK.');

const timeline=makeTimeline([...data.regulations,...data.events,...data.relations].map(r=>r.date),atlas.latestRevision);
assert.equal(timeline.at(-1).date,'');
assert.equal(timeline.at(-1).revision,atlas.latestRevision);
assert(timeline.slice(0,-1).every(p=>p.date<atlas.latestRevision&&/-(03-31|06-30|09-30|12-31)$/.test(p.date)));
assert.equal(quarterLabel('2026-09-30'),'T3 2026');
assert(isDocumentedBy('2026-03-31','2026-03-31'));
assert(!isDocumentedBy('2026-04-01','2026-03-31'));
assert(!isDocumentedBy('2026','2026-09-30'));
assert(isDocumentedBy('2026','2026-12-31'));
assert(isDocumentedBy('2026',''));
const q1={...current,cutoff:'2026-03-31'},q2={...current,cutoff:'2026-06-30'};
const rows1=atlas.filter(q1,data.events),rows2=atlas.filter(q2,data.events);
assert(rows1.every(r=>rows2.includes(r)));
assert(rows2.length>rows1.length);
assert(rows2.every(r=>isDocumentedBy(r.date,q2.cutoff)));
assert(atlas.filter(current,data.events).some(r=>r.date==='2026'));
assert(!atlas.filter(q2,data.events).some(r=>r.date==='2026'));
assert(atlas.relationsFor(q2).every(r=>isDocumentedBy(r.date,q2.cutoff)));
assert(!atlas.filter(q1,data.regulations).some(r=>r.id==='fr-htb3-piquage-2026'));
assert(atlas.filter(q2,data.regulations).some(r=>r.id==='fr-htb3-piquage-2026'));
assert(atlas.compare({...current,cutoff:'2025-06-30'},['FR']).rows.every(r=>r.values.every(v=>!v||!v.record.effectiveFrom||v.record.effectiveFrom<='2025-06-30')));
console.log('Chronologie trimestrielle OK.');

const europeAtlas=createAtlas(data,geo,'europe'),worldAtlas=createAtlas(data,worldGeo,'world');
assert(worldAtlas.countries.size>=197);
assert(europeAtlas.countries.size>=47);
assert(worldAtlas.countries.has('US')&&!europeAtlas.countries.has('US'));
references(Object.keys(worldGeo.paths),worldAtlas.countries,'Tracés mondiaux',1);
references(Object.keys(worldGeo.labels),new Set(Object.keys(worldGeo.paths)),'Libellés mondiaux');
assert(Object.keys(worldGeo.paths).length>=160);
assert(Object.values(worldGeo.labels).every(p=>p.length===2&&p.every(Number.isFinite)));
assert(Object.values(worldGeo.paths).every(p=>typeof p==='string'&&p.startsWith('M')&&!/NaN|Infinity/.test(p)));
for(const row of data.regulations.filter(r=>r.scope==='eu'))assert(!worldAtlas.filter(current,[row],'US').length);
assert.equal(worldAtlas.filter(current,data.regulations).length,data.regulations.length);
assert.equal(worldAtlas.filter(current,data.events).length,data.events.length);
assert.equal(europeAtlas.filter(current,data.regulations,'FR').length,worldAtlas.filter(current,data.regulations,'FR').length);
assert.deepEqual(europeAtlas.compare(current,['ES','IE']),worldAtlas.compare(current,['ES','IE']));
console.log('Vues Europe et Monde · intégrité géographique et documentaire OK.');
