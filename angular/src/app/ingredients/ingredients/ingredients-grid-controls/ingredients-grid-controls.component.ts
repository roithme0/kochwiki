import {
  Component,
  Input,
  Signal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { IngredientsGridControlsService } from '../shared/services/ingredients-grid-controls.service';
import { IngredientService } from '../../shared/services/ingredient.service';

import { UnitChoices } from '../../shared/interfaces/ingredient-meta-data';
import { Ingredient } from '../../shared/interfaces/ingredient';

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
    MatSelectModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatIconModule,
  ],
  templateUrl: './ingredients-grid-controls.component.html',
  styleUrl: './ingredients-grid-controls.component.css',
})
export class IngredientsGridControlsComponent {
  // track & emit grid control inputs
  // render grid controls
  @Input() ingredients: Signal<Ingredient[]> = signal([]);

  searchControl: FormControl = new FormControl('');
  filterControl: FormControl = new FormControl('all');

  namesAndBrands: Signal<string[]> = computed(() => {
    // generate a list of names & brands of all displayed ingredients
    const names: string[] = this.ingredients().map(
      (ingredient) => ingredient.name
    );
    const brands: string[] = this.ingredients().map(
      (ingredient) => ingredient.brand || ''
    );
    return names.concat(brands.filter((brand) => brand !== ''));
  });
  filteredNamesAndBrands: Signal<Set<string>> = computed(() => {
    // filter names & brands based on search input (case-insensitive)
    const searchValue = this.searchControl.value || '';
    const filtered = this.namesAndBrands().filter((nameOrBrand) =>
      nameOrBrand.toLowerCase().includes(searchValue.toLowerCase())
    );
    return new Set(filtered);
  });

  unitChoices: UnitChoices | null = null;

  ingredientsGridControlsService: IngredientsGridControlsService = inject(
    IngredientsGridControlsService
  );
  ingredientService: IngredientService = inject(IngredientService);

  constructor() {
    // emit search & filter values
    this.searchControl.valueChanges.subscribe((value) =>
      this.ingredientsGridControlsService.searchBy.set(value)
    );
    this.filterControl.valueChanges.subscribe((value) =>
      this.ingredientsGridControlsService.filterBy.set(value)
    );
  }

  ngOnInit(): void {
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
}
