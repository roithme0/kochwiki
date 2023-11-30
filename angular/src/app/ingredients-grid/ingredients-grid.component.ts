import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ingredient } from '../interfaces/ingredient';
import { IngredientService } from '../services/ingredient/ingredient.service';
import { IngredientsGridHeaderComponent } from '../ingredients-grid-header/ingredients-grid-header.component';
import { IngredientsGridRowComponent } from '../ingredients-grid-row/ingredients-grid-row.component';

@Component({
  selector: 'app-ingredients-grid',
  standalone: true,
  imports: [
    CommonModule,
    IngredientsGridHeaderComponent,
    IngredientsGridRowComponent,
  ],
  templateUrl: './ingredients-grid.component.html',
  styleUrl: './ingredients-grid.component.css',
})
export class IngredientsGridComponent {
  ingredientService: IngredientService = inject(IngredientService);
  ingredients: Ingredient[] = [];

  constructor() {
    this.ingredientService.getAllIngredients().subscribe({
      next: (ingredients) => {
        console.debug('ingredients fetched: ', ingredients);
        this.ingredients = ingredients;
      },
      error: (error) => {
        console.error('failed to fetch ingredients: ', error);
      },
    });
  }
}
