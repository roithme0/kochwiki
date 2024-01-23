import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Recipe } from '../../shared/interfaces/recipe';

import { IngredientService } from '../../../ingredients/shared/services/ingredient.service';

@Component({
  selector: 'app-amounts-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './amounts-grid.component.html',
  styleUrl: './amounts-grid.component.css',
})
export class AmountsGridComponent {
  // fetch ingredients associated with recipe
  // render amounts as grid
  ingredientService: IngredientService = inject(IngredientService);

  @Input() recipe!: Recipe;

  ngOnInit() {
    // fetch ingredients associated with recipe
    for (let amount of this.recipe.amounts) {
      this.ingredientService.getIngredientById(amount.ingredientId).subscribe({
        next: (ingredient) => {
          console.debug('fetched ingredient: ', ingredient);
          amount.ingredient = ingredient;
        },
        error: (error) => {
          console.error('failed to fetch ingredient: ', error);
        },
      });
    }
  }
}
