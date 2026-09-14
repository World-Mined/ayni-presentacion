import { expect, test } from '@playwright/test';

// La entrada del reveal la sirve un MP4 y ya no existe la ruta por secuencia
// de .webp. Estas pruebas fijan las dos mitades de esa decisión: que la página
// no pida ningún frame, y que el motor arranque de verdad sobre el <video>.
const products = ['capucci-360', 'moravi-360', 'reset-360'] as const;

for (const slug of products) {
  test(`${slug}: el reveal arranca sobre el video, sin frames`, async ({ page }) => {
    const frameRequests: string[] = [];
    page.on('request', (request) => {
      if (/\/reveal\/.*frame-\d+\.webp$/.test(request.url())) frameRequests.push(request.url());
    });

    await page.goto(`/productos/${slug}`);

    const track = page.locator('[data-reveal]');
    // Ningún producto debe emitir ya la variante en <img> del producto.
    await expect(page.locator('img.reveal-product')).toHaveCount(0);
    await expect(track.locator('video.reveal-product')).toHaveCount(1);

    await track.scrollIntoViewIfNeeded();
    await expect(track).toHaveClass(/reveal-initialized/);
    await expect(track).toHaveAttribute('data-media-ready', 'true', { timeout: 15_000 });
    // `data-media-ready` también se levanta ante un error de red, para no dejar
    // la sección bloqueada. Por eso no basta: hay que confirmar que el MP4
    // remoto decodificó un fotograma de verdad.
    const media = await track.locator('video.reveal-product').evaluate((video: HTMLVideoElement) => ({
      error: video.error?.code ?? null,
      readyState: video.readyState,
    }));
    expect(media.error).toBeNull();
    expect(media.readyState).toBeGreaterThanOrEqual(2);

    expect(frameRequests).toEqual([]);
  });
}

test('el reenganche compacto no pausa un reveal que ya está entrando', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => {
    const state = window as Window & {
      __revealPauseStates?: Array<string | null>;
      __revealSnapCount?: number;
    };
    const nativePause = HTMLMediaElement.prototype.pause;
    const nativeScrollTo = window.scrollTo.bind(window);

    HTMLMediaElement.prototype.pause = function pause() {
      state.__revealPauseStates ??= [];
      state.__revealPauseStates.push(
        this.closest('[data-reveal]')?.getAttribute('data-reveal-state') ?? null,
      );
      return nativePause.call(this);
    };
    window.scrollTo = ((...args: Parameters<typeof window.scrollTo>) => {
      const options = args[0];
      if (typeof options === 'object' && options?.behavior === 'smooth') {
        state.__revealSnapCount = (state.__revealSnapCount ?? 0) + 1;
        return;
      }
      nativeScrollTo(...args);
    }) as typeof window.scrollTo;
  });

  await page.goto('/productos/capucci-360');
  const track = page.locator('[data-reveal]');
  const video = track.locator('video.reveal-product');
  await expect(track).toHaveAttribute('data-media-ready', 'true', { timeout: 15_000 });

  const trackTop = await track.evaluate((element) => element.getBoundingClientRect().top + window.scrollY);
  await page.evaluate((top) => window.scrollTo(0, top - window.innerHeight * 0.31), trackTop);
  await expect.poll(() => page.evaluate(() => (
    window as Window & { __revealSnapCount?: number }
  ).__revealSnapCount ?? 0)).toBe(1);

  await page.evaluate((top) => window.scrollTo(0, top - window.innerHeight * 0.26), trackTop);
  await expect(track).toHaveAttribute('data-reveal-state', 'showing');

  // El primer snap cancelado libera su seguro tras 700 ms de verificación y
  // 180 ms de asentamiento. El siguiente movimiento reproduce el reenganche
  // que antes pausaba el video a mitad de la entrada.
  await page.waitForTimeout(950);
  await page.evaluate(() => window.scrollBy(0, 8));
  await expect.poll(() => page.evaluate(() => (
    window as Window & { __revealSnapCount?: number }
  ).__revealSnapCount ?? 0)).toBe(2);

  const pauseStates = await page.evaluate(() => (
    window as Window & { __revealPauseStates?: Array<string | null> }
  ).__revealPauseStates ?? []);
  expect(pauseStates).not.toContain('showing');
  expect(pauseStates).not.toContain('shown');
  await expect.poll(() => video.evaluate((media: HTMLVideoElement) => media.paused)).toBe(false);
  await expect(track).toHaveAttribute('data-reveal-state', 'shown', { timeout: 5_000 });
});
