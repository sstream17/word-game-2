import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			registerType: 'autoUpdate',
			manifestFilename: 'manifest.json',
			devOptions: {
				enabled: true,
			},
		}),
	],
	define: {
		APP_VERSION: JSON.stringify(process.env.npm_package_version),
	},
});