# billysroom.today

The billysroom DJ site. Static Astro site, content in plain files, editable at `/admin`.

## Updating the site

**Admin:** go to `billysroom.today/admin`, sign in with GitHub, pick a section, fill in the form, hit publish. The site rebuilds in about a minute.

**Or message Claude** with the basics, e.g. "new gig: soho thursday, nairobi, 15 jan 10pm, afro house, tickets: <link>".

| Section | Folder | What happens automatically |
|---|---|---|
| gigs / dates | `src/content/gigs` | shows as upcoming + "next up" on home until the night ends, then moves to "past dates" |
| billy's room exclusive | `src/content/drops` | next party shows big on /exclusive with the invite button; afterwards it moves to "past editions" |
| sessions / mixes | `src/content/mixes` | paste a SoundCloud / YouTube / Mixcloud link and the player is built; mixes under 60 days old get a "new" tag |
| site info | `src/data/site.json` | bio, links, emails, page photos |

Upcoming → past switches in the visitor's browser, so nothing goes stale even if no one deploys.

## Develop

```
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs dist/
```

Hosting: Cloudflare Pages — framework preset Astro, build command `npm run build`, output folder `dist`, environment variable `NODE_VERSION` = `22.23.4`.
