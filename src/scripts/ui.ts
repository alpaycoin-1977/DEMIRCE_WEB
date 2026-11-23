/** Ortak istemci yardımcıları */
export function toast(message: string, ms = 2600) {
  const region = document.querySelector<HTMLElement>('[data-toasts]');
  if (!region) return;
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = message;
  region.append(el);
  setTimeout(() => el.remove(), ms);
}

export const lang = () => (document.documentElement.lang === 'en' ? 'en' : 'tr') as 'tr' | 'en';

export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export type Theme = 'light' | 'dark' | 'blueprint';
export function currentTheme(): Theme {
  const t = document.documentElement.dataset.theme as Theme | undefined;
  if (t) return t;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem('demirce-theme', theme);
  } catch {}
  window.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
}

export const fold = (s: string) =>
  s
    .toLocaleLowerCase('tr')
    .replace(/ı/g, 'i')
    .replace(/ş/g, 's')
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
