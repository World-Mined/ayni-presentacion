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
      { id: 'brocoli', name: 'Brocoli', phrase: 'Alimento clave que promueve el equilibrio alcalino y apoya la desintoxicación natural.\n\nSu valor único es su capacidad para purificar tu cuerpo y sostener un óptimo estado de bienestar integral.', photo: moraviBrocoli, icon: icoBrocoli, side: 'left', x: 33.68, y: 41.9 },
      { id: 'amalaki', name: 'Amalaki', phrase: 'Originaria de la India y considerada la fruta de la vida, es un potente rejuvenecedor que cuida tus células.\n\nSu valor único reside en su alta concentración de antioxidantes, capaces de frenar el envejecimiento prematuro, revitalizar los tejidos y brindarte vitalidad y salud a largo plazo.', photo: moraviAmalaki, icon: icoAmalaki, side: 'left', x: 31.04, y: 57.75 },
      { id: 'moringa', name: 'Moringa', phrase: 'Originaria de la India y fuente de vitalidad, fortalece el sistema inmune.\n\nSu valor único radica en su capacidad para blindar tu organismo y llenarte de energía natural todos los días.', photo: moraviMoringa, icon: icoMoringa, side: 'left', x: 33.61, y: 74.77 },
      { id: 'acai', name: 'Acaí Berry', phrase: 'Escudo antioxidante de la Amazonía que protege la vitalidad celular.\n\nSu valor único es su gran capacidad para neutralizar sustancias dañinas y cuidar tu energía.', photo: moraviAcai, icon: icoAcai, side: 'right', x: 66.25, y: 41.9 },
      { id: 'platano', name: 'Plátano Verde', phrase: 'Alimento potente que fortalece y potencia el sistema inmunológico desde el interior.\n\nSu valor único radica en aportar nutrientes clave que blindan tus defensas naturales todos los días.', photo: moraviPlatano, icon: icoPlatano, side: 'right', x: 69.03, y: 57.75 },
      { id: 'limon', name: 'Limón', phrase: 'Purificador cítrico que equilibra el pH y refresca de forma directa el sistema digestivo.\n\nSu valor único es limpiar tu organismo y brindarte una sensación de frescura y ligereza constante.', photo: moraviLimon, icon: icoLimon, side: 'right', x: 66.39, y: 74.77 },
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
      { id: 'ganoderma', name: 'Ganoderma', phrase: 'Un hongo milenario reconocido por su gran poder de equilibrar el cuerpo y la mente.\n\nSu valor único se encuentra en su capacidad para ayudarte a encontrar la armonía y la tranquilidad frente al estrés del día a día.', photo: capucciGanoderma, icon: icoCapucciGanoderma, side: 'left', x: 37.58, y: 33.8 },
      { id: 'maca', name: 'Maca', phrase: 'La raíz sagrada de los guerreros incas cultivada en los Andes.\n\nSu valor único es brindar una excelente resistencia física y potenciar tu energía para que alcances un mejor rendimiento diario.', photo: capucciMaca, icon: icoCapucciMaca, side: 'left', x: 31.61, y: 49.65 },
      { id: 'colageno', name: 'Colágeno', phrase: 'Enriquecido con una proteína esencial que le da vitalidad a tu cuerpo.\n\nSu valor único es aportar la estructura y fuerza necesarias para que tus tejidos se mantengan firmes y saludables.', photo: capucciColageno, icon: icoCapucciColageno, side: 'left', x: 31.55, y: 66.67 },
      { id: 'cafe', name: 'Café', phrase: 'Selección premium de granos para ofrecerte un exquisito sabor y aroma.\n\nSu valor único consiste en despertar tus sentidos y brindarte una experiencia intensa y reconfortante en cada taza.', photo: capucciCafe, icon: icoCapucciCafe, side: 'left', x: 37.5, y: 82.75 },
      { id: 'moringa', name: 'Moringa', phrase: 'Originaria de la India y fuente de vitalidad, fortalece el sistema inmune.\n\nSu valor único radica en su capacidad para blindar tu organismo y llenarte de energía natural todos los días.', photo: capucciMoringa, icon: icoMoringa, side: 'right', x: 62.42, y: 33.8 },
      { id: 'amalaki', name: 'Amalaki', phrase: 'Originaria de la India y considerada la fruta de la vida, es un potente rejuvenecedor que cuida tus células.\n\nSu valor único reside en su alta concentración de antioxidantes, capaces de frenar el envejecimiento prematuro, revitalizar los tejidos y brindarte vitalidad y salud a largo plazo.', photo: capucciAmalaki, icon: icoAmalaki, side: 'right', x: 68.39, y: 49.65 },
      { id: 'espirulina', name: 'Espirulina', phrase: 'Conocida como el oro verde de los aztecas, es una de las fuentes de energía más puras.\n\nSu valor único es aportar una nutrición profunda y limpia que activa tu cuerpo al máximo de forma natural.', photo: capucciEspirulina, icon: icoCapucciEspirulina, side: 'right', x: 68.45, y: 66.67 },
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
      { id: 'ciruela', name: 'Ciruela', phrase: 'Cultivada en regiones de clima templado, es la aliada ideal para la regularidad natural.\n\nSu valor único es su suave efecto regulador sobre el intestino, que estimula el tránsito digestivo de forma segura y sin irritaciones para decirle adiós al estreñimiento.', photo: resetCiruela, icon: icoResetCiruela, side: 'left', x: 37.58, y: 33.8 },
      { id: 'coco', name: 'Coco', phrase: 'Crecido en las paradisíacas costas tropicales, aporta minerales esenciales y grasas saludables que revitalizan el cuerpo.\n\nSu valor único combina una energía limpia con una hidratación profunda a nivel celular, asegurando que tu proceso de limpieza vaya de la mano con el máximo bienestar.', photo: resetCoco, icon: icoResetCoco, side: 'left', x: 31.61, y: 49.65 },
      { id: 'pina', name: 'Piña', phrase: 'Proveniente de Sudamérica y rica en enzimas activas como la bromelina, destaca por mejorar la digestión y el equilibrio interno.\n\nSu valor único es su gran habilidad para combatir la retención de líquidos y reducir la hinchazón, potenciando la depuración con un toque fresco.', photo: resetPina, icon: icoResetPina, side: 'left', x: 31.55, y: 66.67 },
      { id: 'papaya', name: 'Papaya', phrase: 'Nacida en las zonas tropicales de Mesoamérica y famosa por su enzima papaína, facilita la descomposición de los alimentos y frena la pesadez estomacal.\n\nSu valor único se nota al instante, brindándote una profunda sensación de ligereza y confort que te hace sentir liviano todo el día.', photo: resetPapaya, icon: icoResetPapaya, side: 'left', x: 37.5, y: 82.75 },
      { id: 'amalaki', name: 'Amalaki', phrase: 'Originaria de la India y considerada la fruta de la vida, es un potente rejuvenecedor que cuida tus células.\n\nSu valor único reside en su alta concentración de antioxidantes, capaces de frenar el envejecimiento prematuro, revitalizar los tejidos y brindarte vitalidad y salud a largo plazo.', photo: resetAmalaki, icon: icoAmalaki, side: 'right', x: 62.42, y: 33.8 },
      { id: 'chia', name: 'Chía', phrase: 'Proveniente de América Central y del Sur, esta semilla milenaria destaca por su gran valor nutritivo y su riqueza en fibra.\n\nSu valor único consiste en formar un gel natural que suaviza el tránsito de los alimentos, generando saciedad y permitiendo una limpieza intestinal fluida y sin complicaciones.', photo: resetChia, icon: icoResetChia, side: 'right', x: 68.39, y: 49.65 },
      { id: 'acai', name: 'Acaí Berry', phrase: 'Directo desde la selva amazónica, este fruto silvestre es uno de los protectores naturales más potentes contra el daño celular.\n\nSu valor único es su extraordinaria capacidad para neutralizar agentes externos dañinos, blindando tu organismo y protegiendo tu energía desde el interior.', photo: resetAcai, icon: icoAcai, side: 'right', x: 68.45, y: 66.67 },
      { id: 'calabaza', name: 'Calabaza', phrase: 'Utilizada ancestralmente en América, es un alimento sumamente nutritivo y amigable con el estómago.\n\nSu valor único radica en aportar un soporte completo que equilibra el bienestar general del cuerpo, acompañando de forma ligera y armónica cualquier proceso de desintoxicación.', photo: resetCalabaza, icon: icoResetCalabaza, side: 'right', x: 62.5, y: 82.75 },
    ],
  },
};
