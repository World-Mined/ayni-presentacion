// Geometría del reencuadre de la portada. Vive aparte de `hero-video.ts`
// porque no toca el DOM: son funciones puras sobre rectángulos, y ese módulo
// además arranca solo al importarse. Separadas, se pueden probar sin navegador.
import { HOME_VIDEO_SOURCE_FRAME } from '../../data/home-video';

export type Rect = readonly [number, number, number, number];

/** Fracción del ancho original que conserva el reencuadre del logotipo:
 *  suficiente para mostrar AYNI completo y mantener una escala protagonista. */
export const TITLE_CROP_WIDTH = 0.58;

/** Degradado que desvanece los bordes superior e inferior del reencuadre para
 *  integrarlo con el mismo fotograma ampliado que permanece detrás. */
export const TITLE_FADE_STOPS = [0, 0.12, 0.88, 1] as const;

/** Qué parte del ancho del video llega a verse con `object-fit:cover`.
 *  Devuelve 1 cuando el contenedor es más ancho que el video: ahí el recorte
 *  es vertical y no parte la composición. */
export function visibleWidthFraction(containerAspect: number, videoAspect: number) {
  if (!Number.isFinite(containerAspect) || !Number.isFinite(videoAspect)) return 1;
  if (containerAspect <= 0 || videoAspect <= 0) return 1;
  return Math.min(1, containerAspect / videoAspect);
}

/** El reencuadre hace falta cuando `cover` enseña menos ancho del que el propio
 *  reencuadre conserva: por debajo de ese punto la composición ya está partida.
 *
 *  Se decide por proporción, nunca por ancho de viewport. Un móvil en
 *  horizontal es estrecho y aun así no recorta los lados, y una ventana de
 *  escritorio angosta sí puede recortarlos: el ancho no distingue esos casos. */
export function needsReframe(containerAspect: number, videoAspect: number) {
  return visibleWidthFraction(containerAspect, videoAspect) < TITLE_CROP_WIDTH;
}

/** Ajusta un recorte al encuadre de destino quitando lo mínimo desde el
 *  centro. Nunca deforma: sacrifica píxeles, no proporción. */
export function fitCrop(source: Rect, destinationRatio: number): Rect {
  const [x, y, width, height] = source;
  if (!Number.isFinite(destinationRatio) || destinationRatio <= 0) return source;

  if (width / height > destinationRatio) {
    const cropped = height * destinationRatio;
    return [x + (width - cropped) / 2, y, cropped, height];
  }
  const cropped = width / destinationRatio;
  return [x, y + (height - cropped) / 2, width, cropped];
}

/** Traduce un recorte medido sobre `HOME_VIDEO_SOURCE_FRAME` a la resolución
 *  real del video. Es lo que permite reencodar el máster sin reescribir las
 *  coordenadas del mosaico. */
export function scaleToVideo(source: Rect, videoWidth: number, videoHeight: number): Rect {
  const scaleX = videoWidth / HOME_VIDEO_SOURCE_FRAME.width;
  const scaleY = videoHeight / HOME_VIDEO_SOURCE_FRAME.height;
  return [source[0] * scaleX, source[1] * scaleY, source[2] * scaleX, source[3] * scaleY];
}
