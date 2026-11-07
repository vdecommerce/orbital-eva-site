import {cp,mkdir,rm} from 'node:fs/promises';
import {build} from 'esbuild';
await rm('dist',{recursive:true,force:true});
await mkdir('dist/assets',{recursive:true});
await cp('src','dist',{recursive:true});
await build({entryPoints:['scene/Inspection.tsx'],bundle:true,minify:true,jsx:'automatic',outfile:'dist/assets/inspection.js',define:{'process.env.NODE_ENV':'"production"'},target:['chrome109','firefox115','safari16']});
await cp('scene/STAGESHOW-LICENSE','dist/assets/STAGESHOW-LICENSE.txt');
console.log('Static site and isolated Stageshow inspection demo built in dist/');
