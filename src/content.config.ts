import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const gigs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/gigs' }),
  schema: z.object({
    venue: z.string(),
    city: z.string(),
    country: z.string().optional().default(''),
    date: z.coerce.date(),
    time_label: z.string().optional().default(''),
    genres: z.string().optional().default(''),
    set_type: z.string().optional().default(''),
    ticket_url: z.string().optional().default(''),
    ticket_label: z.string().optional().default('get tickets 🎫'),
    flyer: z.string().optional().default(''),
    hidden: z.boolean().optional().default(false),
  }),
});

const mixes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/mixes' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    url: z.string(),
    description: z.string().optional().default(''),
    featured: z.boolean().optional().default(false),
    hidden: z.boolean().optional().default(false),
  }),
});

const drops = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/drops' }),
  schema: z.object({
    title: z.string(),
    edition: z.string().optional().default(''),
    date: z.coerce.date(),
    city: z.string().optional().default(''),
    country: z.string().optional().default('🇳🇬'),
    venue: z.string().optional().default(''),
    doors: z.string().optional().default(''),
    lineup: z.array(z.string()).optional().default([]),
    flyer: z.string().optional().default(''),
    rsvp_url: z.string().optional().default(''),
    rsvp_label: z.string().optional().default('get an invite 🎟️'),
    sold_out: z.boolean().optional().default(false),
    hidden: z.boolean().optional().default(false),
  }),
});

const kolanut = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/kolanut' }),
  schema: z.object({
    episode: z.string(),
    title: z.string(),
    guest: z.string().optional().default(''),
    date: z.coerce.date(),
    url: z.string(),
    description: z.string().optional().default(''),
    hidden: z.boolean().optional().default(false),
  }),
});

const platformLinks = z.object({
  spotify: z.string().optional().default(''),
  apple_music: z.string().optional().default(''),
  youtube_music: z.string().optional().default(''),
  audiomack: z.string().optional().default(''),
  boomplay: z.string().optional().default(''),
  soundcloud: z.string().optional().default(''),
  beatport: z.string().optional().default(''),
  bandcamp: z.string().optional().default(''),
  deezer: z.string().optional().default(''),
  tidal: z.string().optional().default(''),
  amazon_music: z.string().optional().default(''),
}).optional().default({});

const releases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/releases' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['single', 'ep', 'album']).default('single'),
    release_date: z.coerce.date(),
    cover: z.string().optional().default(''),
    description: z.string().optional().default(''),
    artists: z.string().optional().default('billysroom'),
    featured: z.array(z.string()).optional().default([]),
    label: z.string().optional().default(''),
    tracks: z.array(z.object({
      title: z.string(),
      featured: z.string().optional().default(''),
      duration: z.string().optional().default(''),
    })).optional().default([]),
    player_url: z.string().optional().default(''),
    presave_url: z.string().optional().default(''),
    presave: platformLinks,
    links: platformLinks,
    dj_pack_url: z.string().optional().default(''),
    dj_pack_label: z.string().optional().default('download dj pack'),
    dj_pack_note: z.string().optional().default(''),
    hidden: z.boolean().optional().default(false),
  }),
});

export const collections = { gigs, mixes, drops, kolanut, releases };
