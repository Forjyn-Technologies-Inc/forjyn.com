/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				emerald: {
					DEFAULT: '#2FD17B',
					soft: 'rgba(47, 209, 123, 0.14)',
				},
				violet: {
					DEFAULT: '#785CFF',
					soft: 'rgba(120, 92, 255, 0.14)',
				},
				azure: {
					DEFAULT: '#2C8DFF',
					soft: 'rgba(44, 141, 255, 0.14)',
				},
				cyan: {
					DEFAULT: '#3ED5FF',
					soft: 'rgba(62, 213, 255, 0.14)',
				},
				midnight: '#0B1020',
				graphite: '#161D31',
				slate: {
					DEFAULT: '#8D98B8',
					muted: 'rgba(141, 152, 184, 0.72)',
				},
				cloud: '#F7FBF0',
				line: '#29314A',
				success: '#27D980',
				warning: '#FFC857',
				error: '#FF5C7A',
			},
			fontFamily: {
				display: ['"Sora"', 'system-ui', 'sans-serif'],
				sans: ['"Inter"', 'system-ui', 'sans-serif'],
				mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
			},
			borderRadius: {
				brand: '0.75rem',
			},
			boxShadow: {
				glow: '0 0 48px -10px rgba(47, 209, 123, 0.35)',
				'glow-violet': '0 0 48px -10px rgba(120, 92, 255, 0.35)',
				'glow-border': '0 0 0 1px rgba(47, 209, 123, 0.35), 0 0 28px -8px rgba(44, 141, 255, 0.35)',
				panel: '0 24px 60px -28px rgba(11, 16, 32, 0.8)',
			},
			backgroundImage: {
				'brand-gradient': 'linear-gradient(to right, #2FD17B, #2C8DFF, #785CFF)',
				'grid-fade':
					'linear-gradient(to right, rgba(41, 49, 74, 0.55) 1px, transparent 1px), linear-gradient(to bottom, rgba(41, 49, 74, 0.55) 1px, transparent 1px)',
				'hero-glow':
					'radial-gradient(ellipse 80% 60% at 70% 20%, rgba(47, 209, 123, 0.18), transparent 55%), radial-gradient(ellipse 50% 40% at 15% 80%, rgba(120, 92, 255, 0.16), transparent 50%), radial-gradient(ellipse 40% 30% at 50% 50%, rgba(44, 141, 255, 0.1), transparent 60%)',
			},
			animation: {
				'fade-up': 'fadeUp 0.7s ease-out both',
				'fade-in': 'fadeIn 0.8s ease-out both',
				float: 'float 7s ease-in-out infinite',
			},
			keyframes: {
				fadeUp: {
					'0%': { opacity: '0', transform: 'translateY(18px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
			},
		},
	},
};
