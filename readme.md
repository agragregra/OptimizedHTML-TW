<h1>OptimizedHTML TW</h1>

<h2>Features</h2>

<strong>Tailwind, Browsersync, JavaScript Bundling, Image Optimize, Component Method, Rsync Deploy</strong>

<p>
  <img src="https://raw.githubusercontent.com/agragregra/oht/master/dist/img/preview.jpg" alt="Start HTML Template">
</p>

<p><strong>OptimizedHTML TW</strong> - lightweight startup environment with <strong>Gulp</strong>, <strong>Tailwind</strong>, <strong>Browsersync</strong>, <strong>PostCSS</strong>, <strong>Webpack</strong>, <strong>Babel</strong>, <strong>Image Compression</strong> and <strong>Rsync</strong>. It uses best practices of images compression, JavaScript bundling, CSS optimizing and contains a <strong>.htaccess</strong> code for resources caching (images, fonts, HTML, CSS, JS and other content types).</p>

<h2>How to use OptimizedHTML TW</h2>

<p>Clone into the current folder with remove all unnecessary (one command):</p>

```
git clone https://github.com/agragregra/oht .; rm -rf trunk .gitignore readme.md .git
```

<ol>
  <li>Clone or <a href="https://github.com/agragregra/OptimizedHTML-TW/archive/master.zip">Download</a> <strong>OptimizedHTML TW</strong> from GitHub</li>
  <li>Install Node Modules: <strong>npm i</strong></li>
  <li>Run: <strong>npm run dev</strong></li>
  <li>Build: <strong>npm run build</strong></li>
</ol>

<h2>Basic rules</h2>

<h4>src's & dist's:</h4>

<ol>
  <li><strong>HTML source files and components</strong> located in <strong>app/html/ | app/html/parts/</strong></li>
  <li>All <strong>src | dist scripts</strong> located in <strong>app/js/app.js | dist/js/app.min.js</strong></li>
  <li><strong>input.css</strong> Tailwind file located in <strong>app/css/input.css</strong></li>
  <li>All <strong>compressed styles</strong> located in <strong>dist/css/output.min.css</strong></li>
  <li>All <strong>src images</strong> placed in <strong>app/img/</strong> folder</li>
  <li>All <strong>compressed images</strong> placed in <strong>dist/img/</strong> folder</li>
</ol>

<h4>Include CSS parts:</h4>

<p>All included parts of CSS files (like fonts.css) placed in the folder "app/css/".</p>

<h4>Include parts of HTML components:</h4>

<p>All HTML files src placed in the folder "app/html/*". Included components located in "app/html/parts/".</p>

<h2>Helpers</h2>

<h3>Fonts</h3>

<p>The woff2 fonts are currently recommended.</p>

<p>Converter recommended: <a href="https://www.fontsquirrel.com/tools/webfont-generator">https://www.fontsquirrel.com/tools/webfont-generator</a><br>

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
