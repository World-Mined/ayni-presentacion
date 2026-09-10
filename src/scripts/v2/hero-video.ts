import {
  HOME_VIDEO_COLLAGE_CARDS,
  HOME_VIDEO_CUES,
  HOME_VIDEO_DURATION_TOLERANCE,
  HOME_VIDEO_EXPECTED_DURATION,
  HOME_VIDEO_SOURCE_FRAME,
} from '../../data/home-video';
import {
  fitCrop,
  needsReframe,
  scaleToVideo,
  TITLE_CROP_WIDTH,
  TITLE_FADE_STOPS,
  visibleWidthFraction,
} from './hero-frame';
import type { Rect } from './hero-frame';

type SafeFrameMode = 'none' | 'collage' | 'title';

// El cierre del video de portada es una composición horizontal: primero un
// mosaico de cinco planos y después el logotipo. Con `object-fit:cover`, un
// viewport vertical recorta ambos extremos y parte esa composición. Durante
// esos segundos reutilizamos el mismo fotograma en un canvas: el video sigue
// llenando el fondo y el centro se recompone, sin una segunda descarga ni una
// segunda decodificación.

const HERO_SELECTOR = '.video-hero';

/** `roundRect` llegó en Safari 16.4. En versiones anteriores lanzaría en cada
 *  fotograma del bucle, así que el trazado se dibuja a mano cuando falta. */
function clipRoundedRect(
  context: CanvasRenderingContext2D,
  [x, y, width, height]: Rect,
  radius: number,
) {
  context.beginPath();
  if (typeof context.roundRect === 'function') {
    context.roundRect(x, y, width, height, radius);
  } else {
    const r = Math.min(radius, width / 2, height / 2);
    context.moveTo(x + r, y);
    context.arcTo(x + width, y, x + width, y + height, r);
    context.arcTo(x + width, y + height, x, y + height, r);
    context.arcTo(x, y + height, x, y, r);
    context.arcTo(x, y, x + width, y, r);
    context.closePath();
  }
  context.clip();
}

function drawCard(
  context: CanvasRenderingContext2D,
  video: HTMLVideoElement,
  source: Rect,
  destination: Rect,
  radius: number,
) {
  const [destinationX, destinationY, destinationWidth, destinationHeight] = destination;
  const scaled = scaleToVideo(source, video.videoWidth, video.videoHeight);
  const [cropX, cropY, cropWidth, cropHeight] = fitCrop(scaled, destinationWidth / destinationHeight);

  context.save();
  clipRoundedRect(context, destination, radius);
  context.drawImage(
    video,
    cropX, cropY, cropWidth, cropHeight,
    destinationX, destinationY, destinationWidth, destinationHeight,
  );
  context.restore();
}

function drawCollage(
  context: CanvasRenderingContext2D,
  video: HTMLVideoElement,
  width: number,
  height: number,
) {
  context.fillStyle = '#000';
  context.fillRect(0, 0, width, height);

  const side: readonly [number, number] = [width * 0.52, Math.min(width * 0.31, height * 0.25)];
  const center: readonly [number, number] = [width * 0.82, Math.min(width * 0.455, height * 0.32)];
  const cornerRadius = Math.max(14, width * 0.035);

  for (const card of HOME_VIDEO_COLLAGE_CARDS) {
    const [cardWidth, cardHeight] = card.size === 'center' ? center : side;
    drawCard(
      context,
      video,
      card.source,
      [width * card.x, height * card.y, cardWidth, cardHeight],
      cornerRadius,
    );
  }
}

function drawTitle(
  context: CanvasRenderingContext2D,
  video: HTMLVideoElement,
  width: number,
  height: number,
) {
  const sourceWidth = video.videoWidth * TITLE_CROP_WIDTH;
  const sourceX = (video.videoWidth - sourceWidth) / 2;
  const targetHeight = width * (video.videoHeight / sourceWidth);
  const targetY = (height - targetHeight) / 2;
  context.drawImage(video, sourceX, 0, sourceWidth, video.videoHeight, 0, targetY, width, targetHeight);

  context.globalCompositeOperation = 'destination-in';
  const mask = context.createLinearGradient(0, targetY, 0, targetY + targetHeight);
  const [fadeIn, solidFrom, solidTo, fadeOut] = TITLE_FADE_STOPS;
  mask.addColorStop(fadeIn, 'rgba(0,0,0,0)');
  mask.addColorStop(solidFrom, 'rgba(0,0,0,1)');
  mask.addColorStop(solidTo, 'rgba(0,0,0,1)');
  mask.addColorStop(fadeOut, 'rgba(0,0,0,0)');
  context.fillStyle = mask;
  context.fillRect(0, targetY, width, targetHeight);
  context.globalCompositeOperation = 'source-over';
}

