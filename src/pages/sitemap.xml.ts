// Sitemap for search engines — includes every release page automatically.
import { getReleases } from '../lib/util';

export async function GET({ site }: { site: URL }) {
  const releases = await getReleases();
  const paths = ['/', '/music/', '/dates/', '/exclusive/', '/press/', ...releases.map((r) => `/music/${r.id}/`)];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
    .map((p) => `  <url><loc>${new URL(p, site).href}</loc></url>`)
    .join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
