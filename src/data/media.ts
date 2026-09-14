import revealMandala from '../assets/v2/products-reveal-mandala.webp';

// Origen de los videos. Se lee del entorno para que un despliegue de staging
// pueda apuntar a otro bucket sin tocar código; el valor de producción queda
// como default para que un clon sin `.env` siga funcionando. `||` y no `??`:
// una variable declarada vacía (`ARG` de Docker sin valor) también cae al
// default, en vez de dejar rutas relativas como `/capucci.mp4`.
export const MEDIA_BASE_URL = (
  import.meta.env.PUBLIC_MEDIA_BASE_URL || 'https://ayni.s3.us-east-1.amazonaws.com/videos'
).replace(/\/+$/, '');
export const REVEAL_BACKGROUND_URL = revealMandala.src;

export const mediaUrl = (file: string) => `${MEDIA_BASE_URL}/${file}`;

export const ABOUT_VIDEO_URL = mediaUrl('ayni-about.mp4');
