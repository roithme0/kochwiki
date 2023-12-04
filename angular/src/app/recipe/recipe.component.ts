import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../interfaces/recipe';
import { RecipeService } from '../services/recipe/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { PageHeaderService } from '../services/page-header/page-header.service';
import { AmountsGridComponent } from '../amounts-grid/amounts-grid.component';
import { StepsGridComponent } from '../steps-grid/steps-grid.component';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [CommonModule, AmountsGridComponent, StepsGridComponent],
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
    this.pageHeaderService.setBack('recipes');
  }

  getRecipe(id: number): void {
    this.recipeService.getRecipeById(id).subscribe({
      next: (recipe: Recipe) => {
        console.debug('fetched recipe: ', recipe);
        this.recipe = recipe;
        this.pageHeaderService.setHeadline(this.recipe.name);
      },
      error: (error: any) => {
        console.error('failed to fetch recipe: ', error);
        this.pageHeaderService.setHeadline('Rezept nicht gefunden');
      },
    });
  }
}
