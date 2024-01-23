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

import { RecipeEditDialogComponent } from '../shared/dialogs/recipe-edit-dialog/recipe-edit-dialog.component';
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
    this.pageHeaderService.back.set('recipes');

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
        this.pageHeaderService.headline.set(this.recipe.name);
      },
      error: (error: any) => {
        console.error('failed to fetch recipe: ', error);
        this.pageHeaderService.headline.set('Fehler');
      },
    });
  }

  openPatchRecipeDialog(): void {
    this.dialog.open(RecipeEditDialogComponent, {
      data: { id: this.recipe?.id },
    });
  }

  openDeleteRecipeDialog(): void {
    this.dialog.open(RecipeDeleteDialogComponent, {
      data: { id: this.recipe?.id },
    });
  }
}
