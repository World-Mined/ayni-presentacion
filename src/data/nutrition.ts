import { SlideId } from './slide-ids';

export interface NutrientRow {
  name: string;
  per100g: string;
  perServing: string;
  vd: string;
  /** 'energy' = fila dorada destacada, 'group' = macronutriente, 'sub' = desglose indentado */
  variant?: 'energy' | 'group' | 'sub';
}

export interface NutritionFacts {
  servingSize: string;
  servingsPerContainer: string;
  servingColumnLabel: string;
  /** Fila fija: se repite arriba en todas las páginas. */
  energyRow: NutrientRow;
  /** Lista completa; el panel la pagina según el alto disponible. */
  rows: NutrientRow[];
}

/**
 * Pide al panel que recalcule su paginación. Lo emite quien lo abre y lo escucha
 * el propio panel, que necesita el alto ya resuelto para repartir las filas.
 */
export const NUTRITION_LAYOUT_EVENT = 'nutrition:layout';

/**
 * Dónde se ancla el panel nutricional:
 * - 'viewport': pegado al borde derecho de la pantalla, a lo alto de toda la ventana.
 * - 'image': pegado al borde derecho de la imagen 16:9, respetando el letterbox.
 */
export const NUTRITION_SIDEBAR_ANCHOR: 'viewport' | 'image' = 'viewport';

export const NUTRITION_DISCLAIMER =
  '*% VD: Valores Diarios basados en una dieta de 2000 kcal (8380 kJ). Sus valores diarios pueden ser mayores o menores dependiendo de sus necesidades calóricas.';

