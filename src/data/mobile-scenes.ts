import type { ImageMetadata } from 'astro';
import {
  MOBILE_HOME_BACKGROUND,
  MOBILE_HOME_CARD_IMAGES,
  MOBILE_PRODUCTS_BACKGROUND,
  MOBILE_PRODUCTS_CARD_IMAGES,
} from './images';
import { SlideId } from './slide-ids';
import type { Slide } from './slides';

export interface MobileNavigationAction {
  target: SlideId;
  label: string;
}

export interface MobileComposedSceneCard {
  name: string;
  image: ImageMetadata;
  linkTo?: SlideId;
  disabled?: boolean;
}

export interface MobileComposedSceneConfig {
  id: SlideId.Home | SlideId.Products;
  background: ImageMetadata;
  stackTop: number;
  cards: MobileComposedSceneCard[];
}

export const MOBILE_PRICING_CARDS = [
  {
    pack: '05 DOYPACK',
    price: 'S/.450.00',
    points: '60 PUNTOS',
  },
  {
    pack: '08 DOYPACK',
    price: 'S/.720.00',
    points: '100 PUNTOS',
  },
] as const;

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

export function toMobileCqw(value: number) {
  return `${(value / 390) * 100}cqw`;
}
