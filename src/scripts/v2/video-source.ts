export const ensureVideoSource = (video: HTMLVideoElement) => {
  const source = video.querySelector<HTMLSourceElement>('[data-video-source]');
  const deferredSrc = source?.dataset.src;

  if (!source || source.src || !deferredSrc) return;

  source.src = deferredSrc;
  video.load();
};
