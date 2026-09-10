import { expect, test } from '@playwright/test';

import { DEFAULT_TIMING } from '../../src/lib/reveal/defaults';
import { clamp, resolveRingTiming } from '../../src/lib/reveal/timing';

test('clamp acota por ambos extremos y deja pasar lo que ya está dentro', () => {
  expect(clamp(-5, 0, 1)).toBe(0);
  expect(clamp(5, 0, 1)).toBe(1);
  expect(clamp(0.25, 0, 1)).toBe(0.25);
});

test('el anillo cierra donde lo hacía la secuencia de referencia', () => {
  // Valor que producía la ruta por frames de Capucci antes de retirarla:
  // riseDur + rotateCenterDur * (ringEndFrame-1 - (centerFrame-1))
  //                           / (rotateEnd*(nominalFrameCount-1) - (centerFrame-1))
  const { riseDur, rotateCenterDur, centerFrame, ringEndFrame, rotateEnd, nominalFrameCount } =
    DEFAULT_TIMING;
  const lastIdx = Math.round(rotateEnd * (nominalFrameCount - 1));
  const esperado = riseDur + rotateCenterDur * ((ringEndFrame - 1 - (centerFrame - 1)) / (lastIdx - (centerFrame - 1)));

  expect(resolveRingTiming(DEFAULT_TIMING).ringCloseAt).toBeCloseTo(esperado, 6);
});

test('el anillo cierra antes de que termine el giro', () => {
  const { ringCloseAt, entranceDur } = resolveRingTiming(DEFAULT_TIMING);

  expect(ringCloseAt).toBeGreaterThan(DEFAULT_TIMING.riseDur);
  expect(ringCloseAt).toBeLessThan(entranceDur);
});

test('la entrada dura la subida más el giro: es el reloj que recorre el scroll', () => {
  const { entranceDur } = resolveRingTiming(DEFAULT_TIMING);

  expect(entranceDur).toBe(DEFAULT_TIMING.riseDur + DEFAULT_TIMING.rotateCenterDur);
});

test('una referencia demasiado corta deja que el anillo ocupe toda la fase', () => {
  // `nominalFrameCount` por debajo de `centerFrame`: no hay giro del que sacar
  // proporción, así que el cierre se estira hasta el final en vez de dar NaN.
  const timing = { ...DEFAULT_TIMING, nominalFrameCount: 2 };
  const { ringDur, ringCloseAt } = resolveRingTiming(timing);

  expect(ringDur).toBe(timing.rotateCenterDur);
  expect(Number.isFinite(ringCloseAt)).toBe(true);
});

test('adelantar ringEndFrame adelanta el cierre y no toca la duración total', () => {
  const antes = resolveRingTiming(DEFAULT_TIMING);
  const despues = resolveRingTiming({ ...DEFAULT_TIMING, ringEndFrame: 30 });

  expect(despues.ringCloseAt).toBeLessThan(antes.ringCloseAt);
  expect(despues.entranceDur).toBe(antes.entranceDur);
});
