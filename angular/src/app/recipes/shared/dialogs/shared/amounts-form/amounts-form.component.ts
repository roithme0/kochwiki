import { Component, Input, Signal, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';

import { Ingredient } from '../../../../../ingredients/shared/interfaces/ingredient'; 

import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';

import { IngredientCreateDialogComponent } from '../../../../../ingredients/shared/dialogs/ingredient-create-dialog/ingredient-create-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-amounts-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatStepperModule,
    MatIconModule,
  ],
  templateUrl: './amounts-form.component.html',
  styleUrl: './amounts-form.component.css'
})
export class AmountsFormComponent {

  @Input() ingredients: Signal<Ingredient[]> = signal([]);
  @Input() recipeForm!: FormGroup;

  dialog: MatDialog = inject(MatDialog);
  fb: FormBuilder = inject(FormBuilder);

  get amounts(): FormArray {
    return this.recipeForm.get('amountsFormGroup.amounts') as FormArray;
  }

  addAmount(): void {
    this.amounts.push(
      this.fb.group({
        index: [<number | null>0, Validators.required],
        // index: [<number | null>null, Validators.required],
        ingredientId: [<number | null>null, Validators.required],
        amount: [<number | null>null, Validators.required],
      })
    );
  }

  removeAmount(index: number): void {
    this.amounts.removeAt(index);
  }

  openCreateIngredientDialog(): void {
    this.dialog.open(IngredientCreateDialogComponent);
  }
}
