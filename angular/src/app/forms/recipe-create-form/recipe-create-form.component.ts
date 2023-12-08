import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-create-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recipe-create-form.component.html',
  styleUrl: './recipe-create-form.component.css',
})
export class RecipeCreateFormComponent {
  recipeForm = this.fb.group({
    name: ['', Validators.required],
    image: [''],
    origin_name: [''],
    origin_url: [''],
    original: [''],
    servings: [<number | null>null],
    amounts: this.fb.array([]),
    preptime: [<number | null>null],
    steps: this.fb.array([]),
  });

  constructor(private fb: FormBuilder) {}

  get amounts() {
    return this.recipeForm.get('amounts') as FormArray;
  }

  addAmount() {
    this.amounts.push(
      this.fb.group({
        // index: [],
        ingredient: [<number | null>null, Validators.required],
        amount: [<number | null>null, Validators.required],
      })
    );
  }

  removeAmount(index: number) {
    this.amounts.removeAt(index);
  }

  get steps() {
    return this.recipeForm.get('steps') as FormArray;
  }

  addStep() {
    this.steps.push(
      this.fb.group({
        // index: [],
        description: ['', Validators.required],
      })
    );
  }

  removeStep(index: number) {
    this.steps.removeAt(index);
  }

  onSubmit(data: any): void {
    console.debug('submitting create recipe form: ', data);
  }
}
