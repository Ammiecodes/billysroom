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

export const collections = { gigs, mixes, drops };
