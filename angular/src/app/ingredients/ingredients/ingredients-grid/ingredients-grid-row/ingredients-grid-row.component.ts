import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { Ingredient } from '../../../shared/interfaces/ingredient';

import { IngredientEditDialogComponent } from '../../../shared/dialogs/ingredient-edit-dialog/ingredient-edit-dialog.component';
import { IngredientDeleteDialogComponent } from '../../../shared/dialogs/ingredient-delete-dialog/ingredient-delete-dialog.component';

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
    this.dialog.open(IngredientEditDialogComponent, {
      data: { id: this.ingredient.id },
    });
  }

  openDeleteIngredientDialog(): void {
    this.dialog.open(IngredientDeleteDialogComponent, {
      data: { id: this.ingredient.id },
    });
  }
}
