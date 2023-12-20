import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { IngredientsGridControlsService } from '../services/ingredients-grid-controls/ingredients-grid-controls.service';
import { IngredientService } from '../services/ingredient/ingredient.service';

import { UnitChoices } from '../interfaces/ingredient-meta-data';

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
  unitChoices: UnitChoices | null = null;
  searchBy: string = '';
  filterBy: string = 'all';
  namesAndBrands: string[] = ['Zutat 1', 'Zutat 2'];
  filteredNamesAndBrands: Observable<string[]> = new Observable();
  searchControl: FormControl = new FormControl();

  constructor(
    public ingredientsGridControlsService: IngredientsGridControlsService,
    private ingredientService: IngredientService
  ) {}

  ngOnInit(): void {
    this.filterNamesAndBrands();
    this.fetchUnitChoices();

    this.ingredientsGridControlsService.setSearchBy(this.searchBy);
    this.ingredientsGridControlsService.setFilterBy(this.filterBy);
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

  filterNamesAndBrands(): void {
    this.filteredNamesAndBrands = this.searchControl.valueChanges.pipe(
      startWith(''),
      map((value) =>
        this.namesAndBrands.filter((nameOrBrand) =>
          nameOrBrand.includes(value || '')
        )
      )
    );
  }

  getKeys(obj: Object): string[] {
    // return keys of object
    // used in template as Object.keys() is not available
    return Object.keys(obj);
  }
}
