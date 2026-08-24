import { PRODUCT_DETAILS, productHref } from './products';

export const SECTION_IDS = {
  home: 'inicio',
  about: 'que-es-ayni',
  products: 'productos',
  pickup: 'puntos-de-recojo',
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
  ambassadors: '/embajadores',
  complaints: '/libro-de-reclamaciones',
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];

// La línea de producto la pintan tres composiciones distintas —la banda de la
// home, el banner de /productos y el de "Otros Productos" de cada ficha—, con
// maquetación propia cada una. El dato vive en `products.ts`, que es donde está
// la ficha completa de cada producto; aquí queda solo la proyección que
// necesitan las composiciones: bolsa, nombre y enlace a su página.
export const PRODUCT_LINE = PRODUCT_DETAILS.map((product) => ({
  src: product.pack,
  alt: product.name,
  href: productHref(product.slug),
}));
