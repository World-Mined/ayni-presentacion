import type { TimingConfig } from './types';

/** Acota un valor al rango dado. Vive aquí, el módulo hoja del reveal, para
 *  que el motor y el cálculo de hitos no lleven dos copias que puedan
 *  divergir en los bordes. */
export const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

/**
 * Traduce a milisegundos los hitos que `TimingConfig` expresa como posiciones
 * dentro de la secuencia nominal de referencia.
 *
 * La entrada del producto la sirve el MP4, así que no hay frames reales a los
 * que amarrar el anillo: se dibuja por tiempo. Lo que fija ese tiempo es la
 * proporción del giro que ocupa el cierre según `nominalFrameCount`, y por eso
 * el cálculo vive fuera del motor: mantiene alineados el anillo del escritorio
 * y el adelanto de etiquetas de la vista móvil, en vez de dejar que cada uno
 * lleve su propia constante a ojo.
 */
export function resolveRingTiming(timing: TimingConfig) {
  const lastIdx = Math.round(timing.rotateEnd * (timing.nominalFrameCount - 1));
  const centerIdx = clamp(timing.centerFrame - 1, 0, lastIdx);
  const ringFromIdx = Math.max(0, timing.ringStartFrame - 1);
  const ringToIdx = Math.max(ringFromIdx + 1, timing.ringEndFrame - 1);

  // Si la referencia se queda corta para los tiempos, el anillo ocupa toda la fase.
  const ringRatio = lastIdx > centerIdx
    ? clamp((ringToIdx - centerIdx) / (lastIdx - centerIdx), 0, 1)
    : 1;
  const ringDur = timing.rotateCenterDur * ringRatio;

  return {
    /** ms que tarda el anillo en cerrarse, ya dentro de la fase de giro. */
    ringDur,
    /** Instante en que el círculo cierra; ahí arrancan las ramas. */
    ringCloseAt: timing.riseDur + ringDur,
    /** Duración total de la entrada, que es también el reloj del scroll. */
    entranceDur: timing.riseDur + timing.rotateCenterDur,
  };
}
