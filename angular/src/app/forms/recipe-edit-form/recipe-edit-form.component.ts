import {
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  WritableSignal,
  inject,
} from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipeService } from '../../services/recipe/recipe.service';
import { IngredientService } from '../../services/ingredient/ingredient.service';

import { Ingredient } from '../../interfaces/ingredient';
import { Step } from '../../interfaces/step';
import { Recipe } from '../../interfaces/recipe';
import { Amount } from '../../interfaces/amount';

import { CreateIngredientDialogComponent } from '../../dialogs/create-ingredient-dialog/create-ingredient-dialog.component';

import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-recipe-edit-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './recipe-edit-form.component.html',
  styleUrl: './recipe-edit-form.component.css',
})
export class RecipeEditFormComponent {
  // fetch ingredient associated with recipe
  // render form with values to edit recipe
  @Input() id!: number;
  @Output() success: EventEmitter<void> = new EventEmitter();

  ingredients: WritableSignal<Ingredient[]> = signal([]);

  fb: FormBuilder = inject(FormBuilder);
  recipeService: RecipeService = inject(RecipeService);
  ingredientService: IngredientService = inject(IngredientService);
  dialog: MatDialog = inject(MatDialog);

  recipeForm = this.fb.group({
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

  constructor() {
    this.ingredientService.ingredients$.subscribe(() => {
      this.fetchAllIngredients();
    });
  }

  ngOnInit(): void {
    this.fetchAllIngredients();
    this.fetchRecipe();
  }

  fetchAllIngredients(): void {
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

  fetchIngredientsOfRecipe(recipe: Recipe): void {
    for (let index = 0; index < recipe.amounts.length; index++) {
      const amount = recipe.amounts[index];
      this.ingredientService.getIngredientById(amount.ingredientId).subscribe({
        next: (ingredient) => {
          console.debug('fetched ingredient: ', ingredient);
          amount.ingredient = ingredient;
          this.addAmount(amount);
        },
        error: (error) => {
          console.error('failed to fetch ingredient: ', error);
        },
      });
    }
  }

  fetchRecipe(): void {
    this.recipeService.getRecipeById(this.id).subscribe({
      next: (recipe) => {
        console.debug('fetched recipe: ', recipe);
        this.recipeForm.patchValue(recipe);
        recipe.steps.forEach((step) => {
          this.addStep(step);
        });
        this.fetchIngredientsOfRecipe(recipe);
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

  onSubmit(): void {
    console.debug('submitting edit recipe form: ', this.recipeForm.value);
    const updates: Partial<Recipe> = this.recipeForm.value as Recipe;
    this.recipeService.patchRecipe(this.id, updates).subscribe({
      next: (recipe) => {
        console.debug('recipe patched: ', recipe);
        this.success.emit();
        this.recipeService.notifyRecipesChanged();
      },
      error: (error) => {
        console.error('failed to patch recipe: ', error);
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
        ingredient: [amount?.ingredient ?? null, Validators.required],
        ingredientId: [amount?.ingredientId ?? null, Validators.required],
        amount: [amount?.amount ?? null, Validators.required],
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
