// Datos del video de portada alojado en S3.
//
// El archivo no está versionado —pesa ~10 MB y vive en `.gitignore`, ver
// `public/media/README.md`—, así que todo lo que depende de su montaje concreto
// vive aquí y no enterrado dentro del componente. Si se reemplaza o se reencoda
// el video, esto es lo único que hay que volver a medir.

/** Objeto de S3 sobre el que se verificaron los cues y recortes. */
export const HOME_VIDEO_FILE = 'video-naturaleza-ayni.mp4';

/** Duración del encode servido, usada para no aplicar cues a otro montaje. */
export const HOME_VIDEO_EXPECTED_DURATION = 65.816667;
export const HOME_VIDEO_DURATION_TOLERANCE = 0.25;

/** Tramos del cierre del video, en segundos. */
export const HOME_VIDEO_CUES = {
  /** Entra el mosaico de cinco planos. */
  collageStart: 50.57,
  /** El mosaico da paso al logotipo. */
  titleStart: 54.8,
  /** Último fotograma con el logotipo en pantalla. */
  titleEnd: 58.15,
} as const;

/** Resolución del máster sobre el que se midieron los recortes del mosaico. */
export const HOME_VIDEO_SOURCE_FRAME = { width: 1280, height: 768 } as const;

/** Recorte de una tarjeta del mosaico dentro del fotograma original.
 *  En píxeles de `HOME_VIDEO_SOURCE_FRAME`, en el orden de `drawImage`:
 *  `[x, y, ancho, alto]`. Se normalizan antes de dibujar, así un reencode a
 *  otra resolución los mantiene válidos. */
type CollageSource = readonly [x: number, y: number, width: number, height: number];

/** Las tarjetas del mosaico, en orden de dibujo.
 *
 *  `source` recorta el fotograma horizontal original; `x`/`y` colocan la
 *  tarjeta en el canvas vertical como fracción de su ancho y su alto. Los dos
 *  tamaños (`side` y `center`) están definidos en el propio dibujante: las
 *  laterales conservan casi la proporción del fotograma —así enseñan la mayor
 *  parte del paisaje y sólo sobresalen un poco del viewport— y la central es
 *  más ancha porque es la que sostiene la composición.
 *
 *  El video revela las cinco tarjetas de forma escalonada (≈51.2s, 51.8s,
 *  52.4s, 53.6s y 54.2s); aquí se dibujan todas en cada fotograma y las que
 *  aún no han entrado salen en negro, que es justo lo que muestra el máster. */
export const HOME_VIDEO_COLLAGE_CARDS: readonly {
  readonly source: CollageSource;
  readonly x: number;
  readonly y: number;
  readonly size: 'side' | 'center';
}[] = [
  { source: [24, 40, 438, 250], x: -0.07, y: 0.045, size: 'side' },
  { source: [830, 57, 426, 233], x: 0.55, y: 0.07, size: 'side' },
  { source: [394, 279, 436, 242], x: 0.04, y: 0.37, size: 'center' },
  { source: [24, 527, 385, 241], x: -0.07, y: 0.72, size: 'side' },
  { source: [825, 503, 435, 265], x: 0.55, y: 0.7, size: 'side' },
] as const;
