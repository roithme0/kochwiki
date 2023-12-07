import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeFormMetaComponent } from '../recipe-form-meta/recipe-form-meta.component';
import { RecipeFormAmountsComponent } from '../recipe-form-amounts/recipe-form-amounts.component';
import { RecipeFormStepsComponent } from '../recipe-form-steps/recipe-form-steps.component';

@Component({
  selector: 'app-recipe-create-form',
  standalone: true,
  imports: [
    CommonModule,
    RecipeFormMetaComponent,
    RecipeFormAmountsComponent,
    RecipeFormStepsComponent,
  ],
  templateUrl: './recipe-create-form.component.html',
  styleUrl: './recipe-create-form.component.css',
})
export class RecipeCreateFormComponent {}
