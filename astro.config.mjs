// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import { siteOrigin } from './src/lib/site/seo.ts';

// https://astro.build/config
export default defineConfig({
	site: siteOrigin,
	adapter: cloudflare({
		// Keep static page prerender on Node; API routes still run on Workers.
		prerenderEnvironment: 'node',
	}),
	build: {
		// Inline CSS into <style> to eliminate the render-blocking stylesheet round-trip.
		// Tailwind + latin font faces stay modest; marketing pages benefit more than they pay in HTML size.
		inlineStylesheets: 'always',
	},
	integrations: [
		sitemap({
			filter: (page) =>
				!page.includes('/404') &&
				!page.endsWith('/login/') &&
				!page.endsWith('/login') &&
				!page.endsWith('/signup/') &&
				!page.endsWith('/signup') &&
				!page.includes('/forgot-password'),
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
