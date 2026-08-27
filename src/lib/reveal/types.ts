// Tipos del "Product Reveal" (animación de producto estilo Onyx).
// El MOTOR (engine.ts) es igual para todos; lo único que cambia por producto
// son los DATOS (title, frames, labels) definidos en products/*.ts.

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

/** Secuencia de frames de la rotación del producto. */
export interface FramesConfig {
  dir: string;          // carpeta en /public, ej. '/reveal/capucci'
  count: number;        // cuántos frames
  prefix?: string;      // por defecto 'frame-'
  pad?: number;         // dígitos con ceros, por defecto 2  -> frame-01
  ext?: string;         // por defecto 'webp'
}

/** Animación compuesta de entrada y anillo, entregada en video. */
export interface VideoConfig {
  src: string;
  /** Momento, en ms, en que aparecen las ramas de ingredientes. */
  labelsStart: number;
  playbackRate?: number;
}

/** Tiempos y curvas de la secuencia (todo opcional: usa DEFAULT_TIMING). */
export interface TimingConfig {
  // 1) ENTRADA
  riseFrom: string;                 // desde dónde sube ('190%' abajo · '-190%' arriba)
  riseDur: number;                  // ms para llegar al centro
  centerFrame: number;              // frame en que llega al centro
  rotateCenterDur: number;          // ms del giro EN EL centro
  rotateEnd: number;                // 1 = giro completo (frente)
  titleDur: number;                 // ms del popup del título
  curve: (t: number) => number;     // curva de subida/popup
  // 2) CÍRCULO (sincronizado al giro)
  ringStartFrame: number;           // frame donde empieza el círculo
  ringEndFrame: number;             // frame donde se cierra (< frame final = más rápido)
  nominalFrameCount: number;        // longitud de secuencia contra la que están afinados los frames de arriba
  // 3) RAMAS
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
  frames: FramesConfig;
  video?: VideoConfig;
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
  frames: Required<FramesConfig>;
  video?: VideoConfig;
  labels: LabelDef[];
  background?: string;
  timing: TimingConfig;
  geometry: GeometryConfig;
  scroll: ScrollConfig;
}
