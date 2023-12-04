import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesGridControlsComponent } from '../recipes-grid-controls/recipes-grid-controls.component';
import { RecipesGridElementComponent } from '../recipes-grid-element/recipes-grid-element.component';
import { Recipe } from '../interfaces/recipe';
import { RecipeService } from '../services/recipe/recipe.service';

@Component({
  selector: 'app-recipes-grid',
  standalone: true,
  imports: [
    CommonModule,
    RecipesGridControlsComponent,
    RecipesGridElementComponent,
  ],
  templateUrl: './recipes-grid.component.html',
  styleUrl: './recipes-grid.component.css',
})
export class RecipesGridComponent {
  recipes: Recipe[] = [];
  recipeService: RecipeService = inject(RecipeService);

  constructor() {
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
}
