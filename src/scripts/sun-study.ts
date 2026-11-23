/**
 * Güneş çalışması — Three.js sahnesi.
 * Koordinat sistemi: +x = doğu, -z = kuzey, +y = yukarı. Birim: metre.
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { sunPosition, compassBearing, localToDate, sunTimes, fmtHour } from '~/lib/sun';
import { currentTheme, prefersReducedMotion, type Theme } from './ui';

type Palette = { day: string; golden: string; twilight: string; night: string; ground: string; model: string; edge: string; edgeOpacity: number; path: string };
const PALETTES: Record<Theme, Palette> = {
  light: { day: '#e1e7ea', golden: '#f1b58c', twilight: '#3b3a62', night: '#0b1022', ground: '#ebe8e1', model: '#f8f6f1', edge: '#151515', edgeOpacity: 0.34, path: '#e42382' },
  dark: { day: '#2b3239', golden: '#8a5a45', twilight: '#25244a', night: '#07090f', ground: '#1d1e1f', model: '#d9d6cf', edge: '#000000', edgeOpacity: 0.5, path: '#ff3d97' },
  blueprint: { day: '#0e3a75', golden: '#0e3a75', twilight: '#0c3268', night: '#0a2a58', ground: '#0e3a75', model: '#164a8c', edge: '#eaf3ff', edgeOpacity: 0.9, path: '#ffd54a' },
};

const deg = Math.PI / 180;

export function initSunStudy(root: HTMLElement) {
  const host = root.querySelector<HTMLElement>('[data-sun-canvas]')!;
  const L = JSON.parse(root.dataset.labels || '{}');
  const lat = Number(root.dataset.lat);
  const lon = Number(root.dataset.lon);
  const offset = Number(root.dataset.offset);
  const reduced = prefersReducedMotion();
  const small = matchMedia('(max-width: 760px)').matches;

  // WebGL desteği
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
  } catch {
    root.querySelector('[data-sun-hint]')!.textContent = L.noWebgl;
    return;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, small ? 1.5 : 1.75));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMappingExposure = 1.18;
  host.append(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(small ? 40 : 30, 1, 1, 2000);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 12, 0);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.minPolarAngle = 25 * deg;
  controls.maxPolarAngle = 78 * deg;
  controls.autoRotate = !reduced;
  controls.autoRotateSpeed = 0.35;
  // Sahne sağa yaslı: metin solda kalsın
  const camDist = small ? 330 : 300;
  camera.position.setFromSphericalCoords(camDist, 60 * deg, 35 * deg);
  camera.position.add(controls.target);

  /* ---------- Malzemeler ---------- */
  let pal = PALETTES[currentTheme()];
  const modelMat = new THREE.MeshStandardMaterial({ color: pal.model, roughness: 0.92, metalness: 0 });
  const groundMat = new THREE.MeshStandardMaterial({ color: pal.ground, roughness: 1 });
  const plateMat = new THREE.MeshStandardMaterial({ color: pal.model, roughness: 0.95 });
  const edgeMat = new THREE.LineBasicMaterial({ color: pal.edge, transparent: true, opacity: pal.edgeOpacity });
  const waterMat = new THREE.MeshStandardMaterial({ color: '#9fc7d4', roughness: 0.25, metalness: 0.1 });

  // Gece pencere ışıkları — tekrar eden kanvas dokusu
  const winCanvas = document.createElement('canvas');
  winCanvas.width = winCanvas.height = 256;
  const g = winCanvas.getContext('2d')!;
  g.fillStyle = '#000';
  g.fillRect(0, 0, 256, 256);
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let fy = 0; fy < 8; fy++)
    for (let bx = 0; bx < 8; bx++) {
      const lit = rnd();
      if (lit < 0.42) continue;
      const v = Math.floor(120 + lit * 135);
      g.fillStyle = `rgb(${v},${Math.floor(v * 0.86)},${Math.floor(v * 0.62)})`;
      g.fillRect(bx * 32 + 6, fy * 32 + 8, 20, 17);
    }
  const winTex = new THREE.CanvasTexture(winCanvas);
  winTex.colorSpace = THREE.SRGBColorSpace;
  winTex.wrapS = winTex.wrapT = THREE.RepeatWrapping;
  const facadeMats: THREE.MeshStandardMaterial[] = [];
  const facadeMat = (w: number, h: number) => {
    const tex = winTex.clone();
    tex.needsUpdate = true;
    tex.repeat.set(w / (3.6 * 8), h / (3.4 * 8));
    const m = new THREE.MeshStandardMaterial({ color: pal.model, roughness: 0.92, emissive: '#ffc98a', emissiveMap: tex, emissiveIntensity: 0 });
    facadeMats.push(m);
    return m;
  };

  const model = new THREE.Group();
  scene.add(model);
  const edges: THREE.LineSegments[] = [];
  const addBox = (w: number, h: number, d: number, x: number, y: number, z: number, windows = true) => {
    const geo = new THREE.BoxGeometry(w, h, d);
    const mats = windows
      ? [facadeMat(d, h), facadeMat(d, h), modelMat, modelMat, facadeMat(w, h), facadeMat(w, h)]
      : modelMat;
    const mesh = new THREE.Mesh(geo, mats);
    mesh.position.set(x, y + h / 2, z);
    mesh.castShadow = mesh.receiveShadow = true;
    model.add(mesh);
    const e = new THREE.LineSegments(new THREE.EdgesGeometry(geo), edgeMat);
    e.position.copy(mesh.position);
    model.add(e);
    edges.push(e);
    return mesh;
  };

  // Zemin ve parsel
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(1400, 1400), groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);
  addBox(96, 0.6, 96, 0, 0, 0, false).material = plateMat;

  // Kütleler — L blok (otel + rezidans), kule, saçaklı pavyon
  addBox(48, 21, 12, -6, 0.6, -22); // uzun kol
  addBox(12, 27, 34, -24, 0.6, 1); // kısa kol
  addBox(14, 54, 14, 27, 0.6, -21); // kule
  addBox(18, 4.6, 12, 16, 0.6, 21); // pavyon
  addBox(30, 0.7, 20, 16, 5.2, 21, false); // pavyon saçağı
  addBox(8, 12, 8, 34, 0.6, 30); // küçük blok

  // Havuz
  const pool = new THREE.Mesh(new THREE.BoxGeometry(18, 0.2, 6), waterMat);
  pool.position.set(-2, 0.62, 4);
  pool.receiveShadow = true;
  model.add(pool);

  // Ağaçlar
  const trunkGeo = new THREE.CylinderGeometry(0.25, 0.3, 3.2, 6);
  const crownGeo = new THREE.IcosahedronGeometry(2.6, 0);
  const trees: [number, number, number][] = [
    [6, -6, 1], [14, -4, 0.9], [-10, 14, 1.1], [0, 16, 0.85], [-2, -8, 1], [32, 8, 1.2], [40, -2, 0.9],
    [-40, 30, 1.1], [-38, -36, 1], [10, 40, 1], [-14, 36, 0.9], [44, 42, 1.1], [-44, 6, 0.95], [22, 2, 0.8],
  ];
  trees.forEach(([x, z, s]) => {
    const trunk = new THREE.Mesh(trunkGeo, modelMat);
    trunk.position.set(x, 0.6 + 1.6 * s, z);
    trunk.scale.setScalar(s);
    const crown = new THREE.Mesh(crownGeo, modelMat);
    crown.position.set(x, 0.6 + 4.6 * s, z);
    crown.scale.setScalar(s);
    crown.rotation.set(rnd() * 3, rnd() * 3, 0);
    trunk.castShadow = crown.castShadow = true;
    model.add(trunk, crown);
  });

  // Pusula halkası
  const ringMat = new THREE.MeshBasicMaterial({ color: pal.edge, transparent: true, opacity: 0.25 });
  const ring = new THREE.Mesh(new THREE.RingGeometry(78, 78.4, 128), ringMat);
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.05;
  scene.add(ring);
  for (let i = 0; i < 72; i++) {
    const a = (i / 72) * Math.PI * 2;
    const len = i % 18 === 0 ? 6 : i % 2 === 0 ? 2.5 : 1.2;
    const tick = new THREE.Mesh(new THREE.PlaneGeometry(0.35, len), ringMat);
    tick.rotation.x = -Math.PI / 2;
    tick.rotation.z = -a;
    tick.position.set(Math.sin(a) * (78 + len / 2), 0.05, -Math.cos(a) * (78 + len / 2));
    scene.add(tick);
  }
  const northMat = new THREE.MeshBasicMaterial({ color: pal.path });
  const north = new THREE.Mesh(new THREE.ConeGeometry(2.4, 7, 3), northMat);
  north.rotation.x = -Math.PI / 2;
  north.position.set(0, 0.2, -90);
  scene.add(north);

  /* ---------- Işıklar ---------- */
  const sun = new THREE.DirectionalLight('#ffffff', 2.6);
  sun.castShadow = true;
  sun.shadow.mapSize.set(small ? 1024 : 2048, small ? 1024 : 2048);
  const sc = sun.shadow.camera;
  sc.left = sc.bottom = -110;
  sc.right = sc.top = 110;
  sc.near = 10;
  sc.far = 700;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.04;
  scene.add(sun, sun.target);
  const hemi = new THREE.HemisphereLight('#ffffff', '#b9b4aa', 1.1);
  scene.add(hemi);

  // Güneş yörüngesi (gün boyunca)
  const R = 170;
  const pathMat = new THREE.LineDashedMaterial({ color: pal.path, dashSize: 3, gapSize: 3, transparent: true, opacity: 0.55 });
  let pathLine: THREE.Line | null = null;
  const hourDots = new THREE.Group();
  scene.add(hourDots);
  const dotGeo = new THREE.SphereGeometry(0.7, 8, 8);
  const dotMat = new THREE.MeshBasicMaterial({ color: pal.path });
  const sunBall = new THREE.Mesh(new THREE.SphereGeometry(4.2, 24, 16), new THREE.MeshBasicMaterial({ color: '#ffcf5a' }));
  scene.add(sunBall);
  const sunGlow = new THREE.Mesh(new THREE.SphereGeometry(8, 24, 16), new THREE.MeshBasicMaterial({ color: '#ffcf5a', transparent: true, opacity: 0.18 }));
  scene.add(sunGlow);

  const dirFrom = (az: number, alt: number) =>
    new THREE.Vector3(-Math.sin(az) * Math.cos(alt), Math.sin(alt), Math.cos(az) * Math.cos(alt));

  /* ---------- İmbat (rüzgâr) ---------- */
  const WIND_N = small ? 140 : 260;
  const windDir = new THREE.Vector3(Math.sin(112.5 * deg), 0, -Math.cos(112.5 * deg)); // BKB'den DGD'ye doğru
  const windPos = new Float32Array(WIND_N * 6);
  const windSeed = Array.from({ length: WIND_N }, () => ({ p: new THREE.Vector3(), s: 0.7 + Math.random() * 0.6, ph: Math.random() * 6 }));
  const spawn = (o: { p: THREE.Vector3 }, anywhere: boolean) => {
    const along = anywhere ? (Math.random() - 0.5) * 240 : -120;
    const across = (Math.random() - 0.5) * 240;
    const side = new THREE.Vector3(-windDir.z, 0, windDir.x);
    o.p.copy(windDir).multiplyScalar(along).addScaledVector(side, across);
    o.p.y = 2 + Math.random() * 40;
  };
  windSeed.forEach((o) => spawn(o, true));
  const windGeo = new THREE.BufferGeometry();
  windGeo.setAttribute('position', new THREE.BufferAttribute(windPos, 3));
  const windMat = new THREE.LineBasicMaterial({ color: pal.path, transparent: true, opacity: 0.55 });
  const wind = new THREE.LineSegments(windGeo, windMat);
  wind.visible = false;
  wind.frustumCulled = false;
  scene.add(wind);
  const updateWind = (dt: number, t: number) => {
    for (let i = 0; i < WIND_N; i++) {
      const o = windSeed[i];
      o.p.addScaledVector(windDir, dt * 26 * o.s);
      o.p.y += Math.sin(t * 1.3 + o.ph) * dt * 0.8;
      if (o.p.dot(windDir) > 120) spawn(o, false);
      const len = 7 * o.s;
      windPos.set([o.p.x, o.p.y, o.p.z, o.p.x - windDir.x * len, o.p.y, o.p.z - windDir.z * len], i * 6);
    }
    windGeo.attributes.position.needsUpdate = true;
  };

  /* ---------- Durum ---------- */
  const izmirNow = () => {
    const d = new Date(Date.now() + offset * 3600000);
    return { y: d.getUTCFullYear(), m: d.getUTCMonth(), d: d.getUTCDate(), min: d.getUTCHours() * 60 + d.getUTCMinutes() };
  };
  const now0 = izmirNow();
  const state = { y: now0.y, m: now0.m, d: now0.d, min: now0.min, live: true, playing: false, wind: false, preset: 'today' };

  const slider = root.querySelector<HTMLInputElement>('[data-sun-time]')!;
  const read = (k: string) => root.querySelector<HTMLElement>(`[data-r="${k}"]`)!;
  const compass = root.querySelector<HTMLElement>('[data-sun-compass]')!;
  const btnPlay = root.querySelector<HTMLButtonElement>('[data-sun-play]')!;
  const btnNow = root.querySelector<HTMLButtonElement>('[data-sun-now]')!;
  const btnWind = root.querySelector<HTMLButtonElement>('[data-sun-wind]')!;
  const dateBtns = [...root.querySelectorAll<HTMLButtonElement>('[data-sun-date]')];

  const c = new THREE.Color();
  const mix = (a: string, b: string, t: number) => new THREE.Color(a).lerp(new THREE.Color(b), Math.min(Math.max(t, 0), 1));
  const skyFor = (altDeg: number) => {
    if (altDeg >= 10) return new THREE.Color(pal.day);
    if (altDeg >= 0) return mix(pal.golden, pal.day, altDeg / 10);
    if (altDeg >= -6) return mix(pal.twilight, pal.golden, (altDeg + 6) / 6);
    if (altDeg >= -14) return mix(pal.night, pal.twilight, (altDeg + 14) / 8);
    return new THREE.Color(pal.night);
  };

  let dirty = true;
  const rebuildPath = () => {
    if (pathLine) {
      scene.remove(pathLine);
      pathLine.geometry.dispose();
    }
    hourDots.clear();
    const pts: THREE.Vector3[] = [];
    for (let mm = 0; mm <= 1440; mm += 6) {
      const p = sunPosition(localToDate(state.y, state.m, state.d, mm / 60, offset), lat, lon);
      if (p.altitude > -1 * deg) {
        const v = dirFrom(p.azimuth, p.altitude).multiplyScalar(R);
        pts.push(v);
        if (mm % 60 === 0) {
          const dot = new THREE.Mesh(dotGeo, dotMat);
          dot.position.copy(v);
          hourDots.add(dot);
        }
      }
    }
    if (pts.length > 1) {
      pathLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), pathMat);
      pathLine.computeLineDistances();
      scene.add(pathLine);
    }
    const st = sunTimes(state.y, state.m, state.d, lat, lon, offset);
    read('riseSet').textContent = `${fmtHour(st.rise)} / ${fmtHour(st.set)}`;
  };

  const applySun = () => {
    const date = localToDate(state.y, state.m, state.d, state.min / 60, offset);
    const p = sunPosition(date, lat, lon);
    const altDeg = p.altitude / deg;
    const dir = dirFrom(p.azimuth, p.altitude);
    sun.position.copy(dir).multiplyScalar(300);
    sun.target.position.set(0, 0, 0);
    const day = Math.max(0, Math.sin(p.altitude));
    const warm = 1 - Math.min(Math.max(altDeg / 18, 0), 1);
    sun.color.set('#ffffff').lerp(c.set('#ffb070'), warm * 0.85);
    sun.intensity = altDeg > -1 ? 0.6 + 2.8 * Math.min(day * 2.4, 1) : 0;
    sun.castShadow = altDeg > -1;
    const sky = skyFor(altDeg);
    scene.background = sky;
    scene.fog = new THREE.Fog(sky, 380, 900);
    hemi.color.copy(sky).lerp(c.set('#ffffff'), 0.65);
    hemi.intensity = 0.35 + 1.35 * Math.min(Math.max((altDeg + 8) / 20, 0), 1);
    const night = Math.min(Math.max((2 - altDeg) / 10, 0), 1);
    facadeMats.forEach((m) => (m.emissiveIntensity = night * 1.25));
    sunBall.position.copy(dir).multiplyScalar(R);
    sunGlow.position.copy(sunBall.position);
    sunBall.visible = sunGlow.visible = altDeg > -1;
    // Kahraman metin rengi
    const lum = sky.r * 0.2126 + sky.g * 0.7152 + sky.b * 0.0722;
    root.classList.toggle('is-dark', lum < 0.4 || currentTheme() === 'blueprint');
    root.style.setProperty('--sky', `#${sky.getHexString()}`);
    // Okumalar
    read('time').textContent = fmtHour(state.min / 60);
    read('alt').textContent = altDeg > -0.833 ? `${altDeg.toFixed(1)}°` : `${L.night} (${altDeg.toFixed(0)}°)`;
    read('az').textContent = `${compassBearing(p.azimuth).toFixed(0)}°`;
    slider.value = String(state.min);
    slider.setAttribute('aria-valuetext', fmtHour(state.min / 60));
    dirty = true;
  };

  const applyTheme = () => {
    pal = PALETTES[currentTheme()];
    modelMat.color.set(pal.model);
    plateMat.color.set(pal.model);
    facadeMats.forEach((m) => m.color.set(pal.model));
    groundMat.color.set(pal.ground);
    edgeMat.color.set(pal.edge);
    edgeMat.opacity = pal.edgeOpacity;
    ringMat.color.set(pal.edge);
    pathMat.color.set(pal.path);
    dotMat.color.set(pal.path);
    northMat.color.set(pal.path);
    windMat.color.set(pal.path);
    waterMat.color.set(currentTheme() === 'blueprint' ? '#2a66b0' : '#9fc7d4');
    applySun();
  };

  const setPressed = (b: HTMLButtonElement, v: boolean) => b.setAttribute('aria-pressed', String(v));
  const setLive = (v: boolean) => {
    state.live = v;
    setPressed(btnNow, v);
  };
  const setPlaying = (v: boolean) => {
    state.playing = v;
    setPressed(btnPlay, v);
    btnPlay.querySelector('span')!.textContent = v ? L.pause : L.play;
  };

  slider.addEventListener('input', () => {
    state.min = Number(slider.value);
    setLive(false);
    setPlaying(false);
    applySun();
  });
  dateBtns.forEach((b) =>
    b.addEventListener('click', () => {
      const key = b.dataset.sunDate!;
      dateBtns.forEach((x) => setPressed(x, x === b));
      if (key === 'today') {
        const n = izmirNow();
        Object.assign(state, { y: n.y, m: n.m, d: n.d });
      } else {
        const [mm, dd] = key.split('-').map(Number);
        Object.assign(state, { m: mm - 1, d: dd });
        setLive(false);
      }
      rebuildPath();
      applySun();
    }),
  );
  btnNow.addEventListener('click', () => {
    const n = izmirNow();
    Object.assign(state, n);
    dateBtns.forEach((x) => setPressed(x, x.dataset.sunDate === 'today'));
    setLive(true);
    setPlaying(false);
    rebuildPath();
    applySun();
  });
  btnPlay.addEventListener('click', () => {
    setPlaying(!state.playing);
    if (state.playing) setLive(false);
  });
  btnWind.addEventListener('click', () => {
    state.wind = !state.wind;
    wind.visible = state.wind;
    setPressed(btnWind, state.wind);
    dirty = true;
  });
  addEventListener('themechange', applyTheme);
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
  controls.addEventListener('change', () => (dirty = true));
  controls.addEventListener('start', () => (controls.autoRotate = false));

  /* ---------- Boyut ve döngü ---------- */
  const resize = () => {
    const w = host.clientWidth;
    const h = host.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Geniş ekranda maketi sağa kaydır (metin için yer aç)
    camera.setViewOffset(w, h, w > 900 ? -w * 0.17 : 0, w > 900 ? h * 0.04 : -h * 0.1, w, h);
    camera.updateProjectionMatrix();
    dirty = true;
  };
  new ResizeObserver(resize).observe(host);
  resize();

  rebuildPath();
  applyTheme();

  let visible = true;
  new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(root);
  let last = performance.now();
  let elapsed = 0;
  let liveTimer = 0;
  const loop = () => {
    requestAnimationFrame(loop);
    const nowT = performance.now();
    const rawDt = (nowT - last) / 1000;
    last = nowT;
    if (!visible || document.hidden) return;
    const dt = Math.min(rawDt, 0.05);
    elapsed += dt;
    const t = elapsed;
    if (state.playing) {
      state.min = (state.min + dt * 50) % 1440; // ~1 saat / 1.2 sn
      applySun();
    }
    if (state.live) {
      liveTimer += dt;
      if (liveTimer > 30) {
        liveTimer = 0;
        const n = izmirNow();
        if (n.d !== state.d) {
          Object.assign(state, n);
          rebuildPath();
        }
        state.min = n.min;
        applySun();
      }
    }
    if (state.wind) {
      updateWind(dt, t);
      dirty = true;
    }
    const moving = controls.update();
    if (moving || controls.autoRotate) dirty = true;
    // Kuzey oku: kamera azimutu
    const az = Math.atan2(camera.position.x - controls.target.x, camera.position.z - controls.target.z);
    compass.style.setProperty('--north', `${(az / deg).toFixed(1)}deg`);
    if (dirty) {
      renderer.render(scene, camera);
      dirty = false;
    }
  };
  loop();
  requestAnimationFrame(() => host.classList.add('is-ready'));
}
