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
/** Fracción del anillo durante la que su trazo termina de aparecer. Con el 5% el
 *  arco ya mide más de cien píxeles cuando alcanza opacidad plena, así que nace
 *  como arco y no como punto; y son unos 50 ms, demasiado poco para leerse como
 *  un fundido. */
const RING_FADE_IN = 0.05;
/** Altura del viewport, en tanto por uno, a la que la sección empieza a
 *  «tirar» del scroll hacia el punto que dispara el reveal. Un tercio llega
 *  temprano para que nadie quede detenido en el vacío, pero deja recorrido
 *  manual antes del desplazamiento asistido. */
const SNAP_TRIGGER_RATIO = 0.32;
/** Holgura, en píxeles, que hay que dejar atrás para rearmar el enganche en un
 *  sentido. Sin ella el seguro se soltaría en el borde exacto del umbral y el
 *  enganche se repetiría en bucle. */
const SNAP_RESET_MARGIN = 120;
/** Umbral en píxeles para considerar que hubo movimiento en un sentido: filtra
 *  el ruido subpíxel de los trackpads. */
const SNAP_DIRECTION_EPSILON = 0.5;
/** Un píxel dentro del tramo, para caer del lado correcto del umbral. */
const SNAP_INSET = 1;
/** Margen con el que damos por llegado el desplazamiento suave. */
const SNAP_ARRIVAL_TOLERANCE = 4;
/** Cuánto esperamos antes de comprobar si el desplazamiento suave llegó. Los
 *  navegadores lo cancelan ante cualquier rueda del usuario, así que pasado
 *  este tiempo o llegamos, o soltamos el seguro para poder reintentar. */
const SNAP_VERIFY_MS = 700;
/** Segunda espera, para distinguir «el usuario quedó detenido a medio camino»
 *  —que es a quien hay que ayudar— de «el usuario sigue desplazándose por su
 *  cuenta», a quien reenganchar sería pelearse con él. */
const SNAP_SETTLE_MS = 180;
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const pct = (v: number, total: number) => `${(v / total) * 100}%`;

