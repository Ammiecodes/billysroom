// Copies the Sveltia CMS bundle into public/admin so the admin panel is self-hosted.
import { copyFileSync, mkdirSync } from 'node:fs';
mkdirSync('public/admin', { recursive: true });
copyFileSync('node_modules/@sveltia/cms/dist/sveltia-cms.js', 'public/admin/sveltia-cms.js');
console.log('copied sveltia-cms.js -> public/admin/');
