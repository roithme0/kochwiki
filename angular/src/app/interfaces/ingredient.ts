import { Amount } from './amount';

export interface Ingredient {
  id: number;
  name: string;
  brand: string | null;
  unit: string;
  kcal: number | null;
  carbs: number | null;
  protein: number | null;
  fat: number | null;
  // amounts: Amount[];
}
