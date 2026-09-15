// Mantiene sincronizadas con `dist/` las directivas de la CSP que dependen del
// build: los hashes de `script-src` y los orígenes de `media-src`.
//
// El sitio es estático, así que no hay nonces posibles: sin hashes, la única
// forma de que el layout arranque es `'unsafe-inline'`, que vacía de sentido la
// política. Con hashes sí cierra, al precio de que un cambio en cualquiera de
// esos scripts invalida el suyo. Por eso existe `--check`: falla ruidosamente
// antes de desplegar, en vez de romper la página en producción.
//
// `media-src` sale de los `<video>`/`<source>` del propio build y no de una
// lista a mano: así sigue a `PUBLIC_MEDIA_BASE_URL` sin abrirse a `https:`.
//
//   node scripts/csp-hashes.mjs --check   → falla si la CSP esta desfasada
//   node scripts/csp-hashes.mjs --write   → reescribe las directivas
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const HEADERS_FILE = 'nginx-security-headers.conf';
const INLINE_SCRIPT = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g;
const MEDIA_ELEMENT = /<(?:video|source)\b[^>]*\bsrc="(https?:\/\/[^"]+)"/g;
// Anclado a la cabecera, no al texto suelto: hay comentarios que nombran las
// directivas y una sustitucion ingenua los reescribiria a ellos.
const directivePattern = (name) =>
  new RegExp(`(?<=add_header Content-Security-Policy "[^"]*?)${name} [^;"]*`);

const htmlFiles = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const path = join(dir, entry.name);
  if (entry.isDirectory()) return htmlFiles(path);
  return entry.name.endsWith('.html') ? [path] : [];
});

const hashes = new Set();
const mediaOrigins = new Set();
for (const file of htmlFiles(DIST)) {
  const html = readFileSync(file, 'utf8');
  for (const [, body] of html.matchAll(INLINE_SCRIPT)) {
    hashes.add(`'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`);
  }
  for (const [, src] of html.matchAll(MEDIA_ELEMENT)) {
    mediaOrigins.add(new URL(src).origin);
  }
}

const expected = {
  'script-src': `script-src 'self' ${[...hashes].sort().join(' ')}`,
  'media-src': ["media-src 'self'", ...[...mediaOrigins].sort()].join(' '),
};

let conf = readFileSync(HEADERS_FILE, 'utf8');
const stale = Object.entries(expected).flatMap(([name, directive]) => {
  const pattern = directivePattern(name);
  const current = conf.match(pattern)?.[0];
  if (current === undefined) throw new Error(`${HEADERS_FILE} no declara ${name}`);
  conf = conf.replace(pattern, directive);
  return current === directive ? [] : [{ name, directive, current }];
});

if (process.argv.includes('--write')) {
  writeFileSync(HEADERS_FILE, conf);
  console.log(`${HEADERS_FILE} actualizado: ${hashes.size} hashes, ${mediaOrigins.size} origenes de media`);
} else if (stale.length) {
  for (const { name, directive, current } of stale) {
    console.error(
      `${HEADERS_FILE}: ${name} esta desfasado respecto a dist/.\n`
      + `  esperado: ${directive}\n`
      + `  actual:   ${current}`,
    );
  }
  console.error('Ejecuta: npm run csp:write');
  process.exit(1);
} else {
  console.log(`CSP al dia: ${hashes.size} hashes, ${mediaOrigins.size} origenes de media`);
}
