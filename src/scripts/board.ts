/** İlham panosu (moodboard) — tarayıcıda (localStorage) saklanır, sunucuya gönderilmez. */
const KEY = 'demirce-board';
export const BOARD_EVENT = 'board:change';

export function getBoard(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(v) ? v.filter((x) => typeof x === 'string') : [];
  } catch {
    return [];
  }
}
export function setBoard(ids: string[]) {
  const uniq = [...new Set(ids)].slice(0, 60);
  try {
    localStorage.setItem(KEY, JSON.stringify(uniq));
  } catch {}
  window.dispatchEvent(new CustomEvent(BOARD_EVENT, { detail: uniq }));
}
export const hasInBoard = (id: string) => getBoard().includes(id);
export function toggleBoard(id: string): boolean {
  const b = getBoard();
  const i = b.indexOf(id);
  if (i >= 0) b.splice(i, 1);
  else b.unshift(id);
  setBoard(b);
  return i < 0;
}
