import { Amount } from '../../../amounts-grid/amount';
import { Step } from '../../../steps-grid/step';

export interface Recipe {
  id: number;
  name: string;
  // image: File | null;
  originName: string | null;
  originUrl: string | null;
  // original: File | null;
  servings: number;
  amounts: Amount[];
  preptime: number | null;
  steps: Step[];
}
