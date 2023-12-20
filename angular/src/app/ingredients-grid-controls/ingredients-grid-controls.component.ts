import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

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
  ],
  templateUrl: './ingredients-grid-controls.component.html',
  styleUrl: './ingredients-grid-controls.component.css',
})
export class IngredientsGridControlsComponent {
  unitChoices: UnitChoices | null = null;
  searchBy: string = '';
  filterBy: string = 'all';

  constructor(
    public ingredientsGridControlsService: IngredientsGridControlsService,
    private ingredientService: IngredientService
  ) {}

  ngOnInit(): void {
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

  getKeys(obj: Object): string[] {
    // return keys of object
    // used in template as Object.keys() is not available
    return Object.keys(obj);
  }
}
