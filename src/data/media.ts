import revealMandala from '../assets/v2/products-reveal-mandala.webp';

export const MEDIA_BASE_URL = 'https://ayni.s3.us-east-1.amazonaws.com/videos';
export const REVEAL_BACKGROUND_URL = revealMandala.src;

export const mediaUrl = (file: string) => `${MEDIA_BASE_URL}/${file}`;
