// Reads a page photo at build time and returns the average colour of its top and bottom strips,
// so the phone's browser bars and over-scroll areas match the photo instead of showing a colour block.
import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs';

const cache = new Map<string, { top: string; bottom: string } | null>();
const hex = (r: number, g: number, b: number) => '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');

export async function photoEdges(src: string) {
  if (!src || /^https?:/i.test(src)) return null;
  if (cache.has(src)) return cache.get(src)!;
  const file = path.join(process.cwd(), 'public', decodeURIComponent(src.split('?')[0]));
  if (!fs.existsSync(file)) { cache.set(src, null); return null; }
  try {
    const img = sharp(file).removeAlpha();
    const { width = 1, height = 1 } = await img.metadata();
    const strip = Math.max(1, Math.round(height * 0.06));
    const avg = async (top: number) => {
      const s = await sharp(file).removeAlpha().extract({ left: 0, top, width, height: strip }).stats();
      return hex(s.channels[0].mean, s.channels[1].mean, s.channels[2].mean);
    };
    const res = { top: await avg(0), bottom: await avg(height - strip) };
    cache.set(src, res);
    return res;
  } catch {
    cache.set(src, null);
    return null;
  }
}
