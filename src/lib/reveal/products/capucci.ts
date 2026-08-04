import type { RevealConfig } from '../types';

// Datos de Capucci 360. Para un producto nuevo: copia este archivo, cambia
// title/frames/labels (y overrides de timing/geometry/scroll si hacen falta),
// y regístralo en products/index.ts.
export const capucci: RevealConfig = {
  id: 'capucci',
  title: { main: 'CAPUCCI 360', sub: 'La fórmula 7 en 1' },
  frames: { dir: '/reveal/capucci', count: 47 }, // /public/reveal/capucci/frame-01.webp …

  // 4 filas por lado (row 0..3). El orden de la lista = orden de aparición
  // cuando labelsOrder es 'sequence' (derecha primero, luego izquierda).
  labels: [
    { name: 'Moringa',             side: 'right', row: 0, icon: 'leaf' },
    { name: 'Amalaki',             side: 'right', row: 1, icon: 'berry' },
    { name: 'Espirulina',          side: 'right', row: 2, icon: 'spiral' },
    { name: 'Nombre del producto', side: 'right', row: 3, icon: 'berry' }, // ⚠ placeholder del diseño
    { name: 'Ganoderma',           side: 'left',  row: 0, icon: 'mush' },
    { name: 'Maca',                side: 'left',  row: 1, icon: 'root' },
    { name: 'Colágeno',            side: 'left',  row: 2, icon: 'mol' },
    { name: 'Café',                side: 'left',  row: 3, icon: 'bean' },
  ],

  // Overrides opcionales (si no, usa DEFAULT_TIMING). Ejemplo:
  // timing: { ringEndFrame: 39, riseDur: 700 },
};
