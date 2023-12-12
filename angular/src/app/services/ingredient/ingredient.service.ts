import { Injectable } from '@angular/core';
import { Ingredient } from '../../interfaces/ingredient';
import { IngredientMetaData } from '../../interfaces/ingredient-meta-data';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const backendUrlDjango: string = 'http://localhost:8000';
const backendUrl: string = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private ingredientsSubject = new Subject<void>();
  ingredients$ = this.ingredientsSubject.asObservable();

  constructor(private http: HttpClient) {}

  notifyIngredientsChanged() {
    this.ingredientsSubject.next();
  }

  getAllIngredients(): Observable<Ingredient[]> {
    console.debug('fetching all ingredients');
    return this.http.get<Ingredient[]>(backendUrl + '/ingredients');
    // return this.http.get<Ingredient[]>(backendUrlDjango + '/ingredients');
  }

  getIngredientById(id: number): Observable<Ingredient> {
    console.debug('fetching ingredient by id: ' + id);
    return this.http.get<Ingredient>(backendUrlDjango + '/ingredients/' + id);
  }

  putIngredient(ingredient: Ingredient): Observable<Ingredient> {
    console.debug('putting ingredient: ', ingredient);
    return this.http.put<Ingredient>(
      backendUrlDjango + '/ingredients/update/' + ingredient.id,
      ingredient
    );
  }

  postIngredient(ingredient: Ingredient): Observable<Ingredient> {
    console.debug('posting ingredient: ', ingredient);
    return this.http.post<Ingredient>(backendUrl + '/ingredients', ingredient);
  }

  deleteIngredient(id: number): Observable<number> {
    console.debug('deleting ingredient by id: ' + id);
    return this.http.delete<number>(
      backendUrlDjango + '/ingredients/delete/' + id
    );
  }

  fetchMetaData(): Observable<IngredientMetaData> {
    console.debug('fetching ingredient meta data');
    return this.http.get<any>(backendUrlDjango + '/ingredients/meta');
  }
}
