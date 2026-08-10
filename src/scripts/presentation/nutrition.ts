import { NUTRITION_LAYOUT_EVENT } from './nutrition-events';

export interface NutritionController {
  init: () => void;
  closeAll: () => void;
  handleKeydown: (event: KeyboardEvent) => boolean;
}

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/*
 * Margen sobre la duración de la transición para el temporizador de respaldo.
 * `transitionend` no llega si la animación se interrumpe o si el navegador la
 * descarta por estar el panel fuera de pantalla; esperar un poco más que la
 * transición evita mover el foco antes de tiempo cuando sí llega.
 */
const FOCUS_FALLBACK_MARGIN_MS = 50;

export function createNutritionController(): NutritionController {
  let previouslyFocusedElement: HTMLElement | null = null;
  let cancelPendingFocus: (() => void) | undefined;

  function getFocusableElements(panel: HTMLElement) {
    return [...panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)].filter(
      (element) => element.tabIndex >= 0 && element.getClientRects().length > 0
    );
  }

  function setBackgroundInert(slide: HTMLElement, isOpen: boolean) {
    [...slide.children].forEach((child) => {
      if (!(child instanceof HTMLElement) || child.hasAttribute('data-nutrition-layer')) return;

      if (isOpen && !child.inert) {
        child.inert = true;
        child.dataset.nutritionInerted = '';
      } else if (!isOpen && child.hasAttribute('data-nutrition-inerted')) {
        child.inert = false;
        delete child.dataset.nutritionInerted;
      }
    });
  }

  function focusPanel(panel: HTMLElement) {
    cancelPendingFocus?.();
    const rawDuration = getComputedStyle(panel)
      .getPropertyValue('--nut-panel-transition-duration')
      .trim();
    const duration = rawDuration.endsWith('ms')
      ? Number.parseFloat(rawDuration)
      : Number.parseFloat(rawDuration) * 1000;
    const transitionDuration = Number.isFinite(duration) ? duration : 0;

    let fallbackTimer: number | undefined;
    let focusFrame: number | undefined;

    const cleanup = () => {
      panel.removeEventListener('transitionend', handleTransitionEnd);
      window.clearTimeout(fallbackTimer);
      if (focusFrame !== undefined) window.cancelAnimationFrame(focusFrame);
      if (cancelPendingFocus === cleanup) cancelPendingFocus = undefined;
    };

    const moveFocus = () => {
      cleanup();
      if (panel.getAttribute('aria-hidden') === 'false') {
        getFocusableElements(panel)[0]?.focus();
      }
    };

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.target === panel && event.propertyName === 'transform') moveFocus();
    };

    cancelPendingFocus = cleanup;
    if (transitionDuration === 0) {
      focusFrame = window.requestAnimationFrame(moveFocus);
      return;
    }

    panel.addEventListener('transitionend', handleTransitionEnd);
    fallbackTimer = window.setTimeout(moveFocus, transitionDuration + FOCUS_FALLBACK_MARGIN_MS);
  }

  function trapFocus(event: KeyboardEvent, panel: HTMLElement) {
    const focusable = getFocusableElements(panel);
    if (!focusable.length) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && (active === first || !panel.contains(active))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (active === last || !panel.contains(active))) {
      event.preventDefault();
      first.focus();
    }
  }

  function setOpen(
    slide: HTMLElement | null,
    isOpen: boolean,
    restoreFocus = true,
    focusOrigin?: HTMLElement
  ) {
    if (!slide) return;
    const panel = slide.querySelector<HTMLElement>('[data-nutrition-panel]');

    /*
     * Abrir y cerrar se escriben por separado, en vez de con un `toggle`, porque
     * abrir exige un panel y cerrar no: la slide puede quedar marcada sin él si
     * el DOM cambió. Separarlas también deja que TypeScript estreche `panel` a
     * no nulo en la rama de apertura.
     */
    if (isOpen) {
      if (!panel) return;

      if (!previouslyFocusedElement) {
        const activeElement = document.activeElement;
        previouslyFocusedElement =
          focusOrigin ?? (activeElement instanceof HTMLElement ? activeElement : null);
      }

      slide.classList.add('nutrition-open');
      panel.setAttribute('aria-hidden', 'false');
      setBackgroundInert(slide, true);
      document.dispatchEvent(new CustomEvent(NUTRITION_LAYOUT_EVENT));
      focusPanel(panel);
      return;
    }

    slide.classList.remove('nutrition-open');
    panel?.setAttribute('aria-hidden', 'true');
    setBackgroundInert(slide, false);

    cancelPendingFocus?.();
    const focusTarget = previouslyFocusedElement;
    previouslyFocusedElement = null;
    if (restoreFocus && focusTarget?.isConnected) focusTarget.focus();
  }

  function closeAll() {
    document.querySelectorAll<HTMLElement>('.slide.nutrition-open').forEach((slide) => {
      setOpen(slide, false, false);
    });
  }

  function handleClick(event: MouseEvent) {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const openTrigger = target.closest<HTMLElement>('[data-nutrition-open]');
    if (openTrigger) {
      setOpen(openTrigger.closest<HTMLElement>('.slide'), true, true, openTrigger);
      return;
    }

    if (target.closest('[data-nutrition-close]')) {
      setOpen(target.closest<HTMLElement>('.slide'), false);
    }
  }

  function handleOutsideClick(event: MouseEvent) {
    const openSlide = document.querySelector<HTMLElement>('.slide.nutrition-open');
    if (!openSlide) return;

    const target = event.target;
    if (target instanceof Element && target.closest('[data-nutrition-panel]')) return;

    event.preventDefault();
    event.stopPropagation();
    setOpen(openSlide, false);
  }

  function handleKeydown(event: KeyboardEvent) {
    const openSlide = document.querySelector<HTMLElement>('.slide.nutrition-open');
    if (!openSlide) return false;

    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(openSlide, false);
    } else if (event.key === 'Tab') {
      const panel = openSlide.querySelector<HTMLElement>('[data-nutrition-panel]');
      if (panel) trapFocus(event, panel);
    }

    return true;
  }

  function init() {
    document.addEventListener('click', handleClick);
    document.addEventListener('click', handleOutsideClick, true);
  }

  return { init, closeAll, handleKeydown };
}
