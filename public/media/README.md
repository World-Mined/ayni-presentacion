# Media de AYNI

Los videos de esta carpeta se entregan como fondos visuales del sitio:
reproducción automática, en bucle y sin sonido hasta que el usuario lo activa.

## Los `.mp4` no están en el repositorio

Pesan más de lo que conviene guardar en git (`ayni-home.mp4` son ~10 MB), así
que están ignorados en `.gitignore`. Quien clone el repo tiene que colocarlos
aquí a mano antes de levantar el sitio.

| archivo | usado por | notas |
| --- | --- | --- |
| `ayni-home.mp4` | `src/components/v2/HeroSection.astro` | fondo de la portada |
| `ayni-about.mp4` | CTA “Conoce más” de `HomeOverview.astro` | presentación de “¿Qué es AYNI?”; sustituir `/media/ayni-about.mp4` por su URL de S3 al publicarla |

## `ayni-home.mp4` tiene medidas tomadas a mano

Su cierre —el mosaico de cinco planos y el logotipo— se recompone en un canvas
cuando el viewport es demasiado vertical para mostrarlo entero. Esa recomposición
depende de tiempos y recortes medidos sobre este archivo concreto, y viven todos
en **`src/data/home-video.ts`**: los segundos de cada tramo, la resolución del
máster (1280 × 768) y las coordenadas de las cinco tarjetas.

Si reemplazas o reencodas el video, vuelve a medir ahí. Los recortes se
normalizan contra la resolución declarada, así que un reencode a otro tamaño no
los rompe; los **tiempos sí hay que revisarlos** porque nada los valida en el
build.

Sin el archivo la portada no rompe: el `<video>` se queda en su fondo sólido y
el resto de la página funciona igual. Pero la portada pierde su contenido
principal, así que no despliegues sin él.

Pídeselos a alguien del equipo que ya los tenga, o cópialos del último
despliegue. Cuando se decida un hosting definitivo (CDN o Git LFS), esta
sección se reemplaza por la URL de descarga.
