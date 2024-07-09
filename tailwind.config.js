module.exports = {
	darkMode: 'selector',
	content: [ 'app/html/**/*.html', 'app/js/*.js', '!app/js/*.min.js' ],
	theme: {
		extend: {
			colors: {
				'accent': 'var(--color-accent)', // app/styles/_config.sass
			},
		},
	},
	plugins: []
}
