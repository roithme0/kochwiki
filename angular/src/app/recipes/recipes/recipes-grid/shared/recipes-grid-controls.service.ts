import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesGridControlsService {
  searchBySubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  searchBy$: Observable<string> = this.searchBySubject.asObservable();

  setSearchBy(searchBy: string | null): void {
    if (searchBy === null) {
      searchBy = '';
    }
    this.searchBySubject.next(searchBy);
  }

  getSearchBy(): string {
    return this.searchBySubject.getValue();
  }
}
