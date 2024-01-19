import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IngredientsGridControlsService {
  searchBy: WritableSignal<string> = signal('');
  filterBy: WritableSignal<string> = signal('all');
}
