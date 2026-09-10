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
import otherProductCapucci from '../assets/v2/other-product-capucci.webp';
import otherProductMoravi from '../assets/v2/other-product-moravi.webp';
import otherProductReset from '../assets/v2/other-product-reset.webp';
import capucciWordmark from '../assets/v2/capucci-logo.svg';
import moraviWordmark from '../assets/v2/moravi-logo.svg';
import resetWordmark from '../assets/v2/reset-logo.svg';
import type { ProductId } from '../lib/reveal/products';

export interface ProductBenefit {
  title: string;
  description: string;
  image: ImageMetadata;
}

export interface ProductFaqItem {
  title: string;
  body: string[];
  /** El diseño móvil condensa algunos rótulos y omite el ritual duplicado. */
  mobileTitle?: string;
  hideOnMobile?: boolean;
  openOnMobile?: boolean;
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
  questions: {
    /** La ficha nutricional puede ser distinta del CTA general de beneficios. */
    ctaHref?: string;
    intro: string[];
    items: ProductFaqItem[];
  };
  entrepreneur: {
    heading: string;
    description: string;
    descriptionHighlight?: string;
  };
  /** Bolsa que se muestra cuando este producto sale en "Otros Productos". */
  pack: ImageMetadata;
  /** Composición horizontal usada por la tarjeta de "Otros Productos" en móvil. */
  otherProductCard: {
    background: ImageMetadata;
    wordmark: ImageMetadata;
  };
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
    questions: {
      intro: [
        'La naturaleza protege creando equilibrio: raíces que sostienen, hojas que capturan la luz, frutos que guardan nutrientes. MORAVI 360 toma esa imagen como inspiración y la transforma en un ritual verde para el día a día.',
        'Es un sistema avanzado de bienestar diseñado para ofrecer apoyo integral desde el origen. Su fórmula combina ingredientes verdes, vitaminas y minerales para acompañar tus defensas naturales, favorecer el equilibrio interno y promover el bienestar digestivo.',
      ],
      items: [
        { title: '¿Qué puedes esperar?', body: ['• Fortalecer tus defensas naturales.', '• Favorecer la depuración de tu cuerpo y reducir la pesadez.', '• Sentir más vitalidad, resistencia y energía en tu día a día.', '• Mejorar tu digestión para disfrutar de un cuerpo más ligero.'] },
        { title: 'El ritual: ¿cómo tomarlo?', body: ['Para aprovechar al máximo los beneficios de sus extractos verdes y minerales, te recomendamos consumir 1 a 2 sobres al día. Al contener sulfato de magnesio y fibra, esta es la cantidad ideal para mantener tu sistema equilibrado. Si padeces alguna enfermedad o condición de salud específica, te sugerimos consultar con tu médico antes de sumarlo a tu rutina.'] },
        { title: 'Consejo de uso', body: ['Por prevención, se sugiere evitar su consumo en los siguientes casos:', '• Madres gestantes (embarazadas).', '• Madres en periodo de lactancia.', '• Niños menores de 5 años.'] },
        { title: '¿Para quién es este ritual?', body: ['Está pensado para cualquier persona mayor de 5 años que busque sumar sus beneficios antioxidantes y digestivos a su día a día, siempre y cuando no se encuentre en etapa de embarazo, lactancia o tenga restricciones médicas preexistentes.'] },
        { title: 'El círculo verde', body: ['Base de manzana: Harina de manzana y vinagre de manzana.', 'Superalimentos y extractos verdes: Moringa, brócoli, plátano verde, limón, amalaki, açaí berry y clorofila.', 'Vitaminas y minerales: Mix vitamínico y magnesio (sulfato).', 'Sabor y dulzor natural: Sabor a manzana y Stevia (glicósidos de esteviol).', 'Otros ingredientes: Ácido cítrico (acidulante), bicarbonato de sodio (regulador de acidez) y goma xantana (espesante).'] },
        { title: 'Ingredientes', body: ['• Base de Manzana: Harina de manzana y vinagre de manzana.', '• Súper Alimentos y Extractos Verdes: Moringa, brócoli, plátano verde, limón, amalaki, açaí berry y clorofila.', '• Vitaminas y Minerales: Mix vitamínico y magnesio (sulfato).', '• Sabor y Dulzor Natural: Sabor a manzana y Stevia (glicósidos de esteviol).', '• Otros Ingredientes: Ácido cítrico (acidulante), bicarbonato de sodio (regulador de acidez) y goma xantana (espesante).'] },
        { title: 'Preguntas frecuentes', body: ['1. ¿Qué es exactamente MORAVI 360 y cuál es su función principal?', 'Es un sistema de bienestar avanzado en polvo que combina el poder de ingredientes verdes, vitaminas y minerales. Su función principal es actuar como un escudo activo para apoyar tu sistema inmunológico y restaurar el equilibrio interno de tu organismo de forma natural.', '2. ¿Tiene azúcar o muchas calorías?', 'No, está diseñado para complementar un estilo de vida saludable: es bajo en calorías y no contiene azúcar, ya que está endulzado naturalmente con Stevia.', '3. ¿Cuáles son los principales malestares de los que me ayuda a liberarme?', 'Te ayuda a liberarte de la pesadez y acidez después de comer, el cansancio constante y la fatiga. Además, gracias a sus potentes antioxidantes, protege a tu cuerpo del estrés oxidativo y te ayuda a mantener tus defensas altas frente a las exigencias diarias.'] },
        { title: 'Contenido', body: ['Cada doypack tiene un peso neto de 182 g, lo que rinde para 28 porciones (tomas de 6.5 g cada una).'] },
        { title: 'Registro sanitario', body: ['P2889625N/NAQAMX'] },
      ],
    },
    entrepreneur: {
      heading: 'Ya conoces el poder de Moravi 360.',
      description: 'Comparte bienestar consciente y construye una fuente de ingresos a tu propio ritmo.',
    },
    pack: moraviPack,
    otherProductCard: {
      background: otherProductMoravi,
      wordmark: moraviWordmark,
    },
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
    questions: {
      ctaHref: 'https://drive.google.com/drive/folders/1X8vs-C8rfhxdui82m4DC6iGfTIU9w1IR',
      intro: [
        'Es un sistema de bienestar diario diseñado para potenciar tu vitalidad.',
        'Es un sistema de bienestar diario que une café premium con cinco superalimentos presentados en la fórmula como Tesoros Milenarios. Su propósito es acompañarte con energía sostenida, claridad mental y equilibrio integral, evitando los picos y caídas bruscas asociados al café tradicional descritos en la fórmula original.',
      ],
      items: [
        { title: '¿Qué puedes esperar?', body: ['• Energía sostenida sin picos ni caídas bruscas.', '• Mayor claridad mental y enfoque.', '• Más vitalidad para acompañar tu día.', '• Bienestar integral en cada taza.'] },
        { title: 'El ritual: ¿cómo tomarlo?', body: ['Para disfrutar de sus beneficios sin exceder los requerimientos de vitaminas y minerales, te sugerimos consumir de 1 a 2 tazas al día. Si padeces alguna enfermedad, condición de salud específica o sensibilidad a la cafeína, te recomendamos consultar con tu médico antes de sumarlo a tu rutina.'] },
        { title: 'Consejo de uso', body: ['Por prevención y por su contenido de café y extractos herbales, se sugiere evitar su consumo en los siguientes casos:', '• Madres gestantes (embarazadas).', '• Madres en periodo de lactancia.', '• Menores de 18 años.'] },
        { title: '¿Para quién es este ritual?', body: ['Está pensado para adultos que buscan potenciar su vitalidad y rendimiento cotidiano, siempre que no se encuentren en etapa de embarazo o lactancia y no tengan restricciones médicas preexistentes relacionadas con el consumo de cafeína o minerales.'] },
        { title: 'Los 5 Tesoros Milenarios:', body: ['• Los 5 Tesoros Milenarios: Maca, Ganoderma, Moringa, Espirulina y Amalaki.', '• Energía y Sabor: Café instantáneo sabor capuccino con un toque de vainilla.', '• Nutrición y Resistencia: Colágeno hidrolizado.', '• Minerales Esenciales: Magnesio (sulfato), Calcio (carbonato) y Zinc (glicinato).', '• Base Cremosa: Leche y leche descremada.', '• Dulzor Natural: Stevia (glicósidos de esteviol).', '• Información sobre alérgenos: Contiene derivados lácteos (leche).'] },
        { title: 'Preguntas frecuentes', body: ['1. ¿Qué es exactamente CAPUCCI 360 y cuál es su función principal?', 'Es un sistema completo de bienestar diario en polvo (mezcla para preparar bebida instantánea) que reúne el sabor de un café premium con el poder de cinco superalimentos. Su función principal es ofrecerte mucho más que un simple impulso de energía; está formulado para acompañar tu día con claridad, vitalidad y un equilibrio físico y mental.', '2. ¿Tiene azúcar o muchas calorías?', 'No, está diseñado para acompañar un estilo de vida saludable, ya que no contiene azúcar (está endulzado naturalmente con Stevia) y es bajo en calorías.', '3. ¿Cuáles son los principales malestares de los que me ayuda a liberarme?', 'Es el aliado perfecto para ayudarte a combatir la fatiga mental, la sensación de agotamiento y el cansancio constante. Gracias a sus ingredientes milenarios (adaptógenos), ayuda a tu cuerpo a manejar mejor el estrés diario y te libera del nerviosismo que suele provocar el consumo excesivo de café tradicional.'] },
        { title: 'Contenido', body: ['Cada doypack contiene un peso neto de 280 g, lo que rinde para 28 porciones (tomas de 10 g cada una).'] },
        { title: 'Registro sanitario', body: ['P2889625N/NAQAMX'] },
      ],
    },
    entrepreneur: {
      heading: 'Ya conoces el poder de Capucci 360.',
      description: 'Comparte una nueva forma de vivir el café y construye una fuente de ingresos a tu propio ritmo.',
    },
    pack: capucciPack,
    otherProductCard: {
      background: otherProductCapucci,
      wordmark: capucciWordmark,
    },
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
    questions: {
      intro: [
        'Hay momentos en los que el cuerpo pide soltar lo que pesa y recuperar su ritmo. RESET 360 representa ese regreso al centro: un sistema avanzado de bienestar con una potente fórmula 8 en 1, creado para acompañar los procesos naturales de limpieza del organismo, favorecer la digestión y ayudarte a recuperar ligereza, energía y equilibrio.',
        'Su fórmula reúne superalimentos y extractos naturales con fibras, prebióticos, probióticos y vitaminas.',
        'Una combinación pensada como un escudo activo que acompaña tu bienestar desde adentro.',
      ],
      items: [
        { title: '¿Qué puedes esperar?', body: ['Limpia tu organismo.', 'Siéntete más ligero.', 'Mejora tu digestión.', 'Recupera tu energía.'] },
        { title: 'El ritual: ¿Cómo tomarlo?', hideOnMobile: true, body: ['Para aprovechar al máximo sus beneficios digestivos y nutricionales, se recomienda consumir de 1 a 2 sobres al día. Por su contenido de fibras activas, como la chía y los FOS, además de minerales, esta es la cantidad indicada en la fórmula original para acompañar el equilibrio de tu sistema.', 'Si padeces alguna condición de salud específica o estás bajo tratamiento médico, consulta con tu especialista antes de incorporarlo a tu rutina diaria.'] },
        { title: 'Consejo de uso', body: ['Por prevención, se sugiere evitar su consumo en los siguientes casos:', 'Madres gestantes (embarazadas).', 'Madres en periodo de lactancia.', 'Niños menores de 5 años.'] },
        { title: '¿Cómo tomarlo?', body: ['Para aprovechar al máximo sus beneficios digestivos y nutricionales, te recomendamos consumir 1 a 2 sobres al día. Al estar formulado con un alto contenido de fibras activas (como la chía y los FOS) y minerales, esta es la cantidad ideal para mantener tu sistema equilibrado.', 'Si padeces alguna condición de salud específica o estás bajo tratamiento médico, te sugerimos consultar con tu especialista antes de sumarlo a tu rutina diaria.'] },
        { title: '¿Para quién es este ritual?', mobileTitle: '¿Para quién es el producto?', body: ['Está pensado para cualquier persona mayor de 5 años que busque sumar sus beneficios a su día a día, siempre y cuando no se encuentre en etapa de embarazo, lactancia o tenga restricciones médicas preexistentes.'] },
        { title: 'Ingredientes', body: ['• Súper alimentos y extractos naturales: Piña, chía, ciruela, coco, papaya, calabaza, alcachofa y amalaki.', '• Probióticos y Vitaminas: Cultivos probióticos y mix de vitaminas.', '• Fibras y Prebióticos: Fructooligosacáridos (FOS) y fibra de acacia.', '• Sabor y dulzor natural: Sabor a piña-coco y Stevia (glicósidos de esteviol).', '• Otros ingredientes: Goma xantana (espesante) y ácido cítrico (acidulante).', '• Información sobre alérgenos: Contiene derivados lácteos, presentes en los cultivos probióticos.'] },
        { title: 'Preguntas frecuentes', body: ['1. ¿Qué es exactamente RESET 360 y cuál es su función principal?', 'Es un sistema integral de bienestar con una potente fórmula 8 en 1 (que incluye amalaki, ciruela, chía, piña, acai berry, coco, calabaza y papaya) potenciada con magnesio, zinc y probióticos. Su función principal es favorecer el tránsito intestinal, reducir la inflamación y apoyar los procesos naturales de depuración de tu cuerpo, ayudándote a restaurar tu equilibrio interno de forma suave y efectiva.', '2. ¿Tiene azúcar o muchas calorías?', 'No, RESET 360 es cero azúcar (está endulzado naturalmente con Stevia) y es bajo en calorías, por lo que se adapta perfectamente a cualquier plan de alimentación y a un estilo de vida saludable.', '3. ¿Cuáles son los principales malestares de los que me ayuda a liberarme?', 'Es tu gran aliado para despedirte de la pesadez, el tránsito intestinal lento y la molesta hinchazón digestiva. Además, gracias a ingredientes como la piña y la alcachofa, favorece la reducción de líquidos retenidos, devolviéndote tu energía y una sensación de ligereza real a lo largo del día.'] },
        { title: 'Contenido', body: ['Cada doypack contiene un peso neto de 280 g, lo que rinde para 28 porciones (tomas de 7 g cada una).'] },
        { title: 'Certificación de calidad', openOnMobile: true, body: [] },
        { title: 'Registro sanitario', body: ['P2889625N/NAQAMX'] },
      ],
    },
    entrepreneur: {
      heading: 'Ya conoces el poder de Reset 360.',
      description: 'Comparte lo que ya conoces y construye una fuente de ingresos a tu propio ritmo.',
      descriptionHighlight: 'construye una fuente de ingresos',
    },
    pack: resetPack,
    otherProductCard: {
      background: otherProductReset,
      wordmark: resetWordmark,
    },
  },
];

export const productHref = (slug: string) => `/productos/${slug}`;

/** Los otros dos productos de la línea, en el orden en que los pinta el banner. */
export const otherProducts = (slug: string) =>
  PRODUCT_DETAILS.filter((product) => product.slug !== slug);
