import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { Ingredient } from '../../interfaces/ingredient';
import { VerboseNames } from '../../interfaces/ingredient-meta-data';
import { UnitChoices } from '../../interfaces/ingredient-meta-data';

import { IngredientService } from '../../services/ingredient/ingredient.service';

@Component({
  selector: 'app-ingredient-create-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ingredient-create-form.component.html',
  styleUrls: ['./ingredient-create-form.component.css', '../form.css'],
})
export class IngredientCreateFormComponent {
  // fetch ingredient meta data
  // render form to create ingredient
  @Output() success: EventEmitter<void> = new EventEmitter();
  verboseNames: VerboseNames | null = null;
  unitChoices: UnitChoices | null = null;
  ingredientForm = this.fb.group({
    name: ['', Validators.required],
    brand: [''],
    unit: ['', Validators.required],
    kcal: [<number | null>null],
    carbs: [<number | null>null],
    protein: [<number | null>null],
    fat: [<number | null>null],
    amounts: this.fb.array([]),
  });

  constructor(
    private ingredientService: IngredientService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.fetchVerboseNames();
    this.fetchUnitChoices();
  }

  onSubmit(): void {
    console.debug(
      'submitting create ingredient form: ',
      this.ingredientForm.value
    );
    const ingredient: Ingredient = this.ingredientForm.value as Ingredient;

    this.ingredientService.postIngredient(ingredient).subscribe({
      next: (ingredient) => {
        console.debug('ingredient created: ', ingredient);
        this.ingredientService.notifyIngredientsChanged();
        this.success.emit();
      },
      error: (error) => {
        console.error('failed to create ingredient: ', error);
      },
    });
  }

  fetchVerboseNames(): void {
    this.ingredientService.fetchVerboseNames().subscribe({
      next: (verboseNames) => {
        console.debug('fetched ingredient verbose names: ', verboseNames);
        this.verboseNames = verboseNames;
      },
      error: (error) => {
        console.error('failed to fetch ingredient verbose names: ', error);
      },
    });
  }

  fetchUnitChoices(): void {
    this.ingredientService.fetchUnitChoices().subscribe({
      next: (unitChoices) => {
        console.debug('fetched ingredient unit choices: ', unitChoices);
        this.unitChoices = unitChoices;
      },
      error: (error) => {
        console.error('failed to fetch ingredient unit choices: ', error);
      },
    });
  }

  getKeys(obj: Object): string[] {
    // return keys of object
    // used in template as Object.keys() is not available
    return Object.keys(obj);
  }
}
