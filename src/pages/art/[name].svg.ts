/**
 * Üretken çizimler (ağaçlar) — derlemede ayrı SVG dosyaları olarak yazılır,
 * böylece her sayfada tekrar gönderilmez, tarayıcı önbelleğinden gelir.
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import { tree } from '~/lib/geometry';

const TREES = ['cam-1', 'cam-2', 'cam-3', 'cam-4'];

export const getStaticPaths: GetStaticPaths = () => TREES.map((name) => ({ params: { name } }));

export const GET: APIRoute = ({ params }) => {
  const W = 600;
  const H = 1000;
  const t = tree(`demirce-${params.name}`, W, H);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" fill="#111"><path d="${t.trunk}"/><path d="${t.leaves}"/></svg>`;
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
};
