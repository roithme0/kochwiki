import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { IngredientService } from '../../services/ingredient/ingredient.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-ingredient-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-ingredient-dialog.component.html',
  styleUrl: './create-ingredient-dialog.component.css',
})
export class CreateIngredientDialogComponent {
  units = ['g', 'ml', 'Stk.'];
  dialog: MatDialogRef<CreateIngredientDialogComponent> = inject(
    MatDialogRef<CreateIngredientDialogComponent>
  );
  ingredientService: IngredientService = inject(IngredientService);
  ingredientForm = new FormGroup({
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

  onSubmit(data: any): void {
    console.debug('submitting create ingredient form: ', data);
    const postData: any = {
      name: data.name,
      brand: data.brand,
      unit: data.unit,
      kcal: data.kcal,
      carbs: data.makros.carbs,
      protein: data.makros.protein,
      fat: data.makros.fat,
    };
    this.ingredientService.postIngredient(postData).subscribe({
      next: (ingredient) => {
        console.debug('ingredient created: ', ingredient);
        this.ingredientService.notifyIngredientsChanged();
        this.dialog.close();
      },
      error: (error) => {
        console.error('failed to create ingredient: ', error);
      },
    });
  }
}
