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

    expect(frameRequests).toEqual([]);
  });
}
