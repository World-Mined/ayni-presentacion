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

// Los rangos del bono de ingreso residual. Viven aquí porque los pintan dos
// composiciones con maquetación incompatible: la tabla de escritorio y el
// carrusel de cards de móvil (Figma 3523:12004). Mismo criterio que PRODUCT_LINE.
export const RESIDUAL_BONUS = [
  { rank: 'GEN 350', binario: '1,200 pts', trinario: '400 pts', tetranario: '300 pts', quincenal: '$175', mensual: '$350' },
  { rank: 'GEN 1000', binario: '4,800 pts', trinario: '1,700 pts', tetranario: '1,000 pts', quincenal: '$500', mensual: '$1,000' },
  { rank: 'GEN 3000', binario: '22,000 pts', trinario: '6,500 pts', tetranario: '3,700 pts', quincenal: '$1,500', mensual: '$3,000' },
  { rank: 'GEN 5000', binario: '43,500 pts', trinario: '13,900 pts', tetranario: '6,200 pts', quincenal: '$2,500', mensual: '$5,000' },
  { rank: 'GEN 10K', binario: '70,000 pts', trinario: '26,000 pts', tetranario: '10,000 pts', quincenal: '$5,000', mensual: '$10,000' },
  { rank: 'GEN 30K', binario: '200,000 pts', trinario: '90,000 pts', tetranario: '35,000 pts', quincenal: '$15,000', mensual: '$30,000' },
  { rank: 'GEN 60K', binario: '600,000 pts', trinario: '190,000 pts', tetranario: '80,000 pts', quincenal: '$30,000', mensual: '$60,000' },
  { rank: 'GEN 100K', binario: '950,000 pts', trinario: '320,000 pts', tetranario: '125,000 pts', quincenal: '$50,000', mensual: '$100,000' },
  { rank: 'GEN 300K', binario: '3,500,000 pts', trinario: '1,200,000 pts', tetranario: '500,000 pts', quincenal: '$150,000', mensual: '$300,000' },
  { rank: 'GEN 1M', binario: '14,500,000 pts', trinario: '5,000,000 pts', tetranario: '2,000,000 pts', quincenal: '$500,000', mensual: '$1,000,000' },
] as const;

export type ResidualBonusRow = (typeof RESIDUAL_BONUS)[number];

// El orden de columnas de la tabla de escritorio. Explícito para que añadir un
// campo al dato no cambie en silencio lo que se pinta ni en qué orden.
export const RESIDUAL_BONUS_COLUMNS = [
  'binario',
  'trinario',
  'tetranario',
  'quincenal',
  'mensual',
] as const satisfies readonly (keyof ResidualBonusRow)[];
