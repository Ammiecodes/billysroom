import { getCollection } from 'astro:content';

const TZ = 'Africa/Lagos';
// a gig counts as "past" this many hours after its start time
export const PAST_AFTER_HOURS = 10;

export const endsAt = (d: Date) => d.getTime() + PAST_AFTER_HOURS * 3600_000;

function ordinal(n: number) {
  const s = ['th', 'st', 'nd', 'rd'], v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

const parts = (d: Date) => {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', { timeZone: TZ, day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })
      .formatToParts(d).map((x) => [x.type, x.value]),
  );
  return p as Record<string, string>;
};

/** "january 15th, 2026" */
export function longDate(d: Date) {
  const p = parts(d);
  return `${p.month.toLowerCase()} ${ordinal(+p.day)}, ${p.year}`;
}
/** "15.01.26" */
export function shortDate(d: Date) {
  const p = new Intl.DateTimeFormat('en-GB', { timeZone: TZ, day: '2-digit', month: '2-digit', year: '2-digit' }).format(d);
  return p.replace(/\//g, '.');
}
/** "10pm" from the date when no label is given */
export function timeOf(d: Date) {
  const p = parts(d);
  const t = `${p.hour}${p.minute !== '00' ? ':' + p.minute : ''}${(p.dayPeriod || '').toLowerCase().replace(/\s|\./g, '')}`;
  return t;
}
export function monthName(d: Date) {
  return parts(d).month.toLowerCase();
}

export async function getGigs() {
  const all = (await getCollection('gigs')).filter((g) => !g.data.hidden);
  return all.sort((a, b) => a.data.date.getTime() - b.data.date.getTime());
}
export async function getDrops() {
  const all = (await getCollection('drops')).filter((g) => !g.data.hidden);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
export async function getMixes() {
  const all = (await getCollection('mixes')).filter((m) => !m.data.hidden);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export type EmbedInfo =
  | { kind: 'soundcloud'; src: string }
  | { kind: 'youtube'; id: string }
  | { kind: 'mixcloud'; src: string }
  | { kind: 'link'; href: string };

/** Turn any pasted SoundCloud / YouTube / Mixcloud link into a player. */
export function embedFor(url: string): EmbedInfo {
  const u = url.trim();
  if (/soundcloud\.com\//i.test(u)) {
    const clean = u.split('?')[0];
    const q = new URLSearchParams({ url: clean, color: '#f4e25a', auto_play: 'false', hide_related: 'true', show_comments: 'false', show_user: 'true', show_reposts: 'false', show_teaser: 'false', visual: 'true' });
    return { kind: 'soundcloud', src: `https://w.soundcloud.com/player/?${q}` };
  }
  const yt = u.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/i);
  if (yt) return { kind: 'youtube', id: yt[1] };
  const mc = u.match(/mixcloud\.com(\/[^?#]+)/i);
  if (mc) return { kind: 'mixcloud', src: `https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&light=0&feed=${encodeURIComponent(mc[1].endsWith('/') ? mc[1] : mc[1] + '/')}` };
  return { kind: 'link', href: u };
}

export async function getKolanut() {
  const all = (await getCollection('kolanut')).filter((e) => !e.data.hidden);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
