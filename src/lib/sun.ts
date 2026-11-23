/**
 * Güneş konumu — SunCalc (Vladimir Agafonkin, BSD-2) formüllerinin sadeleştirilmiş uyarlaması.
 * azimuth: güneyden batıya doğru (radyan), altitude: ufuktan yükseklik (radyan).
 */
const rad = Math.PI / 180;
const dayMs = 86400000;
const J1970 = 2440588;
const J2000 = 2451545;
const e = rad * 23.4397;

const toDays = (date: Date) => date.valueOf() / dayMs - 0.5 + J1970 - J2000;
const rightAscension = (l: number, b: number) => Math.atan2(Math.sin(l) * Math.cos(e) - Math.tan(b) * Math.sin(e), Math.cos(l));
const declination = (l: number, b: number) => Math.asin(Math.sin(b) * Math.cos(e) + Math.cos(b) * Math.sin(e) * Math.sin(l));
const azimuthOf = (H: number, phi: number, dec: number) => Math.atan2(Math.sin(H), Math.cos(H) * Math.sin(phi) - Math.tan(dec) * Math.cos(phi));
const altitudeOf = (H: number, phi: number, dec: number) => Math.asin(Math.sin(phi) * Math.sin(dec) + Math.cos(phi) * Math.cos(dec) * Math.cos(H));
const siderealTime = (d: number, lw: number) => rad * (280.16 + 360.9856235 * d) - lw;
const solarMeanAnomaly = (d: number) => rad * (357.5291 + 0.98560028 * d);
const eclipticLongitude = (M: number) => {
  const C = rad * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M));
  const P = rad * 102.9372;
  return M + C + P + Math.PI;
};

export interface SunPosition {
  azimuth: number;
  altitude: number;
}

export function sunPosition(date: Date, lat: number, lng: number): SunPosition {
  const lw = rad * -lng;
  const phi = rad * lat;
  const d = toDays(date);
  const M = solarMeanAnomaly(d);
  const L = eclipticLongitude(M);
  const dec = declination(L, 0);
  const ra = rightAscension(L, 0);
  const H = siderealTime(d, lw) - ra;
  return { azimuth: azimuthOf(H, phi, dec), altitude: altitudeOf(H, phi, dec) };
}

/** Pusula açısı (kuzeyden saat yönünde, derece) */
export const compassBearing = (azimuthFromSouth: number) => ((azimuthFromSouth / rad + 180) % 360 + 360) % 360;

/** Yerel saat (UTC+offset) → Date */
export const localToDate = (y: number, m: number, d: number, hours: number, utcOffset: number) =>
  new Date(Date.UTC(y, m, d, 0, 0, 0) + (hours - utcOffset) * 3600000);

/** Gün doğumu / batımı (yaklaşık, 1 dk çözünürlük) — yerel saat cinsinden ondalık saat */
export function sunTimes(y: number, m: number, d: number, lat: number, lng: number, utcOffset: number) {
  let rise: number | null = null;
  let set: number | null = null;
  let prev = sunPosition(localToDate(y, m, d, 0, utcOffset), lat, lng).altitude;
  const h0 = -0.833 * rad;
  for (let min = 1; min <= 1440; min++) {
    const h = min / 60;
    const alt = sunPosition(localToDate(y, m, d, h, utcOffset), lat, lng).altitude;
    if (prev < h0 && alt >= h0 && rise === null) rise = h;
    if (prev >= h0 && alt < h0 && set === null) set = h;
    prev = alt;
  }
  return { rise, set };
}

export const fmtHour = (h: number | null) => {
  if (h === null) return '—';
  const hh = Math.floor(h);
  const mm = Math.round((h - hh) * 60);
  return `${String(hh % 24).padStart(2, '0')}:${String(mm === 60 ? 0 : mm).padStart(2, '0')}`;
};
