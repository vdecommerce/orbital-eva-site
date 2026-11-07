import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {parseHTML} from 'linkedom';
const html=await readFile(new URL('../src/index.html',import.meta.url),'utf8');
const code=await readFile(new URL('../src/app.js',import.meta.url),'utf8');
function setup(stored=null){
 const {document,window}=parseHTML(html);const saved=new Map(stored?[['orbital-theme',stored]]:[]);
 const dialog=document.getElementById('image-dialog');
 dialog.showModal=()=>dialog.setAttribute('open','');
 dialog.close=()=>{dialog.removeAttribute('open');dialog.dispatchEvent(new window.Event('close'))};
 vm.runInNewContext(code,{document,matchMedia:()=>({matches:true}),localStorage:{getItem:k=>saved.get(k),setItem:(k,v)=>saved.set(k,v)}});
 return {document,window,saved};
}
test('destination clicks update selection and visibility',()=>{
 const {document,window}=setup();document.getElementById('tab-mars').dispatchEvent(new window.Event('click'));
 assert.equal(document.getElementById('tab-mars').getAttribute('aria-selected'),'true');
 assert.equal(document.getElementById('tab-earth').getAttribute('aria-selected'),'false');
 assert.equal(document.getElementById('panel-earth').hidden,true);assert.equal(document.getElementById('panel-mars').hidden,false);
});
test('arrow and Home keys select the matching destination',()=>{
 const {document,window}=setup();const earth=document.getElementById('tab-earth'),mars=document.getElementById('tab-mars');
 const event=new window.Event('keydown');event.key='ArrowRight';earth.dispatchEvent(event);
 assert.equal(mars.getAttribute('aria-selected'),'true');assert.equal(earth.tabIndex,-1);
 const home=new window.Event('keydown');home.key='Home';mars.dispatchEvent(home);
 assert.equal(earth.getAttribute('aria-selected'),'true');assert.equal(mars.tabIndex,-1);
});
test('detail image opens, closes and restores focus',()=>{
 const {document,window}=setup();const opener=document.querySelector('[data-full]');let focused=false;opener.focus=()=>{focused=true};
 opener.dispatchEvent(new window.Event('click'));const dialog=document.getElementById('image-dialog');assert.ok(dialog.hasAttribute('open'));
 assert.equal(dialog.querySelector('img').getAttribute('src'),opener.getAttribute('data-full'));
 dialog.querySelector('button').dispatchEvent(new window.Event('click'));assert.equal(dialog.hasAttribute('open'),false);assert.equal(focused,true);
});
test('theme changes are persisted and recovered',()=>{
 const {document,window,saved}=setup();document.querySelector('.theme-button').dispatchEvent(new window.Event('click'));
 assert.equal(document.documentElement.dataset.theme,'light');assert.equal(saved.get('orbital-theme'),'light');
 assert.equal(setup('light').document.documentElement.dataset.theme,'light');
});
