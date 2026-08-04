interface MobileNavigationControllerOptions {
  root: HTMLElement;
  getActiveSlide: () => HTMLElement | null;
}

export interface MobileNavigationController {
  init: () => void;
  setOpen: (isOpen: boolean) => void;
  handleEscape: (event: KeyboardEvent) => boolean;
}

export function createMobileNavigationController({
  root,
  getActiveSlide,
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

  function handleEscape(event: KeyboardEvent) {
    if (!root.classList.contains('mobile-menu-open') || event.key !== 'Escape') return false;
    event.preventDefault();
    setOpen(false);
    return true;
  }

  function init() {
    document.addEventListener('click', handleClick);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
  }

  return { init, setOpen, handleEscape };
}
