import { createTimeline, animate, stagger } from 'animejs';
import type { RevealConfig, ResolvedConfig } from './types';
import { ICONS } from './icons';
import {
  DEFAULT_TIMING,
  DEFAULT_GEOMETRY,
  DEFAULT_SCROLL,
  DEFAULT_FRAMES,
} from './defaults';

const SVGNS = 'http://www.w3.org/2000/svg';
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const pct = (v: number, total: number) => `${(v / total) * 100}%`;

/** Fusiona la config del producto con los defaults. */
function resolve(config: RevealConfig): ResolvedConfig {
  return {
    id: config.id,
    title: config.title,
    frames: { ...DEFAULT_FRAMES, ...config.frames },
    labels: config.labels,
    timing: { ...DEFAULT_TIMING, ...config.timing },
    geometry: { ...DEFAULT_GEOMETRY, ...config.geometry },
    scroll: { ...DEFAULT_SCROLL, ...config.scroll },
  };
}

/**
 * Monta la animación de producto dentro de `root` (la sección .reveal-track).
 * `root` debe contener .reveal-stage con .reveal-title / .reveal-halo /
 * .reveal-product / .reveal-overlay (ver ProductReveal.astro).
 */
export function createReveal(root: HTMLElement, config: RevealConfig): () => void {
  const C = resolve(config);
  const T = C.timing;
  const G = C.geometry;

  const stage = root.querySelector<HTMLElement>('.reveal-stage');
  const overlay = root.querySelector<SVGSVGElement>('.reveal-overlay');
  const halo = root.querySelector<HTMLElement>('.reveal-halo');
  const productImg = root.querySelector<HTMLImageElement>('.reveal-product');
  const titleblock = root.querySelector<HTMLElement>('.reveal-title');
  if (!stage || !overlay || !halo || !productImg || !titleblock) return () => {};

  root.style.height = `${C.scroll.trackVH}vh`;
  root.classList.add('reveal-initialized');

  const frameSrc = (i: number) =>
    `${C.frames.dir}/${C.frames.prefix}${String(i + 1).padStart(C.frames.pad, '0')}.${C.frames.ext}`;

  // Precarga de frames
  for (let i = 0; i < C.frames.count; i++) {
    const im = new Image();
    im.src = frameSrc(i);
  }
  productImg.src = frameSrc(0);

  // ── Círculo (anillo) ──
  const ring = document.createElementNS(SVGNS, 'circle');
  ring.setAttribute('class', 'reveal-ring');
  ring.setAttribute('cx', String(G.center.x));
  ring.setAttribute('cy', String(G.center.y));
  ring.setAttribute('r', String(G.ringRadius));
  ring.setAttribute('stroke-width', '2.4');
  overlay.appendChild(ring);
  const ringLen = 2 * Math.PI * G.ringRadius;
  ring.style.strokeDasharray = String(ringLen);
  ring.style.strokeDashoffset = String(ringLen);

  // ── Ramas (stem + node + label) ──
  const built = C.labels.map((cfg) => {
    const rowY = G.rowsY[cfg.row];
    const outer = { x: G.iconX[cfg.side], y: rowY };
    const dx = outer.x - G.center.x;
    const dy = outer.y - G.center.y;
    const d = Math.hypot(dx, dy);
    const ringPt = {
      x: G.center.x + (dx / d) * G.ringRadius,
      y: G.center.y + (dy / d) * G.ringRadius,
    };

    const stem = document.createElementNS(SVGNS, 'line');
    stem.setAttribute('class', 'reveal-stem');
    stem.setAttribute('x1', ringPt.x.toFixed(1));
    stem.setAttribute('y1', ringPt.y.toFixed(1));
    stem.setAttribute('x2', outer.x.toFixed(1));
    stem.setAttribute('y2', outer.y.toFixed(1));
    stem.setAttribute('stroke-width', '2');
    const stemLen = Math.hypot(outer.x - ringPt.x, outer.y - ringPt.y);
    stem.style.strokeDasharray = String(stemLen);
    stem.style.strokeDashoffset = String(stemLen);
    overlay.appendChild(stem);

    const node = document.createElementNS(SVGNS, 'circle');
    node.setAttribute('class', 'reveal-node');
    node.setAttribute('cx', ringPt.x.toFixed(1));
    node.setAttribute('cy', ringPt.y.toFixed(1));
    node.setAttribute('r', '5');
    node.style.transform = 'scale(0)';
    overlay.appendChild(node);

    const label = document.createElement('div');
    label.className = `reveal-label ${cfg.side}`;
    label.style.left = pct(outer.x, 1920);
    label.style.top = pct(outer.y, 1080);
    label.style.marginLeft = cfg.side === 'left' ? '-14px' : '14px';
    const ico = document.createElementNS(SVGNS, 'svg');
    ico.setAttribute('class', 'reveal-ico');
    ico.setAttribute('viewBox', '0 0 24 24');
    ico.innerHTML = ICONS[cfg.icon] ?? ICONS.berry;
    const txt = document.createElement('span');
    txt.className = 'reveal-txt';
    [...cfg.name].forEach((ch) => {
      const s = document.createElement('span');
      s.textContent = ch === ' ' ? ' ' : ch;
      txt.appendChild(s);
    });
    label.appendChild(ico);
    label.appendChild(txt);
    stage.appendChild(label);
    return { cfg, stem, stemLen, node, ico, chars: [...txt.children] as HTMLElement[] };
  });

  // ── Timeline único y continuo: entrada → círculo → ramas ──
  const state = { f: 0 };
  const tl = createTimeline({ autoplay: false });

  // ENTRADA
  tl.add(titleblock, { opacity: [0, 1], scale: [0.5, 1], duration: T.titleDur, ease: T.curve }, 0);
  tl.add(productImg, { opacity: [0, 1], duration: T.riseDur, ease: 'linear' }, 0); // sólido al centro
  tl.add(productImg, { translateY: [T.riseFrom, '0%'], duration: T.riseDur, ease: T.curve }, 0); // popup

  // Giro en 2 fases + círculo sincronizado al frame.
  const count = C.frames.count;
  const centerIdx = clamp(T.centerFrame - 1, 0, count - 1);
  const endIdx = Math.round(T.rotateEnd * (count - 1));
  const ringFromIdx = Math.max(0, T.ringStartFrame - 1);
  const ringToIdx = Math.max(ringFromIdx + 1, T.ringEndFrame - 1);
  const setFrame = () => {
    productImg.src = frameSrc(Math.round(state.f));
    const cp = clamp((state.f - ringFromIdx) / (ringToIdx - ringFromIdx), 0, 1);
    ring.style.strokeDashoffset = String(ringLen * (1 - cp));
    halo.style.opacity = String(cp);
  };
  // FASE A: sube al centro girando (frames 0→centerIdx)
  tl.add(state, { f: [0, centerIdx], duration: T.riseDur, ease: 'linear', onUpdate: setFrame }, 0);
  // FASE B: gira en el centro (frames centerIdx→endIdx)
  tl.add(state, { f: [centerIdx, endIdx], duration: T.rotateCenterDur, ease: 'linear', onUpdate: setFrame }, T.riseDur);

  // Instante en que el giro alcanza ringEndFrame → ahí arrancan las ramas.
  const labelsStart =
    ringToIdx <= centerIdx
      ? (ringToIdx / centerIdx) * T.riseDur
      : T.riseDur + ((ringToIdx - centerIdx) / (endIdx - centerIdx)) * T.rotateCenterDur;

  // RAMAS
  const slots = built.map((_, i) => i);
  if (T.labelsOrder === 'random') {
    for (let i = slots.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [slots[i], slots[j]] = [slots[j], slots[i]];
    }
  }
  const LD = T.labelsDur;
  built.forEach((b, idx) => {
    const slot = T.labelsOrder === 'random' ? slots[idx] : idx;
    const at = labelsStart + slot * T.labelsStagger;
    tl.add(b.stem, { strokeDashoffset: [b.stemLen, 0], duration: LD, ease: 'outQuad' }, at);
    tl.add(b.node, { scale: [0, 1], duration: LD * 0.9, ease: 'outBack' }, at + LD * 0.7);
    tl.add(b.ico, { opacity: [0, 1], scale: [0.6, 1], duration: LD * 0.85, ease: 'outQuad' }, at + LD * 0.8);
    const dir = b.cfg.side === 'left' ? 14 : -14;
    tl.add(
      b.chars,
      {
        opacity: [0, 1],
        translateX: [dir, 0],
        duration: LD * 0.95,
        ease: 'outQuad',
        delay: stagger(20, { from: b.cfg.side === 'left' ? 'last' : 'first' }),
      },
      at + LD * 0.85,
    );
  });

  tl.pause();
  tl.seek(0); // estado inicial: oculto
  const DUR = tl.duration;

  // ── Disparo por scroll (play-through + histéresis). Un "driver" manual
  //    controla la velocidad de cada dirección de forma fiable. ──
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce.matches) {
    tl.seek(DUR); // accesibilidad: estado final sin movimiento
    return () => {
      tl.pause();
      root.classList.remove('reveal-initialized');
    };
  }

  let shown = false;
  const driver = { p: 0 };
  let driveAnim: ReturnType<typeof animate> | null = null;
  const driveTo = (target: number, duration: number) => {
    if (driveAnim) driveAnim.pause();
    driveAnim = animate(driver, {
      p: target,
      duration,
      ease: 'linear',
      onUpdate: () => tl.seek(DUR * clamp(driver.p, 0, 1)),
    });
  };
  const goShow = () => { if (!shown) { shown = true; driveTo(1, DUR); } };
  const goHide = () => { if (shown) { shown = false; driveTo(0, DUR / C.scroll.revRate); } };

  const onScroll = () => {
    const rect = root.getBoundingClientRect();
    const scrollable = root.offsetHeight - window.innerHeight;
    const p = scrollable > 0 ? clamp(-rect.top / scrollable, 0, 1) : 0;
    if (p >= C.scroll.showAt) goShow();
    else if (p <= C.scroll.hideAt) goHide();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    driveAnim?.pause();
    tl.pause();
    root.classList.remove('reveal-initialized');
  };
}
