# Media de AYNI

Los videos de esta carpeta se entregan como fondos visuales del sitio:
reproducción automática, en bucle y sin sonido hasta que el usuario lo activa.

## Los `.mp4` no están en el repositorio

Pesan más de lo que conviene guardar en git (`ayni-home.mp4` son ~10 MB), así
que están ignorados en `.gitignore`. Quien clone el repo tiene que colocarlos
aquí a mano antes de levantar el sitio.

> **Nota:** ya no queda ningún `.mp4` servido desde esta carpeta. Todos los
> videos del sitio se piden a S3 a través de `mediaUrl()` (`src/data/media.ts`),
> cuyo origen se puede sobreescribir con `PUBLIC_MEDIA_BASE_URL`. Esta carpeta
> se conserva solo como copia local de trabajo.

| archivo | servido desde | notas |
| --- | --- | --- |
| `video-naturaleza-ayni.mp4` | S3 | fondo de la portada y objeto sobre el que se verificaron los cues (`HeroSection/HeroSection.astro`) |
| `ayni-about.mp4` | S3 | presentación de “¿Qué es AYNI?”, en el CTA “Conoce más” de `HomeOverview.astro` |
| `ayni-home.mp4` | — | copia local de referencia del mismo montaje; no es el mismo encode que el objeto S3. |

## `ayni-home.mp4` tiene medidas tomadas a mano

Su cierre —el mosaico de cinco planos y el logotipo— se recompone en un canvas
cuando el viewport es demasiado vertical para mostrarlo entero. Esa recomposición
depende de tiempos y recortes medidos sobre este archivo concreto, y viven todos
en **`src/data/home-video.ts`**: los segundos de cada tramo, la resolución del
máster (1280 × 768) y las coordenadas de las cinco tarjetas.

El 10 de septiembre de 2026 se compararon los fotogramas de los tres cues con
el objeto S3 `video-naturaleza-ayni.mp4`: es el mismo montaje, aunque el objeto
servido es otro encode (60 fps). El motor valida también su duración antes de
activar el reencuadre. Si se reemplaza por otro montaje, hay que volver a medir
`home-video.ts`; un cambio de resolución aislado no rompe los recortes porque se
normalizan contra la resolución declarada.

Sin el archivo la portada no rompe: el `<video>` se queda en su fondo sólido y
el resto de la página funciona igual. Pero la portada pierde su contenido
principal, así que no despliegues sin él.

Pídeselos a alguien del equipo que ya los tenga, o cópialos del último
despliegue. Cuando se decida un hosting definitivo (CDN o Git LFS), esta
sección se reemplaza por la URL de descarga.
