import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const read=path=>readFile(new URL('../'+path,import.meta.url),'utf8');
const ids=['europe','world','usa'];
for(const [file,active,worldHref] of [['index.html','europe','./?view=world&amp;ui=20261126-3'],['usa.html','usa','./?view=world&amp;ui=20261126-3#US']]){
 const html=await read(file),nav=html.match(/<nav class="geographic-navigation"[\s\S]*?<\/nav>/)?.[0];
 assert(nav,file+' : navigation absente');
 assert(nav.includes('Périmètre géographique'));
 assert(html.includes('./css/geographic-views.css?v=20261126-3'));
 if(file==='usa.html')assert(html.includes('./css/us-atlas.css?v=20261126-3'));
 else assert(html.includes('./js/app.js?v=20261126-3'));
 const links=[...nav.matchAll(/<a id="view-(europe|world|usa)" href="([^"]+)"([^>]*)>/g)];
 assert.deepEqual(links.map(x=>x[1]),ids);
 assert.deepEqual(links.map(x=>x[2]),['./?ui=20261126-3',worldHref,'./usa.html?ui=20261126-3']);
 assert.deepEqual(links.filter(x=>x[3].includes('aria-current="page"')).map(x=>x[1]),[active]);
 for(const id of ids){const icon='geo/icons/'+id+'.svg';assert(nav.includes('./'+icon));assert((await read(icon)).includes('<svg'));}
 assert.equal((nav.match(/class="geo-icon"/g)||[]).length,3);
 assert(!nav.includes("geo-card-subtitle"));
 assert(!nav.includes("geo-nav-heading"));
 for(const label of ["Europe","Monde","États-Unis"])assert(nav.includes("<span>"+label+"</span>"));
}
const js=await read('js/app.js');
assert(js.indexOf("link.setAttribute('aria-current','page')")<js.indexOf('start(await loadAtlas(view))'));
// Exécuter le bloc de mise à jour réel dans un DOM minimal simulé :
const body=js.match(/function updateGeographicLinks\(\)\{([\s\S]*?)\n  \}/)?.[1];
assert(body,'fonction de navigation absente');
const links={
 'view-europe':{href:'https://example.org/atlas/?ui=20261126-3'},
 'view-world':{href:'https://example.org/atlas/?view=world&ui=20261126-3'}
};
const update=new Function('get','state','atlas',body);
const atlas={allCountries:new Map([['FR',{europe:true}],['US',{europe:false}]])};
for(const country of ['FR','US','']){
 update(id=>links[id],{country},atlas);
 const e=new URL(links['view-europe'].href),w=new URL(links['view-world'].href);
 assert.equal(e.searchParams.get('ui'),'20261126-3');
 assert.equal(w.searchParams.get('ui'),'20261126-3');
 assert.equal(e.searchParams.get('view'),null);
 assert.equal(w.searchParams.get('view'),'world');
 assert.equal(e.hash,country==='FR'?'#FR':'');
 assert.equal(w.hash,country?'#'+country:'');
}
assert(js.includes("new URL(get('view-world').href)"));
const css=await read('css/geographic-views.css');
assert(css.includes('.geographic-tabs{display:flex;'));
assert(css.includes('background:#dfeaf5'));
assert(!css.includes('.geo-card-title'));
assert(css.includes('a[aria-current=page]'));assert(css.includes('a:focus-visible'));
console.log('Navigation géographique · liens, état initial et ressources OK.');
