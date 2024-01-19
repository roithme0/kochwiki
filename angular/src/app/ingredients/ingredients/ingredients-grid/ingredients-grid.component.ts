import { Component, Signal, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { IngredientsGridControlsComponent } from '../ingredients-grid-controls/ingredients-grid-controls.component';
import { IngredientsGridHeaderComponent } from '../ingredients-grid-header/ingredients-grid-header.component';
import { IngredientsGridRowComponent } from '../ingredients-grid-row/ingredients-grid-row.component';

import { IngredientCreateDialogComponent } from '../../shared/dialogs/ingredient-create-dialog/ingredient-create-dialog.component';

import { IngredientsGridDisplayedIngredientsService } from '../shared/ingredients-grid-displayed-ingredients.service';

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
  windowInnerWidth = signal(window.innerWidth);
  displayedFields: Signal<string[]> = computed(() => {
    // adjust displayed fields based on window with
    var displayedFields: string[] = ['name', 'brand'];
    if (this.windowInnerWidth() > 600) {
      displayedFields.push('kcal');
    }
    if (this.windowInnerWidth() > 700) {
      displayedFields.push('unitVerbose');
    }
    if (this.windowInnerWidth() > 1200) {
      displayedFields.push('carbs', 'protein', 'fat');
    }
    return displayedFields;
  });

  dialog: MatDialog = inject(MatDialog);
  displayedIngredientsService: IngredientsGridDisplayedIngredientsService =
    inject(IngredientsGridDisplayedIngredientsService);

  ngOnInit(): void {
    // track changes to window width
    window.addEventListener('resize', this.windowEventListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.windowEventListener);
  }

  windowEventListener = (): void => {
    this.windowInnerWidth.set(window.innerWidth);
  };

  openCreateIngredientDialog(): void {
    this.dialog.open(IngredientCreateDialogComponent);
  }
}
