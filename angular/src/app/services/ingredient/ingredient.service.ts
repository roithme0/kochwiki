import { Injectable } from '@angular/core';
import { Ingredient } from '../../interfaces/ingredient';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
    return this.http.get<Ingredient[]>('http://localhost:8000/ingredients');
  }

  getIngredientById(id: number): Observable<Ingredient> {
    console.debug('fetching ingredient by id: ' + id.toString());
    return this.http.get<Ingredient>('http://localhost:8000/ingredients/' + id);
  }

  putIngredient(ingredient: Ingredient): Observable<Ingredient> {
    console.debug('putting ingredient: ', ingredient);
    return this.http.put<Ingredient>(
      'http://localhost:8000/ingredients/update/' + ingredient.id,
      ingredient
    );
  }

  postIngredient(data: any): Observable<Ingredient> {
    console.debug('posting ingredient: ', data);
    return this.http.post<Ingredient>(
      'http://localhost:8000/ingredients/create',
      data
    );
  }

  deleteIngredient(id: number): Observable<number> {
    console.debug('deleting ingredient by id: ' + id.toString());
    return this.http.delete<number>(
      'http://localhost:8000/ingredients/delete/' + id
    );
  }
}
