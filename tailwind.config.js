/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			animation: {
				pop: 'pop 0.2s ease-in-out',
				flip: 'flip 0.2s ease-in-out forwards',
				wiggle: 'wiggle 0.2s'
			},
			keyframes: {
				pop: {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.1)' }
				},
				flip: {
					'0%, 100%': { transform: 'scaley(1)' },
					'50%': {
						transform: 'scaley(0)'
					},
					'100%': {
						backgroundColor: 'var(--bg-color)'
					}
				},
				wiggle: {
					'0%, 50%, 100%': {
						transform: 'translatex(0px)'
					},
					'25%': {
						transform: 'translatex(-4px)'
					},
					'75%': {
						transform: 'translatex(4px)'
					}
				}
			}
		}
	},
	plugins: []
};
