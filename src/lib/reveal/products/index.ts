import type { RevealConfig } from '../types';
import { capucci } from './capucci';
// import { moravi } from './moravi';
// import { reset } from './reset';

// Registro de productos. Agrega aquí cada producto nuevo.
export const PRODUCTS = {
  capucci,
  // moravi,
  // reset,
} as const satisfies Record<string, RevealConfig>;

export type ProductId = keyof typeof PRODUCTS;
