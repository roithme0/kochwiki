import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

import { Ingredient } from '../../interfaces/ingredient';
import {
  VerboseNames,
  UnitChoices,
} from '../../interfaces/ingredient-meta-data';

const backendUrl: string = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  // backend communication for ingredients
  private ingredientsSubject = new Subject<void>();
  ingredients$ = this.ingredientsSubject.asObservable();

  constructor(private http: HttpClient) {}

  notifyIngredientsChanged() {
    // notify subscribers that ingredients have changed
    this.ingredientsSubject.next();
  }

  getAllIngredients(): Observable<Ingredient[]> {
    console.debug('GET: fetching all ingredients ...');
    return this.http.get<Ingredient[]>(backendUrl + '/ingredients');
  }

  getIngredientById(id: number): Observable<Ingredient> {
    console.debug('GET: fetching ingredient by id "' + id + '" ...');
    return this.http.get<Ingredient>(backendUrl + '/ingredients/' + id);
  }

  putIngredient(ingredient: Ingredient): Observable<Ingredient> {
    console.debug('PUT: putting ingredient "' + ingredient.name + '" ...');
    return this.http.put<Ingredient>(
      backendUrl + '/ingredients/' + ingredient.id,
      ingredient
    );
  }

  postIngredient(ingredient: Ingredient): Observable<Ingredient> {
    console.debug('POST: posting ingredient "' + ingredient + '" ...');
    return this.http.post<Ingredient>(backendUrl + '/ingredients', ingredient);
  }

  deleteIngredient(id: number): Observable<number> {
    console.debug('DELETE: deleting ingredient by id "' + id + '" ...');
    return this.http.delete<number>(backendUrl + '/ingredients/' + id);
  }

  fetchVerboseNames(): Observable<VerboseNames> {
    console.debug('GET: fetching ingredient verbose names ...');
    return this.http.get<VerboseNames>(
      backendUrl + '/ingredients-meta-data/verbose-names'
    );
  }

  fetchUnitChoices(): Observable<UnitChoices> {
    console.debug('GET: fetching ingredient unit choices ...');
    return this.http.get<UnitChoices>(
      backendUrl + '/ingredients-meta-data/unit-choices'
    );
  }
}
