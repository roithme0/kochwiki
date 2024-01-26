import {
  Component,
  Input,
  Signal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Recipe } from '../../shared/interfaces/recipe';

import { RecipesGridControlsService } from '../shared/recipes-grid-controls.service';

@Component({
  selector: 'app-recipes-grid-controls',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './recipes-grid-controls.component.html',
  styleUrl: './recipes-grid-controls.component.css',
})
export class RecipesGridControlsComponent {
  // generate a list of names and origins of all displayed recipes
  // render recipe grid controls
  recipeGridControlsService: RecipesGridControlsService = inject(
    RecipesGridControlsService
  );

  @Input() recipes: Signal<Recipe[]> = signal([]);

  searchControl: FormControl = new FormControl('');

  namesAndOrigins: Signal<string[]> = computed(() => {
    // generate a list of names and origins of all displayed recipes
    const names: string[] = this.recipes().map((recipe) => recipe.name);
    const origins: string[] = this.recipes().map(
      (recipe) => recipe.originName || ''
    );
    return [...names, ...origins];
  });
  filteredNamesAndOrigins: Signal<Set<string>> = computed(() => {
    // filter names and origins based on search input (case-insensitive)
    const searchValue = this.searchControl.value || '';
    return new Set(
      this.namesAndOrigins().filter((nameOrOrigin) =>
        nameOrOrigin.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  });

  constructor() {
    // emit search value
    this.searchControl.valueChanges.subscribe((value) =>
      this.recipeGridControlsService.setSearchBy(value)
    );
  }

  emitControlValue(): void {
    console.log('search: ', this.searchControl.value);
    this.recipeGridControlsService.setSearchBy(this.searchControl.value);
  }
}
