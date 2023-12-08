import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from '../../services/recipe/recipe.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-recipe-create-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recipe-create-form.component.html',
  styleUrl: './recipe-create-form.component.css',
})
export class RecipeCreateFormComponent {
  @Output() success: EventEmitter<void> = new EventEmitter();
  recipeForm = this.fb.group({
    name: ['', Validators.required],
    image: [<File | null>null],
    origin_name: [''],
    origin_url: [''],
    original: [<File | null>null],
    servings: [<number | null>null, Validators.required],
    amounts: this.fb.array([]),
    preptime: [<number | null>null],
    steps: this.fb.array([]),
  });

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private dialog: MatDialog
  ) {}

  get amounts(): FormArray {
    return this.recipeForm.get('amounts') as FormArray;
  }

  addAmount(): void {
    this.amounts.push(
      this.fb.group({
        // index: [],
        ingredient: [<number | null>null, Validators.required],
        amount: [<number | null>null, Validators.required],
      })
    );
  }

  removeAmount(index: number): void {
    this.amounts.removeAt(index);
  }

  get steps(): FormArray {
    return this.recipeForm.get('steps') as FormArray;
  }

  addStep(): void {
    this.steps.push(
      this.fb.group({
        // index: [],
        description: ['', Validators.required],
      })
    );
  }

  removeStep(index: number): void {
    this.steps.removeAt(index);
  }

  onUpload(event: any, field: string): void {
    console.debug(`uploading ${field}: `, event);
    const file = event.target.files[0];
    this.recipeForm.patchValue({
      [field]: file,
    });
  }

  onSubmit(): void {
    console.debug('submitting create recipe form: ', this.recipeForm.value);
    const formData = new FormData();

    Object.keys(this.recipeForm.value).forEach((key) => {
      if (key in ['image', 'original']) {
        // handle files seperately
        const control = this.recipeForm.get(key);
        const file = control?.value.files[0];
        formData.append(key, file, file.name);
      } else {
        // handle all other form data
        const value = this.recipeForm.get(key)?.value;
        formData.append(key, value || '');
      }
    });

    this.recipeService.postRecipe(formData).subscribe({
      next: (recipe) => {
        console.debug('recipe created: ', recipe);
        this.success.emit();
      },
      error: (error) => {
        console.error('failed to create recipe: ', error);
      },
    });
  }
}
