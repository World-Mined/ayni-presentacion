import type { TimingConfig } from './types';

/** Acota un valor al rango dado. Vive aquí, el módulo hoja del reveal, para
 *  que el motor y el cálculo de hitos no lleven dos copias que puedan
 *  divergir en los bordes. */
export const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

/**
 * Resuelve los hitos compartidos por el anillo y las ramas. Mantener este
 * cálculo fuera del motor evita que la vista móvil o un producto adelanten las
 * etiquetas con una constante independiente del cierre real del círculo.
 */
export function resolveRingTiming(timing: TimingConfig, frameCount: number) {
  const count = Math.max(1, frameCount);
  const centerIdx = clamp(timing.centerFrame - 1, 0, count - 1);
  const endIdx = Math.round(timing.rotateEnd * (count - 1));
  const ringFromIdx = Math.max(0, timing.ringStartFrame - 1);
  const ringToIdx = Math.max(ringFromIdx + 1, timing.ringEndFrame - 1);
  const ringFollowsFrames = endIdx > centerIdx && ringToIdx <= endIdx;

  const nominalEnd = Math.round(timing.rotateEnd * (timing.nominalFrameCount - 1));
  const nominalCenter = clamp(timing.centerFrame - 1, 0, nominalEnd);
  const timedRingRatio = nominalEnd > nominalCenter
    ? clamp((ringToIdx - nominalCenter) / (nominalEnd - nominalCenter), 0, 1)
    : 1;
  const timedRingDur = timing.rotateCenterDur * timedRingRatio;

  const ringCloseAt = ringFollowsFrames
    ? ringToIdx <= centerIdx
      ? (ringToIdx / Math.max(1, centerIdx)) * timing.riseDur
      : timing.riseDur
        + ((ringToIdx - centerIdx) / Math.max(1, endIdx - centerIdx)) * timing.rotateCenterDur
    : timing.riseDur + timedRingDur;

  return {
    centerIdx,
    endIdx,
    ringFromIdx,
    ringToIdx,
    ringFollowsFrames,
    timedRingDur,
    ringCloseAt,
  };
}
