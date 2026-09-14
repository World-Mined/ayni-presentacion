# AYNI — sitio web V2

Sitio web público y responsive de AYNI, construido con Astro y generado como archivos estáticos. Incluye la página principal, catálogo y detalle de productos, puntos de recojo, embajadores, páginas legales y experiencia PWA.

## Rutas principales

| Ruta | Contenido |
| --- | --- |
| `/` | Inicio |
| `/productos` | Catálogo de productos |
| `/productos/moravi-360` | Detalle de Moravi 360 |
| `/productos/capucci-360` | Detalle de Capucci 360 |
| `/productos/reset-360` | Detalle de Reset 360 |
| `/puntos-de-recojo` | Puntos de recojo |
| `/embajadores` | Programa de embajadores |
| `/libro-de-reclamaciones` | Libro de reclamaciones |
| `/legal/[slug]` | Documentos legales |
| `/offline` | Página de respaldo sin conexión |

La ruta `/reveal-demo` se genera únicamente durante el desarrollo.

## Requisitos

- Node.js 22.12 o superior
- npm

## Instalación

```bash
npm install
```

Los videos se sirven desde el origen configurado en `PUBLIC_MEDIA_BASE_URL`. Si la variable no está definida, se usa el bucket público configurado en `src/data/media.ts`.

```env
PUBLIC_MEDIA_BASE_URL=https://ayni.s3.us-east-1.amazonaws.com/videos
```

Consulta [public/media/README.md](public/media/README.md) para el contrato de publicación de medios.

## Desarrollo

Inicia Astro en segundo plano:

```bash
npm run astro -- dev --background
```

Administra el proceso con:

```bash
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
```

## Comandos

| Comando | Descripción |
| --- | --- |
| `npm run build` | Genera el sitio estático en `dist/` |
| `npm run preview` | Sirve localmente el build generado |
| `npm run check` | Ejecuta las validaciones de Astro y TypeScript |
| `npm run test:unit` | Ejecuta las pruebas unitarias con Playwright |
| `npm run test:responsive` | Compila y ejecuta las pruebas responsive y de video |
| `npm run csp:check` | Verifica que los hashes CSP estén actualizados |
| `npm run csp:write` | Regenera los hashes CSP de producción |
| `npm test` | Ejecuta check, pruebas unitarias, pruebas responsive y CSP |
| `npx knip` | Detecta archivos, dependencias y exports sin uso |

## Arquitectura

```text
src/
├── components/
│   ├── reveal/            # Composición y controles de ProductReveal
│   └── v2/                # Componentes de las páginas actuales
├── data/                  # Productos, legales, medios y puntos de recojo
├── layouts/               # Estructura HTML compartida
├── lib/reveal/            # Motor, geometría y temporización del reveal
├── pages/                 # Rutas de Astro
└── styles/v2.css          # Estilos globales del sitio V2

scripts/
└── csp-hashes.mjs         # Generación y validación de hashes CSP

tests/                     # Pruebas unitarias, responsive y de video
```

La salida es estática y la interacción del cliente se implementa con scripts del navegador. Los datos compartidos se mantienen en `src/data/` y el comportamiento de las presentaciones de producto en `src/lib/reveal/`.

## PWA y funcionamiento sin conexión

El service worker se habilita en builds de producción y se actualiza automáticamente:

- Precarga el shell de la aplicación, las páginas generadas y los recursos públicos incluidos en el build.
- Las imágenes optimizadas bajo `/_astro/` se guardan en caché cuando se solicitan.
- Si una navegación no está disponible, usa `/offline.html` como respaldo.
- Los videos remotos no se precargan y requieren conexión.
- El service worker está deshabilitado en el servidor de desarrollo.

Para comprobar este comportamiento:

```bash
npm run build
npm run preview
```

Visita primero las rutas e imágenes que quieras almacenar, activa el modo sin conexión en las herramientas del navegador y vuelve a cargarlas.

## Estado del libro de reclamaciones

La ruta está publicada, pero el envío del formulario permanece deshabilitado hasta que se configure un endpoint de backend. Mientras tanto, la página dirige las solicitudes al correo de soporte mostrado en la interfaz.

## Build con Docker

```bash
docker build -t ayni-presentacion .
docker run --rm -p 8080:80 ayni-presentacion
```

El build de la imagen genera el sitio, actualiza la CSP y lo sirve mediante Nginx.
