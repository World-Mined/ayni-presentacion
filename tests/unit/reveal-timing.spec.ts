import { expect, test } from '@playwright/test';

import { DEFAULT_TIMING } from '../../src/lib/reveal/defaults';
import { clamp, resolveRingTiming } from '../../src/lib/reveal/timing';

test('clamp acota por ambos extremos y deja pasar lo que ya está dentro', () => {
  expect(clamp(-5, 0, 1)).toBe(0);
  expect(clamp(5, 0, 1)).toBe(1);
  expect(clamp(0.25, 0, 1)).toBe(0.25);
});

test('un producto sin secuencia de frames cae en la rama temporizada', () => {
  // Moravi y Reset entregan MP4 y no declaran `frames`, así que `count` es 0.
  const timing = resolveRingTiming(DEFAULT_TIMING, 0);

  expect(timing.ringFollowsFrames).toBe(false);
  expect(timing.ringCloseAt).toBeGreaterThan(DEFAULT_TIMING.riseDur);
  expect(Number.isFinite(timing.ringCloseAt)).toBe(true);
});

test('la secuencia de Capucci y la referencia nominal cierran el anillo a la vez', () => {
  // `nominalFrameCount` existe justo para eso: un producto sin frames debe
  // seguir el mismo ritmo que la secuencia contra la que se afinó todo.
  const withFrames = resolveRingTiming(DEFAULT_TIMING, DEFAULT_TIMING.nominalFrameCount);
  const withoutFrames = resolveRingTiming(DEFAULT_TIMING, 0);

  expect(withFrames.ringFollowsFrames).toBe(true);
  expect(withFrames.ringCloseAt).toBeCloseTo(withoutFrames.ringCloseAt, 6);
});

test('una secuencia de un solo frame no divide entre cero', () => {
  const timing = resolveRingTiming(DEFAULT_TIMING, 1);

  expect(Number.isFinite(timing.ringCloseAt)).toBe(true);
  expect(Number.isNaN(timing.ringCloseAt)).toBe(false);
});

test('el anillo nunca cierra antes de empezar a dibujarse', () => {
  const timing = resolveRingTiming(DEFAULT_TIMING, 47);

  expect(timing.ringToIdx).toBeGreaterThan(timing.ringFromIdx);
});
