import type { ImageMetadata } from 'astro';
import { DESKTOP_IMAGES } from './images';
import { SlideId } from './slide-ids';

export interface SlideButton {
  name: string;
  linkTo: SlideId; // The slide ID it links to
  image: ImageMetadata; // Imported card/button image optimized by Astro
  x: number;      // Coordinates inside 1920x1080 space
  y: number;
  width: number;
  height: number;
  disabled?: boolean; // Set to true to disable this button link
}

export interface SlideHeader {
  showClose?: boolean;
  closeTo?: SlideId; // target slide ID when closing
  showArrows?: boolean;
  prevSlide?: SlideId; // target slide ID for left arrow
  nextSlide?: SlideId; // target slide ID for right arrow
  activeTab?: 'capucci' | 'moravi' | 'reset' | null;
  disableClose?: boolean; // Set to true to disable close button action
  disableArrows?: boolean; // Set to true to disable next/prev arrows
  disablePrevArrow?: boolean; // Set to true to disable only the previous arrow
  disableNextArrow?: boolean; // Set to true to disable only the next arrow
  disabledTabs?: ('capucci' | 'moravi' | 'reset')[]; // List of tabs to disable
}

export interface Slide {
  id: SlideId;
  name: string;
  bgImage: ImageMetadata;
  buttons?: SlideButton[];
  header?: SlideHeader;
}

export const SLIDES: Slide[] = [
  {
    id: SlideId.Home,
    name: "AYNI - Presentación",
    bgImage: DESKTOP_IMAGES.bgHome,
    buttons: [
      {
        name: "PRODUCTOS",
        linkTo: SlideId.Products,
        image: DESKTOP_IMAGES.btnProductos,
        x: 170,
        y: 408,
        width: 500,
        height: 500
      },
      {
        name: "BONOS",
        linkTo: SlideId.Bonuses,
        image: DESKTOP_IMAGES.btnBonos,
        x: 710,
        y: 408,
        width: 500,
        height: 500,
      },
      {
        name: "PLAN DE COMPENSACIÓN",
        linkTo: SlideId.CompensationPlan,
        image: DESKTOP_IMAGES.btnPlan,
        x: 1250,
        y: 408,
        width: 500,
        height: 500
      }
    ]
  },
  {
    id: SlideId.Products,
    name: "AYNI - Productos",
    bgImage: DESKTOP_IMAGES.bgProductos,
    buttons: [
      {
        name: "CAPUCCI 360",
        linkTo: SlideId.Capucci,
        image: DESKTOP_IMAGES.btnCapucci,
        x: 357,
        y: 598,
        width: 375,
        height: 376
      },
      {
        name: "MORAVI 360",
        linkTo: SlideId.Moravi,
        image: DESKTOP_IMAGES.btnMoravi,
        x: 772,
        y: 598,
        width: 376,
        height: 376
      },
      {
        name: "RESET 360",
        linkTo: SlideId.Reset,
        image: DESKTOP_IMAGES.btnReset,
        x: 1188,
        y: 598,
        width: 375,
        height: 376
      }
    ],
    header: {
      showClose: true,
      closeTo: SlideId.Home
    }
  },
  {
    id: SlideId.Capucci,
    name: "AYNI - Capucci 360",
    bgImage: DESKTOP_IMAGES.bgCapucci,
    header: {
      showClose: true,
      closeTo: SlideId.Products,
      showArrows: true,
      prevSlide: SlideId.Products,
      nextSlide: SlideId.CapucciFormula,
      activeTab: "capucci"
    }
  },
  {
    id: SlideId.CapucciFormula,
    name: "AYNI - Capucci 360 Fórmula",
    bgImage: DESKTOP_IMAGES.bgCapucciFormula,
    header: {
      showClose: true,
      closeTo: SlideId.Products,
      showArrows: true,
      prevSlide: SlideId.Capucci,
      nextSlide: SlideId.Pricing,
      activeTab: "capucci"
    }
  },
  {
    id: SlideId.Moravi,
    name: "AYNI - Moravi 360",
    bgImage: DESKTOP_IMAGES.bgMoravi,
    header: {
      showClose: true,
      closeTo: SlideId.Products,
      showArrows: true,
      prevSlide: SlideId.Products,
      nextSlide: SlideId.MoraviFormula,
      activeTab: "moravi"
    }
  },
  {
    id: SlideId.MoraviFormula,
    name: "AYNI - Moravi 360 Fórmula",
    bgImage: DESKTOP_IMAGES.bgMoraviFormula,
    header: {
      showClose: true,
      closeTo: SlideId.Products,
      showArrows: true,
      prevSlide: SlideId.Moravi,
      nextSlide: SlideId.Pricing,
      activeTab: "moravi"
    }
  },
  {
    id: SlideId.Reset,
    name: "AYNI - Reset 360",
    bgImage: DESKTOP_IMAGES.bgReset,
    header: {
      showClose: true,
      closeTo: SlideId.Products,
      showArrows: true,
      prevSlide: SlideId.Products,
      nextSlide: SlideId.ResetFormula,
      activeTab: "reset"
    }
  },
  {
    id: SlideId.ResetFormula,
    name: "AYNI - Reset 360 Fórmula",
    bgImage: DESKTOP_IMAGES.bgResetFormula,
    header: {
      showClose: true,
      closeTo: SlideId.Products,
      showArrows: true,
      prevSlide: SlideId.Reset,
      nextSlide: SlideId.Pricing,
      activeTab: "reset"
    }
  },
  {
    id: SlideId.Bonuses,
    name: "AYNI - Bonos",
    bgImage: DESKTOP_IMAGES.bgBonos,
    header: {
      showClose: true,
      closeTo: SlideId.Home,
      showArrows: true,
      prevSlide: SlideId.Home,
      nextSlide: SlideId.BonusesTravel
    }
  },
  {
    id: SlideId.BonusesTravel,
    name: "AYNI Estrella",
    bgImage: DESKTOP_IMAGES.bgBonosTravel,
    header: {
      showClose: true,
      closeTo: SlideId.Home,
      showArrows: true,
      disableNextArrow: true,
      prevSlide: SlideId.Bonuses
    }
  },
  {
    id: SlideId.Pricing,
    name: "AYNI - Productos",
    bgImage: DESKTOP_IMAGES.bgDoypacks,
    header: {
      showClose: true,
      closeTo: SlideId.Home,
      showArrows: true,
      disableNextArrow: true,
      prevSlide: SlideId.Products,
    }
  }
];
