export const SECTION_IDS = {
  home: 'inicio',
  about: 'que-es-ayni',
  products: 'productos',
  pickup: 'puntos-de-recojo',
  ambassadors: 'embajadores',
  tools: 'herramientas',
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];
