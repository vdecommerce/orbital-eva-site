import {readFile,access} from 'node:fs/promises';
const html=await readFile('src/index.html','utf8');const failures=[];
for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)){
 const ref=match[1];if(/^(https?:|mailto:)/.test(ref))continue;
 try{await access('src/'+ref.split('#')[0])}catch{failures.push('Missing '+ref)}
}
for(const match of html.matchAll(/href="#([^"]+)"/g))if(!html.includes('id="'+match[1]+'"'))failures.push('Broken anchor '+match[1]);
for(const match of html.matchAll(/<img\b[^>]*>/g))if(!/\balt=/.test(match[0]))failures.push('Image without alt text');
for(const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g))try{JSON.parse(match[1])}catch{failures.push('Invalid JSON-LD')}
if(!html.includes('lang="nl"'))failures.push('Missing Dutch language');
if(html.includes('—'))failures.push('Unexpected em dash');
if(failures.length){console.error(failures.join('\n'));process.exit(1)}
console.log('Asset references, anchors, image alternatives and JSON-LD passed');
