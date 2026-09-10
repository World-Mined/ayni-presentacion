import type { RevealConfig } from '../types';
import { mediaUrl, REVEAL_BACKGROUND_URL } from '../../../data/media';

// Datos de Capucci 360. Para un producto nuevo: copia este archivo, cambia
// title/video/labels (y overrides de timing/geometry/scroll si hacen falta),
// y regístralo en products/index.ts.
export const capucci: RevealConfig = {
  id: 'capucci',
  title: { main: 'CAPUCCI 360', sub: 'La fórmula 7 en 1' },
  // El MP4 conserva la animación entregada. Su secuencia original de 47 frames
  // ya no vive en el repo; sigue siendo la referencia de ritmo a través de
  // `nominalFrameCount` en los defaults.
  video: { src: mediaUrl('capucci.mp4'), playbackRate: 1.25 },
  background: REVEAL_BACKGROUND_URL,

  // Ingredientes impresos en el empaque. El orden de la lista = orden de aparición
  // cuando labelsOrder es 'sequence' (derecha primero, luego izquierda).
  labels: [
    { id: 'moringa', name: 'Moringa', side: 'right', row: 0, icon: 'leaf' },
    { id: 'amalaki', name: 'Amalaki', side: 'right', row: 1, icon: 'berry' },
    { id: 'espirulina', name: 'Espirulina', side: 'right', row: 2, icon: 'spiral' },
    { id: 'ganoderma', name: 'Ganoderma', side: 'left', row: 0, icon: 'mush' },
    { id: 'maca', name: 'Maca', side: 'left', row: 1, icon: 'root' },
    { id: 'colageno', name: 'Colágeno', side: 'left', row: 2, icon: 'mol' },
    { id: 'cafe', name: 'Café', side: 'left', row: 3, icon: 'bean' },
  ],

  scroll: { revRate: 3 },
  timing: { labelsStagger: 15, labelsDur: 100 },
  geometry: { ringRadius: 394 },
};
