import { createRoot } from 'react-dom/client'
import { Stage } from './kit/stage'
import { Text } from './kit/window'
import { Button } from './kit/controls/Button'
import { Badge } from './kit/controls/Badge'
import { Roll } from './kit/motion/Roll'
import type { Act } from './kit/act'
import './inspection.css'

// Based on Stageshow's panel-annotation composition: actual scene imagery is
// the focal object, one smaller inspection panel explains a single action.
// This is explanatory UI, never a claim of recorded gameplay or live values.
type State = { phase: number }
const initial = { phase: 0 }
const poster = { phase: 3 }
const labels = ['Benader de luchtsluis', 'Rem rustig af', 'Inspectie uitvoeren', 'Controlepunt afgerond']
async function inspect(a: Act<State>) {
  await a.wait(1800)
  a.mark('approach')
  a.put({phase: 1})
  await a.wait(2100)
  a.mark('inspect')
  await a.click({at: 'inspect'})
  a.put({phase: 2})
  await a.wait(2300)
  a.mark('complete')
  a.put({phase: 3})
  await a.move({at: 'inspect', x: .6, y: 1.8})
  await a.wait(1800)
}
function Inspection() {
  return <Stage width={600} height={460} compact={{below: 560, width:350, height:400}}
    theme="dark" accent="#b8dedb" fidelity="realistic" initial={window.matchMedia('(prefers-reduced-motion: reduce)').matches ? poster : initial} poster={poster}
    play="once" script={inspect} className="eva-scene" cursor={{at:{wide:{x:500,y:85},compact:{x:280,y:60}}}}
    tokens={{'--ss-font':'Arial, sans-serif','--ss-radius-md':'12px','--ss-accent-ink':'#102422'}}>
    {(s) => <>
      <img className="eva-scene-image" src="assets/airlock-detail.webp" width="2400" height="1350" alt="Luchtsluis uit het Unreal-project, met een illustratieve inspectiemarker" />
      <div className="eva-scene-vignette" />
      <div className="eva-scene-marker" data-done={s.phase === 3 || undefined} aria-hidden="true"><span /></div>
      <section className="eva-inspection-panel" data-target="panel">
        <div className="eva-panel-top"><Text className="eva-panel-label">Luchtsluis</Text><Badge tone="accent">Controlepunt 01</Badge></div>
        <Text className="eva-panel-title"><Roll variant="fade">{labels[s.phase]}</Roll></Text>
        <div className="eva-panel-bottom">
          <Button variant="primary" size="large" data-target="inspect">{s.phase === 3 ? 'Gecontroleerd' : s.phase === 2 ? 'Controleren…' : 'Inspecteren'}</Button>
        </div>
      </section>
    </>}
  </Stage>
}
const host = document.getElementById('inspection-stage')
if (host) {
  const root = createRoot(host)
  let run = 0
  const render = () => root.render(<Inspection key={run++} />)
  render()
  document.querySelector('.demo-replay')?.addEventListener('click', render)
}
