# Media de AYNI

## Los videos se sirven desde S3

Los videos del sitio se solicitan a S3 mediante `mediaUrl()`
(`src/data/media.ts`), cuyo origen se puede sobreescribir con
`PUBLIC_MEDIA_BASE_URL`.

| archivo | servido desde | notas |
| --- | --- | --- |
| `video-naturaleza-ayni.mp4` | S3 | fondo de la portada y objeto sobre el que se verificaron los cues (`HeroSection/HeroSection.astro`) |
| `ayni-about.mp4` | S3 | presentación de “¿Qué es AYNI?”, en el CTA “Conoce más” de `HomeOverview.astro` |

## El video de portada tiene medidas tomadas a mano

Su cierre —el mosaico de cinco planos y el logotipo— se recompone en un canvas
cuando el viewport es demasiado vertical para mostrarlo entero. Esa recomposición
depende de tiempos y recortes medidos sobre el montaje, y viven todos en
**`src/data/home-video.ts`**: los segundos de cada tramo, la resolución del máster
(1280 × 768) y las coordenadas de las cinco tarjetas.

El 10 de septiembre de 2026 se compararon los fotogramas de los tres cues con
el objeto S3 `video-naturaleza-ayni.mp4`: es el mismo montaje, aunque el objeto
servido es otro encode (60 fps). El motor valida también su duración antes de
activar el reencuadre. Si se reemplaza por otro montaje, hay que volver a medir
`home-video.ts`; un cambio de resolución aislado no rompe los recortes porque se
normalizan contra la resolución declarada.
