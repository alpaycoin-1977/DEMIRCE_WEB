/**
 * ARAZİ — tarayıcıda canlı çizim.
 * Kullanım: <div class="land" data-seed="…" data-photo="…" …></div>
 *
 * Arazi her birkaç saniyede bir yeniden hesaplanır ve iki katman arasında
 * yavaşça geçiş yapılır ("nefes alma"). Böylece işlemciyi yormadan akış hissi
 * verilir. Hareketi azaltma tercihi olan ziyaretçilerde arazi durağandır.
 */
import { createNoise, sampleField, contours, levelsBetween, hashSeed } from '~/lib/land';

interface Cfg {
  seed: string;
  photo?: string;
  threshold: number;
  bias: number;
  biasCenter: number;
  biasY: number;
  ink: 'photo' | 'black' | 'none';
  scale: number;
  levels: number;
  dots: boolean;
  hair: number; // 0 = yok, değer = x konumu (0..1)
  breathe: boolean;
  cell: number;
}

/** Renkler CSS'ten gelir: --land-paper (zemin) ve --land-ink (mürekkep) */
const cssVar = (el: HTMLElement, name: string, fallback: string) => getComputedStyle(el).getPropertyValue(name).trim() || fallback;

function readCfg(el: HTMLElement): Cfg {
  const d = el.dataset;
  return {
    seed: d.seed || 'demirce',
    photo: d.photo || undefined,
    threshold: Number(d.threshold ?? 0.52),
    bias: Number(d.bias ?? 0),
    biasCenter: Number(d.biasCenter ?? 0.55),
    biasY: Number(d.biasY ?? 0),
    ink: (d.ink as Cfg['ink']) || (d.photo ? 'photo' : 'black'),
    scale: Number(d.scale ?? 2.2),
    levels: Number(d.levels ?? 30),
    dots: d.dots !== '0',
    hair: Number(d.hair ?? 0),
    breathe: d.breathe !== '0',
    cell: Number(d.cell ?? 9),
  };
}

