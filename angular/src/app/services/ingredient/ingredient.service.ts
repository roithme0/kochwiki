import { Injectable } from '@angular/core';
import { Ingredient } from '../../interfaces/ingredient';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  protected ingredients: Ingredient[] = [
    {
      id: 1,
      name: 'Zutat 1',
      brand: 'Marke 1',
      unit: 'g',
      kcal: 100,
      carbs: 20,
      protein: 10,
      fat: 10,
    },
    {
      id: 2,
      name: 'Zutat 2',
      brand: 'Marke 2',
      unit: 'ml',
      kcal: 10,
      carbs: 2,
      protein: 1,
      fat: 1,
    },
    {
      id: 3,
      name: 'Zutat 3',
      brand: 'Marke 3',
      unit: 'Stk.',
      kcal: 150,
      carbs: 30,
      protein: 15,
      fat: 15,
    },
  ];

  constructor() {}

  getAllIngredients(): Ingredient[] {
    return this.ingredients;
  }

  getIngredientById(id: Number): Ingredient | undefined {
    return this.ingredients.find((ingredient) => ingredient.id === id);
  }
}
