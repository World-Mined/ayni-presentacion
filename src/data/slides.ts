import type { ImageMetadata } from 'astro';
import { DESKTOP_IMAGES } from './images';

export interface SlideButton {
  name: string;
  linkTo: string; // The slide ID it links to
  image: ImageMetadata; // Imported card/button image optimized by Astro
  x: number;      // Coordinates inside 1920x1080 space
  y: number;
  width: number;
  height: number;
  disabled?: boolean; // Set to true to disable this button link
}

export interface SlideHeader {
  showClose?: boolean;
  closeTo?: string; // target slide ID when closing
  showArrows?: boolean;
  prevSlide?: string; // target slide ID for left arrow
  nextSlide?: string; // target slide ID for right arrow
  activeTab?: 'capucci' | 'moravi' | 'reset' | null;
  disableClose?: boolean; // Set to true to disable close button action
  disableArrows?: boolean; // Set to true to disable next/prev arrows
  disablePrevArrow?: boolean; // Set to true to disable only the previous arrow
  disableNextArrow?: boolean; // Set to true to disable only the next arrow
  disabledTabs?: ('capucci' | 'moravi' | 'reset')[]; // List of tabs to disable
}

export interface Slide {
  id: string;
  name: string;
  bgImage: ImageMetadata;
  buttons?: SlideButton[];
  header?: SlideHeader;
}

export const SLIDES: Slide[] = [
  {
    id: "home",
    name: "AYNI - Presentación",
    bgImage: DESKTOP_IMAGES.bgHome,
    buttons: [
      {
        name: "PRODUCTOS",
        linkTo: "productos",
        image: DESKTOP_IMAGES.btnProductos,
        x: 170,
        y: 408,
        width: 500,
        height: 500
      },
      {
        name: "PLAN DE COMPENSACIÓN",
        linkTo: "plan",
        image: DESKTOP_IMAGES.btnPlan,
        x: 710,
        y: 408,
        width: 500,
        height: 500,
      },
      {
        name: "BONOS",
        linkTo: "bonos-1",
        image: DESKTOP_IMAGES.btnBonos,
        x: 1250,
        y: 408,
        width: 500,
        height: 500
      }
    ]
  },
  {
    id: "productos",
    name: "AYNI - Productos",
    bgImage: DESKTOP_IMAGES.bgProductos,
    buttons: [
      {
        name: "CAPUCCI 360",
        linkTo: "capucci-360",
        image: DESKTOP_IMAGES.btnCapucci,
        x: 357,
        y: 598,
        width: 375,
        height: 376
      },
      {
        name: "MORAVI 360",
        linkTo: "moravi-360",
        image: DESKTOP_IMAGES.btnMoravi,
        x: 772,
        y: 598,
        width: 376,
        height: 376
      },
      {
        name: "RESET 360",
        linkTo: "reset-360",
        image: DESKTOP_IMAGES.btnReset,
        x: 1188,
        y: 598,
        width: 375,
        height: 376
      }
    ],
    header: {
      showClose: true,
      closeTo: "home"
    }
  },
  {
    id: "capucci-360",
    name: "AYNI - Capucci 360",
    bgImage: DESKTOP_IMAGES.bgCapucci,
    header: {
      showClose: true,
      closeTo: "productos",
      showArrows: true,
      prevSlide: "productos",
      nextSlide: "capucci-formula",
      activeTab: "capucci"
    }
  },
  {
    id: "capucci-formula",
    name: "AYNI - Capucci 360 Fórmula",
    bgImage: DESKTOP_IMAGES.bgCapucciFormula,
    header: {
      showClose: true,
      closeTo: "productos",
      showArrows: true,
      prevSlide: "capucci-360",
      nextSlide: "precios",
      activeTab: "capucci"
    }
  },
  {
    id: "moravi-360",
    name: "AYNI - Moravi 360",
    bgImage: DESKTOP_IMAGES.bgMoravi,
    header: {
      showClose: true,
      closeTo: "productos",
      showArrows: true,
      prevSlide: "productos",
      nextSlide: "moravi-formula",
      activeTab: "moravi"
    }
  },
  {
    id: "moravi-formula",
    name: "AYNI - Moravi 360 Fórmula",
    bgImage: DESKTOP_IMAGES.bgMoraviFormula,
    header: {
      showClose: true,
      closeTo: "productos",
      showArrows: true,
      prevSlide: "moravi-360",
      nextSlide: "precios",
      activeTab: "moravi"
    }
  },
  {
    id: "reset-360",
    name: "AYNI - Reset 360",
    bgImage: DESKTOP_IMAGES.bgReset,
    header: {
      showClose: true,
      closeTo: "productos",
      showArrows: true,
      prevSlide: "productos",
      nextSlide: "reset-formula",
      activeTab: "reset"
    }
  },
  {
    id: "reset-formula",
    name: "AYNI - Reset 360 Fórmula",
    bgImage: DESKTOP_IMAGES.bgResetFormula,
    header: {
      showClose: true,
      closeTo: "productos",
      showArrows: true,
      prevSlide: "reset-360",
      nextSlide: "precios",
      activeTab: "reset"
    }
  },
  {
    id: "bonos-1",
    name: "AYNI - Bonos",
    bgImage: DESKTOP_IMAGES.bgBonos,
    header: {
      showClose: true,
      closeTo: "home",
      showArrows: true,
      prevSlide: "home",
      nextSlide: "bonos-2"
    }
  },
  {
    id: "bonos-2",
    name: "AYNI Estrella",
    bgImage: DESKTOP_IMAGES.bgBonosTravel,
    header: {
      showClose: true,
      closeTo: "home",
      showArrows: true,
      disableNextArrow: true,
      prevSlide: "bonos-1"
    }
  },
  {
    id: "precios",
    name: "AYNI - Productos",
    bgImage: DESKTOP_IMAGES.bgDoypacks,
    header: {
      showClose: true,
      closeTo: "home",
      showArrows: true,
      disableNextArrow: true,
      prevSlide: "productos",
    }
  }
];
