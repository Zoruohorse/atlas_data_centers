import {article,button,countryName,countryLabel,element} from '../ui.js';
import {radarStages} from '../model.js';
export function renderEuropeanFeed(target,atlas,state,actions){
 const open=target.querySelector('details')?.open??true,details=element('details','','feed-disclosure');details.open=open;
 const rows=atlas.filter({...state,eventType:''},[...atlas.data.regulations,...atlas.data.events]).slice(0,12);
 const heading=element('summary');heading.append(element('strong','Dernières évolutions européennes'),element('span',rows.length+' signaux · '+(state.year||'base actuelle'),'meta'));details.append(heading);
 const grid=element('div','','feed-grid');for(const r of rows){const card=article(atlas,r);const location=element('div','','feed-country');if(r.scope==='eu')location.append(countryLabel('EU','Union européenne'));else if(r.countries.length===1)location.append(countryLabel(r.countries[0]));else location.textContent=r.countries.length+' pays européens';card.prepend(location);if(r.countries.length===1)card.append(button('Ouvrir la fiche',()=>actions.country(r.countries[0],true,r.type?'events':radarStages.includes(r.stage)?'upcoming':'rules')));grid.append(card);}if(!rows.length)grid.append(element('p','Aucune évolution documentée.','muted'));details.append(grid);target.replaceChildren(details);
}