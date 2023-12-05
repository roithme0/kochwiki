import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../interfaces/recipe';
import { RecipeService } from '../../services/recipe/recipe.service';

@Component({
  selector: 'app-create-recipe-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-recipe-dialog.component.html',
  styleUrl: './create-recipe-dialog.component.css',
})
export class CreateRecipeDialogComponent {
  constructor(private recipeService: RecipeService) {}
}
