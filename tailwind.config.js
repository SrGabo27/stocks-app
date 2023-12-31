/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
			},
			colors: {
				blue: {
					DEFAULT: "var(--blue)",
					dark: "var(--dark-blue)",
				},
				yellow: {
					DEFAULT: "var(--yellow)",
					dark: "var(--dark-yellow)",
				},
			},
		},
	},
	plugins: [],
};
