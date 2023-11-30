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
    this.ingredientService.getIngredientById(data.id).subscribe({
      next: (ingredient) => {
        console.debug('ingredient fetched: ', ingredient);
        this.ingredientForm.setValue({
          id: ingredient.id,
          name: ingredient.name,
          brand: ingredient.brand,
          unit: ingredient.unit,
          kcal: ingredient.kcal,
          makros: {
            carbs: ingredient.carbs,
            protein: ingredient.protein,
            fat: ingredient.fat,
          },
        });
      },
      error: (error) => {
        console.error('failed to fetch ingredient: ', error);
      },
    });
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
    this.ingredientService.putIngredient(ingredient).subscribe({
      next: (ingredient) => {
        console.debug('ingredient updated: ', ingredient);
      },
      error: (error) => {
        console.error('failed to update ingredient: ', error);
      },
    });
  }
}
