/**
 * La slide visible es la que el router marca con `.active`, así que el DOM ya es
 * la fuente de verdad: nadie necesita depender del router para consultarla.
 */
export function getActiveSlide(): HTMLElement | null {
  return document.querySelector<HTMLElement>('.slide.active');
}
