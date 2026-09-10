// Las funciones puras del reveal y del reencuadre de la portada se exportan
// para poder probarse sin navegador. Se ejecutan con el runner de Playwright
// que el repo ya tiene, en una config aparte: la de `playwright.config.ts`
// levanta `astro preview` antes de cada corrida, y estas pruebas no lo
// necesitan.
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/unit',
  outputDir: './output/playwright/unit-results',
  reporter: 'list',
});
