import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { Ingredient } from '../interfaces/ingredient';

import { EditIngredientDialogComponent } from '../dialogs/edit-ingredient-dialog/edit-ingredient-dialog.component';
import { DeleteIngredientDialogComponent } from '../dialogs/delete-ingredient-dialog/delete-ingredient-dialog.component';

@Component({
  selector: 'app-ingredients-grid-row',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './ingredients-grid-row.component.html',
  styleUrl: './ingredients-grid-row.component.css',
})
export class IngredientsGridRowComponent {
  // render ingredient data
  // render ingredient actions
  @Input() ingredient!: Ingredient;
  @Input() displayedFields!: string[];

  dialog: MatDialog = inject(MatDialog);

  openEditIngredientDialog(): void {
    this.dialog.open(EditIngredientDialogComponent, {
      data: { id: this.ingredient.id },
    });
  }

  openDeleteIngredientDialog(): void {
    this.dialog.open(DeleteIngredientDialogComponent, {
      data: { id: this.ingredient.id },
    });
  }
}
