import { Injectable } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

const backendUrl: string = environment.backendUrl;

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipesSubject = new Subject<void>();
  recipes$ = this.recipesSubject.asObservable();

  constructor(private http: HttpClient) {}

  notifyRecipesChanged() {
    this.recipesSubject.next();
  }

  getAllRecipes(): Observable<Recipe[]> {
    console.debug('GET: fetching all recipes');
    return this.http.get<Recipe[]>(backendUrl + '/recipes');
  }

  getRecipeById(id: number): Observable<Recipe> {
    console.debug('GET: fetching recipe by id: ' + id.toString());
    return this.http.get<Recipe>(backendUrl + '/recipes/' + id);
  }

  patchRecipe(id: number, updates: Partial<Recipe>): Observable<Recipe> {
    console.debug('PATCH: patching recipe "' + id + '" ...');
    return this.http.patch<Recipe>(backendUrl + '/recipes/' + id, updates);
  }

  postRecipe(recipe: Recipe): Observable<Recipe> {
    console.debug('POST: posting recipe: ', recipe);
    return this.http.post<Recipe>(backendUrl + '/recipes', recipe);
  }

  deleteRecipe(id: number): Observable<number> {
    console.debug('DELETE: deleting recipe by id: ' + id.toString());
    return this.http.delete<number>(backendUrl + '/recipes/' + id);
  }
}