export const NUTRITION_FACTS: Partial<Record<SlideId, NutritionFacts>> = {
  [SlideId.CapucciFormula]: {
    servingSize: '10 g',
    servingsPerContainer: 'Aprox. 28',
    servingColumnLabel: 'Porción\n10g (polvo)',
    energyRow: {
      name: 'Valor energético',
      per100g: '251 kcal\n(1050 kj)',
      perServing: '25 kcal\n(105 kj)',
      vd: '1%',
      variant: 'energy',
    },
    rows: [
        { name: 'Grasa Total', per100g: '1 g', perServing: '0 g', vd: '0%', variant: 'group' },
        { name: 'Grasa Saturada', per100g: '0 g', perServing: '0 g', vd: '0%', variant: 'sub' },
        { name: 'Grasa Trans', per100g: '0 g', perServing: '0 g', vd: '-', variant: 'sub' },
        { name: 'Sodio', per100g: '43 mg', perServing: '4 mg', vd: '0%', variant: 'group' },
        { name: 'Carbohidratos', per100g: '45 g', perServing: '4 g', vd: '3%', variant: 'group' },
        { name: 'Azúcares Totales', per100g: '3 g', perServing: '0 g', vd: '1%', variant: 'sub' },
        { name: 'Fibra dietética', per100g: '5 g', perServing: '0 g', vd: '2%', variant: 'group' },
        { name: 'Proteínas (g)', per100g: '16 g', perServing: '2 g', vd: '3%', variant: 'group' },
        { name: 'Magnesio', per100g: '110 mg', perServing: '11.0 mg', vd: '4%' },
        { name: 'Calcio', per100g: '100 mg', perServing: '10 mg', vd: '1%' },
        { name: 'Zinc', per100g: '20 mg', perServing: '2.0 mg', vd: '13%' },
    ],
  },

  [SlideId.MoraviFormula]: {
    servingSize: '6.5 g',
    servingsPerContainer: 'Aprox. 28',
    servingColumnLabel: 'Porción\n6.5g (polvo)',
    energyRow: {
      name: 'Valor energético',
      per100g: '31 kcal\n(130 kj)',
      perServing: '2 kcal\n(8 kj)',
      vd: '0%',
      variant: 'energy',
    },
    rows: [
        { name: 'Grasa Total', per100g: '0 g', perServing: '0 g', vd: '0%', variant: 'group' },
        { name: 'Grasa Saturada', per100g: '0 g', perServing: '0 g', vd: '0%', variant: 'sub' },
        { name: 'Grasa Trans', per100g: '0 g', perServing: '0 g', vd: '-', variant: 'sub' },
        { name: 'Sodio', per100g: '83 mg', perServing: '5 mg', vd: '0%', variant: 'group' },
        { name: 'Carbohidratos', per100g: '6 g', perServing: '0 g', vd: '0%', variant: 'group' },
        { name: 'Azúcares Totales', per100g: '0 g', perServing: '0 g', vd: '0%', variant: 'sub' },
        { name: 'Fibra dietética', per100g: '3 g', perServing: '0 g', vd: '1%', variant: 'group' },
        { name: 'Proteínas (g)', per100g: '0 g', perServing: '0 g', vd: '0%', variant: 'group' },
        { name: 'Vitamina A', per100g: '5940.0 ug', perServing: '386.1 ug', vd: '48%' },
        { name: 'Vitamina D3', per100g: '90.0 ug', perServing: '5.9 ug', vd: '84%' },
        { name: 'Vitamina E', per100g: '59.3 mg', perServing: '3.9 mg', vd: '43%' },
        { name: 'Vitamina C', per100g: '1481.5 mg', perServing: '96.3 mg', vd: '96%' },
        { name: 'Vitamina B9', per100g: '450.0 ug', perServing: '29.3 ug', vd: '7%' },
        { name: 'Vitamina B1', per100g: '7.4 mg', perServing: '0.5 mg', vd: '40%' },
        { name: 'Vitamina B2', per100g: '7.4 mg', perServing: '0.5 mg', vd: '40%' },
        { name: 'Vitamina B6', per100g: '8.9 mg', perServing: '0.6 mg', vd: '44%' },
        { name: 'Vitamina B3', per100g: '74.1 mg', perServing: '4.8 mg', vd: '32%' },
        { name: 'Vitamina B12', per100g: '4.0 ug', perServing: '0.3 ug', vd: '11%' },
        { name: 'Hierro', per100g: '148.1 mg', perServing: '9.6 mg', vd: '44%' },
        { name: 'Yodo', per100g: '660.0 ug', perServing: '42.9 ug', vd: '29%' },
        { name: 'Zinc', per100g: '88.9 mg', perServing: '5.8 mg', vd: '41%' },
        { name: 'Magnesio', per100g: '290.0 mg', perServing: '18.9 mg', vd: '6%' },
        { name: 'Flúor', per100g: '3.3 mg', perServing: '0.2 mg', vd: '7%' },
        { name: 'Moringa Oleifera', per100g: '15000.0 mg', perServing: '975.0 mg', vd: '-' },
        { name: 'Amalaki', per100g: '7500.0 mg', perServing: '487.5 mg', vd: '-' },
    ],
  },

  [SlideId.ResetFormula]: {
    servingSize: '7 g',
    servingsPerContainer: 'Aprox. 28',
    servingColumnLabel: 'Porción\n7g (polvo)',
    energyRow: {
      name: 'Valor energético',
      per100g: '98 kcal\n(410 kj)',
      perServing: '7 kcal\n(29 kj)',
      vd: '0%',
      variant: 'energy',
    },
    rows: [
        { name: 'Grasa Total', per100g: '5 g', perServing: '0 g', vd: '0%', variant: 'group' },
        { name: 'Grasa Saturada', per100g: '0 g', perServing: '0 g', vd: '0%', variant: 'sub' },
        { name: 'Grasa Trans', per100g: '0 g', perServing: '0 g', vd: '-', variant: 'sub' },
        { name: 'Sodio', per100g: '33 mg', perServing: '2 mg', vd: '0%', variant: 'group' },
        { name: 'Carbohidratos', per100g: '10 g', perServing: '1 g', vd: '1%', variant: 'group' },
        { name: 'Azúcares Totales', per100g: '0 g', perServing: '0 g', vd: '0%', variant: 'sub' },
        { name: 'Fibra dietética', per100g: '16 g', perServing: '1 g', vd: '4%', variant: 'group' },
        { name: 'Proteínas (g)', per100g: '3 g', perServing: '0 g', vd: '0%', variant: 'group' },
        { name: 'Vitamina A', per100g: '3810.0 ug', perServing: '253.4 ug', vd: '33%' },
        { name: 'Vitamina D3', per100g: '32.9 ug', perServing: '2.1 ug', vd: '33%' },
        { name: 'Vitamina E', per100g: '42.9 mg', perServing: '3.0 mg', vd: '33%' },
        { name: 'Vitamina C', per100g: '475.7 mg', perServing: '33.3 mg', vd: '33%' },
        { name: 'Vitamina B9', per100g: '1904.3 ug', perServing: '133.3 ug', vd: '33%' },
        { name: 'Vitamina B1', per100g: '5.0 mg', perServing: '0.4 mg', vd: '29%' },
        { name: 'Vitamina B2', per100g: '5.6 mg', perServing: '0.4 mg', vd: '33%' },
        { name: 'Vitamina B6', per100g: '6.1 mg', perServing: '0.4 mg', vd: '33%' },
        { name: 'Vitamina B3', per100g: '71.4 mg', perServing: '5.0 mg', vd: '33%' },
        { name: 'Vitamina B12', per100g: '11.4 ug', perServing: '0.8 ug', vd: '33%' },
        { name: 'Vitamina K1', per100g: '95.7 mg', perServing: '6.7 mg', vd: '34%' },
        { name: 'Ácido pantoténico', per100g: '14.3 mg', perServing: '1.0 mg', vd: '33%' },
        { name: 'Hierro', per100g: '104.3 mg', perServing: '7.3 mg', vd: '33%' },
        { name: 'Yodo', per100g: '714.3 ug', perServing: '50.0 ug', vd: '33%' },
        { name: 'Zinc', per100g: '67.1 mg', perServing: '4.7 mg', vd: '34%' },
        { name: 'Biotina', per100g: '142.9 ug', perServing: '10.0 ug', vd: '33%' },
        { name: 'Potasio', per100g: '6185.7 mg', perServing: '433.0 mg', vd: '33%' },
        { name: 'Selenio', per100g: '142.9 ug', perServing: '10.0 ug', vd: '33%' },
        { name: 'Magnesio', per100g: '1285.7 mg', perServing: '90.0 mg', vd: '30%' },
    ],
  },
};
