import {cp,mkdir} from 'node:fs/promises';
await mkdir('docs',{recursive:true});await cp('dist','docs',{recursive:true});
console.log('GitHub Pages snapshot prepared in docs/');
