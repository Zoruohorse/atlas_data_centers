import {article,button,countryName,element} from '../ui.js';
import {radarStages} from '../model.js';
export function renderEuropeanFeed(target,atlas,state,actions){
 const open=target.querySelector('details')?.open??true,details=element('details','','feed-disclosure');details.open=open;
 const rows=atlas.filter({...state,eventType:''},[...atlas.data.regulations,...atlas.data.events]).slice(0,12);
 const heading=element('summary');heading.append(element('strong','Dernières évolutions européennes'),element('span',rows.length+' signaux · '+(state.year||'base actuelle'),'meta'));details.append(heading);
 const grid=element('div','','feed-grid');for(const r of rows){const card=article(atlas,r);card.prepend(element('div',r.scope==='eu'?'Union européenne':r.countries.map(countryName).join(' · '),'feed-country'));if(r.countries.length===1)card.append(button('Ouvrir la fiche',()=>actions.country(r.countries[0],true,r.type?'events':radarStages.includes(r.stage)?'upcoming':'rules')));grid.append(card);}if(!rows.length)grid.append(element('p','Aucune évolution documentée.','muted'));details.append(grid);target.replaceChildren(details);
}