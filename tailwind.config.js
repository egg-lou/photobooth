/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	daisyui: {
		themes: [
			{
				dark: {
					primary: '#D1A5EA',
					secondary: '#956BBD',
					accent: '#42467F',
					neutral: '#3B2F4A',
					'base-100': '#181728',
					info: '#84A9C3',
					success: '#86DD5B',
					warning: '#DDD35B',
					error: '#DD5B5B'
				},
				light: {
					primary: '#491F62',
					secondary: '#A989C7',
					accent: '#42467F',
					neutral: '#BE90D5',
					'base-100': '#F8E9FF',
					info: '#84A9C3',
					success: '#86DD5B',
					warning: '#DDD35B',
					error: '#DD5B5B'
				}
			},
			'valentine',
			'night',
			'coffee'
		]
	},
	plugins: [require('daisyui')]
};
