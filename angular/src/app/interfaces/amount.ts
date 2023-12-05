import { Ingredient } from './ingredient';

export interface Amount {
  id: number;
  index: number;
  ingredient: Ingredient;
  amount: number;
}
