import { Ingredient } from './ingredient';
import { Recipe } from './recipe';

export interface Amount {
  id: number;
  index: number;
  ingredient: Ingredient;
  amount: number;
  recipe?: Recipe;
}
