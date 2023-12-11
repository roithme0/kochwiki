import {
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from '../../services/recipe/recipe.service';
import { MatDialog } from '@angular/material/dialog';
import { Ingredient } from '../../interfaces/ingredient';
import { IngredientService } from '../../services/ingredient/ingredient.service';
import { CreateIngredientDialogComponent } from '../../dialogs/create-ingredient-dialog/create-ingredient-dialog.component';

@Component({
  selector: 'app-recipe-edit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recipe-edit-form.component.html',
  styleUrl: './recipe-edit-form.component.css',
})
export class RecipeEditFormComponent {
  @Input() id!: number;
  @Output() success: EventEmitter<void> = new EventEmitter();
  ingredients: WritableSignal<Ingredient[]> = signal([]);
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
    private ingredientService: IngredientService,
    private dialog: MatDialog
  ) {
    ingredientService.ingredients$.subscribe(() => {
      this.fetchIngredients();
    });
  }

  ngOnInit(): void {
    this.fetchIngredients();
    this.fetchRecipe();
  }

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

  fetchIngredients(): void {
    this.ingredientService.getAllIngredients().subscribe({
      next: (ingredients) => {
        console.debug('fetched ingredients: ', ingredients);
        this.ingredients.set(ingredients);
      },
      error: (error) => {
        console.error('failed to fetch ingredients: ', error);
      },
    });
  }

  fetchRecipe(): void {
    this.recipeService.getRecipeById(this.id).subscribe({
      next: (recipe) => {
        console.debug('fetched recipe: ', recipe);
        this.recipeForm.patchValue(recipe);
      },
      error: (error) => {
        console.error('failed to fetch recipe: ', error);
      },
    });
  }

  onUpload(event: any, field: string): void {
    console.debug(`uploading ${field}: `, event);
    const file = event.target.files[0];
    this.recipeForm.patchValue({
      [field]: file,
    });
  }

  onSubmit(): void {
    console.debug('submitting edit recipe form: ', this.recipeForm.value);
    const formData = new FormData();

    Object.keys(this.recipeForm.value).forEach((key) => {
      if (['image', 'original'].includes(key)) {
        // handle files seperately
        const control = this.recipeForm.get(key);
        const file = control?.value;
        file ? formData.append(key, file, file.name) : formData.append(key, '');
      } else {
        // handle all other form data
        const value = this.recipeForm.get(key)?.value;
        formData.append(key, value || '');
      }
    });

    this.recipeService.putRecipe(formData, this.id).subscribe({
      next: (recipe) => {
        console.debug('recipe updated: ', recipe);
        this.success.emit();
        this.recipeService.notifyRecipesChanged();
      },
      error: (error) => {
        console.error('failed to update recipe: ', error);
      },
    });
  }

  openCreateIngredientDialog(): void {
    this.dialog.open(CreateIngredientDialogComponent);
  }
}
