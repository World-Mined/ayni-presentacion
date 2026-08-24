import type { ImageMetadata } from 'astro';
import icoAcai from '../assets/v2/ingredient-icons/acai.svg';
import icoAmalaki from '../assets/v2/ingredient-icons/amalaki.svg';
import icoBrocoli from '../assets/v2/ingredient-icons/brocoli.svg';
import icoLimon from '../assets/v2/ingredient-icons/limon.svg';
import icoMoringa from '../assets/v2/ingredient-icons/moringa.svg';
import icoPlatano from '../assets/v2/ingredient-icons/platano.svg';
import icoCapucciCafe from '../assets/v2/ingredient-icons/capucci/cafe.svg';
import icoCapucciColageno from '../assets/v2/ingredient-icons/capucci/colageno.svg';
import icoCapucciEspirulina from '../assets/v2/ingredient-icons/capucci/espirulina.svg';
import icoCapucciGanoderma from '../assets/v2/ingredient-icons/capucci/ganoderma.svg';
import icoCapucciMaca from '../assets/v2/ingredient-icons/capucci/maca.svg';
import icoResetCalabaza from '../assets/v2/ingredient-icons/reset/calabaza.svg';
import icoResetChia from '../assets/v2/ingredient-icons/reset/chia.svg';
import icoResetCiruela from '../assets/v2/ingredient-icons/reset/ciruela.svg';
import icoResetCoco from '../assets/v2/ingredient-icons/reset/coco.svg';
import icoResetPapaya from '../assets/v2/ingredient-icons/reset/papaya.svg';
import icoResetPina from '../assets/v2/ingredient-icons/reset/pina.svg';
import capucciFrameFinal from '../assets/v2/capucci-frame-final.png';
import capucciAmalaki from '../assets/v2/capucci-ingrediente-amalaki.png';
import capucciCafe from '../assets/v2/capucci-ingrediente-cafe.png';
import capucciColageno from '../assets/v2/capucci-ingrediente-colageno.png';
import capucciEspirulina from '../assets/v2/capucci-ingrediente-espirulina.png';
import capucciGanoderma from '../assets/v2/capucci-ingrediente-ganoderma.png';
import capucciMaca from '../assets/v2/capucci-ingrediente-maca.png';
import capucciMoringa from '../assets/v2/capucci-ingrediente-moringa.png';
import capucciLogo from '../assets/v2/capucci-logo.svg';
import moraviFrameFinal from '../assets/v2/moravi-frame-final.webp';
import moraviAcai from '../assets/v2/moravi-ingrediente-acai.webp';
import moraviAmalaki from '../assets/v2/moravi-ingrediente-amalaki.webp';
import moraviBrocoli from '../assets/v2/moravi-ingrediente-brocoli.webp';
import moraviLimon from '../assets/v2/moravi-ingrediente-limon.webp';
import moraviMoringa from '../assets/v2/moravi-ingrediente-moringa.webp';
import moraviPlatano from '../assets/v2/moravi-ingrediente-platano.webp';
import moraviLogo from '../assets/v2/moravi-logo.svg';
import resetFrameFinal from '../assets/v2/reset-frame-final.png';
import resetAcai from '../assets/v2/reset-ingrediente-acai.png';
import resetAmalaki from '../assets/v2/reset-ingrediente-amalaki.png';
import resetCalabaza from '../assets/v2/reset-ingrediente-calabaza.png';
import resetChia from '../assets/v2/reset-ingrediente-chia.png';
import resetCiruela from '../assets/v2/reset-ingrediente-ciruela.png';
import resetCoco from '../assets/v2/reset-ingrediente-coco.png';
import resetPapaya from '../assets/v2/reset-ingrediente-papaya.png';
import resetPina from '../assets/v2/reset-ingrediente-pina.png';
import resetLogo from '../assets/v2/reset-logo.svg';
import type { ProductId } from '../lib/reveal/products';

export interface Ingredient {
  id: string;
  name: string;
  /** Frase que aparece dentro del círculo mientras el ingrediente está activo. */
  phrase: string;
  photo: ImageMetadata;
  icon: ImageMetadata;
  side: 'left' | 'right';
  /**
   * Punto donde la rama toca el círculo, en % del lienzo de 1440×852 del
   * diseño. En el lado izquierdo es el borde derecho de la rama y en el
   * derecho el izquierdo, así la rama crece hacia afuera y su extremo interior
   * se queda pegado a la circunferencia a cualquier tamaño.
   */
  x: number;
  y: number;
}

export interface IngredientsScene {
  logo: ImageMetadata;
  /** Nombre del producto; hace de texto alternativo del logotipo. */
  logoAlt: string;
  /** Ancho del logotipo respecto a la cabecera de 521 px de Figma. */
  logoWidth?: number;
  formula: { lead: string; strong: string };
  /** Arte del estado de reposo: la bolsa dentro del círculo. */
  rest: ImageMetadata;
  restAlt: string;
  /** Escala que recorta el margen transparente del arte de reposo. */
  restScale?: number;
  items: Ingredient[];
}

