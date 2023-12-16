import { Amount } from './amount';
import { Step } from './step';
import { RecipeMetaData } from './recipe-meta-data';

export interface Recipe {
  id: number | null;
  name: string;
  // image: File | null;
  origin_name: string | null;
  origin_url: string | null;
  // original: File | null;
  servings: number;
  amounts: Amount[];
  preptime: number | null;
  steps: Step[];
  meta_data?: RecipeMetaData;
}
