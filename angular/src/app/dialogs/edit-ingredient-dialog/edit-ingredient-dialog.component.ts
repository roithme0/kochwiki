import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-ingredient-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-ingredient-dialog.component.html',
  styleUrl: './edit-ingredient-dialog.component.css',
})
export class EditIngredientDialogComponent {
  units = ['g', 'ml', 'Stk.'];

  ingredientForm = new FormGroup({
    name: new FormControl(''),
    brand: new FormControl(''),
    unit: new FormControl(''),
    kcal: new FormControl(''),
    makros: new FormGroup({
      carbs: new FormControl(''),
      protein: new FormControl(''),
      fat: new FormControl(''),
    }),
  });

  onSubmit() {
    console.log(this.ingredientForm.value);
  }
}
