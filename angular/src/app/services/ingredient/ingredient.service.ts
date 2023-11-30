import { Injectable } from '@angular/core';
import { Ingredient } from '../../interfaces/ingredient';
import { Observable, of } from 'rxjs';

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
    console.debug('fetching all ingredients');
    return this.ingredients;
  }

  getIngredientById(id: number): Ingredient | undefined {
    console.debug('fetching ingredient by id: ' + id.toString());
    return this.ingredients.find((ingredient) => ingredient.id === id);
  }

  putIngredient(ingredient: Ingredient): Observable<Ingredient> {
    console.debug('putting ingredient: ', ingredient.name);
    const index = this.ingredients.findIndex(
      (existingIngredient) => existingIngredient.id === ingredient.id
    );
    this.ingredients[index] = ingredient;
    return of(this.ingredients[index]);
  }

  deleteIngredient(id: number): Observable<number> {
    console.debug('deleting ingredient by id: ' + id.toString());
    this.ingredients = this.ingredients.filter(
      (ingredient) => ingredient.id !== id
    );
    return of(id);
  }
}
