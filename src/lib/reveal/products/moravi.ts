import type { RevealConfig } from '../types';

// Datos de Moravi 360 (Figma "Productos 1.3 Moravi 360", nodo 1066:24297).
export const moravi: RevealConfig = {
  id: 'moravi',
  // Figma rotula "La fórmula 6 en 1" pero lista siete ingredientes; se
  // mantiene el rótulo del diseño.
  title: { main: 'MORAVI 360', sub: 'La fórmula 6 en 1' },
  // TODO(assets): igual que Reset, faltan los frames de la rotación.
  frames: { dir: '/reveal/moravi', count: 1 },
  background: '/reveal/mandala.webp',

  labels: [
    { id: 'acai', name: 'Acaí Berry', side: 'right', row: 0, icon: 'berry' },
    { id: 'platano', name: 'Plátano Verde', side: 'right', row: 1, icon: 'leaf' },
    { id: 'limon', name: 'Limón', side: 'right', row: 2, icon: 'berry' },
    { id: 'brocoli', name: 'Brocoli', side: 'left', row: 0, icon: 'leaf' },
    { id: 'amalaki', name: 'Amalaki', side: 'left', row: 1, icon: 'berry' },
    { id: 'moringa', name: 'Moringa', side: 'left', row: 2, icon: 'leaf' },
  ],
};
