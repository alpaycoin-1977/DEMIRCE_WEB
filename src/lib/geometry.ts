/**
 * CEPHE GEOMETRİSİ — Fibonacci, altın oran (φ) ve Vitruvius.
 * Sitedeki tüm çizimler (altın spiral, düzenleyici çizgiler, cephe
 * kompozisyonları, insan silüetleri, ağaçlar) bu dosyadan üretilir.
 * Derleme anında çalışır; tarayıcıya yalnızca SVG gider.
 */
export const PHI = (1 + Math.sqrt(5)) / 2;
export const FIB = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

export function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
export function rng(seed: number | string) {
  let a = typeof seed === 'string' ? hash(seed) : seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const f = (n: number) => (Math.round(n * 10) / 10).toString();

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * Altın dikdörtgen bölünmesi: dikdörtgenden sırayla kare kesilir
 * (sol, üst, sağ, alt…). Her karede çeyrek yay → Fibonacci spirali.
 */
export function goldenSubdivision(w: number, h: number, levels = 9) {
  const squares: Rect[] = [];
  let r: Rect = { x: 0, y: 0, w, h };
  let d = w >= h ? 0 : 1;
  let path = '';
  for (let k = 0; k < levels; k++) {
    let sq: Rect;
    let p0: [number, number];
    let p1: [number, number];
    if (d === 0) {
      const s = r.h;
      sq = { x: r.x, y: r.y, w: s, h: s };
      r = { x: r.x + s, y: r.y, w: r.w - s, h: r.h };
      p0 = [sq.x, sq.y + s];
      p1 = [sq.x + s, sq.y];
    } else if (d === 1) {
      const s = r.w;
      sq = { x: r.x, y: r.y, w: s, h: s };
      r = { x: r.x, y: r.y + s, w: r.w, h: r.h - s };
      p0 = [sq.x, sq.y];
      p1 = [sq.x + s, sq.y + s];
    } else if (d === 2) {
      const s = r.h;
      sq = { x: r.x + r.w - s, y: r.y, w: s, h: s };
      r = { x: r.x, y: r.y, w: r.w - s, h: r.h };
      p0 = [sq.x + s, sq.y];
      p1 = [sq.x, sq.y + s];
    } else {
      const s = r.w;
      sq = { x: r.x, y: r.y + r.h - s, w: s, h: s };
      r = { x: r.x, y: r.y, w: r.w, h: r.h - s };
      p0 = [sq.x + s, sq.y + s];
      p1 = [sq.x, sq.y];
    }
    squares.push(sq);
    path += `${k === 0 ? `M${f(p0[0])} ${f(p0[1])}` : ''}A${f(sq.w)} ${f(sq.w)} 0 0 1 ${f(p1[0])} ${f(p1[1])}`;
    d = (d + 1) % 4;
  }
  // Spiralin gözü (kalan dikdörtgenin merkezi)
  const eye: [number, number] = [r.x + r.w / 2, r.y + r.h / 2];
  return { squares, spiral: path, eye, rest: r };
}

/** Spiralin gözünü (0..1) verir — pencereyi oraya yerleştirmek için */
export const spiralEye = (w: number, h: number) => {
  const { eye } = goldenSubdivision(w, h, 16);
  return [eye[0] / w, eye[1] / h] as const;
};

export type Fill = 'black' | 'grey' | 'hatch-v' | 'hatch-h' | 'void' | 'line';
export interface Cell extends Rect {
  fill: Fill;
}

/**
 * Cephe kompozisyonu: altın bölünmeden doğan kareler, φ oranında tekrar
 * bölünür; her parça siyah, taranmış ya da boş kalır. Tohum = sayfa adı.
 */
export function composition(seed: string, w: number, h: number, levels = 7, dense = 0.5): Cell[] {
  const r = rng(seed);
  const { squares } = goldenSubdivision(w, h, levels);
  const cells: Cell[] = [];
  const split = (c: Rect, depth: number, main = false) => {
    if (depth > 0 && c.w > w * 0.07 && r() < 0.72) {
      const t = r() < 0.5 ? 1 / PHI : 1 - 1 / PHI;
      if (c.w >= c.h ? r() < 0.75 : r() < 0.25) {
        split({ ...c, w: c.w * t }, depth - 1, main && t > 0.5);
        split({ ...c, x: c.x + c.w * t, w: c.w * (1 - t) }, depth - 1, main && t < 0.5);
      } else {
        split({ ...c, h: c.h * t }, depth - 1, main && t > 0.5);
        split({ ...c, y: c.y + c.h * t, h: c.h * (1 - t) }, depth - 1, main && t < 0.5);
      }
      return;
    }
    const q = main ? r() * dense * 0.95 : r();
    const fill: Fill = q < dense * 0.62 ? 'black' : q < dense * 0.8 ? 'grey' : q < dense * 0.9 + 0.06 ? (r() < 0.5 ? 'hatch-v' : 'hatch-h') : r() < 0.45 ? 'line' : 'void';
    cells.push({ ...c, fill });
  };
  squares.forEach((s, i) => split(s, i < 2 ? 2 : 1, i === 0));
  return cells;
}

/* ------------------------------------------------------------------ */
/* İNSAN SİLÜETİ — Vitruvius oranlarıyla (boy = kulaç, baş = boyun 1/8) */
/* ------------------------------------------------------------------ */
export interface Pose {
  /** derece: 0 = aşağı, + = sağa (+x), 180 = yukarı */
  armL: [number, number];
  armR: [number, number];
  legL: [number, number];
  legR: [number, number];
  lean?: number;
}
export const POSES: Record<string, Pose> = {
  stand: { armL: [-6, -2], armR: [6, 2], legL: [-3, 0], legR: [3, 0] },
  walk: { armL: [-18, -10], armR: [20, 34], legL: [-18, -38], legR: [20, 6], lean: 3 },
  stride: { armL: [24, 40], armR: [-22, -12], legL: [22, 4], legR: [-20, -34], lean: 4 },
  look: { armL: [-5, -2], armR: [22, 158], legL: [-4, 0], legR: [5, 0] },
  vitruvianA: { armL: [-90, -90], armR: [90, 90], legL: [-1, 0], legR: [1, 0] },
  vitruvianB: { armL: [-118, -118], armR: [118, 118], legL: [-15, -15], legR: [15, 15] },
};

/**
 * Silüet: incelen uzuvlar (kalça → diz → bilek), belde daralan gövde.
 * Döndürür: ayrı ayrı doldurulacak SVG yolları (birim: boy = H, zemin = y0 + H).
 */
export function figure(pose: Pose, H = 100, x0 = 0, y0 = 0, mirror = false): string[] {
  const m = mirror ? -1 : 1;
  const rad = (a: number) => (a * Math.PI) / 180;
  const ground = y0 + H;
  const lean = rad(pose.lean ?? 0) * m;
  const tx = (y: number) => x0 + Math.sin(lean) * (ground - y) * 0.5;
  const hipY = ground - H * 0.5;
  const shY = ground - H * 0.81;
  const out: string[] = [];
  const P = (pts: [number, number][]) => 'M' + pts.map((p) => `${f(p[0])} ${f(p[1])}`).join('L') + 'Z';
  const C = (x: number, y: number, r: number, ry = r) => `M${f(x - r)} ${f(y)}a${f(r)} ${f(ry)} 0 1 0 ${f(2 * r)} 0a${f(r)} ${f(ry)} 0 1 0 ${f(-2 * r)} 0Z`;
  const at = (px: number, py: number, len: number, a: number): [number, number] => [px + Math.sin(rad(a)) * len * m, py + Math.cos(rad(a)) * len];
  const limb = (A: [number, number], a: [number, number], l1: number, l2: number, w: [number, number, number], foot = false) => {
    const B = at(A[0], A[1], l1, a[0]);
    const Cc = at(B[0], B[1], l2, a[1]);
    const n = (p: [number, number], q: [number, number]) => {
      const dx = q[0] - p[0];
      const dy = q[1] - p[1];
      const l = Math.hypot(dx, dy) || 1;
      return [-dy / l, dx / l] as [number, number];
    };
    const n1 = n(A, B);
    const n2 = n(B, Cc);
    const nb: [number, number] = [(n1[0] + n2[0]) / 2, (n1[1] + n2[1]) / 2];
    const o = (p: [number, number], v: [number, number], w: number, s: number): [number, number] => [p[0] + (v[0] * w * s) / 2, p[1] + (v[1] * w * s) / 2];
    out.push(P([o(A, n1, w[0], 1), o(B, nb, w[1], 1), o(Cc, n2, w[2], 1), o(Cc, n2, w[2], -1), o(B, nb, w[1], -1), o(A, n1, w[0], -1)]));
    out.push(C(B[0], B[1], w[1] / 2), C(Cc[0], Cc[1], w[2] / 2));
    if (foot) out.push(P([[Cc[0] - H * 0.012 * m, Cc[1] - H * 0.012], [Cc[0] + H * 0.05 * m, Cc[1] + H * 0.004], [Cc[0] + H * 0.05 * m, Cc[1] + H * 0.016], [Cc[0] - H * 0.016 * m, Cc[1] + H * 0.016]]));
    else out.push(C(Cc[0], Cc[1], H * 0.017, H * 0.022));
  };
  // Bacaklar (arkadaki önce)
  limb([tx(hipY) - H * 0.042 * m, hipY], pose.legL, H * 0.245, H * 0.235, [H * 0.078, H * 0.048, H * 0.03], true);
  limb([tx(hipY) + H * 0.042 * m, hipY], pose.legR, H * 0.245, H * 0.235, [H * 0.078, H * 0.048, H * 0.03], true);
  // Gövde: omuz → bel → kalça
  const sx = tx(shY);
  const wy = ground - H * 0.62;
  const wx = tx(wy);
  out.push(P([
    [sx - H * 0.098, shY + H * 0.008],
    [sx - H * 0.07, shY - H * 0.012],
    [sx + H * 0.07, shY - H * 0.012],
    [sx + H * 0.098, shY + H * 0.008],
    [wx + H * 0.064, wy],
    [tx(hipY) + H * 0.085, hipY + H * 0.03],
    [tx(hipY) - H * 0.085, hipY + H * 0.03],
    [wx - H * 0.064, wy],
  ]));
  // Kollar
  limb([sx - H * 0.09 * m, shY + H * 0.018], pose.armL, H * 0.17, H * 0.165, [H * 0.05, H * 0.034, H * 0.024]);
  limb([sx + H * 0.09 * m, shY + H * 0.018], pose.armR, H * 0.17, H * 0.165, [H * 0.05, H * 0.034, H * 0.024]);
  // Boyun ve baş
  const hx = tx(ground - H * 0.9);
  out.push(P([[sx - H * 0.022, shY], [hx - H * 0.02, ground - H * 0.885], [hx + H * 0.02, ground - H * 0.885], [sx + H * 0.022, shY]]));
  out.push(C(hx, ground - H * 0.935, H * 0.05, H * 0.062));
  return out;
}

/* ------------------------------------------------------------------ */
/* AĞAÇ — fıstık çamı karakterinde, tohumlu, üretken                    */
/* ------------------------------------------------------------------ */
export function tree(seed: string, W = 600, H = 1000) {
  const r = rng(seed);
  const parts: string[] = [];
  const dots: string[] = [];
  const poly = (pts: [number, number][]) => 'M' + pts.map((p) => `${f(p[0])} ${f(p[1])}`).join('L') + 'Z';
  // Gövde: hafifçe kıvrılan omurga
  const baseX = W * (0.42 + r() * 0.16);
  const topY = H * (0.1 + r() * 0.08);
  const bend = (r() - 0.5) * W * 0.32;
  const N = 28;
  const spine: [number, number][] = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const x = baseX + bend * Math.sin(t * Math.PI * 0.9) + Math.sin(t * 9 + r()) * W * 0.008;
    spine.push([x, H - t * (H - topY)]);
  }
  const w0 = W * 0.032;
  const w1 = W * 0.006;
  const left: [number, number][] = [];
  const right: [number, number][] = [];
  spine.forEach(([x, y], i) => {
    const t = i / N;
    const w = w0 + (w1 - w0) * Math.pow(t, 0.8) + (r() - 0.5) * W * 0.003;
    left.push([x - w, y]);
    right.unshift([x + w, y]);
  });
  parts.push(poly([...left, ...right]));
  // Yaprak kümesi (çam yastığı): yatay, yassı nokta bulutu
  const pad = (cx: number, cy: number, rw: number, rh: number) => {
    const n = Math.round(rw * rh * 0.06) + 30;
    for (let k = 0; k < n; k++) {
      const a = r() * Math.PI * 2;
      const d = Math.sqrt(r());
      const x = cx + Math.cos(a) * rw * d;
      const y = cy + Math.sin(a) * rh * d * (Math.sin(a) > 0 ? 0.55 : 1);
      const s = W * (0.003 + r() * 0.009) * (1.15 - d * 0.5);
      dots.push(`M${f(x - s)} ${f(y)}a${f(s)} ${f(s * 0.8)} 0 1 0 ${f(2 * s)} 0a${f(s)} ${f(s * 0.8)} 0 1 0 ${f(-2 * s)} 0`);
    }
  };
  // Dallar: gövdenin üst yarısından
  const nb = 4 + Math.floor(r() * 4);
  for (let b = 0; b < nb; b++) {
    const t = 0.5 + (b / nb) * 0.46 + r() * 0.04;
    const i = Math.min(N, Math.round(t * N));
    const [sx, sy] = spine[i];
    const side = b % 2 ? 1 : -1;
    const len = W * (0.12 + r() * 0.22) * (1.1 - t * 0.5);
    const ex = sx + side * len;
    const ey = sy - len * (0.15 + r() * 0.35);
    const mx = (sx + ex) / 2;
    const my = Math.min(sy, ey) + (r() - 0.6) * W * 0.04;
    const bw = W * 0.008 * (1.2 - t * 0.6);
    parts.push(poly([
      [sx, sy - bw],
      [mx, my - bw * 0.7],
      [ex, ey - bw * 0.3],
      [ex, ey + bw * 0.3],
      [mx, my + bw * 0.7],
      [sx, sy + bw * 1.6],
    ]));
    pad(ex, ey - W * 0.015, W * (0.07 + r() * 0.07), W * (0.035 + r() * 0.03));
    if (r() < 0.6) pad(mx, my - W * 0.012, W * (0.04 + r() * 0.04), W * 0.025);
  }
  pad(spine[N][0], topY - W * 0.01, W * (0.1 + r() * 0.08), W * 0.05);
  return { trunk: parts.join(''), leaves: dots.join('') };
}
