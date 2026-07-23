/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				ink: {
					950: '#070b14',
					900: '#0b1220',
					800: '#121a2b',
					700: '#1c2740',
					600: '#2a3754',
				},
				mist: {
					50: '#f7f9fc',
					100: '#eef2f8',
					200: '#dbe3ef',
					300: '#b8c4d8',
					400: '#8896b0',
				},
				accent: {
					DEFAULT: '#0f9f8a',
					light: '#2dd4bf',
					dark: '#0b7a6a',
					muted: '#d5f5ef',
				},
				signal: {
					DEFAULT: '#3b82f6',
					soft: '#dbeafe',
				},
			},
			fontFamily: {
				display: ['"Syne"', 'system-ui', 'sans-serif'],
				sans: ['"Sora"', 'system-ui', 'sans-serif'],
			},
			boxShadow: {
				glow: '0 0 60px -12px rgba(15, 159, 138, 0.35)',
				panel: '0 24px 60px -28px rgba(7, 11, 20, 0.45)',
			},
			backgroundImage: {
				'grid-fade':
					'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
				'hero-glow':
					'radial-gradient(ellipse 80% 60% at 70% 20%, rgba(15, 159, 138, 0.22), transparent 55%), radial-gradient(ellipse 50% 40% at 15% 80%, rgba(59, 130, 246, 0.12), transparent 50%)',
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
