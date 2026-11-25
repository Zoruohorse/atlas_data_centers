import {quarterLabel} from '../chronology.js';
import {article,button,countryName,countryLabel,element} from '../ui.js';
import {radarStages} from '../model.js';
export function renderEuropeanFeed(target,atlas,state,actions){
 const open=target.querySelector('.feed-disclosure')?.open??true;
 const expanded=new Set([...target.querySelectorAll('[data-record-id]')].filter(card=>card.querySelector('.document-disclosure')?.open).map(card=>card.dataset.recordId));
 const details=element('details','','feed-disclosure');details.open=open;
 const rows=atlas.filter({...state,eventType:''},[...atlas.data.regulations,...atlas.data.events]).slice(0,12);
 const heading=element('summary');heading.append(element('strong','Dernières évolutions '+(atlas.view==='world'?'mondiales':'européennes')),element('span',rows.length+' signaux · '+(state.cutoff?'jusqu’au '+quarterLabel(state.cutoff):'base actuelle'),'meta'));details.append(heading);
 const grid=element('div','','feed-grid');for(const r of rows){const card=article(atlas,r);card.querySelector('.document-disclosure').open=expanded.has(r.id);const location=element('div','','feed-country');if(r.scope==='eu')location.append(countryLabel('EU','Union européenne'));else if(r.countries.length===1)location.append(countryLabel(r.countries[0]));else location.textContent=r.countries.length+' pays européens';card.prepend(location);if(r.countries.length===1)card.append(button('Fiche pays',()=>{actions.country(r.countries[0],true,r.type?'events':radarStages.includes(r.stage)?'upcoming':'rules');document.getElementById('details').scrollIntoView({block:'start',behavior:'auto'});},'feed-country-link'));grid.append(card);}if(!rows.length)grid.append(element('p','Aucune évolution documentée.','muted'));details.append(grid);target.replaceChildren(details);
}