// Las coordenadas salen del estado de reposo del diseño (nodo 1057:18873): el
// círculo mide 550 y está centrado en (720, 497) del lienzo de 1440×852, y
// cada rama arranca justo en la circunferencia a la altura de su fila.
export const PRODUCT_INGREDIENTS: Partial<Record<ProductId, IngredientsScene>> = {
  moravi: {
    logo: moraviLogo,
    logoAlt: 'Moravi 360',
    formula: { lead: 'La fórmula', strong: '6 en 1' },
    rest: moraviFrameFinal,
    restAlt: 'Bolsa de Moravi 360',
    items: [
      { id: 'brocoli', name: 'Brocoli', phrase: 'Limpieza profunda para tus defensas.', photo: moraviBrocoli, icon: icoBrocoli, side: 'left', x: 33.68, y: 41.9 },
      { id: 'amalaki', name: 'Amalaki', phrase: 'Fortalece defensas y rejuvenece.', photo: moraviAmalaki, icon: icoAmalaki, side: 'left', x: 31.04, y: 57.75 },
      { id: 'moringa', name: 'Moringa', phrase: 'Energía pura que desinflama tu cuerpo.', photo: moraviMoringa, icon: icoMoringa, side: 'left', x: 33.61, y: 74.77 },
      { id: 'acai', name: 'Acaí Berry', phrase: 'Protección celular para que te sientas con más fuerza.', photo: moraviAcai, icon: icoAcai, side: 'right', x: 66.25, y: 41.9 },
      { id: 'platano', name: 'Plátano Verde', phrase: 'Digestión ligera y energía estable todo el día.', photo: moraviPlatano, icon: icoPlatano, side: 'right', x: 69.03, y: 57.75 },
      { id: 'limon', name: 'Limón', phrase: 'Depuración total para que tu cuerpo funcione mejor.', photo: moraviLimon, icon: icoLimon, side: 'right', x: 66.39, y: 74.77 },
    ],
  },
  capucci: {
    logo: capucciLogo,
    logoAlt: 'Capucci 360',
    logoWidth: 71.21,
    formula: { lead: 'La fórmula', strong: '7 en 1' },
    rest: capucciFrameFinal,
    restAlt: 'Bolsa de Capucci 360',
    restScale: 1.2145,
    items: [
      { id: 'ganoderma', name: 'Ganoderma', phrase: 'Equilibra y reduce el estrés.', photo: capucciGanoderma, icon: icoCapucciGanoderma, side: 'left', x: 37.58, y: 33.8 },
      { id: 'maca', name: 'Maca', phrase: 'Aumenta energía y resistencia.', photo: capucciMaca, icon: icoCapucciMaca, side: 'left', x: 31.61, y: 49.65 },
      { id: 'colageno', name: 'Colageno', phrase: 'Fortalece piel y tejidos.', photo: capucciColageno, icon: icoCapucciColageno, side: 'left', x: 31.55, y: 66.67 },
      { id: 'cafe', name: 'Café', phrase: 'Mejora enfoque y metabolismo.', photo: capucciCafe, icon: icoCapucciCafe, side: 'left', x: 37.5, y: 82.75 },
      { id: 'moringa', name: 'Moringa', phrase: 'Fortalece defensas y rejuvenece.', photo: capucciMoringa, icon: icoMoringa, side: 'right', x: 62.42, y: 33.8 },
      { id: 'amalaki', name: 'Amalaki', phrase: 'Nutre y reduce inflamación.', photo: capucciAmalaki, icon: icoAmalaki, side: 'right', x: 68.39, y: 49.65 },
      { id: 'espirulina', name: 'Espirulina', phrase: 'Desintoxica y aporta nutrientes.', photo: capucciEspirulina, icon: icoCapucciEspirulina, side: 'right', x: 68.45, y: 66.67 },
    ],
  },
  reset: {
    logo: resetLogo,
    logoAlt: 'Reset 360',
    logoWidth: 63.15,
    formula: { lead: 'La fórmula', strong: '8 en 1' },
    rest: resetFrameFinal,
    restAlt: 'Bolsa de Reset 360',
    restScale: 1.2145,
    items: [
      { id: 'ciruela', name: 'Ciruela', phrase: 'El aliado perfecto para una digestión sin esfuerzo.', photo: resetCiruela, icon: icoResetCiruela, side: 'left', x: 37.58, y: 33.8 },
      { id: 'coco', name: 'Coco', phrase: 'Hidratación y energía saludable.', photo: resetCoco, icon: icoResetCoco, side: 'left', x: 31.61, y: 49.65 },
      { id: 'pina', name: 'Piña', phrase: 'Desinflama tu cuerpo de forma natural.', photo: resetPina, icon: icoResetPina, side: 'left', x: 31.55, y: 66.67 },
      { id: 'papaya', name: 'Papaya', phrase: 'Limpia tu organismo y aligera tu digestión.', photo: resetPapaya, icon: icoResetPapaya, side: 'left', x: 37.5, y: 82.75 },
      { id: 'amalaki', name: 'Amalaki', phrase: 'Fortalece defensas y rejuvenece.', photo: resetAmalaki, icon: icoAmalaki, side: 'right', x: 62.42, y: 33.8 },
      { id: 'chia', name: 'Chía', phrase: 'Fibra natural para sentirte satisfecho.', photo: resetChia, icon: icoResetChia, side: 'right', x: 68.39, y: 49.65 },
      { id: 'acai', name: 'Acaí Berry', phrase: 'Protección celular y energía que se nota.', photo: resetAcai, icon: icoAcai, side: 'right', x: 68.45, y: 66.67 },
      { id: 'calabaza', name: 'Calabaza', phrase: 'Nutrición clave para cuidar tu piel y visión.', photo: resetCalabaza, icon: icoResetCalabaza, side: 'right', x: 62.5, y: 82.75 },
    ],
  },
};
