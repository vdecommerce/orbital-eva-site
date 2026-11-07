const root = document.documentElement;
try { const saved = localStorage.getItem('orbital-theme'); if (saved === 'light' || saved === 'dark') root.dataset.theme = saved; } catch {}
document.querySelector('.theme-button').addEventListener('click', () => {
  const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = dark ? 'light' : 'dark';
  try { localStorage.setItem('orbital-theme',root.dataset.theme); } catch {}
});
const tabs = [...document.querySelectorAll('[role=tab]')];
function select(tab, focus = false) {
  for (const t of tabs) { const active = t === tab; t.setAttribute('aria-selected',String(active)); t.tabIndex = active ? 0 : -1; document.getElementById(t.getAttribute('aria-controls')).hidden = !active; }
  if (focus) tab.focus();
}
tabs.forEach((tab,index) => {
  tab.addEventListener('click',()=>select(tab));
  tab.addEventListener('keydown',e => {
    let next;
    if (e.key === 'ArrowRight') next = (index+1)%tabs.length;
    if (e.key === 'ArrowLeft') next = (index+tabs.length-1)%tabs.length;
    if (e.key === 'Home') next=0;
    if (e.key === 'End') next=tabs.length-1;
    if (next !== undefined) { e.preventDefault(); select(tabs[next],true); }
  });
});
const dialog = document.getElementById('image-dialog');
let opener;
document.querySelectorAll('[data-full]').forEach(button => button.addEventListener('click',()=> {
  opener=button; dialog.querySelector('img').src=button.dataset.full; dialog.showModal();
}));
dialog.querySelector('button').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
dialog.addEventListener('close',()=>opener?.focus());

// Load the explanatory scene near its section instead of blocking the hero.
const inspectionHost = document.getElementById('inspection-stage');
let inspectionLoaded = false;
function loadInspection() {
  if (inspectionLoaded || !inspectionHost) return;
  inspectionLoaded = true;
  const css = document.createElement('link');
  css.rel = 'stylesheet'; css.href = 'assets/inspection.css';
  document.head.append(css);
  const scene = document.createElement('script');
  scene.src = 'assets/inspection.js'; scene.defer = true;
  document.head.append(scene);
}
if (inspectionHost) {
  if (typeof IntersectionObserver !== 'undefined') {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { loadInspection(); observer.disconnect(); }
    }, { rootMargin: '600px' });
    observer.observe(inspectionHost);
  } else loadInspection();
}
