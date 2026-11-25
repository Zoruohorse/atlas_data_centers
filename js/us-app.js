import {loadAtlas} from './model.js';
import {makeTimeline} from './chronology.js';
import {createUSModel,statuses,statusOf,levels} from './us-model.js';
import {get,element,button,addOption,formatDate,renderList,disclosure,links} from './ui.js';
const ns='http://www.w3.org/2000/svg';
function svg(tag,attrs={},txt=''){const node=document.createElementNS(ns,tag);for(const [k,v] of Object.entries(attrs))node.setAttribute(k,String(v));if(txt)node.textContent=txt;return node;}
async function read(path){const r=await fetch(new URL(path,import.meta.url));if(!r.ok)throw Error(path+' '+r.status);return r.json();}
function start(atlas,index,geo){
 const model=createUSModel(atlas,index,geo),state={code:'',topic:'',status:'',cutoff:''};
 const stateSelect=get('us-state'),topic=get('us-topic'),status=get('us-status'),period=get('us-period'),details=get('us-details'),map=get('us-map');
 const names=Object.keys(geo.states).sort((a,b)=>geo.states[a].name.localeCompare(geo.states[b].name,'fr'));
 for(const code of names)addOption(stateSelect,code,geo.states[code].name+' ('+code+')');
 for(const [key,label] of Object.entries(atlas.data.taxonomy.topics))addOption(topic,key,label);
 for(const key of ['temporary','effective','published','pending','historical'])addOption(status,key,statuses[key]);
 const periods=makeTimeline([...model.rows.map(r=>r.date),index.snapshot.date],atlas.latestRevision),last=periods.length-1;
 period.max=String(last);period.value=String(last);get('us-first').textContent=periods[0].label;get('revision-label').textContent='Base au '+formatDate(atlas.latestRevision);
 const defs=svg('defs');for(const [key,color] of Object.entries({temporary:'#dca675',effective:'#80b5a5',published:'#a5c4df',pending:'#b59b50',historical:'#a3abb7'})){const pattern=svg('pattern',{id:'us-pattern-'+key,patternUnits:'userSpaceOnUse',width:9,height:9,patternTransform:'rotate(35)'});pattern.append(svg('rect',{width:2,height:9,fill:color}));defs.append(pattern);}map.append(defs);
 const paths=svg('g'),overlays=svg('g'),labels=svg('g');map.append(paths,overlays,labels);
 const nodes=new Map();
 function select(code,focus=false){state.code=geo.states[code]?code:'';const u=new URL(location.href);u.hash=state.code;history.replaceState(null,'',u);render();if(focus){details.focus({preventScroll:true});if(window.matchMedia('(max-width:800px)').matches)details.scrollIntoView({block:'start'});}}
 function wire(node,code){node.addEventListener('click',()=>select(code,true));node.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(code,true);}});}
 for(const code of names){const g=geo.states[code],path=svg('path',{d:g.path,class:'us-shape',tabindex:0,role:'button'});wire(path,code);paths.append(path);
   const [x,y]=g.label;let call=null;if(g.callout){labels.append(svg('path',{d:'M'+g.center.join(',')+' L'+(x-21)+','+y,class:'us-leader'}));call=svg('rect',{x:x-20,y:y-11,width:40,height:22,rx:4,class:'us-callout',tabindex:0,role:'button'});wire(call,code);labels.append(call);}
   labels.append(svg('text',{x,y:y+4,'text-anchor':'middle',class:'us-label'},code));nodes.set(code,{path,call});
 }
 labels.append(svg('text',{x:16,y:553,class:'us-label'},'Alaska'),svg('text',{x:218,y:553,class:'us-label'},'Hawaï'));
 const legend=get('us-legend');for(const [key,label] of Object.entries(statuses)){const line=element('span','','legend-item'),i=element('i','','us-swatch');i.dataset.kind=key;line.append(i,label);legend.append(line);}
 for(const [cls,label] of [['us-local-swatch','Mesure municipale documentée'],['us-history-swatch','Proposition recensée par NCSL (mai 2026)']]){const line=element('span','','legend-item');line.append(element('i','',cls),label);legend.append(line);}
 legend.append(element('p','Hachures : autre statut d’État. Le cercle NCSL est historique et ne présume pas du statut actuel. Gris : absence de règle d’État dans la base, pas absence de réglementation. Les règles fédérales et régionales sont présentées séparément. Alaska et Hawaï en encarts.','us-legend-note'));
 function group(target,title,rows,empty='Aucun document avec ces filtres.',open=true){const {panel,content}=disclosure(title,{count:rows.length,open});renderList(content,atlas,rows,empty);target.append(panel);}
 function snapshotCard(row){const box=element('div','','us-snapshot');const statusesFR={Introduced:'Déposé',Vetoed:'Veto',Failed:'Non abouti',Possible:'Piste envisagée',Continued:'Reporté / poursuite de l’examen'};box.append(element('strong','Signal NCSL · '+row.bill),element('p',(statusesFR[row.status]||row.status)+' · photographie du '+formatDate(index.snapshot.date)),element('p',row.summary),element('p','Statut historique non revalidé ; consulter les mesures plus récentes ci-dessus.','meta'),links(atlas,[index.snapshot.sourceId]));return box;}
 function renderDetails(){details.replaceChildren();const rows=model.visible(state);const code=state.code;
   if(!code){details.append(element('div','VUE D’ENSEMBLE','eyebrow'),element('h2','États-Unis'),element('p','Choisissez un État sur la carte. Les textes fédéraux ne sont pas répliqués artificiellement dans chaque fiche.','us-summary'));
     const codes=names.filter(c=>model.paint(state,c).stateRules.length||model.paint(state,c).localRules.length);const jump=element('div','','us-state-jump');for(const c of codes)jump.append(button(geo.states[c].name,()=>select(c)));details.append(element('h3',codes.length+' États avec mesures détaillées'),jump);
     group(details,'Dernières mesures des États et communes',rows.filter(r=>model.isRule(r)&&['state','local'].includes(model.scope(r).level)));
     const historical=names.filter(c=>model.snapshotFor(state,c));const {panel,content}=disclosure('Propositions NCSL · photographie du 7 mai 2026',{count:historical.length});content.append(element('p',index.snapshot.note,'meta'));for(const c of historical)content.append(button(geo.states[c].name+' · '+model.snapshotFor(state,c).bill,()=>select(c)));details.append(panel);return;
   }
   const r=model.forState(state,code);details.append(element('div',code==='DC'?'DISTRICT FÉDÉRAL':'ÉTAT FÉDÉRÉ · '+code,'eyebrow'),element('h2',geo.states[code].name),element('p','Les décisions locales ci-dessous ne s’appliquent pas automatiquement à l’ensemble de cet État.','us-summary'));
   group(details,'Mesures à l’échelle de l’État',r.filter(x=>model.isRule(x)&&model.scope(x).level==='state'),'Aucune règle d’État renseignée pour ces filtres.');
   group(details,'Municipalités et collectivités locales',r.filter(x=>model.isRule(x)&&model.scope(x).level==='local'),'Aucune mesure municipale renseignée.',true);
   group(details,'Événements et signaux territoriaux',r.filter(x=>!model.isRule(x)),'Aucun événement territorial renseigné.',false);
   const regional=r.filter(x=>model.isRule(x)&&model.scope(x).level==='regional');if(regional.length)group(details,'Mesures de réseau régional',regional);
   const snap=model.snapshotFor(state,code);if(snap){details.append(element('h3','Historique législatif'),snapshotCard(snap));}
   details.append(button('Retour à tous les États',()=>select('')));
 }
 function section(id,title,desc,rows,open){const target=get(id);target.replaceChildren(element('h2',title),element('p',desc,'us-summary'));group(target,'Textes et dossiers',rows.filter(model.isRule),'Aucun texte renseigné.',open);const events=rows.filter(r=>!model.isRule(r));if(events.length)group(target,'Événements et prises de position',events,'Aucun événement.',false);}
 function render(){stateSelect.value=state.code;topic.value=state.topic;status.value=state.status;overlays.replaceChildren();
   const index=state.cutoff?periods.findIndex(p=>p.date===state.cutoff):last;period.value=String(index);get('us-period-label').textContent=state.cutoff?periods[index].label+' · '+formatDate(state.cutoff):'Base au '+formatDate(atlas.latestRevision);period.setAttribute('aria-valuetext',get('us-period-label').textContent);get('us-prev').disabled=index===0;get('us-next').disabled=index===last;get('us-current').disabled=index===last;
   for(const [code,{path,call}] of nodes){const p=model.paint(state,code),g=geo.states[code];const title=g.name+' · '+statuses[p.kind]+(p.local?' · '+p.local+' mesure(s) locale(s)':'')+(p.snapshot?' · Signal NCSL historique':'');path.dataset.kind=p.kind;path.setAttribute('aria-label',title);path.setAttribute('aria-pressed',String(code===state.code));path.replaceChildren(svg('title',{},title));if(call){call.setAttribute('aria-label',title);call.setAttribute('aria-pressed',String(code===state.code));call.replaceChildren(svg('title',{},title));}
     if(p.kinds.length>1)overlays.append(svg('path',{d:g.path,fill:'url(#us-pattern-'+p.kinds[1]+')',class:'us-secondary'}));
     const [x,y]=g.label;if(p.local)overlays.append(svg('circle',{cx:x+17,cy:y-10,r:5,class:'us-local-mark'}));if(p.snapshot)overlays.append(svg('circle',{cx:x-17,cy:y-10,r:5,class:'us-history-mark'}));
   }
   renderDetails();const rows=model.visible(state);section('us-federal','Cadre fédéral','Les actes du Congrès, procédures FERC et annonces fédérales sont distingués des mesures des États. Une procédure fédérale peut avoir un périmètre régional.',rows.filter(r=>model.scope(r).level==='federal'),true);
   section('us-regional','Réseaux régionaux','Périmètre électrique, distinct des frontières des États.',rows.filter(r=>model.scope(r).level==='regional'),false);
   section('us-context','Contexte national et dossiers à territorialiser','Sources transversales et futurs documents non encore classés par juridiction.',rows.filter(r=>['context','unclassified'].includes(model.scope(r).level)),false);
 }
 function choose(i){state.cutoff=periods[Math.max(0,Math.min(last,i))].date;render();}
 stateSelect.addEventListener('change',()=>select(stateSelect.value));topic.addEventListener('change',()=>{state.topic=topic.value;render();});status.addEventListener('change',()=>{state.status=status.value;render();});period.addEventListener('input',()=>choose(Number(period.value)));get('us-prev').addEventListener('click',()=>choose(Number(period.value)-1));get('us-next').addEventListener('click',()=>choose(Number(period.value)+1));get('us-current').addEventListener('click',()=>choose(last));get('us-reset').addEventListener('click',()=>{state.topic='';state.status='';state.cutoff='';select('');});window.addEventListener('hashchange',()=>{state.code=geo.states[location.hash.slice(1).toUpperCase()]?location.hash.slice(1).toUpperCase():'';render();});
 const source=element('a',geo.attribution);source.href=geo.url;get('us-footer').append('Fond cartographique : ',source,' · Base documentaire partagée avec l’Atlas mondial. Aucun territoire non renseigné n’est réputé sans réglementation.');
 state.code=geo.states[location.hash.slice(1).toUpperCase()]?location.hash.slice(1).toUpperCase():'';get('us-workspace').hidden=false;get('us-notice').hidden=true;render();
}
try{const [atlas,index,geo]=await Promise.all([loadAtlas('world'),read('../data/us-jurisdictions.json'),read('../geo/usa.json')]);start(atlas,index,geo);}catch(e){get('us-notice').textContent='Impossible de charger la vue États-Unis. Actualisez la page.';console.error(e);}
