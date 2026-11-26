import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const read=path=>readFile(new URL('../'+path,import.meta.url),'utf8');
const ids=['europe','world','usa'];
for(const [file,active,worldHref] of [['index.html','europe','?view=world'],['usa.html','usa','./?view=world#US']]){
 const html=await read(file),nav=html.match(/<nav class="geographic-navigation"[\s\S]*?<\/nav>/)?.[0];
 assert(nav,file+' : navigation absente');
 assert(nav.includes('Échelle de la carte'));
 const links=[...nav.matchAll(/<a id="view-(europe|world|usa)" href="([^"]+)"([^>]*)>/g)];
 assert.deepEqual(links.map(x=>x[1]),ids);
 assert.deepEqual(links.map(x=>x[2]),['./',worldHref,'./usa.html']);
 assert.deepEqual(links.filter(x=>x[3].includes('aria-current="page"')).map(x=>x[1]),[active]);
 for(const id of ids){const icon='geo/icons/'+id+'.svg';assert(nav.includes('./'+icon));assert((await read(icon)).includes('<svg'));}
 assert.equal((nav.match(/class="geo-card-title"/g)||[]).length,3);
 assert.equal((nav.match(/class="geo-active-label"/g)||[]).length,3);
}
const js=await read('js/app.js');
assert(js.indexOf("link.setAttribute('aria-current','page')")<js.indexOf('start(await loadAtlas(view))'));
const css=await read('css/geographic-views.css');
assert(css.includes('grid-template-columns:repeat(3,minmax(0,1fr))'));
assert(css.includes('a[aria-current=page]'));assert(css.includes('a:focus-visible'));
console.log('Navigation géographique · liens, état initial et ressources OK.');
