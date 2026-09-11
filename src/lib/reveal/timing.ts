import type { TimingConfig, VideoConfig } from './types';

/** Acota un valor al rango dado. Vive aquí, el módulo hoja del reveal, para
 *  que el motor y el cálculo de hitos no lleven dos copias que puedan
 *  divergir en los bordes. */
export const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

/**
 * Traduce los hitos del MP4 al reloj del motor.
 *
 * La cinta corre acelerada, así que sus marcas no son las del motor: los
 * 1800 ms en que el arco del video se cierra son 1440 ms de reloj a 1.25x.
 * Olvidar esa división es lo que dejaba las ramas saliendo ~300 ms después de
 * que el círculo ya se había cerrado en pantalla.
 *
 * El cálculo vive fuera del motor para que la vista móvil y el anillo de
 * escritorio salgan del mismo número en vez de llevar cada uno su constante.
 */
export function resolveRingTiming(timing: TimingConfig, video: VideoConfig) {
  const entranceDur = timing.riseDur + timing.rotateCenterDur;
  const rate = video.playbackRate ?? 1;
  // Nunca antes de que el producto llegue al centro ni después de que termine
  // la entrada: una cinta mal medida desafina, pero no rompe la animación.
  const ringCloseAt = clamp(video.ringCloseMs / rate, timing.riseDur, entranceDur);

  return {
    /** ms que tarda el anillo del motor en cerrarse, ya dentro del giro. */
    ringDur: ringCloseAt - timing.riseDur,
    /** Instante en que el círculo cierra; ahí arrancan las ramas. */
    ringCloseAt,
    /** Duración total de la entrada, que es también el reloj del scroll. */
    entranceDur,
  };
}
