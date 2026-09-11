import type { TimingConfig, GeometryConfig, ScrollConfig } from './types';

// ─────────────────────────────────────────────────────────────────────────────
//  DEFAULTS — el "feel" afinado. Cada producto solo sobreescribe lo que necesite;
//  el motor hace { ...DEFAULT_*, ...product.* }.
//  Regla general: MENOR = pasa antes / más rápido · MAYOR = después / más lento.
// ─────────────────────────────────────────────────────────────────────────────

/** Curva "popup": ease-out-back (pasa un pelín del destino y regresa).
 *  s más alto = MÁS rebote · s = 0 = sin rebote. */
export const popupCurve = (s = 1.6) => (t: number) =>
  1 + (s + 1) * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2);

export const DEFAULT_TIMING: TimingConfig = {
  // 1) ENTRADA (el MP4 trae el movimiento; esto es el compás que lo acompaña)
  riseDur: 700,            // ms en subir al centro. MENOR → llega antes
  rotateCenterDur: 1500,   // ms del giro en el centro. MAYOR → gira más lento en el sitio
  titleDur: 500,           // ms del popup del título
  curve: popupCurve(1.6),  // movimiento al centro con rebote (popup)

  // 2) RAMAS
  labelsStagger: 32,       // ráfaga corta: las ramas salen casi juntas
  labelsOrder: 'sequence', // 'sequence' (orden de la lista) · 'random' (barajado)
  labelsDur: 160,          // salida rápida desde el anillo hacia las etiquetas
};

export const DEFAULT_GEOMETRY: GeometryConfig = {
  center: { x: 960, y: 594 },
  ringRadius: 378,
  rowsY: [310, 494, 678, 862],
  iconX: { left: 560, right: 1360 },
};

export const DEFAULT_SCROLL: ScrollConfig = {
  // Un tramo de 60vh deja percibir el microparallax sin convertir el
  // reveal en una pantalla larga retenida.
  trackVH: 160,
  showAt: 0.12,   // % para aparecer. MENOR → con menos scroll
  hideAt: 0.08,   // % para desaparecer (⚠ debe ser < showAt)
  revRate: 1.9,   // velocidad original de la animación inversa
};
