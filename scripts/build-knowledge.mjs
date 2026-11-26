import {readFile,writeFile,mkdir,readdir} from 'node:fs/promises';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const names=['regulations','events','actors','sources','assessments','taxonomy','relations','campaigns','countries','us-jurisdictions','changelog'];
const d=Object.fromEntries(await Promise.all(names.map(async n=>[n,JSON.parse(await readFile(join(root,'data',n+'.json'),'utf8'))])));
const config=JSON.parse(await readFile(join(root,'knowledge/concepts.json'),'utf8'));
function renderWiki(d,config){
 const out={}, regs=d.regulations, events=d.events, all=[...regs,...events], by=new Map(all.map(r=>[r.id,r])), sources=new Map(d.sources.map(s=>[s.id,s])), taxa=d.taxonomy, countries=new Map(d.countries.map(c=>[c.code,c]));
 const revision=d.changelog.map(x=>x.date).sort().at(-1)||"non renseignée";
 const line=s=>String(s??"").replace(/\s+/g," ").trim();
 const cell=s=>line(s).replace(/\|/g,"\\|");
 const link=(s)=>`[${line(s.label).replace(/[\[\]]/g,"")}](<${s.url}>)`;
 const sourceLinks=(r,max=3)=>r.sourceIds.map(id=>sources.get(id)).filter(Boolean).sort((a,b)=>Number(b.type==="primary")-Number(a.type==="primary")).slice(0,max).map(s=>`${link(s)} (${s.type==="primary"?"primaire":"analyse"})`).join(" · ");
 const scope=r=>r.scope==="eu"?"Union européenne":r.territory?`${r.countries.join(", ")} — ${r.territory}`:r.countries.join(", ");
 const stage=r=>r.stage?taxa.stages[r.stage]:taxa.eventTypes[r.type]||r.type||"document";
 const mapLinks=r=>r.countries.map(code=>`[${code}](https://zoruohorse.github.io/atlas_data_centers/${countries.get(code)?.europe?"":"?view=world"}#${code})`).join(" · ");
 const sort=(a,b)=>b.date.localeCompare(a.date)||a.id.localeCompare(b.id);
 const intro=`> Vue dérivée automatiquement des JSON du dépôt. Révision documentaire : ${revision}. Les statuts reflètent la base, pas une vérification juridique en temps réel. Les sources originales restent la référence. Ne pas modifier cette page à la main.\n`;
 const heading=(title)=>`# ${title}\n\n${intro}\n`;
 const tableHeader="| Date | Périmètre | Stade enregistré | Document | Référence source |\n|---|---|---|---|---|\n";
 const tableRow=r=>`| ${r.date} | ${cell(scope(r))} | ${cell(stage(r))} | ${cell(r.title)} (\`${r.id}\`) | ${sourceLinks(r,1)} |\n`;
 const details=r=>`### ${line(r.title)}\n\n- Identifiant : \`${r.id}\` · ${r.date} · ${scope(r)} · ${stage(r)}\n- Fiche cartographique : ${mapLinks(r)||"[Europe](https://zoruohorse.github.io/atlas_data_centers/)"}\n${r.effectiveFrom?`- Date d'effet renseignée : ${r.effectiveFrom}\n`:""}${r.effectiveUntil?`- Fin renseignée : ${r.effectiveUntil}\n`:""}${r.milestone?`- Échéance : ${line(r.milestone)}\n`:""}\n${line(r.summary)}\n\n${r.impacts?.operator?`**Opérateurs :** ${line(r.impacts.operator)}\n\n`:""}${r.impacts?.grid?`**Réseau :** ${line(r.impacts.grid)}\n\n`:""}Sources : ${sourceLinks(r)}. Autres références : voir \`${r.id}\` dans [${r.stage?"regulations.json":"events.json"}](../../data/${r.stage?"regulations":"events"}.json) et [sources.json](../../data/sources.json).\n\n`;
 let index=heading("Wiki de connaissances — atlas des data centers");
 index+=`Cette couche documentaire complète la carte sans créer de deuxième base de faits. Les fiches de concepts croisent des mécanismes et des cas documentés ; les index par thème donnent accès à tous les documents correspondants. Les cas sélectionnés ne constituent pas un recensement exhaustif. Les chiffres comptent des entrées, pas des lois ou des projets uniques.\n\n**Inventaire :** ${regs.length} entrées réglementaires, ${events.length} événements, ${d.actors.length} acteurs, ${d.sources.length} sources, ${d.assessments.length} évaluations, ${d.relations.length} relations.\n\n## Fiches transversales\n\n| Fiche | Cas sélectionnés et critères | Questions de veille |\n|---|---:|---|\n`;
 for(const c of config){
   const a=d.assessments.filter(x=>c.criteria.includes(x.criterionId));
   const ids=[...new Set([...c.cases,...a.map(x=>x.regulationId)])];
   for(const id of ids)if(!by.has(id))throw Error("Cas wiki inconnu : "+id);
   for(const k of c.criteria)if(!taxa.criteria.some(x=>x.id===k))throw Error("Critère wiki inconnu : "+k);
   for(const k of c.topics)if(!taxa.topics[k])throw Error("Thème wiki inconnu : "+k);
   index+=`| [${c.title}](concepts/${c.id}.md) | ${ids.length} documents · ${a.length} évaluations | ${cell(c.questions[0])} |\n`;
   let p=heading(c.title)+`[Retour à l'index](../index.md)\n\n## Grille de lecture\n\n${c.guide}\n\n## Questions à approfondir\n\n${c.questions.map(q=>"- "+q).join("\n")}\n\n## Comparaison des mécanismes déjà évalués\n\n`;
   p+=a.length?`Les évaluations existantes sont reproduites sans créer de nouvelle qualification. Le stade et le périmètre restent déterminants.\n\n| Critère | Périmètre | Stade | Nature | Détail | Référence |\n|---|---|---|---|---|---|\n`+a.map(x=>{const r=by.get(x.regulationId);return `| ${cell(taxa.criteria.find(k=>k.id===x.criterionId).label)} | ${cell(scope(r))} | ${cell(stage(r))} | ${cell(taxa.kinds[x.kind])} | ${cell(x.detail)} | \`${r.id}\` · ${sourceLinks(r,1)} |\n`}).join(""):"Aucune évaluation structurée pour ces critères dans la base. Ce n'est pas une absence de réglementation.\n";
   p+=`\n## Cas documentés\n\nSélection de lecture, complétée automatiquement par les évaluations existantes. Les résumés ci-dessous sont ceux du référentiel, sans nouvelle interprétation juridique.\n\n`+ids.map(id=>details(by.get(id))).join("");
   if(c.relations){p+="## Relations et campagnes enregistrées\n\n";for(const r of [...d.relations,...d.campaigns])p+=`- **${r.title||r.id}** (\`${r.id}\`) — ${line(r.summary)} Sources : ${sourceLinks(r,2)}.\n`;p+="\n";}
   p+=`## Explorer l'ensemble des documents associés\n\n${c.topics.map(t=>`- [${taxa.topics[t]}](../themes/${t}.md)`).join("\n")}\n`;
   out[`knowledge/concepts/${c.id}.md`]=p;
 }
 index+="\n## Index documentaires par thème\n\n| Thème | Entrées réglementaires | Événements |\n|---|---:|---:|\n";
 for(const [topic,label] of Object.entries(taxa.topics)){
   const rr=regs.filter(r=>r.topics.includes(topic)).sort(sort), ee=events.filter(r=>r.topics.includes(topic)).sort(sort);
   index+=`| [${label}](themes/${topic}.md) | ${rr.length} | ${ee.length} |\n`;
   out[`knowledge/themes/${topic}.md`]=heading(label)+`[Retour à l'index](../index.md)\n\nLes documents multithématiques apparaissent dans plusieurs index. Les entrées sont classées par date documentaire ; un état absent signifie une information non renseignée.\n\n## Réglementation (${rr.length})\n\n`+(rr.length?tableHeader+rr.map(tableRow).join(""):"Aucune entrée.\n")+`\n## Événements (${ee.length})\n\n`+(ee.length?tableHeader+ee.map(tableRow).join(""):"Aucune entrée.\n")+`\nRéférentiel : [textes](../../data/regulations.json) · [événements](../../data/events.json) · [sources](../../data/sources.json).\n`;
 }
 index+="\n## Maintenance et analyses\n\n- [Méthode d'audit sémantique](../docs/maintenance/audit-semantique.md)\n- [Analyses transversales conservées](analyses/README.md)\n- [Rapport initial du 26 novembre 2026](audits/2026-11-26.md)\n- [Journal des mises à jour](../data/changelog.json) et [journaux de veille](../docs/veille/)\n";
 out["knowledge/index.md"]=index;return out;
}
const generated=renderWiki(d,config);
const check=process.argv.includes('--check');
if(process.argv.slice(2).some(a=>a!=='--check'))throw Error('Usage : node scripts/build-knowledge.mjs [--check]');
let bad=[];
for(const [path,content] of Object.entries(generated)){
 const target=join(root,path);
 if(check){let existing;try{existing=await readFile(target,'utf8')}catch{}if(existing!==content)bad.push(path);}
 else{await mkdir(dirname(target),{recursive:true});await writeFile(target,content);}
}
for(const dir of ['knowledge/concepts','knowledge/themes']){
 const entries=await readdir(join(root,dir)).catch(()=>[]);
 for(const f of entries.filter(x=>x.endsWith('.md')))if(!Object.hasOwn(generated,dir+'/'+f))bad.push(dir+'/'+f+' (fichier généré obsolète : retirer explicitement)');
}
if(bad.length){console.error('Wiki désynchronisé :\n'+bad.join('\n')+'\nExécuter npm run knowledge:build et vérifier les fichiers obsolètes.');process.exitCode=1;}
else console.log('Wiki '+(check?'synchronisé':'généré')+' · '+Object.keys(generated).length+' pages.');
