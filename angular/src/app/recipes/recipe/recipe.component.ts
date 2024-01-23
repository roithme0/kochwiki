import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { Recipe } from '../shared/interfaces/recipe';

import { RecipeService } from '../shared/services/recipe.service';
import { PageHeaderService } from '../../shared/services/page-header.service';

import { AmountsGridComponent } from './amounts-grid/amounts-grid.component';
import { StepsGridComponent } from './steps-grid/steps-grid.component';

import { RecipePatchDialogComponent } from '../shared/dialogs/recipe-patch-dialog/recipe-patch-dialog.component';
import { RecipeDeleteDialogComponent } from '../shared/dialogs/recipe-delete-dialog/recipe-delete-dialog.component';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [
    CommonModule,
    AmountsGridComponent,
    StepsGridComponent,
    MatIconModule,
  ],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css',
})
export class RecipeComponent {
  // set header values
  // fetch recipe
  // render recipe details
  route: ActivatedRoute = inject(ActivatedRoute);
  pageHeaderService: PageHeaderService = inject(PageHeaderService);
  recipeService: RecipeService = inject(RecipeService);
  dialog: MatDialog = inject(MatDialog);

  id!: number;
  recipe: Recipe | null = null;

  constructor() {
    // fetch recipe id from route
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.debug('id: ', this.id);
  }

  ngOnInit() {
    // set headline
    // track recipe changes
    // fetch recipe
    this.pageHeaderService.setBack('recipes');

    this.recipeService.recipes$.subscribe(() => {
      this.fetchRecipe(this.id);
    });
    this.fetchRecipe(this.id);
  }

  fetchRecipe(id: number): void {
    // fetch recipe by id
    // set headline
    this.recipeService.getRecipeById(id).subscribe({
      next: (recipe: Recipe) => {
        console.debug('fetched recipe: ', recipe);
        this.recipe = recipe;
        this.pageHeaderService.setHeadline(this.recipe.name);
      },
      error: (error: any) => {
        console.error('failed to fetch recipe: ', error);
        this.pageHeaderService.setHeadline('Fehler');
      },
    });
  }

  openPatchRecipeDialog(): void {
    this.dialog.open(RecipePatchDialogComponent, {
      data: { id: this.recipe?.id },
    });
  }

  openDeleteRecipeDialog(): void {
    this.dialog.open(RecipeDeleteDialogComponent, {
      data: { id: this.recipe?.id },
    });
  }
}
