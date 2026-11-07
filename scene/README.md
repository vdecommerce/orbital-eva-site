# Orbital EVA inspection illustration

A small React island inside the existing static HTML website. `scripts/build.mjs`
bundles it locally with esbuild; the deployed page makes no CDN or font requests.
The rest of the website remains native HTML, CSS and JavaScript.

Stageshow by Benji Taylor, skill version 1.1.1, source revision
`299140fafd08df55a9c234e610c3f64af3f45531`:
https://github.com/benjitaylor/skills/tree/299140fafd08df55a9c234e610c3f64af3f45531/stageshow

Only the kit modules used by this scene are vendored under `kit/`, without edits.
The MIT license is in `STAGESHOW-LICENSE`. Upstream notices are retained in
`STAGESHOW-NOTICE.md`; the unrelated example assets mentioned there are not used.

Composition follows `panel-annotation`: one real scene image, a smaller panel,
one action and its result. Product-specific images, copy and geometry replace
the example checkout. No telemetry, gameplay recording or headset result is
implied. The motion is explanatory, with a once-only script, an explicit replay
button and a complete reduced-motion poster. The 350px compact layout fits a
390px page with 20px gutters; it is a separate composition.
