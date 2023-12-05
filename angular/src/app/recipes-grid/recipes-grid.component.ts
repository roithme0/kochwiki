import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RecipesGridControlsComponent } from '../recipes-grid-controls/recipes-grid-controls.component';
import { RecipesGridElementComponent } from '../recipes-grid-element/recipes-grid-element.component';
import { Recipe } from '../interfaces/recipe';
import { RecipeService } from '../services/recipe/recipe.service';
import { CreateRecipeDialogComponent } from '../dialogs/create-recipe-dialog/create-recipe-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-recipes-grid',
  standalone: true,
  imports: [
    CommonModule,
    RecipesGridControlsComponent,
    RecipesGridElementComponent,
    CreateRecipeDialogComponent,
  ],
  templateUrl: './recipes-grid.component.html',
  styleUrl: './recipes-grid.component.css',
})
export class RecipesGridComponent {
  recipes: Recipe[] = [];

  constructor(
    private recipeService: RecipeService,
    public router: Router,
    private dialog: MatDialog
  ) {
    this.recipeService.recipes$.subscribe(() => {
      this.fetchRecipes();
    });
  }

  ngOnInit() {
    this.fetchRecipes();
  }

  fetchRecipes(): void {
    this.recipeService.getAllRecipes().subscribe({
      next: (recipes) => {
        console.debug('fetched recipes: ', recipes);
        this.recipes = recipes;
      },
      error: (err) => {
        console.error('failed to fetch recipes: ', err);
      },
    });
  }

  openCreateRecipeDialog(): void {
    this.dialog.open(CreateRecipeDialogComponent);
  }
}
