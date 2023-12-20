import { Amount } from './amount';

export interface Ingredient {
  [key: string]: any;
  id: number | null;
  name: string;
  brand: string | null;
  unit: string;
  unitVerbose: string;
  kcal: number | null;
  carbs: number | null;
  protein: number | null;
  fat: number | null;
  amounts: Amount[];
}
