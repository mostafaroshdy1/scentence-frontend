/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['src/**/*.{html, ts}'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
		},
		extend: {
			fontFamily: {
				roboto: '"Roboto", sans-serif',
			},
		},
	},
	plugins: [],
};
