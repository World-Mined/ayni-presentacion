import type { RevealConfig } from '../types';

// Datos de Capucci 360. Para un producto nuevo: copia este archivo, cambia
// title/frames/labels (y overrides de timing/geometry/scroll si hacen falta),
// y regístralo en products/index.ts.
export const capucci: RevealConfig = {
  id: 'capucci',
  title: { main: 'CAPUCCI 360', sub: 'La fórmula 7 en 1' },
  frames: { dir: '/reveal/capucci', count: 47 }, // /public/reveal/capucci/frame-01.webp …
  // El MP4 conserva la animación entregada y los frames quedan como respaldo.
  video: { src: 'https://ayni.s3.us-east-1.amazonaws.com/videos/capucci.mp4', labelsStart: 1550, playbackRate: 1.25 },
  background: '/reveal/mandala.webp',

  // Ingredientes impresos en el empaque. El orden de la lista = orden de aparición
  // cuando labelsOrder es 'sequence' (derecha primero, luego izquierda).
  labels: [
    { id: 'moringa', name: 'Moringa', side: 'right', row: 0, icon: 'leaf' },
    { id: 'amalaki', name: 'Amalaki', side: 'right', row: 1, icon: 'berry' },
    { id: 'espirulina', name: 'Espirulina', side: 'right', row: 2, icon: 'spiral' },
    { id: 'cafe', name: 'Café', side: 'right', row: 3, icon: 'bean' },
    { id: 'ganoderma', name: 'Ganoderma', side: 'left', row: 0, icon: 'mush' },
    { id: 'maca', name: 'Maca', side: 'left', row: 1, icon: 'root' },
    { id: 'colageno', name: 'Colágeno', side: 'left', row: 2, icon: 'mol' },
  ],

  scroll: { revRate: 3 },
  timing: { labelsStagger: 15, labelsDur: 100 },
  geometry: { ringRadius: 394 },
};
