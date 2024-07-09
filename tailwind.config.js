module.exports = {
	darkMode: 'selector',
	content: [ 'app/**/*.html', 'app/js/*.js', '!app/js/*.min.js' ],
	theme: {
		extend: {
			colors: {
				'accent': 'var(--color-accent)', // styles/_config.sass
			},
		},
	},
	plugins: []
}
