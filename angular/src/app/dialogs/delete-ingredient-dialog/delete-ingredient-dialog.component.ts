import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ingredient } from '../../interfaces/ingredient';

import { IngredientService } from '../../services/ingredient/ingredient.service';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-ingredient-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './delete-ingredient-dialog.component.html',
  styleUrl: './delete-ingredient-dialog.component.css',
})
export class DeleteIngredientDialogComponent {
  ingredient: Ingredient | undefined;

  dialogRef: MatDialogRef<DeleteIngredientDialogComponent> =
    inject(MatDialogRef);
  ingredientService: IngredientService = inject(IngredientService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.ingredientService.getIngredientById(data.id).subscribe({
      next: (ingredient) => {
        console.debug('ingredient fetched: ', ingredient);
        this.ingredient = ingredient;
      },
      error: (error) => {
        console.error('failed to fetch ingredient: ', error);
      },
    });
  }

  deleteIngredient(): void {
    this.ingredient?.id
      ? this.ingredientService.deleteIngredient(this.ingredient.id).subscribe({
          next: (id) => {
            console.debug('ingredient deleted: ', id);
            this.ingredientService.notifyIngredientsChanged();
            this.dialogRef.close();
          },
          error: (error) => {
            console.error('failed to delete ingredienet: ', error);
          },
        })
      : null;
  }
}
