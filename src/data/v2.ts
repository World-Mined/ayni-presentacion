import capucci from '../assets/v2/products-capucci-shadow.webp';
import moravi from '../assets/v2/products-moravi-shadow.webp';
import reset from '../assets/v2/products-reset-shadow.webp';

export const SECTION_IDS = {
  home: 'inicio',
  about: 'que-es-ayni',
  products: 'productos',
  pickup: 'puntos-de-recojo',
  ambassadors: 'embajadores',
  tools: 'herramientas',
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

// Las páginas con ruta propia. Van aquí por el mismo motivo que SECTION_IDS:
// el `href` de Astro es un string sin validar, así que renombrar una página y
// olvidar un enlace da un 404 que no aparece en el build. Con una constante,
// el error pasa a ser de compilación.
export const ROUTES = {
  home: '/',
  products: '/productos',
  pickup: '/puntos-de-recojo',
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];

// La línea de producto la pintan dos composiciones distintas —la banda de la
// home y el banner de /productos— con maquetación propia cada una. Lo que
// comparten es el dato: si entra un cuarto producto o cambia un nombre, se
// toca solo aquí.
export const PRODUCT_LINE = [
  { src: moravi, alt: 'Moravi 360' },
  { src: capucci, alt: 'Capucci 360' },
  { src: reset, alt: 'Reset 360' },
] as const;
