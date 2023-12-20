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
import { MatDialog } from '@angular/material/dialog';

import { RecipeService } from '../../services/recipe/recipe.service';
import { IngredientService } from '../../services/ingredient/ingredient.service';

import { Ingredient } from '../../interfaces/ingredient';
import { Step } from '../../interfaces/step';
import { Recipe } from '../../interfaces/recipe';
import { Amount } from '../../interfaces/amount';

import { CreateIngredientDialogComponent } from '../../dialogs/create-ingredient-dialog/create-ingredient-dialog.component';

@Component({
  selector: 'app-recipe-edit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recipe-edit-form.component.html',
  styleUrl: './recipe-edit-form.component.css',
})
export class RecipeEditFormComponent {
  // fetch ingredient associated with recipe
  // render form with values to edit recipe
  @Input() id!: number;
  @Output() success: EventEmitter<void> = new EventEmitter();
  ingredients: WritableSignal<Ingredient[]> = signal([]);
  recipeForm = this.fb.group({
    id: [<number | null>null],
    name: ['', Validators.required],
    // image: [<File | null>null],
    originName: [''],
    originUrl: [''],
    // original: [<File | null>null],
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
        recipe.amounts.forEach((amount) => {
          this.addAmount(amount);
        });
        recipe.steps.forEach((step) => {
          this.addStep(step);
        });
      },
      error: (error) => {
        console.error('failed to fetch recipe: ', error);
      },
    });
  }

  onIngredientSelect(event: any, index: number): void {
    console.debug('ingredient selected: ', event);
    this.ingredientService.getIngredientById(event.target.value).subscribe({
      next: (ingredient) => {
        console.debug('fetched ingredient: ', ingredient);
        this.amounts.controls[index].patchValue({
          ingredient: ingredient,
        });
      },
      error: (error) => {
        console.error('failed to fetch ingredient: ', error);
      },
    });
  }

  // onUpload(event: any, field: string): void {
  //   console.debug(`uploading ${field}: `, event);
  //   const file = event.target.files[0];
  //   this.recipeForm.patchValue({
  //     [field]: file,
  //   });
  // }

  // onSubmit(): void {
  //   console.debug('submitting edit recipe form: ', this.recipeForm.value);
  //   const formData = new FormData();

  //   Object.keys(this.recipeForm.value).forEach((key) => {
  //     if (['image', 'original'].includes(key)) {
  //       // handle files seperately
  //       const control = this.recipeForm.get(key);
  //       const file = control?.value;
  //       file ? formData.append(key, file, file.name) : formData.append(key, '');
  //     } else {
  //       // handle all other form data
  //       const value = this.recipeForm.get(key)?.value;
  //       formData.append(key, value || '');
  //     }
  //   });

  //   this.recipeService.putRecipe(formData, this.id).subscribe({
  //     next: (recipe) => {
  //       console.debug('recipe updated: ', recipe);
  //       this.success.emit();
  //       this.recipeService.notifyRecipesChanged();
  //     },
  //     error: (error) => {
  //       console.error('failed to update recipe: ', error);
  //     },
  //   });
  // }

  onSubmit(): void {
    console.debug('submitting edit recipe form: ', this.recipeForm.value);
    const recipe = this.recipeForm.value as Recipe;

    this.recipeService.putRecipe(recipe).subscribe({
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

  get amounts(): FormArray {
    return this.recipeForm.get('amounts') as FormArray;
  }

  addAmount(amount?: Amount): void {
    // add either empty or existing amount to form
    this.amounts.push(
      this.fb.group({
        index: [amount?.index ?? null, Validators.required],
        // ingredient: [amount?.ingredient ?? null, Validators.required],
        amount: [amount?.amount ?? null, Validators.required],
        recipe: [null],
      })
    );
  }

  removeAmount(index: number): void {
    this.amounts.removeAt(index);
  }

  get steps(): FormArray {
    return this.recipeForm.get('steps') as FormArray;
  }

  addStep(step?: Step): void {
    // add either empty or existing step to form
    this.steps.push(
      this.fb.group({
        index: [step?.index ?? null, Validators.required],
        description: [step?.description ?? '', Validators.required],
        recipe: [null],
      })
    );
  }

  removeStep(index: number): void {
    this.steps.removeAt(index);
  }

  openCreateIngredientDialog(): void {
    this.dialog.open(CreateIngredientDialogComponent);
  }
}
