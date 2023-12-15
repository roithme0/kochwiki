import { Recipe } from './recipe';

export interface Step {
  id: number;
  index: number;
  description: string;
  recipe?: Recipe;
}
