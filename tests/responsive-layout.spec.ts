import { expect, test } from '@playwright/test';

const products = [
  { slug: 'moravi-360', revealId: 'moravi', visibleLeft: 0, visibleRight: 698 },
  { slug: 'capucci-360', revealId: 'capucci', visibleLeft: 45, visibleRight: 636 },
  { slug: 'reset-360', revealId: 'reset', visibleLeft: 0, visibleRight: 671 },
] as const;

const viewports = [390, 768, 886, 1023, 1024, 1440] as const;

for (const product of products) {
  test(`${product.revealId}: mantiene la escala y la continuidad de las personas`, async ({ page }) => {
    await page.goto(`/productos/${product.slug}`);

    const people = page.locator('.product-entrepreneur__people img');
    const section = page.locator('.product-entrepreneur');
    let positionAt1023 = 0;
    let positionAt1024 = 0;

    for (const width of viewports) {
      await page.setViewportSize({ width, height: 833 });
      await section.scrollIntoViewIfNeeded();
      await expect.poll(() => people.evaluate((image) => image.complete && image.naturalWidth > 0)).toBe(true);

      const bounds = await people.boundingBox();
      expect(bounds).not.toBeNull();
      if (!bounds) continue;

      // El PNG no se reduce: el encuadre cambia mediante recorte y posición.
      expect(bounds.width).toBeCloseTo(1440, 0);
      expect(bounds.height).toBeCloseTo(480, 0);

      if (width <= 1024) {
        const visibleCenter = bounds.x + (product.visibleLeft + product.visibleRight) / 2;
        expect(Math.abs(visibleCenter - width / 2)).toBeLessThanOrEqual(1);
      }

      // Desde tablet, el grupo opaco completo cabe y no debe salir del viewport.
      if (width >= 768) {
        expect(bounds.x + product.visibleLeft).toBeGreaterThanOrEqual(-1);
        expect(bounds.x + product.visibleRight).toBeLessThanOrEqual(width + 1);
      }

      if (width === 1023) positionAt1023 = bounds.x;
      if (width === 1024) positionAt1024 = bounds.x;
    }

    expect(Math.abs(positionAt1024 - positionAt1023)).toBeLessThanOrEqual(1);
  });
}

test('Otros Productos conserva la proporción y resolución del fondo móvil', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/productos/reset-360');

  const section = page.locator('.other-products');
  await section.scrollIntoViewIfNeeded();
  const scene = section.locator('.other-products__scene img');
  await expect.poll(() => scene.evaluate((image) => image.complete && image.naturalWidth > 0)).toBe(true);

  const image = await scene.evaluate(async (element) => {
    await element.decode();
    const response = await fetch(element.currentSrc);
    const bitmap = await createImageBitmap(await response.blob());
    const bounds = element.getBoundingClientRect();
    const result = {
      bitmapWidth: bitmap.width,
      bitmapHeight: bitmap.height,
      renderedWidth: bounds.width,
      renderedHeight: bounds.height,
      devicePixelRatio: window.devicePixelRatio,
      objectFit: getComputedStyle(element).objectFit,
    };
    bitmap.close();
    return result;
  });

  expect(image.objectFit).toBe('cover');
  expect(image.bitmapWidth / image.bitmapHeight).toBeCloseTo(2.4, 1);
  expect(image.bitmapWidth).toBeGreaterThanOrEqual(image.renderedWidth * image.devicePixelRatio - 1);
  expect(image.renderedWidth).toBeCloseTo(390, 0);
  expect(image.renderedHeight).toBeCloseTo(118, 0);

  const desktopLinks = section.locator('.other-products__pack-link');
  await expect(desktopLinks).toHaveCount(2);
  await expect(desktopLinks.nth(0)).toBeHidden();
  await expect(desktopLinks.nth(1)).toBeHidden();
  await expect(section.locator('a:visible')).toHaveCount(2);
  await expect(section.locator('a:visible').first()).toHaveClass(/other-products__mobile-cta/);
});

test('Puntos de recojo sirve los mapas de Google acotados por sandbox', async ({ page }) => {
  await page.route(/^https:\/\/www\.google\.com\/maps\/embed\?pb=/, (route) => route.fulfill({
    contentType: 'text/html',
    body: '<!doctype html><title>Google Maps test double</title>',
  }));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/puntos-de-recojo');

  const embeds = page.locator('iframe.pickup-map-view__embed');
  await expect(embeds).toHaveCount(8);
  await expect(page.locator('.pickup-map-panel__art')).toHaveCount(0);

  const atributos = await embeds.evaluateAll((frames) => frames.map((frame) => ({
    src: frame.getAttribute('src') ?? '',
    sandbox: frame.getAttribute('sandbox') ?? '',
  })));

  for (const { src, sandbox } of atributos) {
    expect(src.startsWith('https://www.google.com/maps/embed?pb=')).toBe(true);
    expect(src).not.toContain('key=');
    // Lo que el sandbox retiene es lo que importa: un embed comprometido no
    // puede llevarse la ventana superior ni enviar formularios.
    expect(sandbox).toContain('allow-scripts');
    expect(sandbox).not.toContain('allow-top-navigation');
    expect(sandbox).not.toContain('allow-forms');
  }

  await expect(page.locator('iframe[title="Mapa de la sede AYNI en Surco"]')).toBeVisible();
  await expect(page.locator('iframe[title="Mapa de la sede AYNI en San Martín de Porres"]'))
    .toHaveAttribute('src', /0x9105ce8dd668f1ef%3A0x1f5f7769509f66b3/);

  const losOlivos = page.locator('[data-pickup-location="los-olivos"]');
  await losOlivos.click();
  await expect(losOlivos).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('iframe[title="Mapa de la sede AYNI en Los Olivos"]')).toBeVisible();

  await losOlivos.press('ArrowDown');
  await expect(page.locator('[data-pickup-location="trujillo"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('iframe[title="Mapa de la sede AYNI en Trujillo"]')).toBeVisible();

  await page.getByRole('searchbox', { name: 'Buscar punto de recojo' }).fill('Arequipa');
  await expect(page.locator('[data-pickup-location="arequipa"]')).toBeVisible();
  await expect(page.locator('iframe[title="Mapa de la sede AYNI en Arequipa"]')).toBeVisible();

  await page.getByRole('tab', { name: 'Bolivia' }).click();
  await expect(page.locator('.pickup-map-panel__unavailable')).toContainText(/Ubicación\s*no disponible/);
  await expect(page.locator('iframe.pickup-map-view__embed:visible')).toHaveCount(0);
});
