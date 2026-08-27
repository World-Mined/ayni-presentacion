import type { RevealConfig } from '../types';

// Datos de Moravi 360 (Figma "Productos 1.3 Moravi 360", nodo 1066:24297).
export const moravi: RevealConfig = {
  id: 'moravi',
  // Figma rotula "La fórmula 6 en 1" pero lista siete ingredientes; se
  // mantiene el rótulo del diseño.
  title: { main: 'MORAVI 360', sub: 'La fórmula 6 en 1' },
  // Video final entregado por diseño: conserva entrada y anillo originales.
  frames: { dir: '/reveal/moravi', count: 1 },
  // Adelantamos las ramas apenas antes del cierre visual del MP4 para evitar
  // el vacío que queda entre el anillo y el primer ingrediente.
  video: { src: 'https://ayni.s3.us-east-1.amazonaws.com/videos/moravi.mp4', labelsStart: 1550, playbackRate: 1.25 },
  background: '/reveal/mandala.webp',
  scroll: { revRate: 3 },
  timing: { labelsStagger: 12, labelsDur: 90 },
  // El anillo del video es mayor que el del reveal de Capucci.
  geometry: { ringRadius: 394 },

  labels: [
    { id: 'acai', name: 'Acaí Berry', side: 'right', row: 0, icon: 'berry' },
    { id: 'platano', name: 'Plátano Verde', side: 'right', row: 1, icon: 'leaf' },
    { id: 'limon', name: 'Limón', side: 'right', row: 2, icon: 'berry' },
    { id: 'brocoli', name: 'Brocoli', side: 'left', row: 0, icon: 'leaf' },
    { id: 'amalaki', name: 'Amalaki', side: 'left', row: 1, icon: 'berry' },
    { id: 'moringa', name: 'Moringa', side: 'left', row: 2, icon: 'leaf' },
  ],
};
