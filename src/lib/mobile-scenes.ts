import {
  MOBILE_HOME_BACKGROUND,
  MOBILE_HOME_CARD_IMAGES,
  MOBILE_PRODUCTS_BACKGROUND,
  MOBILE_PRODUCTS_CARD_IMAGES,
} from '../data/images';
import { SlideId } from '../data/slide-ids';
import type { Slide } from '../data/slides';
import type {
  MobileComposedSceneConfig,
  MobileNavigationAction,
} from '../types/mobile-scenes';

/** Ancho del lienzo de diseño mobile; las medidas de Figma están tomadas sobre él. */
const MOBILE_DESIGN_WIDTH = 390;

/** Desplazamiento vertical de la pila de tarjetas, en px de ese mismo lienzo. */
const MOBILE_COMPOSED_SCENE_STACKS = {
  [SlideId.Home]: 271,
  [SlideId.Products]: 260,
} as const;

export function getMobileBackAction(slide: Slide): MobileNavigationAction | null {
  if (slide.id === SlideId.Home || slide.id === SlideId.Pricing) {
    return null;
  }

  if (slide.id === SlideId.Products) {
    return { target: SlideId.Home, label: 'Atrás' };
  }

  const target = slide.header?.prevSlide || slide.header?.closeTo;
  return target ? { target, label: 'Atrás' } : null;
}

export function getMobileNextAction(slide: Slide): MobileNavigationAction | null {
  if (slide.id === SlideId.Home || slide.id === SlideId.Products) {
    return null;
  }

  if (slide.id === SlideId.Pricing) {
    return {
      target: slide.header?.closeTo || SlideId.Home,
      label: 'Ir a inicio',
    };
  }

  if (slide.header?.nextSlide) {
    return { target: slide.header.nextSlide, label: 'Siguiente' };
  }

  if (slide.id === SlideId.BonusesTravel && slide.header?.closeTo) {
    return { target: slide.header.closeTo, label: 'Ir a inicio' };
  }

  return null;
}

export function getMobileComposedScene(slide: Slide): MobileComposedSceneConfig | null {
  if (slide.id === SlideId.Home) {
    return {
      id: SlideId.Home,
      background: MOBILE_HOME_BACKGROUND,
      stackTop: MOBILE_COMPOSED_SCENE_STACKS[SlideId.Home],
      cards: (slide.buttons || []).map((button) => ({
        name: button.name,
        image: MOBILE_HOME_CARD_IMAGES[button.name] || button.image,
        linkTo: button.disabled ? undefined : button.linkTo,
        disabled: button.disabled,
      })),
    };
  }

  if (slide.id === SlideId.Products) {
    return {
      id: SlideId.Products,
      background: MOBILE_PRODUCTS_BACKGROUND,
      stackTop: MOBILE_COMPOSED_SCENE_STACKS[SlideId.Products],
      cards: (slide.buttons || []).map((button) => ({
        name: button.name,
        image: MOBILE_PRODUCTS_CARD_IMAGES[button.name] || button.image,
        linkTo: button.linkTo,
      })),
    };
  }

  return null;
}

/** Convierte un px del diseño mobile a `cqw`, para que escale con el contenedor. */
export function toMobileCqw(value: number) {
  return `${(value / MOBILE_DESIGN_WIDTH) * 100}cqw`;
}
