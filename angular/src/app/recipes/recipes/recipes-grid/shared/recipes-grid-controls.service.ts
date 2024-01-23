import { Injectable, Signal, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecipesGridControlsService {
  private searchBy: WritableSignal<string> = signal('');

  setSearchBy(searchBy: string | null): void {
    if (searchBy === null) {
      searchBy = '';
    }
    this.searchBy.set(searchBy);
  }

  getSearchBy(): Signal<string> {
    return this.searchBy;
  }
}
