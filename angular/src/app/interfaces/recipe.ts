import { Amount } from './amount';
import { Step } from './step';

export interface Recipe {
  id: number;
  name: string;
  servings: number;
  preptime: number | null;
  originName: string | null;
  originUrl: string | null;
  original: string | null;
  image: string | null;
  amounts: Amount[];
  steps: Step[];
}
