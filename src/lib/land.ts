/**
 * ARAZİ — üretken topoğrafya motoru.
 *
 * Her çalışmanın adından (seed) türeyen, kendine özgü bir "arazi" üretir:
 * akışkan bir yükseklik alanı (domain-warped fBm gürültüsü) ve ondan çıkarılan
 * eş yükselti çizgileri (marching squares). Hem derlemede (statik SVG) hem
 * tarayıcıda (canlı canvas) aynı kod kullanılır.
 */

/** Metinden 32 bit tohum */
export function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Tohumlu 3B değer gürültüsü (yumuşak, 0..1) */
export function createNoise(seed: number) {
  const rnd = mulberry32(seed);
  const perm = new Uint8Array(512);
  const vals = new Float32Array(256);
  const p = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  for (let i = 0; i < 256; i++) vals[i] = rnd();
  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const v = (x: number, y: number, z: number) => vals[perm[perm[perm[x & 255] + (y & 255)] + (z & 255)]];
  const noise3 = (x: number, y: number, z: number) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const zi = Math.floor(z);
    const xf = x - xi;
    const yf = y - yi;
    const zf = z - zi;
    const u = fade(xf);
    const w = fade(yf);
    const s = fade(zf);
    const x0 = lerp(lerp(v(xi, yi, zi), v(xi + 1, yi, zi), u), lerp(v(xi, yi + 1, zi), v(xi + 1, yi + 1, zi), u), w);
    const x1 = lerp(lerp(v(xi, yi, zi + 1), v(xi + 1, yi, zi + 1), u), lerp(v(xi, yi + 1, zi + 1), v(xi + 1, yi + 1, zi + 1), u), w);
    return lerp(x0, x1, s);
  };
  const fbm = (x: number, y: number, z: number, oct = 4) => {
    let a = 0.5;
    let f = 1;
    let sum = 0;
    let norm = 0;
    for (let o = 0; o < oct; o++) {
      sum += a * noise3(x * f, y * f, z + o * 17.3);
      norm += a;
      a *= 0.5;
      f *= 2.03;
    }
    return sum / norm;
  };
  return { noise3, fbm };
}

export interface Field {
  cols: number;
  rows: number;
  data: Float32Array;
}

/**
 * Yükseklik alanı: alan bükmeli (domain warp) fBm. Değerler ~0..1.
 * scale: arazinin ölçeği (küçük = geniş formlar), t: zaman (akış)
 */
export function sampleField(noise: ReturnType<typeof createNoise>, cols: number, rows: number, opts: { scale?: number; t?: number; warp?: number; aspect?: number } = {}): Field {
  const { scale = 2.4, t = 0, warp = 1.15, aspect = cols / rows } = opts;
  const data = new Float32Array((cols + 1) * (rows + 1));
  for (let j = 0; j <= rows; j++) {
    for (let i = 0; i <= cols; i++) {
      const x = (i / cols) * scale * aspect;
      const y = (j / rows) * scale;
      const qx = noise.fbm(x + 1.7, y + 9.2, t * 0.6, 3);
      const qy = noise.fbm(x + 8.3, y + 2.8, t * 0.6 + 3.1, 3);
      data[j * (cols + 1) + i] = noise.fbm(x + warp * qx * 2.2, y + warp * qy * 2.2, t, 4);
    }
  }
  return { cols, rows, data };
}

/** Eş yükselti çizgileri: [x1,y1,x2,y2,...] (birim: hücre) */
export function contours(field: Field, levels: number[]): Float32Array[] {
  const { cols, rows, data } = field;
  const W = cols + 1;
  const out: Float32Array[] = [];
  for (const lv of levels) {
    const segs: number[] = [];
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const a = data[j * W + i];
        const b = data[j * W + i + 1];
        const c = data[(j + 1) * W + i + 1];
        const d = data[(j + 1) * W + i];
        let idx = 0;
        if (a > lv) idx |= 8;
        if (b > lv) idx |= 4;
        if (c > lv) idx |= 2;
        if (d > lv) idx |= 1;
        if (idx === 0 || idx === 15) continue;
        const top = () => [i + (lv - a) / (b - a), j];
        const right = () => [i + 1, j + (lv - b) / (c - b)];
        const bottom = () => [i + (lv - d) / (c - d), j + 1];
        const left = () => [i, j + (lv - a) / (d - a)];
        const push = (p: number[], q: number[]) => segs.push(p[0], p[1], q[0], q[1]);
        switch (idx) {
          case 1: case 14: push(left(), bottom()); break;
          case 2: case 13: push(bottom(), right()); break;
          case 3: case 12: push(left(), right()); break;
          case 4: case 11: push(top(), right()); break;
          case 5: push(left(), top()); push(bottom(), right()); break;
          case 10: push(left(), bottom()); push(top(), right()); break;
          case 6: case 9: push(top(), bottom()); break;
          case 7: case 8: push(left(), top()); break;
        }
      }
    }
    out.push(new Float32Array(segs));
  }
  return out;
}

/** Eşit aralıklı seviyeler */
export const levelsBetween = (lo: number, hi: number, n: number) => Array.from({ length: n }, (_, k) => lo + ((hi - lo) * (k + 0.5)) / n);

/** Derleme anında statik SVG yolu (hücre → piksel ölçeği) */
export function segmentsToPath(segs: Float32Array, sx: number, sy: number, digits = 1): string {
  const f = (n: number) => n.toFixed(digits);
  let d = '';
  for (let k = 0; k < segs.length; k += 4) d += `M${f(segs[k] * sx)} ${f(segs[k + 1] * sy)}L${f(segs[k + 2] * sx)} ${f(segs[k + 3] * sy)}`;
  return d;
}
