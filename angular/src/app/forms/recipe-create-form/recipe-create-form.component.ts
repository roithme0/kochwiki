import {
  Component,
  EventEmitter,
  Output,
  signal,
  WritableSignal,
  inject,
} from '@angular/core';
import { FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RecipeService } from '../../services/recipe/recipe.service';
import { IngredientService } from '../../services/ingredient/ingredient.service';

import { Ingredient } from '../../interfaces/ingredient';
import { Recipe } from '../../interfaces/recipe';

import { CreateIngredientDialogComponent } from '../../dialogs/create-ingredient-dialog/create-ingredient-dialog.component';

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

@Component({
  selector: 'app-recipe-create-form',
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
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
  templateUrl: './recipe-create-form.component.html',
  styleUrl: './recipe-create-form.component.css',
})
export class RecipeCreateFormComponent {
  // fetch all ingredients
  // render form to create recipe
  @Output() success: EventEmitter<void> = new EventEmitter();

  ingredients: WritableSignal<Ingredient[]> = signal([]);

  fb: FormBuilder = inject(FormBuilder);
  recipeService: RecipeService = inject(RecipeService);
  ingredientService: IngredientService = inject(IngredientService);
  dialog: MatDialog = inject(MatDialog);

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
    // track changes to ingredients
    this.ingredientService.ingredients$.subscribe(() => {
      this.fetchIngredients();
    });
  }

  ngOnInit(): void {
    this.fetchIngredients();
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
  //   console.debug('submitting create recipe form: ', this.recipeForm.value);
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

  //   this.recipeService.postRecipe(formData).subscribe({
  //     next: (recipe) => {
  //       console.debug('recipe created: ', recipe);
  //       this.success.emit();
  //       this.recipeService.notifyRecipesChanged();
  //     },
  //     error: (error) => {
  //       console.error('failed to create recipe: ', error);
  //     },
  //   });
  // }

  onSubmit(): void {
    const formValue = this.recipeForm.value;
    console.debug('submitting create recipe form: ', formValue);
    const recipe: Recipe = {
      ...formValue.metaFormGroup,
      ...formValue.amountsFormGroup,
      ...formValue.preparationFormGroup,
    } as Recipe;
    this.recipeService.postRecipe(recipe).subscribe({
      next: (recipe) => {
        console.debug('recipe created: ', recipe);
        this.success.emit();
        this.recipeService.notifyRecipesChanged();
      },
      error: (error) => {
        console.error('failed to create recipe: ', error);
      },
    });
  }

  get amounts(): FormArray {
    return this.recipeForm.get('amountsFormGroup.amounts') as FormArray;
  }

  addAmount(): void {
    this.amounts.push(
      this.fb.group({
        index: [<number | null>0, Validators.required],
        // index: [<number | null>null, Validators.required],
        ingredient: [<number | null>null, Validators.required],
        amount: [<number | null>null, Validators.required],
      })
    );
  }

  removeAmount(index: number): void {
    this.amounts.removeAt(index);
  }

  get steps(): FormArray {
    return this.recipeForm.get('preparationFormGroup.steps') as FormArray;
  }

  addStep(): void {
    this.steps.push(
      this.fb.group({
        index: [<number | null>0, Validators.required],
        // index: [<number | null>null, Validators.required],
        description: ['', Validators.required],
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
