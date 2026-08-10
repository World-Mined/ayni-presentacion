import type { ImageMetadata } from 'astro';
import type { SlideId } from '../data/slide-ids';

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
