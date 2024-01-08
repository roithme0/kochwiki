import { Injectable } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// const backendUrl: string = 'http://localhost:8080';
const backendUrl: string = 'http://192.168.178.155:8888';

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

  // putRecipe(formData: FormData, id: number): Observable<Recipe> {
  //   console.debug('putting recipe: ', formData);
  //   return this.http.put<Recipe>(
  //     backendUrlDjango + '/recipes/update/' + id,
  //     formData
  //   );
  // }

  putRecipe(id: number, recipe: Recipe): Observable<Recipe> {
    console.debug('PUT: putting recipe: ', recipe);
    return this.http.put<Recipe>(backendUrl + '/recipes/' + id, recipe);
  }

  // postRecipe(formData: FormData): Observable<Recipe> {
  //   console.debug('posting recipe: ', formData);
  //   return this.http.post<Recipe>(
  //     backendUrlDjango + '/recipes/create',
  //     formData
  //   );
  // }

  postRecipe(recipe: Recipe): Observable<Recipe> {
    console.debug('POST: posting recipe: ', recipe);
    return this.http.post<Recipe>(backendUrl + '/recipes', recipe);
  }

  deleteRecipe(id: number): Observable<number> {
    console.debug('DELETE: deleting recipe by id: ' + id.toString());
    return this.http.delete<number>(backendUrl + '/recipes/' + id);
  }
}
