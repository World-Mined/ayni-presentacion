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

Sin el archivo la portada no rompe: el `<video>` se queda en su fondo sólido y
el resto de la página funciona igual. Pero la portada pierde su contenido
principal, así que no despliegues sin él.

Pídeselos a alguien del equipo que ya los tenga, o cópialos del último
despliegue. Cuando se decida un hosting definitivo (CDN o Git LFS), esta
sección se reemplaza por la URL de descarga.
