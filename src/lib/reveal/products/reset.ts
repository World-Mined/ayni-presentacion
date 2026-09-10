import type { RevealConfig } from '../types';
import { mediaUrl, REVEAL_BACKGROUND_URL } from '../../../data/media';

// Datos de Reset 360 (Figma "Productos 1.1 Reset 360", nodo 1066:24654).
export const reset: RevealConfig = {
  id: 'reset',
  title: { main: 'RESET 360', sub: 'La fórmula 8 en 1' },
  // Video final entregado por diseño: conserva la entrada original. Las ramas
  // se sincronizan con el cierre del anillo que dibuja el motor.
  video: { src: mediaUrl('reset.mp4'), playbackRate: 1.25 },
  background: REVEAL_BACKGROUND_URL,
  scroll: { revRate: 3 },
  timing: { labelsStagger: 15, labelsDur: 100 },
  geometry: { ringRadius: 394 },

  // Ingredientes y orden actualizados desde Figma (nodo 932:18023). El orden
  // de la lista define la ráfaga: primero la columna derecha, luego izquierda.
  labels: [
    { id: 'amalaki', name: 'Amalaki', side: 'right', row: 0, icon: 'berry' },
    { id: 'chia', name: 'Chía', side: 'right', row: 1, icon: 'bean' },
    { id: 'acai', name: 'Acaí Berry', side: 'right', row: 2, icon: 'berry' },
    { id: 'calabaza', name: 'Calabaza', side: 'right', row: 3, icon: 'root' },
    { id: 'ciruela', name: 'Ciruela', side: 'left', row: 0, icon: 'berry' },
    { id: 'coco', name: 'Coco', side: 'left', row: 1, icon: 'bean' },
    { id: 'pina', name: 'Piña', side: 'left', row: 2, icon: 'leaf' },
    { id: 'papaya', name: 'Papaya', side: 'left', row: 3, icon: 'mol' },
  ],
};
