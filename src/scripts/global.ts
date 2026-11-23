import { currentTheme, setTheme, toast, fold, type Theme } from './ui';
import { getBoard, BOARD_EVENT } from './board';

/* ---------- Tema (açık → koyu → pafta) ---------- */
const themeBtn = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
if (themeBtn) {
  const labels = JSON.parse(themeBtn.dataset.labels || '{}') as Record<Theme, string>;
  const order: Theme[] = ['light', 'dark', 'blueprint'];
  const sync = () => (themeBtn.title = `${themeBtn.getAttribute('aria-label')}: ${labels[currentTheme()]}`);
  sync();
  themeBtn.addEventListener('click', () => {
    const next = order[(order.indexOf(currentTheme()) + 1) % order.length];
    const apply = () => setTheme(next);
    // View Transitions ile yumuşak tema geçişi
    if ('startViewTransition' in document && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      (document as any).startViewTransition(apply);
    } else apply();
    toast(labels[next]);
    sync();
  });
}

/* ---------- Başlık: aşağı kaydırınca gizle, yukarıda göster ---------- */
let lastY = scrollY;
let ticking = false;
addEventListener(
  'scroll',
  () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = scrollY;
      const hide = y > 200 && y > lastY + 4 && !document.querySelector('dialog[open]');
      const show = y < lastY - 4 || y < 200;
      if (hide) document.documentElement.classList.add('header-hidden');
      else if (show) document.documentElement.classList.remove('header-hidden');
      lastY = y;
      ticking = false;
    });
  },
  { passive: true },
);

/* ---------- Mobil menü ---------- */
const menu = document.querySelector<HTMLDialogElement>('#mobil-menu');
document.querySelector('[data-menu-open]')?.addEventListener('click', () => menu?.showModal());
document.querySelector('[data-menu-close]')?.addEventListener('click', () => menu?.close());
menu?.addEventListener('click', (e) => {
  if ((e.target as HTMLElement).closest('a')) menu.close();
});

/* ---------- Pano sayacı ---------- */
const badge = document.querySelector<HTMLElement>('[data-board-count]');
const syncBadge = () => {
  if (!badge) return;
  const n = getBoard().length;
  badge.textContent = String(n);
  badge.hidden = n === 0;
};
syncBadge();
addEventListener(BOARD_EVENT, syncBadge);
addEventListener('storage', (e) => e.key === 'demirce-board' && syncBadge());

/* ---------- Komut paleti (⌘K) ---------- */
type Item = { group: string; t: string; s?: string; u?: string; c?: string; run?: () => void };
const palette = document.querySelector<HTMLDialogElement>('[data-palette]');
const input = palette?.querySelector<HTMLInputElement>('[data-palette-input]');
const list = palette?.querySelector<HTMLUListElement>('[data-palette-list]');
if (palette && input && list) {
  const L = JSON.parse(palette.dataset.labels || '{}');
  const data = JSON.parse(document.getElementById('search-data')?.textContent || '{}');
  const items: Item[] = [
    ...data.projects.map((p: any) => ({ group: L.projects, ...p })),
    ...data.pages.map((p: any) => ({ group: L.pages, ...p })),
    ...data.posts.map((p: any) => ({ group: L.posts, ...p })),
    { group: L.actions, t: L.start, u: data.pages.find((p: any) => /fizibilite|feasibility/.test(p.u))?.u },
    { group: L.actions, t: L.light, run: () => setTheme('light') },
    { group: L.actions, t: L.dark, run: () => setTheme('dark') },
    { group: L.actions, t: L.blueprint, run: () => setTheme('blueprint') },
    { group: L.actions, t: L.lang, u: data.alt },
  ];
  let results: Item[] = [];
  let active = 0;

  const render = () => {
    const q = fold(input.value.trim());
    results = q
      ? items.filter((i) => fold(`${i.t} ${i.s ?? ''}`).includes(q))
      : items.filter((i) => i.group !== L.posts).slice(0, 24);
    active = Math.min(active, Math.max(results.length - 1, 0));
    list.innerHTML = '';
    if (!results.length) {
      const li = document.createElement('li');
      li.className = 'p-empty';
      li.textContent = L.empty;
      list.append(li);
      return;
    }
    let group = '';
    results.forEach((r, idx) => {
      if (r.group !== group) {
        group = r.group;
        const g = document.createElement('li');
        g.className = 'p-group';
        g.setAttribute('role', 'presentation');
        g.textContent = group;
        list.append(g);
      }
      const li = document.createElement('li');
      li.id = `p-opt-${idx}`;
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', String(idx === active));
      li.innerHTML = `<span class="sw" style="--c:${r.c ?? ''}"></span><span class="pt"></span><span class="ps"></span>`;
      li.querySelector('.pt')!.textContent = r.t;
      li.querySelector('.ps')!.textContent = r.s ?? '';
      li.addEventListener('mousemove', () => {
        if (active !== idx) {
          active = idx;
          highlight();
        }
      });
      li.addEventListener('click', () => choose(idx));
      list.append(li);
    });
    input.setAttribute('aria-activedescendant', `p-opt-${active}`);
  };
  const highlight = () => {
    list.querySelectorAll('[role="option"]').forEach((el) => el.setAttribute('aria-selected', String(el.id === `p-opt-${active}`)));
    input.setAttribute('aria-activedescendant', `p-opt-${active}`);
    list.querySelector(`#p-opt-${active}`)?.scrollIntoView({ block: 'nearest' });
  };
  const choose = (idx: number) => {
    const r = results[idx];
    if (!r) return;
    palette.close();
    if (r.run) r.run();
    else if (r.u) location.href = r.u;
  };
  const open = () => {
    input.value = '';
    active = 0;
    render();
    palette.showModal();
    input.focus();
  };
  input.addEventListener('input', () => {
    active = 0;
    render();
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      active = (active + 1) % Math.max(results.length, 1);
      highlight();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      active = (active - 1 + results.length) % Math.max(results.length, 1);
      highlight();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      choose(active);
    }
  });
  palette.addEventListener('click', (e) => {
    if (e.target === palette) palette.close();
  });
  document.querySelectorAll('[data-open-palette]').forEach((b) => b.addEventListener('click', open));
  addEventListener('keydown', (e) => {
    const typing = (e.target as HTMLElement)?.closest?.('input, textarea, select, [contenteditable]');
    if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      palette.open ? palette.close() : open();
    } else if (e.key === '/' && !typing && !palette.open) {
      e.preventDefault();
      open();
    }
  });
}

/* ---------- Paylaş düğmeleri ---------- */
document.querySelectorAll<HTMLButtonElement>('[data-share]').forEach((btn) =>
  btn.addEventListener('click', async () => {
    const data = { title: document.title, url: location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(location.href);
        toast(btn.dataset.copied || 'OK');
      }
    } catch {}
  }),
);

/* ---------- Service worker (çevrimdışı destek) ---------- */
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
}
