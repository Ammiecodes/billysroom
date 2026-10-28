import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://billysroom.today',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
