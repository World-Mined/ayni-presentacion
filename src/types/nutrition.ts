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
 * Dónde se ancla el panel nutricional:
 * - 'viewport': pegado al borde derecho de la pantalla, a lo alto de toda la ventana.
 * - 'image': pegado al borde derecho de la imagen 16:9, respetando el letterbox.
 */
export type NutritionSidebarAnchor = 'viewport' | 'image';
