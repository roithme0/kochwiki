import { Injectable, Signal, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IngredientsGridControlsService {
  private searchBy: WritableSignal<string> = signal('');
  private filterBy: WritableSignal<string> = signal('all');

  setSearchBy(searchBy: string): void {
    this.searchBy.set(searchBy);
  }

  setFilterBy(filterBy: string): void {
    if (filterBy === undefined || filterBy === null) {
      this.filterBy.set('all');
      return;
    }
    this.filterBy.set(filterBy);
  }

  getSearchBy(): Signal<string> {
    return this.searchBy;
  }

  getFilterBy(): Signal<string> {
    return this.filterBy;
  }
}
