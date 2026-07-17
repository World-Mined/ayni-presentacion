import type { ImageMetadata } from 'astro';
import bgBonos from '../assets/bg_bonos.webp';
import bgBonosTravel from '../assets/bg_bonos_travel.webp';
import bgCapucci from '../assets/bg_capucci.webp';
import bgCapucciFormula from '../assets/bg_capucci_formula.webp';
import bgDoypacks from '../assets/bg_doypacks.webp';
import bgHome from '../assets/bg_home.webp';
import bgMoravi from '../assets/bg_moravi.webp';
import bgMoraviFormula from '../assets/bg_moravi_formula.webp';
import bgProductos from '../assets/bg_productos.webp';
import bgReset from '../assets/bg_reset.webp';
import bgResetFormula from '../assets/bg_reset_formula.webp';
import btnBonos from '../assets/btn_bonos.webp';
import btnCapucci from '../assets/btn_capucci.webp';
import btnMoravi from '../assets/btn_moravi.webp';
import btnPlan from '../assets/btn_plan.webp';
import btnProductos from '../assets/btn_productos.webp';
import btnReset from '../assets/btn_reset.webp';
import mobileBonusTravel from '../assets/mobile-bonus-travel/bonos2-bg.webp';
import mobileBonosBackground from '../assets/mobile-home/bonos-bg.webp';
import mobileBonosCard from '../assets/mobile-home/bonos-card.webp';
import mobileHomeBackground from '../assets/mobile-home/home-background.webp';
import mobilePlanCard from '../assets/mobile-home/plan-card.webp';
import mobileProductosCard from '../assets/mobile-home/productos-card.webp';
import mobileMenuAyniLogo from '../assets/mobile-menu/ayni-logo.webp';
import mobileMenuWorldgenLogo from '../assets/mobile-menu/worldgen-logo.webp';
import mobilePricingAyniLogo from '../assets/mobile-pricing/ayni-logo.webp';
import mobilePricingBackground from '../assets/mobile-pricing/background.webp';
import mobilePricingCapucci from '../assets/mobile-pricing/capucci.webp';
import mobilePricingMoravi from '../assets/mobile-pricing/moravi.webp';
import mobilePricingReset from '../assets/mobile-pricing/reset.webp';
import mobileCapucciBackground from '../assets/mobile-products/capucci-bg.webp';
import mobileCapucciCard from '../assets/mobile-products/capucci-card.webp';
import mobileCapucciFormulaBackground from '../assets/mobile-products/capucci-formula-bg.webp';
import mobileMoraviBackground from '../assets/mobile-products/moravi-bg.webp';
import mobileMoraviCard from '../assets/mobile-products/moravi-card.webp';
import mobileMoraviFormulaBackground from '../assets/mobile-products/moravi-formula-bg.webp';
import mobileProductosBackground from '../assets/mobile-products/productos-background.webp';
import mobileResetBackground from '../assets/mobile-products/reset-bg.webp';
import mobileResetCard from '../assets/mobile-products/reset-card.webp';
import mobileResetFormulaBackground from '../assets/mobile-products/reset-formula-bg.webp';

export const DESKTOP_IMAGES = {
  bgBonos,
  bgBonosTravel,
  bgCapucci,
  bgCapucciFormula,
  bgDoypacks,
  bgHome,
  bgMoravi,
  bgMoraviFormula,
  bgProductos,
  bgReset,
  bgResetFormula,
  btnBonos,
  btnCapucci,
  btnMoravi,
  btnPlan,
  btnProductos,
  btnReset,
} as const;

export const MOBILE_HOME_CARD_IMAGES: Record<string, ImageMetadata> = {
  PRODUCTOS: mobileProductosCard,
  'PLAN DE COMPENSACIÓN': mobilePlanCard,
  BONOS: mobileBonosCard,
} as const;

export const MOBILE_HOME_BACKGROUND = mobileHomeBackground;
export const MOBILE_PRODUCTS_BACKGROUND = mobileProductosBackground;

export const MOBILE_PRODUCTS_CARD_IMAGES: Record<string, ImageMetadata> = {
  'CAPUCCI 360': mobileCapucciCard,
  'MORAVI 360': mobileMoraviCard,
  'RESET 360': mobileResetCard,
} as const;

export const MOBILE_PRICING_ASSETS = {
  background: mobilePricingBackground,
  logo: mobilePricingAyniLogo,
  capucci: mobilePricingCapucci,
  moravi: mobilePricingMoravi,
  reset: mobilePricingReset,
} as const;

export const MOBILE_FIGMA_BACKGROUNDS: Record<string, ImageMetadata> = {
  'bonos-1': mobileBonosBackground,
  'capucci-360': mobileCapucciBackground,
  'capucci-formula': mobileCapucciFormulaBackground,
  'moravi-360': mobileMoraviBackground,
  'moravi-formula': mobileMoraviFormulaBackground,
  'reset-360': mobileResetBackground,
  'reset-formula': mobileResetFormulaBackground,
  'bonos-2': mobileBonusTravel,
} as const;

export const MOBILE_MENU_ASSETS = {
  ayniLogo: mobileMenuAyniLogo,
  worldgenLogo: mobileMenuWorldgenLogo,
} as const;
