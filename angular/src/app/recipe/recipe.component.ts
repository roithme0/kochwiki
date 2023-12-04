import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../interfaces/recipe';
import { RecipeService } from '../services/recipe/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { PageHeaderService } from '../services/page-header/page-header.service';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css',
})
export class RecipeComponent {
  recipe: Recipe | null = null;

  constructor(
    private route: ActivatedRoute,
    private pageHeaderService: PageHeaderService,
    private recipeService: RecipeService
  ) {
    const id: number | null = Number(this.route.snapshot.paramMap.get('id'));
    console.debug('id: ', id);

    this.getRecipe(id);

    if (this.recipe === null) {
      this.pageHeaderService.setHeadline('Rezept nicht gefunden');
    } else {
      this.pageHeaderService.setHeadline(this.recipe.name);
    }
    this.pageHeaderService.setBack('recipes');
  }

  getRecipe(id: number): void {
    this.recipeService.getRecipeById(id).subscribe({
      next: (recipe: Recipe) => {
        console.debug('fetched recipe: ', recipe);
        this.recipe = recipe;
      },
      error: (error: any) => {
        console.error('failed to fetch recipe: ', error);
      },
    });
  }
}
