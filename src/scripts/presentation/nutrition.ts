export interface NutritionController {
  init: () => void;
  closeAll: () => void;
  handleEscape: (event: KeyboardEvent) => boolean;
}

export function createNutritionController(): NutritionController {
  function setOpen(slide: Element | null, isOpen: boolean) {
    if (!slide) return;
    slide.classList.toggle('nutrition-open', isOpen);
    const panel = slide.querySelector('[data-nutrition-panel]');
    panel?.setAttribute('aria-hidden', String(!isOpen));

    if (isOpen) {
      document.dispatchEvent(new CustomEvent('nutrition:layout'));
    }
  }

  function closeAll() {
    document.querySelectorAll('.slide.nutrition-open').forEach((slide) => {
      setOpen(slide, false);
    });
  }

  function handleClick(event: MouseEvent) {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const openTrigger = target.closest('[data-nutrition-open]');
    if (openTrigger) {
      setOpen(openTrigger.closest('.slide'), true);
      return;
    }

    if (target.closest('[data-nutrition-close]')) {
      setOpen(target.closest('.slide'), false);
    }
  }

  function handleOutsideClick(event: MouseEvent) {
    const openSlide = document.querySelector('.slide.nutrition-open');
    if (!openSlide) return;

    const target = event.target;
    if (target instanceof Element && target.closest('[data-nutrition-panel]')) return;

    event.preventDefault();
    event.stopPropagation();
    setOpen(openSlide, false);
  }

  function handleEscape(event: KeyboardEvent) {
    const openSlide = document.querySelector('.slide.nutrition-open');
    if (!openSlide || event.key !== 'Escape') return false;

    event.preventDefault();
    setOpen(openSlide, false);
    return true;
  }

  function init() {
    document.addEventListener('click', handleClick);
    document.addEventListener('click', handleOutsideClick, true);
  }

  return { init, closeAll, handleEscape };
}
