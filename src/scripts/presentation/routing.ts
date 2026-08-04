interface RoutingControllerOptions {
  root: HTMLElement;
  closeMobileMenu: () => void;
  closeNutritionPanels: () => void;
  resizePresentation: () => void;
  positionDesktopSlide: (slide: Element | null) => void;
}

export interface RoutingController {
  init: () => void;
  getActiveSlide: () => HTMLElement | null;
  handleKeydown: (event: KeyboardEvent) => void;
}

export function createRoutingController({
  root,
  closeMobileMenu,
  closeNutritionPanels,
  resizePresentation,
  positionDesktopSlide,
}: RoutingControllerOptions): RoutingController {
  let activeSlideId = 'home';

  function getActiveSlide() {
    return document.getElementById(`slide-${activeSlideId}`);
  }

  function route() {
    const targetId = window.location.hash.substring(1) || 'home';
    const targetSlide = document.getElementById(`slide-${targetId}`);
    if (!targetSlide) return;

    document.querySelectorAll('.slide.active').forEach((slide) => {
      slide.classList.remove('active');
      slide.setAttribute('aria-hidden', 'true');
    });

    targetSlide.classList.add('active');
    targetSlide.setAttribute('aria-hidden', 'false');
    activeSlideId = targetId;
    closeMobileMenu();
    closeNutritionPanels();

    const scroller = targetSlide.querySelector('.mobile-scroll');
    if (scroller instanceof HTMLElement) {
      scroller.scrollTop = 0;
      scroller.scrollLeft = 0;
    }

    resizePresentation();
    requestAnimationFrame(() => {
      if (root.dataset.presentationMode === 'desktop') {
        positionDesktopSlide(targetSlide);
      }
    });
  }

  function handleKeydown(event: KeyboardEvent) {
    const currentSlide = getActiveSlide();
    if (!currentSlide) return;

    const prev = currentSlide.getAttribute('data-prev');
    const next = currentSlide.getAttribute('data-next');
    const close = currentSlide.getAttribute('data-close');

    if (event.key === 'ArrowRight' || event.key === ' ' || event.key === 'Enter') {
      if (next) {
        event.preventDefault();
        window.location.hash = `#${next}`;
      }
      return;
    }

    if (event.key === 'ArrowLeft' || event.key === 'Backspace') {
      if (prev) {
        event.preventDefault();
        window.location.hash = `#${prev}`;
      }
      return;
    }

    if (event.key === 'Escape' && close) {
      event.preventDefault();
      window.location.hash = `#${close}`;
    }
  }

  function init() {
    window.addEventListener('hashchange', route);
    route();
  }

  return { init, getActiveSlide, handleKeydown };
}
