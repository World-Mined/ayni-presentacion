import { getActiveSlide } from './active-slide';

interface MobileNavigationControllerOptions {
  root: HTMLElement;
}

export interface MobileNavigationController {
  init: () => void;
  setOpen: (isOpen: boolean) => void;
  /** Devuelve true cuando el menú consume la tecla y nadie más debe verla. */
  handleKeydown: (event: KeyboardEvent) => boolean;
}

export function createMobileNavigationController({
  root,
}: MobileNavigationControllerOptions): MobileNavigationController {
  const overlay = document.getElementById('mobile-menu-overlay');
  let touchStartX = 0;
  let touchStartY = 0;

  function setOpen(isOpen: boolean) {
    const shouldOpen = isOpen && root.dataset.presentationMode === 'mobile';
    root.classList.toggle('mobile-menu-open', shouldOpen);
    if (overlay) overlay.hidden = !shouldOpen;
  }

  function handleClick(event: MouseEvent) {
    const target = event.target;
    if (!(target instanceof Element)) return;

    if (target.closest('[data-mobile-menu-open]')) {
      setOpen(true);
      return;
    }

    if (target.closest('[data-mobile-menu-close]') || target.closest('[data-mobile-menu-link]')) {
      setOpen(false);
      return;
    }

    if (target === overlay) setOpen(false);
  }

  function handleSwipe(deltaX: number, deltaY: number) {
    if (root.classList.contains('mobile-menu-open')) return;
    if (Math.abs(deltaX) <= Math.abs(deltaY) || Math.abs(deltaX) <= 60) return;

    const currentSlide = getActiveSlide();
    if (!currentSlide) return;

    const isMobile = root.dataset.presentationMode === 'mobile';
    const prev = currentSlide.getAttribute(isMobile ? 'data-mobile-prev' : 'data-prev');
    const next = currentSlide.getAttribute(isMobile ? 'data-mobile-next' : 'data-next');
    const target = deltaX < 0 ? next : prev;
    if (target) window.location.hash = `#${target}`;
  }

  function handleTouchStart(event: TouchEvent) {
    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;
  }

  function handleTouchEnd(event: TouchEvent) {
    const touch = event.changedTouches[0];
    handleSwipe(touch.screenX - touchStartX, touch.screenY - touchStartY);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (!root.classList.contains('mobile-menu-open')) return false;

    // Mismo criterio que el panel nutricional: con el menú abierto el router no
    // debe recibir teclas de navegación.
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
    }

    return true;
  }

  function init() {
    document.addEventListener('click', handleClick);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
  }

  return { init, setOpen, handleKeydown };
}
