import { Injectable } from '@angular/core';
import { Ingredient } from '../../interfaces/ingredient';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  getAllIngredients(): Observable<Ingredient[]> {
    console.debug('fetching all ingredients');
    return this.http.get<Ingredient[]>('http://localhost:8000/ingredients');
  }

  getIngredientById(id: number): Observable<Ingredient> {
    console.debug('fetching ingredient by id: ' + id.toString());
    const ingredient: Ingredient | undefined = this.ingredients.find(
      (ingredient) => ingredient.id === id
    );
    return this.http.get<Ingredient>('http://localhost:8000/ingredients/' + id);
  }

  putIngredient(ingredient: Ingredient): Observable<Ingredient> {
    console.debug('putting ingredient: ', ingredient.name);
    return this.http.put<Ingredient>(
      'http://localhost:8000/ingredients/update/' + ingredient.id,
      ingredient
    );
  }

  deleteIngredient(id: number): Observable<number> {
    console.debug('deleting ingredient by id: ' + id.toString());
    return this.http.delete<number>(
      'http://localhost:8000/ingredients/delete/' + id
    );
  }
}
