import { Injectable } from '@angular/core';
import { Ingredient } from '../../interfaces/ingredient';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const backendUrl: string = 'http://localhost:8000';

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
  }

  getIngredientById(id: number): Observable<Ingredient> {
    console.debug('fetching ingredient by id: ' + id);
    return this.http.get<Ingredient>(backendUrl + '/ingredients/' + id);
  }

  putIngredient(ingredient: Ingredient): Observable<Ingredient> {
    console.debug('putting ingredient: ', ingredient);
    return this.http.put<Ingredient>(
      backendUrl + '/ingredients/update/' + ingredient.id,
      ingredient
    );
  }

  postIngredient(data: any): Observable<Ingredient> {
    console.debug('posting ingredient: ', data);
    return this.http.post<Ingredient>(backendUrl + '/ingredients/create', data);
  }

  deleteIngredient(id: number): Observable<number> {
    console.debug('deleting ingredient by id: ' + id);
    return this.http.delete<number>(backendUrl + '/ingredients/delete/' + id);
  }

  fetchMetaData(): Observable<any> {
    console.debug('fetching ingredient meta data');
    return this.http.get<any>(backendUrl + '/ingredients/empty');
  }
}
