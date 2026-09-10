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
import capucciAmalaki from '../assets/v2/capucci-ingrediente-amalaki.webp';
import capucciCafe from '../assets/v2/capucci-ingrediente-cafe.webp';
import capucciColageno from '../assets/v2/capucci-ingrediente-colageno.webp';
import capucciEspirulina from '../assets/v2/capucci-ingrediente-espirulina.webp';
import capucciGanoderma from '../assets/v2/capucci-ingrediente-ganoderma.webp';
import capucciMaca from '../assets/v2/capucci-ingrediente-maca.webp';
import capucciMoringa from '../assets/v2/capucci-ingrediente-moringa.webp';
import capucciLogo from '../assets/v2/capucci-logo.svg';
import moraviAcai from '../assets/v2/moravi-ingrediente-acai.webp';
import moraviAmalaki from '../assets/v2/moravi-ingrediente-amalaki.webp';
import moraviBrocoli from '../assets/v2/moravi-ingrediente-brocoli.webp';
import moraviLimon from '../assets/v2/moravi-ingrediente-limon.webp';
import moraviMoringa from '../assets/v2/moravi-ingrediente-moringa.webp';
import moraviPlatano from '../assets/v2/moravi-ingrediente-platano.webp';
import moraviLogo from '../assets/v2/moravi-logo.svg';
import resetAcai from '../assets/v2/reset-ingrediente-acai.webp';
import resetCalabaza from '../assets/v2/reset-ingrediente-calabaza.webp';
import resetChia from '../assets/v2/reset-ingrediente-chia.webp';
import resetCiruela from '../assets/v2/reset-ingrediente-ciruela.webp';
import resetCoco from '../assets/v2/reset-ingrediente-coco.webp';
import resetPapaya from '../assets/v2/reset-ingrediente-papaya.webp';
import resetPina from '../assets/v2/reset-ingrediente-pina.webp';
import resetLogo from '../assets/v2/reset-logo.svg';
import type { ProductId } from '../lib/reveal/products';

export interface Ingredient {
  id: string;
  name: string;
  /** Frase que aparece dentro del círculo mientras el ingrediente está activo. */
  phrase: string;
  photo: ImageMetadata;
  icon: ImageMetadata;
}

export interface IngredientsScene {
  logo: ImageMetadata;
  /** Nombre del producto; hace de texto alternativo del logotipo. */
  logoAlt: string;
  formula: { lead: string; strong: string };
  items: Ingredient[];
}

const INGREDIENT_PHRASES = {
  amalaki: 'Originaria de la India y considerada la fruta de la vida, es un potente rejuvenecedor que cuida tus células.\n\nSu valor único reside en su alta concentración de antioxidantes, capaces de frenar el envejecimiento prematuro, revitalizar los tejidos y brindarte vitalidad y salud a largo plazo.',
  moringa: 'Originaria de la India y fuente de vitalidad, fortalece el sistema inmune.\n\nSu valor único radica en su capacidad para blindar tu organismo y llenarte de energía natural todos los días.',
} as const;