export function mountLand(host: HTMLElement) {
  if (host.dataset.mounted) return;
  host.dataset.mounted = '1';
  const cfg = readCfg(host);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const noise = createNoise(hashSeed(cfg.seed));
  let t = (hashSeed(cfg.seed) % 997) / 50;

  const layers = [document.createElement('canvas'), document.createElement('canvas')];
  layers.forEach((c) => {
    c.className = 'land-layer';
    c.setAttribute('aria-hidden', 'true');
    host.append(c);
  });
  const mask = document.createElement('canvas');
  const ink = document.createElement('canvas');
  let photoCanvas: HTMLCanvasElement | null = null;
  let photoImg: HTMLImageElement | null = null;
  let W = 0;
  let H = 0;
  let dpr = 1;
  let front = 0;
  let paper = '#efeeea';
  let inkColor = '#0d0d0d';

  const preparePhoto = () => {
    if (!photoImg) return;
    photoCanvas = photoCanvas || document.createElement('canvas');
    photoCanvas.width = Math.round(W * dpr);
    photoCanvas.height = Math.round(H * dpr);
    const pc = photoCanvas.getContext('2d', { willReadFrequently: true })!;
    const iw = photoImg.naturalWidth;
    const ih = photoImg.naturalHeight;
    const s = Math.max(photoCanvas.width / iw, photoCanvas.height / ih);
    const dw = iw * s;
    const dh = ih * s;
    pc.drawImage(photoImg, (photoCanvas.width - dw) / 2, (photoCanvas.height - dh) / 2, dw, dh);
    // Siyah-beyaz + kontrast (tüm tarayıcılarda aynı sonuç için piksel düzeyinde)
    const img = pc.getImageData(0, 0, photoCanvas.width, photoCanvas.height);
    const px = img.data;
    for (let i = 0; i < px.length; i += 4) {
      let l = 0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2];
      l = (l - 128) * 1.2 + 122;
      l = l < 0 ? 0 : l > 255 ? 255 : l;
      px[i] = px[i + 1] = px[i + 2] = l;
    }
    pc.putImageData(img, 0, 0);
  };

  const size = () => {
    const r = host.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    paper = cssVar(host, '--land-paper', paper);
    inkColor = cssVar(host, '--land-ink', inkColor);
    W = Math.max(1, Math.round(r.width));
    H = Math.max(1, Math.round(r.height));
    for (const c of [...layers, ink]) {
      c.width = Math.round(W * dpr);
      c.height = Math.round(H * dpr);
    }
    preparePhoto();
  };

  const render = (target: HTMLCanvasElement) => {
    const ctx = target.getContext('2d')!;
    const cols = Math.max(8, Math.ceil(W / cfg.cell));
    const rows = Math.max(6, Math.ceil(H / cfg.cell));
    const field = sampleField(noise, cols, rows, { scale: cfg.scale, t, warp: 1.25, aspect: W / H });
    const fd = field.data;
    const R = cols + 1;
    if (cfg.bias || cfg.biasY)
      for (let k = 0; k < fd.length; k++) fd[k] += cfg.bias * ((k % R) / cols - cfg.biasCenter) + cfg.biasY * (((k / R) | 0) / rows - 0.5);
    const T = cfg.threshold;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    // Fotoğraflı arazi: fotoğraf her yerde tam görünür; eş yükselti eğrileri
    // yalnızca çizgi olarak üstünden geçer (aralarda kâğıt/beyazlık yok)
    const photoMode = cfg.ink === 'photo' && !!photoCanvas;
    if (photoMode) ctx.drawImage(photoCanvas!, 0, 0);
    else {
      ctx.fillStyle = paper;
      ctx.fillRect(0, 0, target.width, target.height);
    }

    // Mürekkep: alanın eşiği aşan bölgeleri (fotoğraf ya da siyah)
    if (!photoMode && cfg.ink !== 'none') {
      const mw = Math.ceil(W / 2);
      const mh = Math.ceil(H / 2);
      mask.width = mw;
      mask.height = mh;
      const mctx = mask.getContext('2d')!;
      const md = mctx.createImageData(mw, mh);
      const a = md.data;
      for (let y = 0; y < mh; y++) {
        const gy = (y / mh) * rows;
        const j = Math.min(rows - 1, gy | 0);
        const v = gy - j;
        for (let x = 0; x < mw; x++) {
          const gx = (x / mw) * cols;
          const i = Math.min(cols - 1, gx | 0);
          const u = gx - i;
          const f = (fd[j * R + i] * (1 - u) + fd[j * R + i + 1] * u) * (1 - v) + (fd[(j + 1) * R + i] * (1 - u) + fd[(j + 1) * R + i + 1] * u) * v;
          let al = (f - (T - 0.005)) / 0.01;
          al = al < 0 ? 0 : al > 1 ? 1 : al;
          a[(y * mw + x) * 4 + 3] = al * 255;
        }
      }
      mctx.putImageData(md, 0, 0);
      const ictx = ink.getContext('2d')!;
      ictx.globalCompositeOperation = 'source-over';
      ictx.clearRect(0, 0, ink.width, ink.height);
      if (cfg.ink === 'photo' && photoCanvas) ictx.drawImage(photoCanvas, 0, 0);
      else {
        ictx.fillStyle = inkColor;
        ictx.fillRect(0, 0, ink.width, ink.height);
      }
      ictx.globalCompositeOperation = 'destination-in';
      ictx.imageSmoothingQuality = 'high';
      ictx.drawImage(mask, 0, 0, ink.width, ink.height);
      ctx.drawImage(ink, 0, 0);
    }

    // Eş yükselti çizgileri, noktalar, ince çizgiler: "difference" ile
    // kâğıt üzerinde koyu, mürekkep üzerinde açık görünür
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = 'difference';
    ctx.strokeStyle = '#fff';
    ctx.fillStyle = '#fff';
    const lv = levelsBetween(0.2, 0.95, cfg.levels);
    const segs = contours(field, lv);
    const sx = W / cols;
    const sy = H / rows;
    segs.forEach((s, k) => {
      const major = k % 5 === 0;
      ctx.globalAlpha = photoMode ? (major ? 0.7 : 0.32) : major ? 0.85 : 0.45;
      ctx.lineWidth = major ? 0.9 : 0.55;
      ctx.beginPath();
      for (let q = 0; q < s.length; q += 4) {
        ctx.moveTo(s[q] * sx, s[q + 1] * sy);
        ctx.lineTo(s[q + 2] * sx, s[q + 3] * sy);
      }
      ctx.stroke();
    });
    if (cfg.dots && !photoMode) {
      ctx.globalAlpha = 0.85;
      for (let y = 8; y < H; y += 15) {
        for (let x = 8; x < W; x += 15) {
          const f = fd[Math.min(rows, Math.round(y / sy)) * R + Math.min(cols, Math.round(x / sx))];
          if (f > T - 0.13 && f < T - 0.02) ctx.fillRect(x, y, 1.15, 1.15);
        }
      }
    }
    if (cfg.hair) {
      ctx.globalAlpha = 0.8;
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      const hx = W * cfg.hair;
      for (let k = 0; k < 13; k++) {
        const x = hx + k * 5 + (k % 3) * 3;
        ctx.moveTo(x, H * (0.1 + ((k * 37) % 23) / 100));
        ctx.lineTo(x, H * (0.52 + ((k * 53) % 31) / 100));
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  };

  const draw = (first = false) => {
    if (first) {
      render(layers[front]);
      layers[front].classList.add('is-front');
      host.classList.add('is-ready');
      return;
    }
    t += 0.06;
    const back = 1 - front;
    render(layers[back]);
    layers[back].classList.add('is-front');
    layers[front].classList.remove('is-front');
    front = back;
  };

  let visible = false;
  let timer = 0;
  const loop = () => {
    window.clearTimeout(timer);
    if (!cfg.breathe || reduce) return;
    timer = window.setTimeout(() => {
      if (visible && !document.hidden) draw();
      loop();
    }, 4200);
  };

  const start = () => {
    size();
    draw(true);
    loop();
    let rt = 0;
    new ResizeObserver(() => {
      window.clearTimeout(rt);
      rt = window.setTimeout(() => {
        const r = host.getBoundingClientRect();
        if (Math.abs(r.width - W) < 2 && Math.abs(r.height - H) < 2) return;
        size();
        render(layers[front]);
      }, 200);
    }).observe(host);
  };
  new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(host);

  if (cfg.photo && cfg.ink === 'photo') {
    photoImg = new Image();
    photoImg.decoding = 'async';
    photoImg.onload = start;
    photoImg.onerror = () => {
      cfg.ink = 'black';
      start();
    };
    photoImg.src = cfg.photo;
  } else start();
}

/** Sayfadaki tüm araziler: görünür olmaya yaklaşınca çizilir */
export function mountAll() {
  const els = document.querySelectorAll<HTMLElement>('.land');
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          io.unobserve(e.target);
          mountLand(e.target as HTMLElement);
        }
      }),
    { rootMargin: '300px' },
  );
  els.forEach((el) => io.observe(el));
}
