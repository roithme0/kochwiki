import { Component, Signal, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { RecipesGridControlsComponent } from '../recipes-grid-controls/recipes-grid-controls.component';
import { RecipesGridElementComponent } from '../recipes-grid-element/recipes-grid-element.component';

import { RecipeCreateDialogComponent } from '../../shared/dialogs/recipe-create-dialog/recipe-create-dialog.component';

import { Recipe } from '../../shared/interfaces/recipe';

import { RecipesGridDisplayedRecipesService } from '../shared/recipes-grid-displayed-recipes.service';

@Component({
  selector: 'app-recipes-grid',
  standalone: true,
  imports: [
    CommonModule,
    RecipesGridControlsComponent,
    RecipesGridElementComponent,
    RecipeCreateDialogComponent,
    MatIconModule,
  ],
  templateUrl: './recipes-grid.component.html',
  styleUrl: './recipes-grid.component.css',
})
export class RecipesGridComponent {
  // render grid-controls component
  // render recipes in grid
  recipesGridDisplayedRecipesService: RecipesGridDisplayedRecipesService =
    inject(RecipesGridDisplayedRecipesService);
  router: Router = inject(Router);
  dialog: MatDialog = inject(MatDialog);

  displayedRecipes: Signal<Recipe[]> =
    this.recipesGridDisplayedRecipesService.getDisplayedRecipes();

  openCreateRecipeDialog(): void {
    // open dialog to create new recipe
    this.dialog.open(RecipeCreateDialogComponent);
  }
}
