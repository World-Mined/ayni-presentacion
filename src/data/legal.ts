import { CODIGO_DE_ETICA } from './legal/codigo-de-etica';
import { POLITICAS_DE_COOKIES } from './legal/politicas-de-cookies';
import { POLITICAS_DE_REEMBOLSO } from './legal/politicas-de-reembolso';
import { TERMINOS_Y_CONDICIONES } from './legal/terminos-y-condiciones';
import { TRATAMIENTO_DE_DATOS_PERSONALES } from './legal/tratamiento-de-datos-personales';

export interface LegalSection {
  /**
   * Encabezado de capítulo. Va en un cuerpo mayor que el de las secciones y
   * solo lo usa la política de reembolso, que agrupa sus secciones en dos
   * bloques. Cuando está presente, la sección no lleva nada más.
   */
  chapterTitle?: string;
  /** Encabezado de la sección. */
  title?: string;
  /** Segundo encabezado dentro de la misma sección, con la tipografía de `title`. */
  subtitle?: string;
  /**
   * Cuerpo de la sección. Cada elemento del array exterior es un grupo de
   * líneas contiguas —sin separación entre ellas, como en el documento
   * original—; entre grupos queda la línea en blanco que los separa en Figma.
   * Modelarlo así y no como un `string[]` plano es lo que permite reproducir
   * los listados, donde cada viñeta va separada de la siguiente.
   */
  body?: string[][];
}

export interface LegalDocument {
  slug: string;
  /** Texto del enlace en el footer. */
  navLabel: string;
  /** Título del documento, tal como encabeza la página. */
  title: string;
  /** Meta description de la página. */
  description: string;
  sections: LegalSection[];
}

/** Los documentos legales, en el orden en que los lista el footer. */
export const LEGAL_DOCUMENTS: LegalDocument[] = [
  TERMINOS_Y_CONDICIONES,
  POLITICAS_DE_REEMBOLSO,
  TRATAMIENTO_DE_DATOS_PERSONALES,
  POLITICAS_DE_COOKIES,
  CODIGO_DE_ETICA,
];

// Mismo motivo que `ROUTES` en `v2.ts`: el `href` es un string sin validar, y
// aquí además lo generan tanto el footer como la ruta dinámica. Si el prefijo
// cambia, se toca en un sitio.
export const legalHref = (slug: string) => `/legal/${slug}`;
