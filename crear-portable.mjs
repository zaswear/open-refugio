import { readFile, writeFile } from 'node:fs/promises';

const root = new URL('./', import.meta.url);

const [html, css, i18n, profile, content, tools, posters, app] = await Promise.all([
  'index.html',
  'styles.css',
  'i18n.js',
  'profile.js',
  'content.js',
  'herramientas.js',
  'posters.js',
  'app.js'
].map(p => readFile(new URL(p, root), 'utf8')));

let inline = html
  .replace('<link rel="icon" type="image/svg+xml" href="icon.svg">', '')
  .replace('<link rel="apple-touch-icon" href="icon-180.png">', '')
  .replace('<link rel="manifest" href="manifest.webmanifest">', '')
  .replace('<link rel="stylesheet" href="styles.css">', () => '<style>' + css.replace(/<\/style/gi, '<\\/style') + '</style>')
  .replace(/<script src="[^"]+"><\/script>/g, '')
  .replace('</body>', () => `
    <script>${i18n.replace(/<\/script/gi, '<\\/script')}</script>
    <script>${profile.replace(/<\/script/gi, '<\\/script')}</script>
    <script>${content.replace(/<\/script/gi, '<\\/script')}</script>
    <script>${tools.replace(/<\/script/gi, '<\\/script')}</script>
    <script>${posters.replace(/<\/script/gi, '<\\/script')}</script>
    <script>${app.replace(/<\/script/gi, '<\\/script')}</script>
  </body>`);

await writeFile(new URL('open-refugio-portable.html', root), inline);
console.log('✓ open-refugio-portable.html generado con éxito (' + Buffer.byteLength(inline) + ' bytes). 100% autocontenido.');
