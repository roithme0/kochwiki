import { Injectable, Signal, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecipesGridControlsService {
  private searchBy: WritableSignal<string> = signal('');

  setSearchBy(searchBy: string): void {
    this.searchBy.set(searchBy);
  }

  getSearchBy(): Signal<string> {
    return this.searchBy;
  }
}
