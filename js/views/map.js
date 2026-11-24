import {radarStages} from '../model.js';
import {countryName, countryLabel, flagUrl, element, formatDate, get, addOption} from '../ui.js';
const ns='http://www.w3.org/2000/svg';
const anchor={IS:[-19,65],GB:[-2.8,54.5],PT:[-8,39.5],SE:[16,63],NL:[5.3,52.2],BE:[4.5,50.6],LU:[6.1,49.75],CH:[8.2,46.8],AT:[14,47.6],IT:[12.5,42.8],CZ:[15.4,49.8],SK:[19.4,48.7],HU:[19.4,47.1],SI:[14.9,46.1],HR:[16.5,45.4],BA:[17.8,44.1],RS:[20.8,44],ME:[19.2,42.7],XK:[20.9,42.6],MK:[21.7,41.6],AL:[20,41.2],GR:[22,39],RO:[25,46],BG:[25.4,42.7],MD:[28.5,47],UA:[31,49],BY:[28,53.4],LT:[24,55.3],LV:[25,57],EE:[25.5,58.7],RU:[38,58],TR:[34,39],CY:[33.2,35]};
const small=new Set(['LU','BE','NL','CH','SI','HR','BA','ME','XK','MK','AL','MD','SK','CY','EE','LV','LT']);
const descriptions={regulation:['Réglementation','Stade le plus significatif parmi les mesures documentées pour chaque pays.'],similarities:['Similarités réglementaires','Sélectionnez un pays : les liens indiquent les mécanismes nationaux comparables.'],contests:['Projets et contestations','Distingue les mobilisations, projets et autres événements documentés.'],influences:['Réseaux d’influence','Sélectionnez une relation pour visualiser son périmètre et ses liens sourcés.'],radar:['Radar réglementaire','Dossiers à suivre et échéances documentées, sans prévision de résultat.']};
function svg(tag,attrs={},txt=''){const n=document.createElementNS(ns,tag);for(const [k,v] of Object.entries(attrs))n.setAttribute(k,String(v));if(txt)n.textContent=txt;return n;}
function project(longitude,latitude){
 const rad=Math.PI/180,lon=(longitude-12)*rad,lat=latitude*rad,center=53*rad;
 const scale=1030*Math.sqrt(2/(1+Math.sin(center)*Math.sin(lat)+Math.cos(center)*Math.cos(lat)*Math.cos(lon)));
 return [435+scale*Math.cos(lat)*Math.sin(lon),381-scale*(Math.cos(center)*Math.sin(lat)-Math.sin(center)*Math.cos(lat)*Math.cos(lon))];
}
function arc(a,b,index=0){const dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy)||1,bend=Math.min(55,len*.18)*(index%2===0?1:-1);return 'M'+a.join(',')+' Q'+((a[0]+b[0])/2-dy/len*bend)+','+((a[1]+b[1])/2+dx/len*bend)+' '+b.join(',');}
export function createMap(atlas,state,selectCountry,actions){
 const tooltip=get('tip'),legend=get('legend'),connectionLayer=get('connections'),labelLayer=get('labels'),paths=new Map(),points=new Map();
 let signals=new Map();
 const hideTip=()=>{tooltip.hidden=true;};
 function showTip(code){
  const signal=signals.get(code);tooltip.replaceChildren(countryLabel(code));
  if(signal){const meta=[signal.date&&formatDate(signal.date),signal.stage&&atlas.data.taxonomy.stages[signal.stage],signal.type&&atlas.data.taxonomy.relations[signal.type]].filter(Boolean).join(' · ');if(meta)tooltip.append(element('div',meta,'tip-meta'));tooltip.append(element('strong',signal.title),element('p',signal.summary));}
  else tooltip.append(element('p','Aucun signal correspondant à cette sélection.'));
  tooltip.append(element('small','Cliquer pour ouvrir la fiche pays','tip-meta'));tooltip.hidden=false;
 }
 get('map').setAttribute('viewBox',atlas.geo.viewBox);
 for(const [code,shape] of Object.entries(atlas.geo.paths)){
  const path=svg('path',{d:shape,tabindex:0,role:'button'});
  path.addEventListener('pointerenter',()=>showTip(code));path.addEventListener('pointerleave',hideTip);path.addEventListener('focus',()=>showTip(code));path.addEventListener('blur',hideTip);
  path.addEventListener('click',()=>selectCountry(code,true));path.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();selectCountry(code,true);}if(e.key==='Escape')hideTip();});
  paths.set(code,path);get('borders').append(path);
  const coord=atlas.geo.labels[code]||anchor[code];if(coord)points.set(code,project(...coord));
 }
 function legendItem(color,txt){const item=element('span','','legend-item');item.append(element('i','','swatch-'+color),txt);return item;}
 function curve(a,b,type,index){connectionLayer.append(svg('path',{d:arc(a,b,index),class:'map-edge edge-'+type}));}
 function node(code,type){const p=points.get(code);if(p)connectionLayer.append(svg('circle',{cx:p[0],cy:p[1],r:8,class:'map-node node-'+type}));}
 function hubFor(relation){
  const available=relation.countries.filter(c=>points.has(c)),coords=available.map(c=>points.get(c));
  if(coords.length<2)return;
  if(relation.type==='convergence'||relation.type==='influence'){
   // For two countries draw the relationship itself. For multi-country records use a hub: no fabricated pairwise edges.
   if(coords.length===2){curve(coords[0],coords[1],relation.type,0);available.forEach(c=>node(c,relation.type));return;}
  }
  const center=coords.reduce((a,p)=>[a[0]+p[0]/coords.length,a[1]+p[1]/coords.length],[0,0]);
  const hub=[Math.max(85,Math.min(855,center[0]+12)),Math.max(45,Math.min(665,center[1]-28))];
  coords.forEach((p,i)=>curve(hub,p,relation.type,i));available.forEach(c=>node(c,relation.type));
  const text=relation.type==='coordination'?'Campagne commune':relation.type==='harmonisation'?'Cadre UE':atlas.data.taxonomy.relations[relation.type];
  const width=Math.max(94,text.length*7+16);
  connectionLayer.append(svg('rect',{x:hub[0]-width/2,y:hub[1]-13,width,height:26,rx:8,class:'map-hub hub-'+relation.type}),svg('text',{x:hub[0],y:hub[1]+4,'text-anchor':'middle',class:'hub-label'},text));
 }
 return function drawMap(){
  hideTip();signals=new Map();connectionLayer.replaceChildren();labelLayer.replaceChildren();
  get('map-title').textContent=descriptions[state.mode][0];get('map-description').textContent=descriptions[state.mode][1];
  const related=state.mode==='similarities'?atlas.related(state):[];
  const relations=state.mode==='influences'?[...atlas.relationsFor(state,state.country),...atlas.convergenceFor(state)].filter(r=>!state.relationType||r.type===state.relationType):[];
  const active=relations.find(r=>r.id===state.relation)||relations[0];
  const cutoff=state.year?state.year+'-12-31':atlas.latestRevision;
  const relationBox=get('map-relations');relationBox.replaceChildren();relationBox.hidden=state.mode!=='influences';
  if(state.mode==='influences'){
   if(relations.length){const label=element('label','Relation affichée');const select=element('select');select.setAttribute('aria-label','Relation affichée');for(const r of relations)addOption(select,r.id,(atlas.data.taxonomy.relations[r.type]||r.type)+' · '+(r.origin.title||r.title)+(r.derived?' · '+r.countries.map(countryName).join(' / '):''));select.value=active.id;select.addEventListener('change',()=>actions.relation(select.value));label.append(select);relationBox.append(label,element('span',active.countries.length+' pays associés','meta'));}
   else relationBox.append(element('span','Aucune relation documentée avec ces filtres.','muted'));
  }
  for(const [code,path] of paths){
   const selected=code===state.country;let signal,color='empty';
   if(state.mode==='regulation'){
    const rows=atlas.filter(state,atlas.data.regulations,code).filter(r=>r.scope!=='eu');
    const national=rows.filter(r=>r.scope==='national');
    const usable=r=>(!r.effectiveFrom||r.effectiveFrom<=cutoff)&&(!r.effectiveUntil||r.effectiveUntil>=cutoff);
    const temporary=national.find(r=>r.stage==='temporary'&&usable(r)),effective=national.find(r=>r.stage==='effective'&&usable(r)),published=national.find(r=>r.stage==='published'),pending=national.find(r=>radarStages.includes(r.stage)||(r.effectiveFrom&&r.effectiveFrom>cutoff)),local=rows.find(r=>r.scope==='territorial');
    if(temporary){signal=temporary;color='temporary';}else if(effective){signal=effective;color='effective';}else if(published){signal=published;color='published';}else if(pending){signal=pending;color='pending';}else if(local){signal=local;color='territorial';}else if(national[0]){signal=national[0];color='historical';}
    else {const eu=atlas.filter(state,atlas.data.regulations,code).find(r=>r.scope==='eu');if(eu){signal=eu;color='eu-baseline';}}
   }else if(state.mode==='similarities'){
    const match=related.find(r=>r.code===code);if(match){color=match.criteria.length>=3?'similar-high':match.criteria.length===2?'similar-strong':'similar-partial';signal={title:match.criteria.length+'/'+match.common+' critères nationaux concordants',summary:match.criteria.map(r=>r.criterion.label).join(' · ')+'. Couverture documentaire variable.'};}
   }else if(state.mode==='contests'){
    const rows=atlas.filter(state,atlas.data.events,code),mob=rows.find(r=>r.type==='mobilisation'),project=rows.find(r=>r.type==='project');signal=mob||project||rows[0];if(signal)color=mob&&project?'mixed':mob?'mobilisation':project?'project':'historical';
   }else if(state.mode==='influences'){
    if(active?.countries.includes(code)){signal=active;color='rel-'+active.type;}
   }else{
    const rows=atlas.radarFor(state,code);signal=rows[0];if(signal)color=signal.stage==='consultation'?'consultation':signal.stage==='temporary'?'temporary':signal.stage==='emerging'?'pending':signal.stage==='announced'?'announced':'published';
   }
   if(signal)signals.set(code,signal);
   path.setAttribute('class',['country',color,selected?'selected':''].join(' '));path.setAttribute('aria-label',countryName(code)+(signal?' · '+signal.title:''));path.setAttribute('aria-pressed',String(selected));
  }
  if(state.mode==='influences'&&active)hubFor(active);
  if(state.mode==='similarities'&&points.has(state.country)){related.filter(r=>points.has(r.code)).forEach((r,i)=>{curve(points.get(state.country),points.get(r.code),'similarity',i);node(r.code,'similarity');});node(state.country,'similarity');}
  const visibleFlags=get('show-flags').checked;
  for(const [code,p] of points){
   const selected=code===state.country,linked=state.mode==='influences'&&active?.countries.includes(code),matched=state.mode==='similarities'&&related.some(r=>r.code===code);
   if(small.has(code)&&!selected&&!linked&&!matched)continue;
   const [x,y]=p;
   if(state.mode==='contests'&&signals.has(code)){const kind=signals.get(code).type;labelLayer.append(svg('circle',{cx:x,cy:y,r:7,class:'event-dot '+kind}));}
   const yOffset=state.mode==='influences'||state.mode==='similarities'||state.mode==='contests'?-13:0;
   const g=svg('g',{class:'country-marker'+(selected?' selected-marker':'')});
   if(visibleFlags){
    g.append(svg('rect',{x:x-20,y:y+yOffset-11,width:40,height:23,rx:5,class:'marker-bg'}),svg('image',{href:flagUrl(code),x:x-16,y:y+yOffset-5,width:17,height:12,preserveAspectRatio:'xMidYMid meet'}),svg('text',{x:x+10,y:y+yOffset+5,'text-anchor':'middle',class:'marker-code'},code));
   }else g.append(svg('text',{x,y:y+yOffset+5,'text-anchor':'middle',class:'plain-code'},code));
   labelLayer.append(g);
  }
  legend.replaceChildren();
  const legends={
   regulation:[['effective','Application documentée'],['published','Texte publié'],['temporary','Mesure temporaire'],['pending','Évolution en préparation'],['territorial','Règle territoriale'],['historical','Autre repère national'],['eu-baseline','Socle UE seul']],
   similarities:[['similar-high','3+ concordances'],['similar-strong','2 concordances'],['similar-partial','1 concordance']],
   contests:[['mobilisation','Mobilisation'],['project','Projet'],['mixed','Projet et mobilisation'],['historical','Autre événement']],
   influences:[['rel-coordination','Coordination'],['rel-harmonisation','Harmonisation UE'],['rel-convergence','Convergence'],['rel-influence','Influence explicite']],
   radar:[['consultation','Consultation'],['announced','Annonce'],['pending','Signal émergent'],['temporary','Mesure temporaire'],['published','Autre dossier à suivre']]
  };
  for(const pair of legends[state.mode])legend.append(legendItem(...pair));
  legend.append(legendItem('empty','Aucun signal correspondant'));
  const note={regulation:'Les couleurs qualifient le stade et le périmètre des documents, pas la sévérité nationale des règles.',similarities:'Les traits ne prouvent pas une influence ; le nombre de critères renseignés figure dans la fiche.',contests:'Les points sont des repères nationaux, pas la localisation exacte des projets.',influences:'Les branches relient les pays à un cadre commun ; les pointillés indiquent une convergence, sans causalité.',radar:'Le stade affiché ne signifie pas que la consultation est toujours ouverte.'};
  legend.append(element('p',note[state.mode],'legend-note'));
 };
}
