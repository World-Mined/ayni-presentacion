import { expect, test } from '@playwright/test';

import { DEFAULT_TIMING } from '../../src/lib/reveal/defaults';
import { clamp, resolveRingTiming } from '../../src/lib/reveal/timing';

const video = (over: Partial<{ ringCloseMs: number; playbackRate: number }> = {}) => ({
  src: 'https://example.test/x.mp4',
  ringCloseMs: 1800,
  playbackRate: 1.25,
  ...over,
});

test('clamp acota por ambos extremos y deja pasar lo que ya está dentro', () => {
  expect(clamp(-5, 0, 1)).toBe(0);
  expect(clamp(5, 0, 1)).toBe(1);
  expect(clamp(0.25, 0, 1)).toBe(0.25);
});

test('la marca de la cinta se divide por la velocidad de reproducción', () => {
  // Esta es la regresión que el modelo anterior tenía: derivaba el cierre en
  // milisegundos de reloj e ignoraba que la cinta corre acelerada, así que las
  // ramas salían ~300 ms después de que el círculo ya se hubiera cerrado.
  expect(resolveRingTiming(DEFAULT_TIMING, video()).ringCloseAt).toBeCloseTo(1800 / 1.25, 6);
});

test('sin velocidad declarada la cinta corre a tiempo real', () => {
  const { ringCloseAt } = resolveRingTiming(DEFAULT_TIMING, {
    src: 'https://example.test/x.mp4',
    ringCloseMs: 1200,
  });

  expect(ringCloseAt).toBe(1200);
});

test('acelerar más la cinta adelanta el cierre', () => {
  const lenta = resolveRingTiming(DEFAULT_TIMING, video({ playbackRate: 1 })).ringCloseAt;
  const rapida = resolveRingTiming(DEFAULT_TIMING, video({ playbackRate: 2 })).ringCloseAt;

  expect(rapida).toBeLessThan(lenta);
});

test('el anillo del motor dura desde el centro hasta el cierre', () => {
  const { ringDur, ringCloseAt } = resolveRingTiming(DEFAULT_TIMING, video());

  expect(ringDur).toBeCloseTo(ringCloseAt - DEFAULT_TIMING.riseDur, 6);
  expect(ringDur).toBeGreaterThan(0);
});

test('una cinta mal medida desafina pero no rompe la entrada', () => {
  const temprana = resolveRingTiming(DEFAULT_TIMING, video({ ringCloseMs: 0 }));
  const tardia = resolveRingTiming(DEFAULT_TIMING, video({ ringCloseMs: 999_999 }));

  expect(temprana.ringCloseAt).toBe(DEFAULT_TIMING.riseDur);
  expect(temprana.ringDur).toBe(0);
  expect(tardia.ringCloseAt).toBe(tardia.entranceDur);
});

test('la entrada dura la subida más el giro: es el reloj que recorre el scroll', () => {
  const { entranceDur } = resolveRingTiming(DEFAULT_TIMING, video());

  expect(entranceDur).toBe(DEFAULT_TIMING.riseDur + DEFAULT_TIMING.rotateCenterDur);
});
