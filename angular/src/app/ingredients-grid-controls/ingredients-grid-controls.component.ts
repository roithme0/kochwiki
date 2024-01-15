import {
  Component,
  Input,
  Signal,
  computed,
  effect,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';

import { IngredientsGridControlsService } from '../services/ingredients-grid-controls/ingredients-grid-controls.service';
import { IngredientService } from '../services/ingredient/ingredient.service';

import { UnitChoices } from '../interfaces/ingredient-meta-data';
import { Ingredient } from '../interfaces/ingredient';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ingredients-grid-controls',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatIconModule,
  ],
  templateUrl: './ingredients-grid-controls.component.html',
  styleUrl: './ingredients-grid-controls.component.css',
})
export class IngredientsGridControlsComponent {
  @Input() ingredients: Signal<Ingredient[]> = signal([]);

  searchControl: FormControl = new FormControl('');
  filterControl: FormControl = new FormControl('all');

  namesAndBrands: Signal<string[]> = computed(() => {
    // generate a list of names and brands of all displayed ingredients
    const names: string[] = this.ingredients().map(
      (ingredient) => ingredient.name
    );
    const brands: string[] = this.ingredients().map(
      (ingredient) => ingredient.brand || ''
    );
    return names.concat(brands);
  });
  filteredNamesAndBrands: Signal<string[]> = computed(() => {
    // filter names and brands based on search input (case-insensitive)
    const searchValue = this.searchControl.value || '';
    return this.namesAndBrands().filter((nameOrBrand) =>
      nameOrBrand.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  unitChoices: UnitChoices | null = null;

  constructor(
    public ingredientsGridControlsService: IngredientsGridControlsService,
    private ingredientService: IngredientService
  ) {}

  ngOnInit(): void {
    // fetch unit choices
    this.fetchUnitChoices();
  }

  fetchUnitChoices(): void {
    this.ingredientService.fetchUnitChoices().subscribe({
      next: (unitChoices) => {
        console.debug('fetched ingredient unit choices: ', unitChoices);
        this.unitChoices = unitChoices;
      },
      error: (error) => {
        console.error('failed to fetch ingredient unit choices: ', error);
      },
    });
  }

  getKeys(obj: Object): string[] {
    // return keys of object
    // used in template as Object.keys() is not available
    return Object.keys(obj);
  }

  emitControlValues(): void {
    // emit search and filter values
    console.log('search: ', this.searchControl.value);
    this.ingredientsGridControlsService.setSearchBy(this.searchControl.value);
    this.ingredientsGridControlsService.setFilterBy(this.filterControl.value);
  }
}
