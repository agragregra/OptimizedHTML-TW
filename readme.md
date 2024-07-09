<h1>OptimizedHTML TW</h1>
<p>Lightweight production-ready Gulp starter with Tailwind CSS.</p>

<p>
	<img src="https://raw.githubusercontent.com/agragregra/oht/master/app/img/src/preview.jpg" alt="Start HTML Template">
</p>

<p><strong>OptimizedHTML TW</strong> - lightweight startup environment with <strong>Gulp</strong>, <strong>Preprocessors (Sass, Scss, CSS)</strong>, <strong>cssnano</strong>, <strong>Browsersync</strong>, <strong>PostCSS</strong>, <strong>Autoprefixer</strong>, <strong>webpack-stream</strong>, <strong>Babel</strong>, <strong>Rsync</strong>, <strong>build</strong>, <strong>gulp-imagemin</strong> and <strong>Tailwind</strong>. It uses best practices of images compression, JavaScript, CSS optimizing and contains a <strong>.htaccess</strong> code for resources caching (images, fonts, HTML, CSS, JS and other content types).</p>

<h2>How to use OptimizedHTML TW</h2>

<p>Clone into the current folder and remove all unnecessary (one command):</p>

<pre>git clone https://github.com/agragregra/tw .; rm -rf trunk .gitignore readme.md .git dist .editorconfig</pre>

<ol>
	<li>Clone or <a href="https://github.com/agragregra/OptimizedHTML-TW/archive/master.zip">Download</a> <strong>OptimizedHTML TW</strong> from GitHub</li>
	<li>Install Node Modules: <strong>npm i</strong></li>
	<li>Run: <strong>gulp</strong></li>
</ol>

<h2>Main Gulpfile.js options:</h2>

<ul>
	<li><strong>preprocessor</strong>: Preprocessor Sass, Scss + native CSS. 'sass' also work with the Scss syntax in "styles/sass/blocks/" folder</li>
	<li><strong>fileswatch</strong>: List of files extensions for watching & hard reload</li>
</ul>

<h2>Main Gulp tasks:</h2>

<ul>
	<li><strong>gulp</strong>: run default gulp task (scripts, images, styles, browsersync, startwatch)</li>
	<li><strong>scripts, styles, images, assets</strong>: build assets (css, js, images or all)</li>
	<li><strong>deploy</strong>: project deployment via <strong>RSYNC</strong></li>
	<li><strong>build</strong>: project build</li>
</ul>

<h2>Basic rules</h2>

<h4>src's & dist's:</h4>

<ol>
	<li>All <strong>src | dist scripts</strong> located in <strong>app/js/app.js | app.min.js</strong></li>
	<li><strong>Main Sass</strong> src file located in <strong>app/styles/main.sass</strong></li>
	<li>All <strong>compressed styles</strong> located in <strong>app/css/main.min.css</strong></li>
	<li>Project <strong>styles config</strong> placed in <strong>app/styles/_config.sass</strong></li>
	<li>All <strong>src images</strong> placed in <strong>app/img/src/</strong> folder</li>
	<li>All <strong>compressed images</strong> placed in <strong>app/img/dist/</strong> folder</li>
</ol>

<h4>Include parts of Preprocessor code:</h4>

<p>All included parts of preprocessor files (Sass, Scss, CSS) placed in the folder "styles/blocks/". Any number of preprocessor files can be placed here and in any order. They will be automatically included in the "styles/main.sass" file and processed.</p>

<h2>Included features</h2>

<strong>Tailwind</strong>

<h2>Helpers</h2>

<h3>Fonts</h3>

<p>The woff2 fonts are currently recommended.</p>

<p>Converter recommended: <a href="https://www.fontsquirrel.com/tools/webfont-generator">https://www.fontsquirrel.com/tools/webfont-generator</a><br>
Or get from google-webfonts-helper: <a href="https://google-webfonts-helper.herokuapp.com/fonts">https://google-webfonts-helper.herokuapp.com/fonts</a></p>

<h3>font-weight helper</h3>

<ul>
	<li><strong>100</strong> - Thin (Hairline)</li>
	<li><strong>200</strong> - Extra Light (Ultra Light)</li>
	<li><strong>300</strong> - Light</li>
	<li><strong>400</strong> - Regular (Normal)</li>
	<li><strong>500</strong> - Medium</li>
	<li><strong>600</strong> - Semi Bold (Demi Bold)</li>
	<li><strong>700</strong> - Bold</li>
	<li><strong>800</strong> - Extra Bold (Ultra Bold)</li>
	<li><strong>900</strong> - Black (Heavy)</li>
</ul>

<h2>Caching</h2>

<p>Create or open <strong>.htaccess</strong> file in root folder of website (Apache). Place this code for resources caching:</p>

<pre>
&lt;ifModule mod_expires.c&gt;

# Add correct content-type for fonts & SVG
AddType application/font-woff2 .woff2
AddType image/svg+xml .svg

ExpiresActive On
ExpiresDefault "access plus 5 seconds"

# Cache Images
ExpiresByType image/x-icon "access plus 2592000 seconds"
ExpiresByType image/jpeg "access plus 2592000 seconds"
ExpiresByType image/png "access plus 2592000 seconds"
ExpiresByType image/gif "access plus 2592000 seconds"
ExpiresByType image/svg+xml "access plus 2592000 seconds"

# Cache Fonts
ExpiresByType application/font-woff2 "access plus 2592000 seconds"
ExpiresByType image/svg+xml "access plus 2592000 seconds"

# Cache other content types (CSS, JS, HTML, XML)
ExpiresByType text/css "access plus 604800 seconds"
ExpiresByType text/javascript "access plus 2592000 seconds"
ExpiresByType application/javascript "access plus 2592000 seconds"
ExpiresByType application/x-javascript "access plus 2592000 seconds"
ExpiresByType text/html "access plus 600 seconds"
ExpiresByType application/xhtml+xml "access plus 600 seconds"

&lt;/ifModule&gt;

&lt;ifModule mod_deflate.c&gt;

AddOutputFilterByType DEFLATE text/html text/plain text/xml application/xml application/xhtml+xml text/css text/javascript application/javascript application/x-javascript application/font-woff2 image/svg+xml

&lt;/ifModule&gt;
</pre>

<h2>Issues</h2>

<ol>
	<li>Long Preprocessor compile: Disable the "safe write" option in PHPStorm/WebStorm settings.</li>
</ol>
