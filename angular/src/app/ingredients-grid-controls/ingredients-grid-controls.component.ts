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

import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { IngredientsGridControlsService } from '../services/ingredients-grid-controls/ingredients-grid-controls.service';
import { IngredientService } from '../services/ingredient/ingredient.service';

import { UnitChoices } from '../interfaces/ingredient-meta-data';
import { Ingredient } from '../interfaces/ingredient';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-ingredients-grid-controls',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
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
    return this.namesAndBrands().filter((nameOrBrand) =>
      nameOrBrand.includes(this.searchControl.value || '')
    );
  });

  units: string[] = ['all', 'G', 'ML', 'PIECE'];
  unitChoices: UnitChoices | null = null;

  constructor(
    public ingredientsGridControlsService: IngredientsGridControlsService,
    private ingredientService: IngredientService
  ) {}

  ngOnInit(): void {
    this.fetchUnitChoices();

    this.ingredientsGridControlsService.setSearchBy(this.searchControl.value);
    this.ingredientsGridControlsService.setFilterBy(this.filterControl.value);
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
