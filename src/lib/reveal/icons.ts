import type { IconKey } from './types';

// Iconos line-art (contenido interno de un <svg viewBox="0 0 24 24">).
// ⚠ PLACEHOLDERS: reemplaza cada path por el SVG real que dé el equipo de diseño.
// Para agregar un icono nuevo: añade la clave aquí y en IconKey (types.ts).
export const ICONS: Record<IconKey, string> = {
  leaf:  '<path d="M4 20c8 0 16-6 16-16C10 4 4 12 4 20zM4 20 14 10" fill="none" stroke="currentColor" stroke-width="1.6"/>',
  berry: '<circle cx="12" cy="13" r="7" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 6V3M12 3l3 1" fill="none" stroke="currentColor" stroke-width="1.6"/>',
  spiral:'<path d="M12 3c5 0 7 4 5 8s-8 3-8-1 5-4 5 0" fill="none" stroke="currentColor" stroke-width="1.6"/>',
  mush:  '<path d="M4 11a8 8 0 0116 0z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M10 11v7a2 2 0 004 0v-7" fill="none" stroke="currentColor" stroke-width="1.6"/>',
  root:  '<path d="M12 3v10M12 13c-3 0-5 3-5 6M12 13c3 0 5 3 5 6" fill="none" stroke="currentColor" stroke-width="1.6"/>',
  mol:   '<circle cx="7" cy="8" r="2.4" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="16" cy="10" r="2.4" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="11" cy="17" r="2.4" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9 9l5 1M15 12l-3 3" stroke="currentColor" stroke-width="1.4"/>',
  bean:  '<path d="M8 4c6 0 10 4 8 10s-10 6-12 0S4 4 8 4z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9 6c3 4 3 8 0 12" fill="none" stroke="currentColor" stroke-width="1.4"/>',
};
