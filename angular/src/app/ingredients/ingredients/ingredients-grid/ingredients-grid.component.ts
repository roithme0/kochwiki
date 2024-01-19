import { Component, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { IngredientsGridControlsComponent } from '../ingredients-grid-controls/ingredients-grid-controls.component';
import { IngredientsGridHeaderComponent } from '../ingredients-grid-header/ingredients-grid-header.component';
import { IngredientsGridRowComponent } from '../ingredients-grid-row/ingredients-grid-row.component';

import { Ingredient } from '../../shared/interfaces/ingredient';

import { IngredientCreateDialogComponent } from '../../shared/dialogs/ingredient-create-dialog/ingredient-create-dialog.component';

import { IngredientsGridDisplayedIngredientsService } from '../shared/ingredients-grid-displayed-ingredients.service';
import { IngredientsGridDisplayedFieldsService } from '../shared/ingredients-grid-displayed-fields.service';

@Component({
  selector: 'app-ingredients-grid',
  standalone: true,
  imports: [
    CommonModule,
    IngredientsGridControlsComponent,
    IngredientsGridHeaderComponent,
    IngredientsGridRowComponent,
    MatIconModule,
  ],
  templateUrl: './ingredients-grid.component.html',
  styleUrl: './ingredients-grid.component.css',
})
export class IngredientsGridComponent {
  // render ingredients-grid-controls component
  // render ingredients as grid
  dialog: MatDialog = inject(MatDialog);
  displayedIngredientsService: IngredientsGridDisplayedIngredientsService =
    inject(IngredientsGridDisplayedIngredientsService);
  displayedFieldsService: IngredientsGridDisplayedFieldsService = inject(
    IngredientsGridDisplayedFieldsService
  );

  displayedIngredients: Signal<Ingredient[]> =
    this.displayedIngredientsService.getDisplayedIngredients();
  displayedFields: Signal<string[]> =
    this.displayedFieldsService.getDisplayedFields();

  openCreateIngredientDialog(): void {
    this.dialog.open(IngredientCreateDialogComponent);
  }
}
