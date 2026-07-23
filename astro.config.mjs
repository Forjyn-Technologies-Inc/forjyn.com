// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
	adapter: cloudflare({
		// Keep static page prerender on Node; API routes still run on Workers.
		prerenderEnvironment: 'node',
	}),
	vite: {
		plugins: [tailwindcss()],
	},
});
