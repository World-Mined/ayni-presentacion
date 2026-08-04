import { createMobileNavigationController } from './mobile-navigation';
import { createNutritionController } from './nutrition';
import { createRoutingController, type RoutingController } from './routing';
import { createViewportController } from './viewport';

export function initPresentation() {
  const root = document.documentElement;
  const wrapper = document.getElementById('presentation-wrapper');
  if (!wrapper) return;

  const nutrition = createNutritionController();
  let routing: RoutingController;

  const mobileNavigation = createMobileNavigationController({
    root,
    getActiveSlide: () => routing?.getActiveSlide() || null,
  });
  const viewport = createViewportController({
    root,
    closeMobileMenu: () => mobileNavigation.setOpen(false),
  });
  routing = createRoutingController({
    root,
    closeMobileMenu: () => mobileNavigation.setOpen(false),
    closeNutritionPanels: nutrition.closeAll,
    resizePresentation: viewport.resize,
    positionDesktopSlide: viewport.positionDesktopSlide,
  });

  nutrition.init();
  mobileNavigation.init();
  viewport.init();
  routing.init();

  window.addEventListener('keydown', (event) => {
    if (nutrition.handleEscape(event)) return;
    if (mobileNavigation.handleEscape(event)) return;
    routing.handleKeydown(event);
  });
}