// La geometría de cada rama vive exclusivamente en `lib/reveal/products/*`.
// Este registro contiene el contenido que aparece al activar cada ingrediente.
export const PRODUCT_INGREDIENTS: Partial<Record<ProductId, IngredientsScene>> = {
  moravi: {
    logo: moraviLogo,
    logoAlt: 'Moravi 360',
    formula: { lead: 'La fórmula', strong: '6 en 1' },
    items: [
      { id: 'brocoli', name: 'Brocoli', phrase: 'Alimento clave que promueve el equilibrio alcalino y apoya la desintoxicación natural.\n\nSu valor único es su capacidad para purificar tu cuerpo y sostener un óptimo estado de bienestar integral.', photo: moraviBrocoli, icon: icoBrocoli },
      { id: 'amalaki', name: 'Amalaki', phrase: INGREDIENT_PHRASES.amalaki, photo: moraviAmalaki, icon: icoAmalaki },
      { id: 'moringa', name: 'Moringa', phrase: INGREDIENT_PHRASES.moringa, photo: moraviMoringa, icon: icoMoringa },
      { id: 'acai', name: 'Acaí Berry', phrase: 'Escudo antioxidante de la Amazonía que protege la vitalidad celular.\n\nSu valor único es su gran capacidad para neutralizar sustancias dañinas y cuidar tu energía.', photo: moraviAcai, icon: icoAcai },
      { id: 'platano', name: 'Plátano Verde', phrase: 'Alimento potente que fortalece y potencia el sistema inmunológico desde el interior.\n\nSu valor único radica en aportar nutrientes clave que blindan tus defensas naturales todos los días.', photo: moraviPlatano, icon: icoPlatano },
      { id: 'limon', name: 'Limón', phrase: 'Purificador cítrico que equilibra el pH y refresca de forma directa el sistema digestivo.\n\nSu valor único es limpiar tu organismo y brindarte una sensación de frescura y ligereza constante.', photo: moraviLimon, icon: icoLimon },
    ],
  },
  capucci: {
    logo: capucciLogo,
    logoAlt: 'Capucci 360',
    formula: { lead: 'La fórmula', strong: '7 en 1' },
    items: [
      { id: 'ganoderma', name: 'Ganoderma', phrase: 'Un hongo milenario reconocido por su gran poder de equilibrar el cuerpo y la mente.\n\nSu valor único se encuentra en su capacidad para ayudarte a encontrar la armonía y la tranquilidad frente al estrés del día a día.', photo: capucciGanoderma, icon: icoCapucciGanoderma },
      { id: 'maca', name: 'Maca', phrase: 'La raíz sagrada de los guerreros incas cultivada en los Andes.\n\nSu valor único es brindar una excelente resistencia física y potenciar tu energía para que alcances un mejor rendimiento diario.', photo: capucciMaca, icon: icoCapucciMaca },
      { id: 'colageno', name: 'Colágeno', phrase: 'Enriquecido con una proteína esencial que le da vitalidad a tu cuerpo.\n\nSu valor único es aportar la estructura y fuerza necesarias para que tus tejidos se mantengan firmes y saludables.', photo: capucciColageno, icon: icoCapucciColageno },
      { id: 'cafe', name: 'Café', phrase: 'Selección premium de granos para ofrecerte un exquisito sabor y aroma.\n\nSu valor único consiste en despertar tus sentidos y brindarte una experiencia intensa y reconfortante en cada taza.', photo: capucciCafe, icon: icoCapucciCafe },
      { id: 'moringa', name: 'Moringa', phrase: INGREDIENT_PHRASES.moringa, photo: capucciMoringa, icon: icoMoringa },
      { id: 'amalaki', name: 'Amalaki', phrase: INGREDIENT_PHRASES.amalaki, photo: capucciAmalaki, icon: icoAmalaki },
      { id: 'espirulina', name: 'Espirulina', phrase: 'Conocida como el oro verde de los aztecas, es una de las fuentes de energía más puras.\n\nSu valor único es aportar una nutrición profunda y limpia que activa tu cuerpo al máximo de forma natural.', photo: capucciEspirulina, icon: icoCapucciEspirulina },
    ],
  },
  reset: {
    logo: resetLogo,
    logoAlt: 'Reset 360',
    formula: { lead: 'La fórmula', strong: '8 en 1' },
    items: [
      { id: 'ciruela', name: 'Ciruela', phrase: 'Cultivada en regiones de clima templado, es la aliada ideal para la regularidad natural.\n\nSu valor único es su suave efecto regulador sobre el intestino, que estimula el tránsito digestivo de forma segura y sin irritaciones para decirle adiós al estreñimiento.', photo: resetCiruela, icon: icoResetCiruela },
      { id: 'coco', name: 'Coco', phrase: 'Crecido en las paradisíacas costas tropicales, aporta minerales esenciales y grasas saludables que revitalizan el cuerpo.\n\nSu valor único combina una energía limpia con una hidratación profunda a nivel celular, asegurando que tu proceso de limpieza vaya de la mano con el máximo bienestar.', photo: resetCoco, icon: icoResetCoco },
      { id: 'pina', name: 'Piña', phrase: 'Proveniente de Sudamérica y rica en enzimas activas como la bromelina, destaca por mejorar la digestión y el equilibrio interno.\n\nSu valor único es su gran habilidad para combatir la retención de líquidos y reducir la hinchazón, potenciando la depuración con un toque fresco.', photo: resetPina, icon: icoResetPina },
      { id: 'papaya', name: 'Papaya', phrase: 'Nacida en las zonas tropicales de Mesoamérica y famosa por su enzima papaína, facilita la descomposición de los alimentos y frena la pesadez estomacal.\n\nSu valor único se nota al instante, brindándote una profunda sensación de ligereza y confort que te hace sentir liviano todo el día.', photo: resetPapaya, icon: icoResetPapaya },
      { id: 'amalaki', name: 'Amalaki', phrase: INGREDIENT_PHRASES.amalaki, photo: capucciAmalaki, icon: icoAmalaki },
      { id: 'chia', name: 'Chía', phrase: 'Proveniente de América Central y del Sur, esta semilla milenaria destaca por su gran valor nutritivo y su riqueza en fibra.\n\nSu valor único consiste en formar un gel natural que suaviza el tránsito de los alimentos, generando saciedad y permitiendo una limpieza intestinal fluida y sin complicaciones.', photo: resetChia, icon: icoResetChia },
      { id: 'acai', name: 'Acaí Berry', phrase: 'Directo desde la selva amazónica, este fruto silvestre es uno de los protectores naturales más potentes contra el daño celular.\n\nSu valor único es su extraordinaria capacidad para neutralizar agentes externos dañinos, blindando tu organismo y protegiendo tu energía desde el interior.', photo: resetAcai, icon: icoAcai },
      { id: 'calabaza', name: 'Calabaza', phrase: 'Utilizada ancestralmente en América, es un alimento sumamente nutritivo y amigable con el estómago.\n\nSu valor único radica en aportar un soporte completo que equilibra el bienestar general del cuerpo, acompañando de forma ligera y armónica cualquier proceso de desintoxicación.', photo: resetCalabaza, icon: icoResetCalabaza },
    ],
  },
};