export function initializeHeroSafeFrame(hero: HTMLElement) {
  const video = hero.querySelector<HTMLVideoElement>('[data-home-video]');
  const canvas = hero.querySelector<HTMLCanvasElement>('[data-title-safe-frame]');
  if (!video || !canvas) return;

  let animation = 0;
  // El tamaño del hero se remide en los eventos discretos —`timeupdate` llega
  // unas cuatro veces por segundo— y dentro del bucle de dibujo se usa el valor
  // cacheado. Medirlo en cada fotograma forzaba un layout por frame mientras
  // ese mismo frame ya estaba componiendo el canvas y desenfocando el video;
  // cachearlo sin remedir nunca dejaba el rect viejo tras una rotación.
  //
  // El ResizeObserver cubre el hueco restante: un cambio de tamaño mientras el
  // video está pausado, o el salto de `--header-height` en el breakpoint, que
  // no disparan ningún evento del video.
  let size = { width: 0, height: 0 };
  const refreshSize = () => {
    const rect = hero.getBoundingClientRect();
    size = { width: rect.width, height: rect.height };
  };

  const getMode = (): SafeFrameMode => {
    if (!video.videoWidth || !video.videoHeight) return 'none';
    if (
      !Number.isFinite(video.duration)
      || Math.abs(video.duration - HOME_VIDEO_EXPECTED_DURATION) > HOME_VIDEO_DURATION_TOLERANCE
    ) {
      return 'none';
    }
    if (!size.width || !size.height) return 'none';
    if (!needsReframe(size.width / size.height, video.videoWidth / video.videoHeight)) return 'none';

    const { collageStart, titleStart, titleEnd } = HOME_VIDEO_CUES;
    if (video.currentTime >= collageStart && video.currentTime < titleStart) return 'collage';
    if (video.currentTime >= titleStart && video.currentTime <= titleEnd) return 'title';
    return 'none';
  };

  // Un solo atributo gobierna las tres reacciones del CSS —visibilidad del
  // canvas, oscurecido del velo y desenfoque del video—. Con estados
  // separados, uno podía quedarse activo en viewports donde el reencuadre ni
  // siquiera se dibuja.
  const setMode = (mode: SafeFrameMode) => {
    if (hero.dataset.safeFrame !== mode) hero.dataset.safeFrame = mode;
  };

  const clear = () => {
    if (animation) cancelAnimationFrame(animation);
    animation = 0;
    setMode('none');
    canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
  };

  const draw = () => {
    const mode = getMode();
    if (mode === 'none') {
      clear();
      return;
    }

    setMode(mode);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.round(size.width * pixelRatio));
    const height = Math.max(1, Math.round(size.height * pixelRatio));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    const context = canvas.getContext('2d');
    if (!context) return;
    context.clearRect(0, 0, width, height);

    // Dibujar un video remoto puede marcar el canvas como tainted, pero sigue
    // siendo visible. Solo una lectura de píxeles requeriría CORS, y este motor
    // no hace ninguna.
    if (mode === 'collage') drawCollage(context, video, width, height);
    else drawTitle(context, video, width, height);

    animation = video.paused ? 0 : requestAnimationFrame(draw);
  };

  const sync = () => {
    refreshSize();
    if (getMode() === 'none') clear();
    else if (!animation) draw();
  };

  video.addEventListener('timeupdate', sync);
  video.addEventListener('seeked', sync);
  video.addEventListener('play', sync);
  video.addEventListener('pause', sync);
  video.addEventListener('loadedmetadata', sync);

  new ResizeObserver(sync).observe(hero);
  sync();
}

document.querySelectorAll<HTMLElement>(HERO_SELECTOR).forEach(initializeHeroSafeFrame);
