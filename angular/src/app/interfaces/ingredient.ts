import { Amount } from './amount';
import { IngredientMetaData } from './ingredient-meta-data';

export interface Ingredient {
  [key: string]: any;
  id?: number;
  name: string;
  brand: string | null;
  unit: string;
  kcal: number | null;
  carbs: number | null;
  protein: number | null;
  fat: number | null;
  amounts?: Amount[];
  metaData?: IngredientMetaData;
}
