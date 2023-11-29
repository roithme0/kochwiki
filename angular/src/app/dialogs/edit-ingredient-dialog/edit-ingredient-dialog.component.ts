import { Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Ingredient } from '../../interfaces/ingredient';
import { IngredientService } from '../../services/ingredient/ingredient.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-ingredient-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-ingredient-dialog.component.html',
  styleUrl: './edit-ingredient-dialog.component.css',
})
export class EditIngredientDialogComponent {
  units = ['g', 'ml', 'Stk.'];
  ingredient: Ingredient | undefined;
  ingredientService: IngredientService = inject(IngredientService);
  ingredientForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    brand: new FormControl(),
    unit: new FormControl(),
    kcal: new FormControl(),
    makros: new FormGroup({
      carbs: new FormControl(),
      protein: new FormControl(),
      fat: new FormControl(),
    }),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.ingredient = this.ingredientService.getIngredientById(data.id);
    console.debug('ingredient: ', this.ingredient);

    if (this.ingredient) {
      this.ingredientForm.setValue({
        id: this.ingredient.id,
        name: this.ingredient.name,
        brand: this.ingredient.brand,
        unit: this.ingredient.unit,
        kcal: this.ingredient.kcal,
        makros: {
          carbs: this.ingredient.carbs,
          protein: this.ingredient.protein,
          fat: this.ingredient.fat,
        },
      });
    }
  }

  onSubmit(data: any): void {
    console.debug('submitting edit ingredient form: ', data);
    const ingredient: Ingredient = {
      id: data.id,
      name: data.name,
      brand: data.brand,
      unit: data.unit,
      kcal: data.kcal,
      carbs: data.makros.carbs,
      protein: data.makros.protein,
      fat: data.makros.fat,
    };
    this.ingredientService.putIngredient(ingredient);
  }
}
