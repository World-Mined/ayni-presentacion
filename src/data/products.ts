import type { ImageMetadata } from 'astro';
import benefitCapucci1 from '../assets/v2/products-benefit-capucci-1.webp';
import benefitCapucci2 from '../assets/v2/products-benefit-capucci-2.webp';
import benefitCapucci3 from '../assets/v2/products-benefit-capucci-3.webp';
import benefitCapucci4 from '../assets/v2/products-benefit-capucci-4.webp';
import benefitMoravi1 from '../assets/v2/products-benefit-moravi-1.webp';
import benefitMoravi2 from '../assets/v2/products-benefit-moravi-2.webp';
import benefitMoravi3 from '../assets/v2/products-benefit-moravi-3.webp';
import benefitMoravi4 from '../assets/v2/products-benefit-moravi-4.webp';
import benefitReset1 from '../assets/v2/products-benefit-reset-1.webp';
import benefitReset2 from '../assets/v2/products-benefit-reset-2.webp';
import benefitReset3 from '../assets/v2/products-benefit-reset-3.webp';
import benefitReset4 from '../assets/v2/products-benefit-reset-4.webp';
import heroCapucci from '../assets/v2/products-hero-capucci.webp';
import heroMoravi from '../assets/v2/products-hero-moravi.webp';
import heroReset from '../assets/v2/products-hero-reset.webp';
import capucciPack from '../assets/v2/products-capucci-shadow.webp';
import moraviPack from '../assets/v2/products-moravi-shadow.webp';
import resetPack from '../assets/v2/products-reset-shadow.webp';
import type { ProductId } from '../lib/reveal/products';

export interface ProductBenefit {
  title: string;
  description: string;
  image: ImageMetadata;
}

export interface ProductDetail {
  slug: string;
  /** Id en el registro de `ProductReveal` (lib/reveal/products). */
  revealId: ProductId;
  /** Nombre comercial, tal como se rotula la bolsa. */
  name: string;
  description: string;
  hero: {
    /** El titular va partido en dos porque el diseño pinta la segunda mitad
        con el degradado dorado de marca y la primera en claro. */
    lead: string;
    highlight: string;
    background: ImageMetadata;
  };
  benefits: {
    subtitle: string;
    items: [ProductBenefit, ProductBenefit, ProductBenefit, ProductBenefit];
    /** Ficha del producto; en Figma el CTA abre Drive en otra pestaña. */
    ctaHref: string;
  };
  /** Bolsa que se muestra cuando este producto sale en "Otros Productos". */
  pack: ImageMetadata;
}

// El orden es el de `PRODUCT_LINE` en v2.ts: es el mismo que sigue el banner
// "Otros Productos" de cada ficha, que lista los otros dos en este orden.
export const PRODUCT_DETAILS: ProductDetail[] = [
  {
    slug: 'moravi-360',
    revealId: 'moravi',
    name: 'Moravi 360',
    description:
      'Moravi 360: la fórmula de superalimentos andinos que activa tus defensas, depura el organismo y sostiene tu energía durante toda la jornada.',
    hero: {
      lead: 'Activa tu defensa y restaura ',
      highlight: 'tu vitalidad',
      background: heroMoravi,
    },
    benefits: {
      subtitle: 'Un cuerpo fuerte no se improvisa, se construye desde adentro.',
      items: [
        { title: 'Defensas naturales', description: 'Refuerzo constante para el organismo.', image: benefitMoravi1 },
        { title: 'Efecto détox', description: 'Limpieza y purificación corporal.', image: benefitMoravi2 },
        { title: 'Energía total', description: 'Vitalidad para toda la jornada.', image: benefitMoravi3 },
        { title: 'Digestión ligera', description: 'Procesos digestivos sin pesadez.', image: benefitMoravi4 },
      ],
      ctaHref: 'https://drive.google.com/drive/folders/1qqpVehTQ8gFzSL0MmrUZroLa_i-j_L4f?usp=sharing',
    },
    pack: moraviPack,
  },
  {
    slug: 'capucci-360',
    revealId: 'capucci',
    name: 'Capucci 360',
    description:
      'Capucci 360: café funcional con superalimentos para sostener tu energía, tu enfoque y tu productividad sin los altibajos de la cafeína.',
    hero: {
      lead: 'No solo es café, es una ',
      highlight: 'experiencia completa',
      background: heroCapucci,
    },
    benefits: {
      subtitle: 'Tu cuerpo no pide cafeína, necesita verdadero equilibrio.',
      items: [
        { title: 'Energía Constante', description: 'Nivel de actividad estable todo el día.', image: benefitCapucci1 },
        { title: 'Mayor Productividad', description: 'Tareas diarias con mayor fluidez.', image: benefitCapucci2 },
        { title: 'Enfoque Total', description: 'Claridad mental para las metas.', image: benefitCapucci3 },
        { title: 'Bienestar Real', description: 'Sensación de calma y armonía corporal.', image: benefitCapucci4 },
      ],
      ctaHref: 'https://drive.google.com/drive/folders/1qqpVehTQ8gFzSL0MmrUZroLa_i-j_L4f?usp=sharing',
    },
    pack: capucciPack,
  },
  {
    slug: 'reset-360',
    revealId: 'reset',
    name: 'Reset 360',
    description:
      'Reset 360: la fórmula 8 en 1 que depura tu sistema, aligera la digestión y devuelve el equilibrio a tu cuerpo desde el interior.',
    hero: {
      lead: 'Restaura tu equilibrio ',
      highlight: 'natural',
      background: heroReset,
    },
    benefits: {
      subtitle: 'Transformar tu sistema desde el interior.',
      items: [
        { title: 'Ligereza inmediata', description: 'Sensación de alivio constante.', image: benefitReset1 },
        { title: 'Digestión ligera', description: 'Procesos digestivos sin pesadez.', image: benefitReset2 },
        { title: 'Limpieza natural', description: 'Depuración corporal efectiva.', image: benefitReset3 },
        { title: 'Bienestar total', description: 'Equilibrio y armonía integral.', image: benefitReset4 },
      ],
      ctaHref: 'https://drive.google.com/file/d/14TYJGrDY6_zLtsUprFRDGqNBnwvbn6dv/view?usp=sharing',
    },
    pack: resetPack,
  },
];

export const productHref = (slug: string) => `/productos/${slug}`;

/** Los otros dos productos de la línea, en el orden en que los pinta el banner. */
export const otherProducts = (slug: string) =>
  PRODUCT_DETAILS.filter((product) => product.slug !== slug);
