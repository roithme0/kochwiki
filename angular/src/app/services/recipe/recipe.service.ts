import { Injectable } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { Amount } from '../../interfaces/amount';
import { Ingredient } from '../../interfaces/ingredient';
import { IngredientService } from '../ingredient/ingredient.service';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const backendUrl: string = 'http://localhost:8000';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipesSubject = new Subject<void>();
  recipes$ = this.recipesSubject.asObservable();

  constructor(
    private http: HttpClient,
    private ingredientService: IngredientService
  ) {}

  notifyRecipesChanged() {
    this.recipesSubject.next();
  }

  getAllRecipes(): Observable<Recipe[]> {
    console.debug('fetching all recipes');
    return this.http.get<Recipe[]>(backendUrl + '/recipes');
  }

  getRecipeById(id: number): Observable<Recipe> {
    console.debug('fetching recipe by id: ' + id.toString());
    return this.http.get<Recipe>(backendUrl + '/recipes/' + id);
  }

  putRecipe(recipe: Recipe): Observable<Recipe> {
    console.debug('putting recipe: ', recipe);
    return this.http.put<Recipe>(
      backendUrl + '/recipes/update/' + recipe.id,
      recipe
    );
  }

  postRecipe(data: any): Observable<Recipe> {
    console.debug('posting recipe: ', data);
    return this.http.post<Recipe>(backendUrl + '/recipes/create', data);
  }

  deleteRecipe(id: number): Observable<number> {
    console.debug('deleting recipe by id: ' + id.toString());
    return this.http.delete<number>(backendUrl + '/recipes/delete/' + id);
  }

  getIngredients(recipe: Recipe): Observable<Ingredient[]> {
    console.debug('fetching ingredients');
    return this.ingredientService.getIngredientsByIds(
      recipe.amounts.map((amount: Amount) => amount.ingredient_id)
    );
  }
}
