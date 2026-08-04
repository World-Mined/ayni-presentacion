import type { RevealConfig } from '../types';
import { capucci } from './capucci';
// import { moravi } from './moravi';
// import { reset } from './reset';

// Registro de productos. Agrega aquí cada producto nuevo.
export const PRODUCTS: Record<string, RevealConfig> = {
  capucci,
  // moravi,
  // reset,
};

export type ProductId = keyof typeof PRODUCTS;
