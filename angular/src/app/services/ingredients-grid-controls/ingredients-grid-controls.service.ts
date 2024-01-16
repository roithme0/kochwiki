import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngredientsGridControlsService {
  searchBySubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  filterBySubject: BehaviorSubject<string> = new BehaviorSubject<string>('all');
  searchBy$: Observable<string> = this.searchBySubject.asObservable();
  filterBy$: Observable<string> = this.filterBySubject.asObservable();

  setSearchBy(searchBy: string | null): void {
    if (searchBy === null) {
      searchBy = '';
    }
    this.searchBySubject.next(searchBy);
  }

  setFilterBy(filterBy: string): void {
    this.filterBySubject.next(filterBy);
  }

  getSearchBy(): string {
    return this.searchBySubject.getValue();
  }

  getFilterBy(): string {
    return this.filterBySubject.getValue();
  }
}
