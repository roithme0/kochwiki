import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ingredient } from '../interfaces/ingredient';
import { MatDialog } from '@angular/material/dialog';
import { EditIngredientDialogComponent } from '../dialogs/edit-ingredient-dialog/edit-ingredient-dialog.component';

@Component({
  selector: 'app-ingredients-grid-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ingredients-grid-row.component.html',
  styleUrl: './ingredients-grid-row.component.css',
})
export class IngredientsGridRowComponent {
  @Input() ingredient!: Ingredient;

  constructor(private dialog: MatDialog) {}

  openEditIngredientDialog(): void {
    this.dialog.open(EditIngredientDialogComponent, {
      data: { id: this.ingredient.id },
    });
  }
}