/** Fusiona la config del producto con los defaults. */
function resolve(config: RevealConfig): ResolvedConfig {
  return {
    id: config.id,
    title: config.title,
    frames: { ...DEFAULT_FRAMES, ...config.frames },
    labels: config.labels,
    background: config.background,
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

  const compactViewport = window.matchMedia(
    '(max-width: 767px), (max-width: 1023px) and (max-height: 600px)',
  );
  const syncTrackHeight = () => {
    root.style.height = compactViewport.matches ? '125svh' : `${C.scroll.trackVH}vh`;
  };
  syncTrackHeight();
  compactViewport.addEventListener('change', syncTrackHeight);
  root.classList.add('reveal-initialized');
  root.dataset.revealState = 'hidden';
  root.dataset.framesReady = 'false';

  const frameSrc = (i: number) =>
    `${C.frames.dir}/${C.frames.prefix}${String(i + 1).padStart(C.frames.pad, '0')}.${C.frames.ext}`;

  // Conservamos las referencias de precarga durante toda la animación. El
  // frame visible solo cambia cuando el siguiente bitmap ya está listo, para
  // evitar un destello transparente si el usuario llega muy rápido al reveal.
  const preloadedFrames = Array.from({ length: C.frames.count }, (_, i) => {
    const im = new Image();
    im.decoding = 'async';
    im.src = frameSrc(i);
    return im;
  });
  productImg.src = frameSrc(0);

  // En una visita sin caché, `complete` puede cambiar entre dos ticks mientras
  // Anime.js ya está recorriendo los frames. Eso hacía que la secuencia saltara
  // algunos bitmaps y produjera el flicker que solo se veía la primera vez.
  // Esperamos tanto la descarga como la decodificación antes de permitir el
  // play; un archivo fallido no bloquea para siempre el reveal.
  let framesReady = false;
  let disposed = false;
  let refreshAfterFramesReady = () => {};
  const waitUntilDecoded = async (image: HTMLImageElement) => {
    try {
      await image.decode();
    } catch {
      if (!image.complete) {
        await new Promise<void>((resolve) => {
          image.addEventListener('load', () => resolve(), { once: true });
          image.addEventListener('error', () => resolve(), { once: true });
        });
      }
    }
  };
  void Promise.all([productImg, ...preloadedFrames].map(waitUntilDecoded)).then(() => {
    if (disposed) return;
    framesReady = true;
    root.dataset.framesReady = 'true';
    refreshAfterFramesReady();
  });

  // ── Círculo (anillo) ──
  const ring = document.createElementNS(SVGNS, 'circle');
  ring.setAttribute('class', 'reveal-ring');
  ring.setAttribute('cx', String(G.center.x));
  ring.setAttribute('cy', String(G.center.y));
  ring.setAttribute('r', String(G.ringRadius));
  ring.setAttribute('stroke-width', '2.4');
  // En reposo el trazo va apagado: `setRingProgress` solo corre mientras la
  // timeline avanza, así que sin esto el anillo nacería opaco.
  ring.style.strokeOpacity = '0';
  overlay.appendChild(ring);
  const ringLen = 2 * Math.PI * G.ringRadius;
  // El hueco se declara del doble de largo que el trazo a propósito. Con el
  // atajo `strokeDasharray = L` el hueco mide también L, así que el siguiente
  // guión arranca exactamente donde termina el recorrido: al estar replegado
  // queda un guión de longitud cero ahí, y `stroke-linecap: round` le pinta el
  // remate igual —un punto suelto—. Con el hueco a 2L el guión más cercano cae
  // fuera del trazo y no hay nada que rematar. El crecimiento no cambia.
  ring.style.strokeDasharray = `${ringLen} ${ringLen * 2}`;
  ring.style.strokeDashoffset = String(ringLen);

  // ── Ramas horizontales: nacen en el anillo y avanzan hacia afuera ──
  const sideCounts = C.labels.reduce((counts, label) => {
    counts[label.side] += 1;
    return counts;
  }, { left: 0, right: 0 });
  const built = C.labels.map((cfg) => {
    const rowY = G.rowsY[cfg.row];
    const outer = { x: G.iconX[cfg.side], y: rowY };
    const dy = rowY - G.center.y;
    const horizontalReach = Math.sqrt(Math.max(0, G.ringRadius ** 2 - dy ** 2));
    const ringPt = {
      x: G.center.x + (cfg.side === 'left' ? -horizontalReach : horizontalReach),
      y: rowY,
    };

    const stem = document.createElementNS(SVGNS, 'line');
    stem.setAttribute('class', 'reveal-stem');
    stem.setAttribute('x1', ringPt.x.toFixed(1));
    stem.setAttribute('y1', ringPt.y.toFixed(1));
    stem.setAttribute('x2', outer.x.toFixed(1));
    stem.setAttribute('y2', outer.y.toFixed(1));
    stem.setAttribute('stroke-width', '2');
    const stemLen = Math.abs(outer.x - ringPt.x);
    // Hueco al doble, por el mismo motivo que en el anillo: si no, el remate
    // redondo deja un punto en la punta de cada rama mientras está replegada.
    stem.style.strokeDasharray = `${stemLen} ${stemLen * 2}`;
    stem.style.strokeDashoffset = String(stemLen);
    overlay.appendChild(stem);

    const label = document.createElement('button');
    label.className = `reveal-label ${cfg.side}`;
    label.type = 'button';
    label.disabled = true;
    label.dataset.item = cfg.id;
    label.dataset.row = String(cfg.row);
    label.dataset.sideCount = String(sideCounts[cfg.side]);
    label.setAttribute('aria-label', cfg.name);
    label.setAttribute('aria-pressed', 'false');
    label.setAttribute('aria-describedby', `reveal-phrase-${C.id}-${cfg.id}`);
    label.style.left = pct(outer.x, 1920);
    label.style.top = pct(outer.y, 1080);
    label.style.marginLeft = cfg.side === 'left' ? '-14px' : '14px';
    const mobileIcon = root.querySelector<HTMLImageElement>(`[data-mobile-icon="${cfg.id}"]`);
    const ico = mobileIcon
      ? mobileIcon.cloneNode(true) as HTMLImageElement
      : document.createElementNS(SVGNS, 'svg');
    ico.setAttribute('class', 'reveal-ico');
    ico.removeAttribute('data-mobile-icon');
    if (ico instanceof SVGSVGElement) {
      ico.setAttribute('viewBox', '0 0 24 24');
      ico.innerHTML = ICONS[cfg.icon] ?? ICONS.berry;
    }
    const txt = document.createElement('span');
    txt.className = 'reveal-txt';
    [...cfg.name].forEach((ch) => {
      const s = document.createElement('span');
      s.textContent = ch === ' ' ? ' ' : ch;
      txt.appendChild(s);
    });
    const mobileTxt = document.createElement('span');
    mobileTxt.className = 'reveal-mobile-txt';
    mobileTxt.textContent = cfg.name;
    label.appendChild(ico);
    label.appendChild(txt);
    label.appendChild(mobileTxt);
    stage.appendChild(label);
    return { cfg, stem, stemLen, label, ico, chars: [...txt.children] as HTMLElement[] };
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
  const ringFollowsFrames = endIdx > centerIdx && ringToIdx <= endIdx;
  const ringState = { p: 0 };
  const setRingProgress = (progress: number) => {
    const cp = clamp(progress, 0, 1);
    ring.style.strokeDashoffset = String(ringLen * (1 - cp));
    // Los primeros píxeles del trazo, con el remate redondo y el `drop-shadow`
    // de 5 px encima, se leen como un punto que aparece de la nada en el borde
    // derecho. Se nota sobre todo en los productos sin rotación, donde el
    // paquete ya está quieto cuando el anillo arranca. Con esta entrada el arco
    // no empieza a verse hasta que tiene longitud de arco y no de punto.
    // Al cuadrado y no lineal: con la rampa lineal, el arco de 14 px todavía
    // salía al 12% y sobre negro —con el halo del `drop-shadow`— seguía leyéndose.
    const fade = clamp(cp / RING_FADE_IN, 0, 1);
    ring.style.strokeOpacity = String(fade * fade);
    halo.style.opacity = String(cp);
  };
  const setFrame = () => {
    const frame = preloadedFrames[Math.round(state.f)];
    if (frame?.complete && frame.naturalWidth > 0 && productImg.src !== frame.src) {
      productImg.src = frame.src;
    }
    if (ringFollowsFrames) {
      setRingProgress((state.f - ringFromIdx) / (ringToIdx - ringFromIdx));
    }
  };
  // FASE A: sube al centro girando (frames 0→centerIdx)
  tl.add(state, { f: [0, centerIdx], duration: T.riseDur, ease: 'linear', onUpdate: setFrame }, 0);
  // FASE B: gira en el centro (frames centerIdx→endIdx)
  tl.add(state, { f: [centerIdx, endIdx], duration: T.rotateCenterDur, ease: 'linear', onUpdate: setFrame }, T.riseDur);

  // Con una secuencia completa, el círculo continúa sincronizado a sus frames.
  // Moravi y Reset solo tienen el arte final (`count: 1`): en ese caso no hay
  // frame al cual amarrarlo, así que conservamos el mismo ritmo por tiempo. De
  // este modo aparecen halo y ramas sin fingir una rotación inexistente.
  //
  // Ese ritmo es la misma proporción que usa la ruta por frames, pero medida
  // sobre la secuencia de referencia (`nominalFrameCount`) en lugar de sobre la
  // real, que aquí no da de sí. Calcularlo —en vez de dejar la constante a ojo
  // que había antes— es lo que mantiene las dos rutas sincronizadas si alguien
  // retoca `centerFrame`, `rotateEnd` o `ringEndFrame`.
  const nominalEnd = Math.round(T.rotateEnd * (T.nominalFrameCount - 1));
  const nominalCenter = clamp(T.centerFrame - 1, 0, nominalEnd);
  // Si la referencia se queda corta para los tiempos, el anillo ocupa toda la fase.
  const timedRingRatio =
    nominalEnd > nominalCenter
      ? clamp((ringToIdx - nominalCenter) / (nominalEnd - nominalCenter), 0, 1)
      : 1;
  const timedRingDur = T.rotateCenterDur * timedRingRatio;
  if (!ringFollowsFrames) {
    tl.add(
      ringState,
      { p: [0, 1], duration: timedRingDur, ease: 'linear', onUpdate: () => setRingProgress(ringState.p) },
      T.riseDur,
    );
  }

  // Instante en que se cierra el círculo → ahí arrancan las ramas.
  const labelsStart = ringFollowsFrames
    ? ringToIdx <= centerIdx
      ? (ringToIdx / centerIdx) * T.riseDur
      : T.riseDur + ((ringToIdx - centerIdx) / (endIdx - centerIdx)) * T.rotateCenterDur
    : T.riseDur + timedRingDur;

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
    const dir = b.cfg.side === 'left' ? 38 : -38;
    tl.add(
      b.ico,
      { opacity: [0, 1], scale: [0.75, 1], translateX: [dir, 0], duration: LD, ease: 'outQuad' },
      at + LD * 0.72,
    );
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
    root.dataset.revealState = 'shown';
    built.forEach(({ label }) => { label.disabled = false; });
    return () => {
      disposed = true;
      compactViewport.removeEventListener('change', syncTrackHeight);
      tl.pause();
      root.classList.remove('reveal-initialized');
      delete root.dataset.revealState;
      delete root.dataset.framesReady;
    };
  }

  let shown = false;
  const driver = { p: 0 };
  let driveAnim: ReturnType<typeof animate> | null = null;
  const driveTo = (target: number, duration: number, onComplete?: () => void) => {
    if (driveAnim) driveAnim.pause();
    driveAnim = animate(driver, {
      p: target,
      duration,
      ease: 'linear',
      onUpdate: () => tl.seek(DUR * clamp(driver.p, 0, 1)),
      onComplete,
    });
  };
  const goShow = () => {
    if (shown) return;
    shown = true;
    root.dataset.revealState = 'showing';
    driveTo(1, DUR, () => {
      if (!shown) return;
      root.dataset.revealState = 'shown';
      built.forEach(({ label }) => { label.disabled = false; });
    });
  };
  const goHide = () => {
    if (!shown) return;
    shown = false;
    root.dataset.revealState = 'hiding';
    built.forEach(({ label }) => { label.disabled = true; });
    // La capa interactiva no forma parte de la timeline de Anime.js. Se le
    // avisa antes de invertir la animación para que ninguna foto seleccionada
    // quede flotando cuando producto, título y ramas ya se ocultaron.
    root.dispatchEvent(new Event('reveal:hide'));
    driveTo(0, DUR / C.scroll.revRate, () => {
      if (!shown) root.dataset.revealState = 'hidden';
    });
  };

  // En escritorio hay un pequeño tramo entre la entrada visual de la sección
  // y `showAt`. Si el usuario soltaba la rueda justo ahí, podía quedarse viendo
  // únicamente el fondo oscuro. Lo tratamos como un umbral magnético: al bajar
  // y entrar en la franja final, completamos el desplazamiento hasta el punto
  // exacto que dispara el reveal. Un enganche por sentido y por pasada, salvo
  // que el desplazamiento no llegue a su destino —ver `verifySnapArrival`—.
  // La animación sigue siendo temporal (no queda ligada al progreso del scroll).
  let previousScrollY = window.scrollY;
  let downwardSnapDone = false;
  let upwardSnapDone = false;
  let snapVerifyTimer: ReturnType<typeof setTimeout> | undefined;

  // El seguro se arma al despachar el desplazamiento, porque durante el
  // trayecto siguen llegando eventos de scroll y sin él el enganche se
  // repetiría. Pero un `behavior:'smooth'` lo cancela cualquier rueda o
  // trackpad del usuario, y entonces nos quedamos a medio camino —justo en la
  // franja oscura que esto existe para evitar— sin posibilidad de reintento.
  // Por eso comprobamos la llegada y, si no se produjo, soltamos el seguro.
  const verifySnapArrival = (target: number, release: () => void) => {
    clearTimeout(snapVerifyTimer);
    snapVerifyTimer = setTimeout(() => {
      const missed = Math.abs(window.scrollY - target) > SNAP_ARRIVAL_TOLERANCE;
      if (!missed) {
        snapVerifyTimer = undefined;
        return;
      }
      // No llegamos. Antes de rearmar comprobamos que el scroll esté quieto:
      // si el usuario sigue moviéndose, no está atrapado y volver a tirar de
      // la página sería pelearse con él.
      const settleFrom = window.scrollY;
      snapVerifyTimer = setTimeout(() => {
        snapVerifyTimer = undefined;
        if (Math.abs(window.scrollY - settleFrom) <= SNAP_ARRIVAL_TOLERANCE) release();
      }, SNAP_SETTLE_MS);
    }, SNAP_VERIFY_MS);
  };

  const snapToRevealIfNeeded = (
    rect: DOMRect,
    scrollable: number,
    compact: boolean,
  ) => {
    const currentScrollY = window.scrollY;
    const movingDown = currentScrollY > previousScrollY + SNAP_DIRECTION_EPSILON;
    const movingUp = currentScrollY < previousScrollY - SNAP_DIRECTION_EPSILON;
    const snapOffset = scrollable * C.scroll.showAt;
    const triggerLine = window.innerHeight * SNAP_TRIGGER_RATIO;

    // Cada sentido conserva su propio seguro. Así, haber usado el enganche al
    // bajar no impide que funcione al regresar desde la siguiente sección.
    if (rect.top > triggerLine + SNAP_RESET_MARGIN) downwardSnapDone = false;
    if (rect.bottom < window.innerHeight - triggerLine - SNAP_RESET_MARGIN) upwardSnapDone = false;

    if (
      !compact
      && !downwardSnapDone
      && movingDown
      && scrollable > 0
      && rect.top <= triggerLine
      && rect.top > -snapOffset
    ) {
      downwardSnapDone = true;
      const trackTop = currentScrollY + rect.top;
      const target = Math.max(0, trackTop + snapOffset + SNAP_INSET);
      window.scrollTo({ top: target, behavior: 'smooth' });
      verifySnapArrival(target, () => { downwardSnapDone = false; });
    } else if (
      !compact
      && !upwardSnapDone
      && movingUp
      && scrollable > 0
      && rect.bottom >= window.innerHeight - triggerLine
      && rect.bottom < window.innerHeight
    ) {
      upwardSnapDone = true;
      const trackTop = currentScrollY + rect.top;
      // Al regresar desde la sección siguiente, el punto equivalente es el
      // final del sticky: ahí vuelve a cubrir el viewport y puede mostrarse.
      const target = Math.max(0, trackTop + scrollable - SNAP_INSET);
      window.scrollTo({ top: target, behavior: 'smooth' });
      verifySnapArrival(target, () => { upwardSnapDone = false; });
    }

    previousScrollY = currentScrollY;
  };

  const onScroll = () => {
    const rect = root.getBoundingClientRect();
    const scrollable = root.offsetHeight - window.innerHeight;
    const p = scrollable > 0 ? clamp(-rect.top / scrollable, 0, 1) : 0;

    // En móvil la escena empezaba únicamente cuando el track ya había llegado
    // al borde superior. Con una rueda o gesto rápido se podía atravesar casi
    // todo el tramo sticky antes de que la secuencia alcanzara a aparecer. La
    // activamos cuando entra al 28% del viewport y conservamos el foco hasta
    // que el sticky ha subido un 14%: el producto sigue el movimiento de salida
    // y se desvanece mientras Beneficios empieza a entrar, sin dejar un lienzo
    // negro con los controles flotando.
    const compact = compactViewport.matches;
    snapToRevealIfNeeded(rect, scrollable, compact);
    const compactEntryLine = window.innerHeight * 0.28;
    const compactExitLead = Math.min(120, window.innerHeight * 0.14);
    const isCompactFocus =
      rect.top <= compactEntryLine
      && rect.bottom >= window.innerHeight - compactExitLead;

    // Mientras el track cubre el viewport, el stage sigue fijado. En cuanto
    // deja de cubrirlo, el sticky se acaba y la página vuelve a desplazarse:
    // ese mismo instante dispara la reversa. El scroll solo da la orden;
    // Anime.js completa la animación por tiempo propio.
    const isPinned = rect.top <= 0 && rect.bottom >= window.innerHeight;
    const isFocused = compact ? isCompactFocus : isPinned;
    if (!isFocused) {
      goHide();
    } else if ((compact || p >= C.scroll.showAt) && framesReady) {
      goShow();
    }
  };
  refreshAfterFramesReady = onScroll;

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  return () => {
    disposed = true;
    compactViewport.removeEventListener('change', syncTrackHeight);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    clearTimeout(snapVerifyTimer);
    driveAnim?.pause();
    tl.pause();
    root.classList.remove('reveal-initialized');
    delete root.dataset.revealState;
    delete root.dataset.framesReady;
  };
}
