interface ViewportControllerOptions {
  root: HTMLElement;
  closeMobileMenu: () => void;
}

export interface ViewportController {
  init: () => void;
  resize: () => void;
  positionDesktopSlide: (slide: Element | null) => void;
}

const MOBILE_BREAKPOINT = 1024;
const TABLET_BREAKPOINT = 1440;
const BASE_WIDTH = 1920;
const BASE_HEIGHT = 1080;

export function createViewportController({
  root,
  closeMobileMenu,
}: ViewportControllerOptions): ViewportController {
  const coarsePointerQuery = window.matchMedia('(pointer: coarse)');

  function positionDesktopSlide(slide: Element | null) {
    if (!(slide instanceof HTMLElement)) return;
    slide.scrollTo({ left: 0, top: 0 });
  }

  function resize() {
    const visualViewport = window.visualViewport;
    const windowWidth = Math.round(visualViewport?.width || window.innerWidth);
    const windowHeight = Math.round(visualViewport?.height || window.innerHeight);
    const isTouchDevice = navigator.maxTouchPoints > 0 || coarsePointerQuery.matches;
    const isPortrait = windowHeight >= windowWidth;
    const isMobile = windowWidth <= MOBILE_BREAKPOINT
      || (isTouchDevice && isPortrait && windowWidth <= TABLET_BREAKPOINT);

    if (isMobile) {
      root.dataset.presentationMode = 'mobile';
      delete root.dataset.desktopScaleMode;
      root.style.setProperty('--slide-frame-scale', '1');
      root.style.setProperty('--slide-frame-left', '0px');
      root.style.setProperty('--slide-frame-top', '0px');
      root.style.setProperty('--slide-rendered-width', `${BASE_WIDTH}px`);
      root.style.setProperty('--slide-rendered-height', `${BASE_HEIGHT}px`);
      root.style.setProperty('--mobile-vw', `${windowWidth}px`);
      root.style.setProperty('--mobile-vh', `${windowHeight}px`);
      return;
    }

    const scale = Math.min(windowWidth / BASE_WIDTH, windowHeight / BASE_HEIGHT);
    const frameWidth = BASE_WIDTH * scale;
    const frameHeight = BASE_HEIGHT * scale;

    closeMobileMenu();
    root.dataset.presentationMode = 'desktop';
    root.dataset.desktopScaleMode = 'contain';
    root.style.setProperty('--slide-frame-scale', String(scale));
    root.style.setProperty('--slide-frame-left', '0px');
    root.style.setProperty('--slide-frame-top', '0px');
    root.style.setProperty('--slide-rendered-width', `${frameWidth}px`);
    root.style.setProperty('--slide-rendered-height', `${frameHeight}px`);
    requestAnimationFrame(() => {
      positionDesktopSlide(document.querySelector('.slide.active'));
    });
  }

  function init() {
    window.addEventListener('resize', resize);
    window.visualViewport?.addEventListener('resize', resize);
    document.addEventListener('DOMContentLoaded', resize);
    resize();
  }

  return { init, resize, positionDesktopSlide };
}
