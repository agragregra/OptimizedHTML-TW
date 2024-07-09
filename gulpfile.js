let fileswatch = 'html,htm,txt,json,md,woff2' // List of files extensions for watching & hard reload

import pkg from 'gulp'
const { src, dest, parallel, series, watch } = pkg

import browserSync     from 'browser-sync'
import fileinclude     from 'gulp-file-include'
import webpackStream   from 'webpack-stream'
import webpack         from 'webpack'
import TerserPlugin    from 'terser-webpack-plugin'
import tailwindcss     from 'tailwindcss'
import gulpSass        from 'gulp-sass'
import * as dartSass   from 'sass'
const  sass            = gulpSass(dartSass)
import sassglob        from 'gulp-sass-glob'
import postCss         from 'gulp-postcss'
import cssnano         from 'cssnano'
import autoprefixer    from 'autoprefixer'
import imagemin        from 'gulp-imagemin'
import changed         from 'gulp-changed'
import concat          from 'gulp-concat'
import rsync           from 'gulp-rsync'
import { deleteAsync } from 'del'

function browsersync() {
	browserSync.init({
		server: {
			baseDir: 'app/'
		},
		ghostMode: { clicks: false },
		notify: false,
		online: true,
		// tunnel: 'yousutename', // Attempt to use the URL https://yousutename.loca.lt
	})
}

function styles() {
	return src(['app/styles/*.*', 'app/styles/**/*.css', '!app/styles/_*.*'])
		.pipe(sassglob())
		.pipe(sass({ 'include css': true }).on('error', sass.logError))
		.pipe(postCss([
			tailwindcss('tailwind.config.js'),
			autoprefixer({ grid: 'autoplace' }),
			cssnano({ preset: ['default', { discardComments: { removeAll: true } }] })
		]))
		.pipe(concat('app.min.css'))
		.pipe(dest('app/css'))
		.pipe(browserSync.stream())
}

function posthtml() {
	return src(['app/html/**/*.html', '!app/html/parts/**/*'])
	.pipe(fileinclude({ basepath: 'app/html/parts' }))
	.pipe(dest('app'))
}

function scripts() {
	return src(['app/js/*.js', '!app/js/*.min.js'])
		.pipe(webpackStream({
			mode: 'production',
			performance: { hints: false },
			module: {
				rules: [
					{
						test: /\.m?js$/,
						exclude: /(node_modules)/,
						use: {
							loader: 'babel-loader',
							options: {
								presets: ['@babel/preset-env'],
								plugins: ['babel-plugin-root-import']
							}
						}
					}
				]
			},
			optimization: {
				minimize: true,
				minimizer: [
					new TerserPlugin({
						terserOptions: { format: { comments: false } },
						extractComments: false
					})
				]
			},
		}, webpack)).on('error', function handleError() {
			this.emit('end')
		})
		.pipe(concat('app.min.js'))
		.pipe(dest('app/js'))
		.pipe(browserSync.stream())
}

function images() {
	return src(['app/img/src/**/*'], { encoding: false })
		.pipe(changed('app/img/dist'))
		.pipe(imagemin())
		.pipe(dest('app/img/dist'))
		.pipe(browserSync.stream())
}

function buildcopy() {
	return src([
		'{app/js,app/css}/*.min.*',
		'app/img/**/*.*',
		'!app/img/src/**/*',
		'app/fonts/**/*',
		'app/*.html'
	], { base: 'app/', encoding: false })
	.pipe(dest('dist'))
}

async function cleandist() {
	await deleteAsync('dist/**/*', { force: true })
}

function deploy() {
	return src('dist/')
		.pipe(rsync({
			root: 'dist/',
			hostname: 'username@yousite.com',
			destination: 'yousite/public_html/',
			clean: true, // Mirror copy with file deletion
			// include: ['*.htaccess'], // Includes files to deploy
			exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
			recursive: true,
			archive: true,
			silent: false,
			compress: true
		}))
}

function startwatch() {
	watch(['app/styles/**/*'], { usePolling: true }, styles)
	watch(['app/js/**/*.js', '!app/js/**/*.min.js'], { usePolling: true }, scripts)
	watch(['app/img/src/**/*'], { usePolling: true }, images)
	watch([`app/**/*.{${fileswatch}}`], { usePolling: true }, (styles, posthtml)).on('change', browserSync.reload)
}

export { scripts, styles, images, deploy, posthtml }
export let assets = series(scripts, styles, images)
export let build = series(cleandist, images, scripts, styles, posthtml, buildcopy)

export default series(scripts, styles, posthtml, images, parallel(browsersync, startwatch))
