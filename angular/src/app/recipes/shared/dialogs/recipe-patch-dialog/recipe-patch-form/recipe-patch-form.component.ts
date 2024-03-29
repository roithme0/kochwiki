import {
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  WritableSignal,
  inject,
} from '@angular/core';
import { FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RecipeService } from '../../../services/recipe.service';
import { IngredientService } from '../../../../../ingredients/shared/services/ingredient.service';

import { Ingredient } from '../../../../../ingredients/shared/interfaces/ingredient';
import { Recipe } from '../../../interfaces/recipe';
import { Step } from '../../../interfaces/step';
import { Amount } from '../../../interfaces/amount';

import { IngredientCreateDialogComponent } from '../../../../../ingredients/shared/dialogs/ingredient-create-dialog/ingredient-create-dialog.component';

import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-recipe-patch-form',
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
    MatDividerModule,
  ],
  templateUrl: './recipe-patch-form.component.html',
  styleUrl: './recipe-patch-form.component.css',
})
export class RecipePatchFormComponent {
  // fetch ingredient associated with recipe
  // render form with values to edit recipe
  fb: FormBuilder = inject(FormBuilder);
  recipeService: RecipeService = inject(RecipeService);
  ingredientService: IngredientService = inject(IngredientService);
  dialog: MatDialog = inject(MatDialog);

  @Input() id: number | undefined;
  @Output() success: EventEmitter<void> = new EventEmitter();

  ingredients: WritableSignal<Ingredient[]> = signal([]);

  recipeForm = this.fb.group({
    metaFormGroup: this.fb.group({
      name: ['', Validators.required],
      // image: [<File | null>null],
      originName: [''],
      originUrl: [''],
      // original: [<File | null>null],
    }),
    amountsFormGroup: this.fb.group({
      servings: [<number | null>null, Validators.required],
      amounts: this.fb.array([]),
    }),
    preparationFormGroup: this.fb.group({
      preptime: [<number | null>null],
      steps: this.fb.array([]),
    }),
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

  fetchRecipe(): void {
    if (this.id === undefined) {
      console.error('no recipe id provided');
      return;
    }

    this.recipeService.getRecipeById(this.id).subscribe({
      next: (recipe) => {
        console.debug('fetched recipe: ', recipe);
        this.recipeForm.patchValue({
          metaFormGroup: {
            name: recipe.name,
            originName: recipe.originName,
            originUrl: recipe.originUrl,
          },
          amountsFormGroup: {
            servings: recipe.servings,
          },
          preparationFormGroup: {
            preptime: recipe.preptime,
          },
        });
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

  onSubmit(): void {
    const formValue = this.recipeForm.value;
    console.debug('submitting edit recipe form: ', formValue);
    const recipe: Partial<Recipe> = {
      ...formValue.metaFormGroup,
      ...formValue.amountsFormGroup,
      ...formValue.preparationFormGroup,
    } as Recipe;

    if (this.id === undefined) {
      console.error('no recipe id provided');
      return;
    }

    this.recipeService.patchRecipe(this.id, recipe).subscribe({
      next: (recipe) => {
        console.info('recipe patched: ', recipe);
        this.success.emit();
        this.recipeService.notifyRecipesChanged();
      },
      error: (error) => {
        console.error('failed to patch recipe: ', error);
      },
    });
  }

  get amounts(): FormArray {
    return this.recipeForm.get('amountsFormGroup.amounts') as FormArray;
  }

  addAmount(amount?: Amount): void {
    // add either empty or existing amount to form
    this.amounts.push(
      this.fb.group({
        index: [1, Validators.required],
        // index: [amount?.index ?? null, Validators.required],
        ingredientId: [amount?.ingredientId ?? null, Validators.required],
        amount: [amount?.amount ?? null, Validators.required],
      })
    );
  }

  removeAmount(index: number): void {
    this.amounts.removeAt(index);
  }

  get steps(): FormArray {
    return this.recipeForm.get('preparationFormGroup.steps') as FormArray;
  }

  addStep(step?: Step): void {
    // add either empty or existing step to form
    this.steps.push(
      this.fb.group({
        index: [1, Validators.required],
        // index: [step?.index ?? null, Validators.required],
        description: [step?.description ?? '', Validators.required],
      })
    );
  }

  removeStep(index: number): void {
    this.steps.removeAt(index);
  }

  openCreateIngredientDialog(): void {
    this.dialog.open(IngredientCreateDialogComponent);
  }
}
