/** Vista compacta: móvil, o tablet en horizontal con poca altura.
 *
 *  Lo comparten el motor del reveal, su capa interactiva y la cabecera, que
 *  deben conmutar en el mismo punto. Las hojas CSS no pueden importarla: si se
 *  cambia, hay que actualizar a mano `product-reveal-responsive.css` y el
 *  `<style>` de `SiteHeader.astro`. */
export const COMPACT_VIEWPORT_QUERY = '(max-width: 767px), (max-width: 1023px) and (max-height: 600px)';
