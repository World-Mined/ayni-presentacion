import { expect, test } from '@playwright/test';

import { HOME_VIDEO_SOURCE_FRAME } from '../../src/data/home-video';
import {
  fitCrop,
  needsReframe,
  scaleToVideo,
  visibleWidthFraction,
} from '../../src/scripts/v2/hero-frame';

const VIDEO_ASPECT = HOME_VIDEO_SOURCE_FRAME.width / HOME_VIDEO_SOURCE_FRAME.height;

test('un contenedor más ancho que el video no recorta los lados', () => {
  expect(visibleWidthFraction(3, VIDEO_ASPECT)).toBe(1);
  expect(visibleWidthFraction(VIDEO_ASPECT, VIDEO_ASPECT)).toBe(1);
});

test('un contenedor vertical sólo deja ver parte del ancho', () => {
  const portrait = 390 / 833;

  expect(visibleWidthFraction(portrait, VIDEO_ASPECT)).toBeLessThan(1);
  expect(visibleWidthFraction(portrait, VIDEO_ASPECT)).toBeGreaterThan(0);
});

test('las medidas inválidas se resuelven sin recorte en vez de propagar NaN', () => {
  expect(visibleWidthFraction(Number.NaN, VIDEO_ASPECT)).toBe(1);
  expect(visibleWidthFraction(0, VIDEO_ASPECT)).toBe(1);
  expect(visibleWidthFraction(1, 0)).toBe(1);
});

test('el reencuadre se decide por proporción, no por ancho de viewport', () => {
  // Un móvil en horizontal es estrecho y aun así no parte la composición;
  // una ventana de escritorio angosta sí puede partirla.
  expect(needsReframe(844 / 390, VIDEO_ASPECT)).toBe(false);
  expect(needsReframe(390 / 844, VIDEO_ASPECT)).toBe(true);
});

test('fitCrop sacrifica píxeles pero nunca deforma', () => {
  const [, , width, height] = fitCrop([0, 0, 400, 200], 1);

  expect(width / height).toBeCloseTo(1, 6);
  expect(width).toBeLessThanOrEqual(400);
  expect(height).toBeLessThanOrEqual(200);
});

test('fitCrop recorta desde el centro', () => {
  const [x, y, width] = fitCrop([0, 0, 400, 200], 1);

  expect(x).toBeCloseTo((400 - width) / 2, 6);
  expect(y).toBe(0);
});

test('fitCrop devuelve el recorte intacto ante una proporción inválida', () => {
  const source = [10, 20, 400, 200] as const;

  expect(fitCrop(source, 0)).toEqual(source);
  expect(fitCrop(source, Number.NaN)).toEqual(source);
});

test('scaleToVideo deja las coordenadas intactas a la resolución del máster', () => {
  const source = [24, 40, 438, 250] as const;

  expect(scaleToVideo(source, HOME_VIDEO_SOURCE_FRAME.width, HOME_VIDEO_SOURCE_FRAME.height))
    .toEqual([24, 40, 438, 250]);
});

test('scaleToVideo acompaña un reencode al doble de resolución', () => {
  const scaled = scaleToVideo(
    [24, 40, 438, 250],
    HOME_VIDEO_SOURCE_FRAME.width * 2,
    HOME_VIDEO_SOURCE_FRAME.height * 2,
  );

  expect(scaled).toEqual([48, 80, 876, 500]);
});
