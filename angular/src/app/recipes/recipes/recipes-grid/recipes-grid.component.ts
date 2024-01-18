import {
  Component,
  Signal,
  WritableSignal,
  computed,
  signal,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { RecipesGridControlsComponent } from './recipes-grid-controls/recipes-grid-controls.component';
import { RecipesGridElementComponent } from './recipes-grid-element/recipes-grid-element.component';

import { RecipeCreateDialogComponent } from '../../shared/dialogs/recipe-create-dialog/recipe-create-dialog.component';

import { Recipe } from '../../shared/interfaces/recipe';

import { RecipeService } from '../../shared/services/recipe.service';
import { RecipesGridControlsService } from './shared/recipes-grid-controls.service';

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
  // fetch all recipes
  // filter recipes by search input
  // render grid-controls component
  // render recipes in grid
  recipes: WritableSignal<Recipe[]> = signal([]);
  displayedRecipes: Signal<Recipe[]> = computed(() => {
    // apply search input to recipes
    // sort recipes
    var displayedRecipes = this.recipes();
    displayedRecipes = this.filterRecipesByNameOrOrigin(displayedRecipes);
    displayedRecipes = this.sortRecipes('name', displayedRecipes);
    console.debug('displayedRecipes: ', displayedRecipes);
    return displayedRecipes;
  });

  searchBy: WritableSignal<string> = signal('');

  recipeService: RecipeService = inject(RecipeService);
  recipesGridControlsService: RecipesGridControlsService = inject(
    RecipesGridControlsService
  );
  router: Router = inject(Router);
  dialog: MatDialog = inject(MatDialog);

  constructor() {
    // track changes to recipes
    // track changes to search input
    this.recipeService.recipes$.subscribe(() => {
      this.fetchRecipes();
    });
    this.recipesGridControlsService.searchBy$.subscribe((searchBy) => {
      this.searchBy.set(searchBy);
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

  filterRecipesByNameOrOrigin(recipes: Recipe[]): Recipe[] {
    // filter recipes by search input
    const searchBy = this.searchBy();
    if (searchBy === '') {
      return recipes;
    }
    return recipes.filter((recipe) => {
      return (
        recipe.name.toLowerCase().includes(searchBy.toLowerCase()) ||
        recipe.originName?.toLowerCase().includes(searchBy.toLowerCase())
      );
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
    this.dialog.open(RecipeCreateDialogComponent);
  }
}
