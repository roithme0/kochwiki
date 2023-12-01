import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngredientsGridControlsService {
  searchBySubject: Subject<string> = new Subject<string>();
  filterBySubject: Subject<string> = new Subject<string>();
  searchBy$: Observable<string> = this.searchBySubject.asObservable();
  filterBy$: Observable<string> = this.filterBySubject.asObservable();

  constructor() {}

  setSearchBy(searchBy: string | null): void {
    if (searchBy === null) {
      searchBy = '';
    }
    this.searchBySubject.next(searchBy);
  }

  setFilterBy(filterBy: string): void {
    this.filterBySubject.next(filterBy);
  }
}
