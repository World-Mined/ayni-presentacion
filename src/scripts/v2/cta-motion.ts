import { animate } from 'animejs';

const SELECTOR = '[data-motion-cta]';
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
const CYCLE_MS = 4_700;
const DEFAULT_TAIL_TURN = 0.38;

type CtaElement = HTMLElement & {
  dataset: DOMStringMap & { motionReady?: string };
};

const mod = (value: number, span = 1) => ((value % span) + span) % span;

/** Convierte una posición real sobre el perímetro de la píldora al ángulo que
 * necesita `conic-gradient`. En una caja ancha ambas medidas son muy distintas:
 * una cola de muchos píxeles sobre arriba/abajo puede ocupar pocos grados.
 * Calcular sus dos extremos desde el perímetro evita que visualmente colapse. */
function angleAtPillTurn(turn: number, width: number, height: number) {
  const r = height / 2;
  const straight = Math.max(width - height, 0);
  const total = 2 * straight + 2 * Math.PI * r;
  let distance = mod(turn) * total;
  let x = width / 2;
  let y = 0;
  const halfTop = straight / 2;

  if (distance <= halfTop) {
    x += distance;
  } else {
    distance -= halfTop;
    const semicircle = Math.PI * r;
    if (distance <= semicircle) {
      const theta = -Math.PI / 2 + distance / r;
      x = width - r + r * Math.cos(theta);
      y = r + r * Math.sin(theta);
    } else {
      distance -= semicircle;
      if (distance <= straight) {
        x = width - r - distance;
        y = height;
      } else {
        distance -= straight;
        if (distance <= semicircle) {
          const theta = Math.PI / 2 + distance / r;
          x = r + r * Math.cos(theta);
          y = r + r * Math.sin(theta);
        } else {
          distance -= semicircle;
          x = r + distance;
          y = 0;
        }
      }
    }
  }

  return mod(Math.atan2(x - width / 2, -(y - height / 2)) / (2 * Math.PI));
}

/** Aceleración sutil al cruzar los extremos redondeados. La función es
 * periódica y termina exactamente donde empieza, por lo que el loop no salta. */
function accelerateEnds(turn: number, amount: number) {
  return turn - (amount / (4 * Math.PI)) * Math.sin(4 * Math.PI * turn);
}

/** Aumenta levemente la velocidad sobre los tramos superior e inferior. */
function accelerateCardinals(turn: number, amount: number) {
  return turn + (amount / (8 * Math.PI)) * Math.sin(8 * Math.PI * turn);
}

/** Pequeño adelanto localizado del extremo posterior al cruzar el lateral
 * derecho. El cambio entra y sale suavemente, sin un quiebre visible. */
function accelerateRightTail(turn: number, amount: number) {
  const distance = Math.abs(mod(turn - 0.25 + 0.5) - 0.5);
  const radius = 0.16;
  if (distance >= radius) return turn;
  const influence = Math.cos((distance / radius) * Math.PI / 2) ** 2;
  return turn + amount * influence;
}

