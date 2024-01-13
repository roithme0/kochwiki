import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { Ingredient } from '../../interfaces/ingredient';
import { VerboseNames } from '../../interfaces/ingredient-meta-data';
import { UnitChoices } from '../../interfaces/ingredient-meta-data';

import { IngredientService } from '../../services/ingredient/ingredient.service';

@Component({
  selector: 'app-ingredient-edit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ingredient-edit-form.component.html',
  styleUrls: [
    './ingredient-edit-form.component.css',
    '../form.css',
    '../form-fields.css',
  ],
})
export class IngredientEditFormComponent {
  // fetch ingredient meta data
  // render form to edit ingredient
  @Input() id!: number;
  @Output() success: EventEmitter<void> = new EventEmitter();
  verboseNames: VerboseNames | null = null;
  unitChoices: UnitChoices | null = null;
  ingredientForm = this.fb.group({
    id: [<number | null>null],
    name: ['', Validators.required],
    brand: [''],
    unit: ['', Validators.required],
    kcal: [<number | null>null],
    carbs: [<number | null>null],
    protein: [<number | null>null],
    fat: [<number | null>null],
  });

  constructor(
    private ingredientService: IngredientService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.fetchVerboseNames();
    this.fetchUnitChoices();

    this.ingredientService.getIngredientById(this.id).subscribe({
      next: (ingredient) => {
        console.debug('ingredient fetched: ', ingredient);
        this.ingredientForm.patchValue(ingredient);
      },
      error: (error) => {
        console.error('failed to fetch ingredient: ', error);
      },
    });
  }

  onSubmit(formData: any): void {
    console.debug('submitting edit ingredient form: ', formData);
    const ingredient: Ingredient = formData as Ingredient;
    this.ingredientService.putIngredient(ingredient).subscribe({
      next: (ingredient) => {
        console.debug('ingredient updated: ', ingredient);
        this.ingredientService.notifyIngredientsChanged();
        this.success.emit();
      },
      error: (error) => {
        console.error('failed to update ingredient: ', error);
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
