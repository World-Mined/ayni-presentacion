import { createMobileNavigationController } from './mobile-navigation';
import { createNutritionController } from './nutrition';
import { createRoutingController } from './routing';
import { createViewportController } from './viewport';

export function initPresentation() {
  const root = document.documentElement;
  const wrapper = document.getElementById('presentation-wrapper');
  if (!wrapper) return;

  const nutrition = createNutritionController();
  const mobileNavigation = createMobileNavigationController({ root });
  const viewport = createViewportController({
    root,
    closeMobileMenu: () => mobileNavigation.setOpen(false),
  });
  const routing = createRoutingController({
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

  // Orden de prioridad: lo que esté abierto encima consume la tecla primero.
  window.addEventListener('keydown', (event) => {
    if (nutrition.handleKeydown(event)) return;
    if (mobileNavigation.handleKeydown(event)) return;
    routing.handleKeydown(event);
  });
}