function initializeCta(cta: CtaElement) {
  if (cta.dataset.motionReady === 'true') return;

  const stroke = cta.querySelector<HTMLElement>('.motion-cta__stroke');
  if (!stroke) return;

  cta.dataset.motionReady = 'true';
  const reducedMotion = window.matchMedia(REDUCED_MOTION);
  const state = { progress: 0 };
  let animation: ReturnType<typeof animate> | null = null;
  let geometry = { width: 1, height: 1 };
  let settings = {
    tailTurn: DEFAULT_TAIL_TURN,
    endSpeed: 0,
    cardinalSpeed: 0,
    tailEndSpeed: 0,
    rightBoost: 0,
    horizontalShrink: 0,
    glow: 0,
    glowPulse: 0,
    glowTravel: 0,
  };

  const readNumber = (styles: CSSStyleDeclaration, name: string, fallback: number) => {
    const value = Number.parseFloat(styles.getPropertyValue(name));
    return Number.isFinite(value) ? value : fallback;
  };

  // Las variables sólo cambian entre variantes/breakpoints. Se leen juntas al
  // entrar al CTA, nunca dentro de cada fotograma: así el motor no fuerza una
  // recascada de estilos mientras está pintando el gradiente.
  const refreshSettings = () => {
    const styles = getComputedStyle(stroke);
    const rect = stroke.getBoundingClientRect();
    geometry = {
      width: Math.max(rect.width, 1),
      height: Math.max(rect.height, 1),
    };
    settings = {
      tailTurn: readNumber(styles, '--cta-tail-turn', DEFAULT_TAIL_TURN),
      endSpeed: Math.min(Math.max(readNumber(styles, '--cta-end-speed', 0), 0), 0.2),
      cardinalSpeed: Math.min(Math.max(readNumber(styles, '--cta-cardinal-speed', 0), 0), 0.2),
      tailEndSpeed: Math.min(Math.max(readNumber(styles, '--cta-tail-end-speed', 0), 0), 0.12),
      rightBoost: Math.min(Math.max(readNumber(styles, '--cta-tail-end-right-boost', 0), 0), 0.04),
      horizontalShrink: Math.min(Math.max(readNumber(styles, '--cta-horizontal-shrink', 0), 0), 0.2),
      glow: Math.max(readNumber(styles, '--cta-glow', 0), 0),
      glowPulse: Math.min(Math.max(readNumber(styles, '--cta-glow-pulse', 0), 0), 0.3),
      glowTravel: Math.min(Math.max(readNumber(styles, '--cta-glow-travel', 0), 0), 5),
    };
  };

  const render = () => {
    const {
      tailTurn,
      endSpeed,
      cardinalSpeed,
      tailEndSpeed,
      rightBoost,
      horizontalShrink,
      glow,
      glowPulse,
      glowTravel,
    } = settings;

    const start = accelerateRightTail(
      accelerateEnds(
        accelerateCardinals(state.progress, cardinalSpeed),
        endSpeed + tailEndSpeed,
      ),
      rightBoost,
    );

    // El 6.3 % se aplica a la longitud REAL del perímetro. Aplicarlo a grados
    // hacía que una píldora ancha comprimiera casi toda la cola en un punto.
    const horizontalWeight = Math.cos(2 * Math.PI * start) ** 2;
    const visibleTurn = tailTurn * (1 - horizontalShrink * horizontalWeight);
    const startAngle = angleAtPillTurn(start, geometry.width, geometry.height);
    const endAngle = angleAtPillTurn(start + visibleTurn, geometry.width, geometry.height);
    const span = mod(endAngle - startAngle) * 360;
    const startDeg = startAngle * 360;

    // El núcleo se desplaza apenas hacia delante y atrás dentro de la propia
    // cola. No es una capa extra: únicamente mueve el punto más luminoso del
    // mismo gradiente, por eso nunca aparece un segundo borde.
    const passenger = Math.sin(state.progress * 4 * Math.PI) * glowTravel;
    const center = span * 0.5 + passenger;
    const breath = 0.5 + 0.5 * Math.sin(state.progress * 2 * Math.PI);
    const coreAlpha = 0.92 + glowPulse * 0.4 * breath;

    const stop = (ratio: number) => `${Math.max(0, Math.min(span, span * ratio)).toFixed(3)}deg`;
    const coreStop = (offset: number) => `${Math.max(0, Math.min(span, center + offset)).toFixed(3)}deg`;

    stroke.style.background = `conic-gradient(
      from ${startDeg.toFixed(3)}deg at 50% 50%,
      rgba(247,196,95,0) 0deg,
      rgba(247,196,95,.12) ${stop(0.035)},
      rgba(247,196,95,.31) ${stop(0.12)},
      rgba(247,196,95,.58) ${stop(0.25)},
      rgba(247,196,95,.82) ${coreStop(-span * 0.17)},
      rgba(247,196,95,.94) ${coreStop(-span * 0.055)},
      rgba(247,196,95,${Math.min(coreAlpha, 1).toFixed(3)}) ${coreStop(0)},
      rgba(247,196,95,.94) ${coreStop(span * 0.055)},
      rgba(247,196,95,.82) ${coreStop(span * 0.17)},
      rgba(247,196,95,.58) ${stop(0.75)},
      rgba(247,196,95,.31) ${stop(0.88)},
      rgba(247,196,95,.12) ${stop(0.965)},
      rgba(247,196,95,0) ${span.toFixed(3)}deg,
      transparent ${span.toFixed(3)}deg,
      transparent 360deg
    )`;

    if (glow > 0) {
      const radius = glow * (0.82 + glowPulse * 0.7 * breath);
      const alpha = 0.34 + glowPulse * 0.45 * breath;
      stroke.style.filter = `drop-shadow(0 0 ${radius.toFixed(3)}px rgba(247,196,95,${alpha.toFixed(3)}))`;
    } else {
      stroke.style.filter = '';
    }
  };

  const start = () => {
    if (reducedMotion.matches) return;
    refreshSettings();
    render();
    if (animation) {
      animation.resume();
      return;
    }
    animation = animate(state, {
      progress: [state.progress, state.progress + 1],
      duration: CYCLE_MS,
      ease: 'linear',
      loop: true,
      modifier: (value: number) => mod(value),
      onUpdate: render,
    });
  };

  const pauseWhenInactive = () => {
    if (!cta.matches(':hover') && !cta.matches(':focus-visible')) animation?.pause();
  };

  cta.addEventListener('pointerenter', start);
  cta.addEventListener('pointerleave', pauseWhenInactive);
  cta.addEventListener('focus', start);
  cta.addEventListener('blur', pauseWhenInactive);

  reducedMotion.addEventListener('change', ({ matches }) => {
    if (matches) animation?.pause();
  });
}

document.querySelectorAll<CtaElement>(SELECTOR).forEach(initializeCta);
