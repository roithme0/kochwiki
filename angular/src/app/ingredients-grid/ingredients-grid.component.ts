import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ingredient } from '../interfaces/ingredient';
import { IngredientService } from '../services/ingredient/ingredient.service';
import { IngredientsGridControlComponent } from '../ingredients-grid-control/ingredients-grid-control.component';
import { IngredientsGridHeaderComponent } from '../ingredients-grid-header/ingredients-grid-header.component';
import { IngredientsGridRowComponent } from '../ingredients-grid-row/ingredients-grid-row.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateIngredientDialogComponent } from '../dialogs/create-ingredient-dialog/create-ingredient-dialog.component';

@Component({
  selector: 'app-ingredients-grid',
  standalone: true,
  imports: [
    CommonModule,
    IngredientsGridControlComponent,
    IngredientsGridHeaderComponent,
    IngredientsGridRowComponent,
  ],
  templateUrl: './ingredients-grid.component.html',
  styleUrl: './ingredients-grid.component.css',
})
export class IngredientsGridComponent {
  dialog: MatDialog = inject(MatDialog);
  ingredientService: IngredientService = inject(IngredientService);
  ingredients: Ingredient[] = [];

  constructor() {
    this.fetchIngredients();
    this.ingredientService.ingredients$.subscribe(() => {
      this.fetchIngredients();
    });
  }

  fetchIngredients(): void {
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

  openCreateIngredientDialog(): void {
    this.dialog.open(CreateIngredientDialogComponent);
  }
}
