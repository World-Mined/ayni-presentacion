import type { RevealConfig } from '../types';

// Datos de Reset 360 (Figma "Productos 1.1 Reset 360", nodo 1066:24654).
export const reset: RevealConfig = {
  id: 'reset',
  title: { main: 'RESET 360', sub: 'La fórmula 8 en 1' },
  // TODO(assets): faltan los frames de la rotación. Con `count: 1` el motor
  // repite frame-01 y la secuencia se queda sin giro, pero la entrada, el
  // círculo y las ramas funcionan igual. Cuando lleguen los frames, súbelos a
  // /public/reveal/reset y pon aquí el número real.
  frames: { dir: '/reveal/reset', count: 1 },
  background: '/reveal/mandala.webp',

  // Ingredientes impresos en el empaque. El orden de la lista = orden de
  // aparición: primero la columna derecha, después la izquierda.
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
