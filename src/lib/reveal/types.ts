// Tipos del "Product Reveal" (animación de producto estilo Onyx).
// El MOTOR (engine.ts) es igual para todos; lo único que cambia por producto
// son los DATOS (title, video, labels) definidos en products/*.ts.
//
// La entrada del producto siempre llega en MP4. Hubo una segunda ruta que la
// reconstruía a partir de una secuencia de .webp; se retiró junto con sus
// archivos, así que `video` es obligatorio y los campos de abajo que hablan de
// el cierre del anillo se toma medido de la propia cinta (`video.ringCloseMs`)
// en vez de reconstruirse a partir de una secuencia de referencia.

export type Side = 'left' | 'right';

/** Claves de icono disponibles (ver icons.ts). */
export type IconKey = 'leaf' | 'berry' | 'spiral' | 'mush' | 'root' | 'mol' | 'bean';

/** Una "rama": etiqueta alrededor del círculo. */
export interface LabelDef {
  /** Id compartido con la escena interactiva del ingrediente. */
  id: string;
  name: string;
  side: Side;   // lado del círculo
  row: number;  // fila 0..3 (posición vertical)
  icon: IconKey;
}

/** Animación compuesta de entrada y anillo, entregada en video. */
export interface VideoConfig {
  src: string;
  /** El MP4 se acelera para caber en el compás del motor. */
  playbackRate?: number;
  /** Momento, en ms DE LA PROPIA CINTA, en que el anillo del MP4 termina de
   *  cerrarse. Es una medida sobre el archivo servido, no una preferencia: se
   *  saca mirando fotograma a fotograma dónde se junta el arco. El motor lo
   *  divide por `playbackRate` para llevarlo a su reloj, y de ahí cuelgan el
   *  cierre de su propio anillo y la salida de las ramas. */
  ringCloseMs: number;
}

/** Tiempos y curvas de la secuencia (todo opcional: usa DEFAULT_TIMING). */
export interface TimingConfig {
  // 1) ENTRADA
  riseDur: number;                  // ms para llegar al centro
  rotateCenterDur: number;          // ms del giro EN EL centro
  titleDur: number;                 // ms del popup del título
  curve: (t: number) => number;     // curva de subida/popup
  // 2) RAMAS
  labelsStagger: number;            // ms entre una rama y otra
  labelsOrder: 'sequence' | 'random';
  labelsDur: number;                // ms de crecimiento de cada rama
}

/** Geometría en el lienzo 1920x1080. */
export interface GeometryConfig {
  center: { x: number; y: number };
  ringRadius: number;
  rowsY: [number, number, number, number]; // Y de cada una de las 4 filas
  iconX: { left: number; right: number };
}

/** Disparo por scroll (sección fija tipo Onyx). */
export interface ScrollConfig {
  trackVH: number;   // alto de la sección (en pantallas)
  showAt: number;    // % para aparecer
  hideAt: number;    // % para desaparecer (debe ser < showAt)
  revRate: number;   // velocidad de la desaparición (>1 = más rápida)
}

/** Config por producto: lo mínimo obligatorio + overrides opcionales. */
export interface RevealConfig {
  id: string;
  title: { main: string; sub: string };
  video: VideoConfig;
  labels: LabelDef[];
  /** Fondo de la sección (ruta en /public). Sin él queda solo el degradado. */
  background?: string;
  timing?: Partial<TimingConfig>;
  geometry?: Partial<GeometryConfig>;
  scroll?: Partial<ScrollConfig>;
}

/** Config ya fusionada con los defaults (uso interno del motor). */
export interface ResolvedConfig {
  id: string;
  title: { main: string; sub: string };
  video: VideoConfig;
  labels: LabelDef[];
  background?: string;
  timing: TimingConfig;
  geometry: GeometryConfig;
  scroll: ScrollConfig;
}
