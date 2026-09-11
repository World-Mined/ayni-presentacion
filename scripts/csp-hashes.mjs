// Mantiene sincronizados los hashes de `script-src` en `nginx.conf` con los
// scripts en línea que Astro emite en `dist/`.
//
// El sitio es estático, así que no hay nonces posibles: sin hashes, la única
// forma de que el layout arranque es `'unsafe-inline'`, que vacía de sentido la
// política. Con hashes sí cierra, al precio de que un cambio en cualquiera de
// esos scripts invalida el suyo. Por eso existe `--check`: falla ruidosamente
// antes de desplegar, en vez de romper la página en producción.
//
//   node scripts/csp-hashes.mjs --check   → falla si `nginx.conf` esta desfasado
//   node scripts/csp-hashes.mjs --write   → reescribe la directiva
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const NGINX = 'nginx.conf';
const INLINE_SCRIPT = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g;
// Anclado a la cabecera, no al texto suelto: hay comentarios que nombran
// `script-src` y una sustitucion ingenua los reescribiria a ellos.
const SCRIPT_SRC = /(?<=add_header Content-Security-Policy "[^"]*?)script-src [^;]*/;

const htmlFiles = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const path = join(dir, entry.name);
  if (entry.isDirectory()) return htmlFiles(path);
  return entry.name.endsWith('.html') ? [path] : [];
});

const hashes = new Set();
for (const file of htmlFiles(DIST)) {
  const html = readFileSync(file, 'utf8');
  for (const [, body] of html.matchAll(INLINE_SCRIPT)) {
    hashes.add(`'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`);
  }
}

const directive = `script-src 'self' ${[...hashes].sort().join(' ')}`;
const conf = readFileSync(NGINX, 'utf8');
const current = conf.match(SCRIPT_SRC)?.[0];

if (process.argv.includes('--write')) {
  writeFileSync(NGINX, conf.replace(SCRIPT_SRC, directive));
  console.log(`nginx.conf actualizado con ${hashes.size} hashes`);
} else if (current !== directive) {
  console.error(
    `nginx.conf esta desfasado respecto a dist/.\n`
    + `  esperado: ${directive}\n`
    + `  actual:   ${current}\n`
    + `Ejecuta: npm run csp:write`,
  );
  process.exit(1);
} else {
  console.log(`script-src al dia: ${hashes.size} hashes`);
}
