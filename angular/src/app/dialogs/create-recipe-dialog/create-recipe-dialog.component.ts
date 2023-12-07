import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../services/recipe/recipe.service';
import { RecipeFormComponent } from '../../recipe-form/recipe-form.component';

@Component({
  selector: 'app-create-recipe-dialog',
  standalone: true,
  imports: [CommonModule, RecipeFormComponent],
  templateUrl: './create-recipe-dialog.component.html',
  styleUrl: './create-recipe-dialog.component.css',
})
export class CreateRecipeDialogComponent {
  constructor(private recipeService: RecipeService) {}
}
