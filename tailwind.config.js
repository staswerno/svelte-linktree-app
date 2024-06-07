const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		screens: {
			'xs': '350px',
			...defaultTheme.screens,
		  },
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: ["dracula"],
	},
};
