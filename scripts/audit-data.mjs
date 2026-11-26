import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
function audit(d,asOf){
 const valid=/^\d{4}-\d{2}-\d{2}$/;
 if(!valid.test(asOf)||new Date(asOf).toISOString().slice(0,10)!==asOf)throw Error("Date d'audit invalide");
 const days=date=>valid.test(date??"")?Math.floor((Date.parse(asOf)-Date.parse(date))/86400000):null;
 const flags=[], add=(priority,rule,r,reason,action)=>flags.push({priority,rule,id:r.id,title:r.title||r.name||r.id,date:r.date||null,scope:r.scope||null,countries:r.countries||[],reason,action,sourceIds:r.sourceIds||[]});
 const regs=d.regulations, terminal=new Set(["rejected","withdrawn","repealed"]), active=new Set(["effective","temporary","published"]), ids=new Map(d.sources.map(s=>[s.id,s])), by=new Map(regs.map(r=>[r.id,r]));
 for(const r of regs){
  const age=days(r.date),end=days(r.effectiveUntil),milestone=days(r.milestoneDate),start=days(r.effectiveFrom);
  if(!terminal.has(r.stage)&&r.stage!=="suspended"&&end!==null&&end>0)add("P1","end-passed",r,"Fin d'application renseignée dépassée de "+end+" jours.","Vérifier une prorogation, une extinction ou un texte de remplacement ; ne pas changer le stade sur la seule date.");
  if(!terminal.has(r.stage)&&milestone!==null&&milestone>=0)add("P1","milestone-passed",r,"Échéance renseignée atteinte ou dépassée.","Consulter le dossier officiel et distinguer échéance procédurale et entrée en vigueur.");
  if(r.stage==="effective"&&start!==null&&start<0)add("P1","future-effective",r,"Date d'effet postérieure à la date d'audit alors que le stade est « application ».","Vérifier le champ et les éventuelles dispositions déjà applicables.");
  if(r.stage==="temporary"&&!r.effectiveUntil&&!r.milestoneDate&&age!==null&&age>=90)add("P2","temporary-no-end",r,"Mesure temporaire documentée depuis "+age+" jours sans fin ni échéance structurée.","Rechercher la durée exacte, la prorogation ou la levée auprès de l'autorité compétente.");
  if(r.stage==="consultation"&&age!==null&&age>=90&&(milestone===null||milestone>=0))add("P2","consultation-aging",r,"Consultation documentée depuis "+age+" jours sans échéance future renseignée.","Rechercher la clôture, les réponses, une décision finale ou une nouvelle consultation.");
  if(["announced","adopted","emerging"].includes(r.stage)&&age!==null&&age>=180&&(milestone===null||milestone>=0))add("P2","pending-aging",r,"Signal, annonce ou adoption intermédiaire documenté depuis "+age+" jours.","Vérifier publication, promulgation, abandon ou suite institutionnelle.");
  if(r.stage==="published"&&!r.effectiveFrom&&age!==null&&age>=180)add("P3","published-no-effective-date",r,"Publication ancienne sans date d'effet structurée.","Vérifier si une date d'effet est pertinente et étayée ; certaines procédures n'en ont pas.");
  if(r.date.length===4&&!terminal.has(r.stage))add("P3","year-only",r,"Date documentaire limitée à l'année.","Préciser le jour uniquement si une source le permet ; ne pas inventer de date.");
  if(!r.sourceIds.some(id=>ids.get(id)?.type==="primary"))add("P1","no-primary-source",r,"Aucune source primaire qualifiée.","Retrouver le texte ou le dossier officiel.");
 }
 const norm=s=>String(s??"").normalize("NFD").replace(/\p{Diacritic}/gu,"").toLowerCase().replace(/[^\p{L}\p{N}]+/gu," ").trim();
 const titleGroups=new Map();
 for(const r of [...regs,...d.events]){const key=JSON.stringify([r.countries.slice().sort(),norm(r.territory),norm(r.title)]);if(!titleGroups.has(key))titleGroups.set(key,[]);titleGroups.get(key).push(r);}
 for(const group of titleGroups.values())if(group.length>1)add("P2","same-title",group[0],"Titres normalisés identiques pour un même périmètre : "+group.map(r=>r.id).join(", ")+".","Vérifier si ce sont des jalons distincts ou une duplication ; conserver l'historique.");
 for(const r of [...regs,...d.events].filter(r=>r.countries.includes("US"))){const j=d["us-jurisdictions"].jurisdictions[r.id];if(!j)add("P2","us-unclassified",r,"Document américain non indexé.","Documenter le niveau territorial sans inférer les États concernés.");else if(r.scope==="national"&&["state","local","regional"].includes(j.level)||r.scope==="territorial"&&j.level==="federal")add("P1","us-scope-conflict",r,"Périmètre réglementaire et niveau américain potentiellement incohérents.","Vérifier le niveau de décision et ne pas nationaliser une mesure territoriale.");}
 for(const a of d.assessments){const r=by.get(a.regulationId);if(r&&terminal.has(r.stage))add("P2","historical-assessment",r,"Évaluation "+a.criterionId+" liée à un texte rejeté, retiré ou abrogé.","Vérifier que le comparateur ne présente pas ce mécanisme comme actif ; conserver la trace historique.");}
 const referenced=new Set([...regs,...d.events,...d.actors,...d.relations,...d.campaigns].flatMap(x=>x.sourceIds||[]));for(const c of d.countries)for(const id of c.contextSourceIds||[])referenced.add(id);if(d["us-jurisdictions"].snapshot?.sourceId)referenced.add(d["us-jurisdictions"].snapshot.sourceId);
 const covered=new Set([...regs,...d.events].flatMap(x=>x.countries));const euDocs=regs.some(r=>r.scope==="eu");
 flags.sort((a,b)=>a.priority.localeCompare(b.priority)||a.rule.localeCompare(b.rule)||a.id.localeCompare(b.id));
 return {asOf,revision:d.changelog.map(x=>x.date).sort().at(-1)||null,counts:{regulations:regs.length,events:d.events.length,sources:d.sources.length,flags:flags.length,P1:flags.filter(x=>x.priority==="P1").length,P2:flags.filter(x=>x.priority==="P2").length,P3:flags.filter(x=>x.priority==="P3").length,unlinkedSources:d.sources.filter(s=>!referenced.has(s.id)).length,countriesWithoutDirectDocuments:d.countries.filter(c=>!covered.has(c.code)).length,countriesWithoutDirectOrEUContext:d.countries.filter(c=>!covered.has(c.code)&&!(c.euMember&&euDocs)&&!c.contextSourceIds?.length).length},flags};
}
function renderAudit(report,d){
 const by=new Map(d.sources.map(s=>[s.id,s]));const link=id=>{const s=by.get(id);return s?`[${id}](<${s.url}>)`:`\`${id}\``;};const safe=s=>String(s).replace(/\|/g,"\\|").replace(/\s+/g," ");
 let text=`# Audit de cohérence documentaire — ${report.asOf}\n\nRévision de la base : ${report.revision}. Rapport de présélection automatique, sans consultation indépendante des sources en ligne. Une alerte n'est pas une erreur confirmée. Aucune modification juridique automatique.\n\n## Résultats\n\n- ${report.counts.regulations} entrées réglementaires et ${report.counts.events} événements examinés.\n- ${report.counts.flags} signalements : ${report.counts.P1} P1 (prioritaire), ${report.counts.P2} P2 (suivi), ${report.counts.P3} P3 (complétude).\n- ${report.counts.unlinkedSources} sources sans lien dans les collections contrôlées (peuvent être archivées ; ne pas supprimer automatiquement).\n- ${report.counts.countriesWithoutDirectDocuments} pays sans document directement associé, dont ${report.counts.countriesWithoutDirectOrEUContext} sans document direct, socle UE ni référence de contexte renseignée. Cela ne signifie pas absence de réglementation.\n\n## File de vérification\n\n| Priorité | Document | Signal | Action | Sources initiales |\n|---|---|---|---|---|\n`;
 for(const f of report.flags)text+=`| ${f.priority} | ${safe(f.title)} (\`${f.id}\`) | ${safe(f.reason)} | ${safe(f.action)} | ${f.sourceIds.slice(0,2).map(link).join(" · ")} |\n`;
 text+="\n## Suite de l'audit par un agent\n\n1. Vérifier les P1 puis les P2 dans les sources primaires actuelles ; comparer les versions et les dates.\n2. Qualifier chaque signal comme confirmé, infirmé, incertain ou non pertinent avec URL, date et justification.\n3. Créer un delta sourcé uniquement pour les évolutions confirmées ; conserver les entrées historiques.\n4. Rechercher en complément les contradictions de fond, les liens manquants et les angles morts selon le [protocole](../../docs/maintenance/audit-semantique.md).\n";
 return text;
}
export {audit,renderAudit};
export async function loadData(){const names=['regulations','events','actors','sources','assessments','taxonomy','relations','campaigns','countries','us-jurisdictions','changelog'];return Object.fromEntries(await Promise.all(names.map(async n=>[n,JSON.parse(await readFile(new URL('../data/'+n+'.json',import.meta.url),'utf8'))])));}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 let asOf=new Date().toISOString().slice(0,10),format='text';
 for(const arg of process.argv.slice(2)){if(arg.startsWith('--as-of='))asOf=arg.slice(8);else if(arg.startsWith('--format='))format=arg.slice(9);else throw Error('Usage : node scripts/audit-data.mjs [--as-of=AAAA-MM-JJ] [--format=text|json|markdown]');}
 if(!['text','json','markdown'].includes(format))throw Error('Format inconnu : '+format);
 const d=await loadData(),report=audit(d,asOf);
 if(format==='json')console.log(JSON.stringify(report,null,2));
 else if(format==='markdown')process.stdout.write(renderAudit(report,d));
 else{console.log('Audit documentaire '+asOf+' · '+JSON.stringify(report.counts));for(const f of report.flags)console.log(f.priority+' '+f.rule+' '+f.id+' — '+f.reason);console.log('Alertes à vérifier, aucun statut modifié.');}
}
