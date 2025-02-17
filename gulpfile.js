let fileswatch = 'html,htm,txt,json,md,woff2' // List of files extensions for watching & hard reload

import pkg from 'gulp'
const { src, dest, parallel, series, watch } = pkg

import browserSync      from 'browser-sync'
import fileinclude      from 'gulp-file-include'
import webpackStream    from 'webpack-stream'
import webpack          from 'webpack'
import TerserPlugin     from 'terser-webpack-plugin'
import tailwindcss      from '@tailwindcss/postcss'
import postCss          from 'gulp-postcss'
import imagemin         from 'imagemin'
import imageminMozjpeg  from 'imagemin-mozjpeg'
import imageminPngquant from 'imagemin-pngquant'
import imageminSvgo     from 'imagemin-svgo'
import path             from 'path'
import fs               from 'fs-extra'
import rename           from 'gulp-rename'
import rsync            from 'gulp-rsync'
import {deleteAsync}    from 'del'

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'dist/'
    },
    ghostMode: { clicks: false },
    notify: false,
    online: true
  })
}

function styles() {
  return src('app/css/input.css')
    .pipe(postCss([
      tailwindcss({ optimize: true })
    ])).on('error', function handleError() { this.emit('end') })
    .pipe(rename('output.min.css'))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream())
}

function scripts() {
  return src('app/js/app.js')
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
    }, webpack, (err, stats) => {
      if (err) {
        console.error('❌ Webpack Error:', err);
        this.emit('end');
      }
      if (stats.hasErrors()) {
        console.error('❌ Webpack Stats Errors:', stats.toString({ colors: true }));
        this.emit('end');
      }
    }))
    .on('error', function (err) {
      console.error('❌ Error in Gulp task scripts:', err.message);
      this.emit('end');
    })
    .pipe(rename('app.min.js'))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream())
}

async function images() {
  try {
    const files = await imagemin([`app/img/**/*`], {
      plugins: [
        imageminMozjpeg({ quality: 90 }),
        imageminPngquant({ quality: [0.6, 0.8] }),
        imageminSvgo()
      ]
    })
    for (const v of files) {
      const relativePath = path.relative('app/img', v.sourcePath)
      const destPath = path.join('dist/img', relativePath)
      fs.ensureDirSync(path.dirname(destPath))
      fs.writeFileSync(destPath, v.data)
    }
    console.log('✅ Images optimized successfully.')
  } catch (err) {
    console.error('❌ Image Minification Error:', err.message || err)
  }
}

function posthtml() {
  return src(['app/html/**/*.html', '!app/html/parts/**/*'])
  .pipe(fileinclude({ basepath: 'app/html/parts' }))
  .pipe(dest('dist'))
}

function buildcopy() {
  return src([
    'app/fonts/**/*',
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
  watch(['app/js/app.js'], { usePolling: true }, scripts)
  watch(['app/img/**/*'], { usePolling: true }, images)
  watch([`app/**/*.{${fileswatch}}`], { usePolling: true }, series(posthtml, buildcopy, styles)).on('change', browserSync.reload)
  watch(['app/css/**/*'], { usePolling: true }, styles)
}

export { scripts, styles, images, deploy }
export let build = series(cleandist, posthtml, buildcopy, styles, scripts, images)

export default series(cleandist, posthtml, buildcopy, styles, scripts, images, parallel(browsersync, startwatch))
