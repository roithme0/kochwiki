import {
  Component,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { RecipesGridControlsComponent } from '../recipes-grid-controls/recipes-grid-controls.component';
import { RecipesGridElementComponent } from '../recipes-grid-element/recipes-grid-element.component';
import { CreateRecipeDialogComponent } from '../dialogs/create-recipe-dialog/create-recipe-dialog.component';

import { Recipe } from '../interfaces/recipe';

import { RecipeService } from '../services/recipe/recipe.service';

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
  // fetch all recipes
  // render grid-controls component
  // render recipes in grid
  recipes: WritableSignal<Recipe[]> = signal([]);
  displayedRecipes: Signal<Recipe[]> = computed(() => {
    var displayedRecipes = this.sortRecipes('name', this.recipes());
    console.debug('displayedRecipes: ', displayedRecipes);
    return displayedRecipes;
  });

  constructor(
    private recipeService: RecipeService,
    public router: Router,
    private dialog: MatDialog
  ) {
    // track changes to recipes
    this.recipeService.recipes$.subscribe(() => {
      this.fetchRecipes();
    });
  }

  ngOnInit() {
    this.fetchRecipes();
  }

  fetchRecipes(): void {
    // fetch all recipes
    this.recipeService.getAllRecipes().subscribe({
      next: (recipes) => {
        console.debug('fetched recipes: ', recipes);
        this.recipes.set(recipes);
      },
      error: (err) => {
        console.error('failed to fetch recipes: ', err);
      },
    });
  }

  sortRecipes(sortBy: string, recipes: Recipe[]): Recipe[] {
    // sort recipes by field
    const sortedRecipes = [...recipes];
    return sortedRecipes.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      console.debug('sortBy invalid: ', sortBy);
      return 0;
    });
  }

  openCreateRecipeDialog(): void {
    // open dialog to create new recipe
    this.dialog.open(CreateRecipeDialogComponent);
  }
}
