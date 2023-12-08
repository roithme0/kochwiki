import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { Ingredient } from '../../interfaces/ingredient';
import { IngredientService } from '../../services/ingredient/ingredient.service';
import { ReactiveFormsModule } from '@angular/forms';
import { IngredientMetaData } from '../../interfaces/ingredient-meta-data';

@Component({
  selector: 'app-ingredient-create-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ingredient-create-form.component.html',
  styleUrl: './ingredient-create-form.component.css',
})
export class IngredientCreateFormComponent {
  @Output() success: EventEmitter<void> = new EventEmitter();
  metaData: IngredientMetaData | null = null;
  ingredientForm = this.fb.group({
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
    this.fetchMetaData();
  }

  onSubmit(formData: any): void {
    console.debug('submitting create ingredient form: ', formData);
    const postData: Ingredient = formData as Ingredient;
    this.ingredientService.postIngredient(postData).subscribe({
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

  fetchMetaData(): void {
    this.ingredientService.fetchMetaData().subscribe({
      next: (metaData) => {
        console.debug('fetched ingredient meta data: ', metaData);
        this.metaData = metaData;
      },
      error: (error) => {
        console.error('failed to fetch ingredient meta data: ', error);
      },
    });
  }
}
