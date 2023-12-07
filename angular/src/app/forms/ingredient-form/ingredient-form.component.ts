import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Ingredient } from '../../interfaces/ingredient';
import { IngredientService } from '../../services/ingredient/ingredient.service';
import { ReactiveFormsModule } from '@angular/forms';
import { IngredientMetaData } from '../../interfaces/ingredient-meta-data';

@Component({
  selector: 'app-ingredient-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ingredient-form.component.html',
  styleUrl: './ingredient-form.component.css',
})
export class IngredientFormComponent {
  @Output() success: EventEmitter<void> = new EventEmitter();
  metaData: IngredientMetaData | null = null;
  ingredientForm = new FormGroup({
    name: new FormControl(),
    brand: new FormControl(),
    unit: new FormControl(),
    kcal: new FormControl(),
    makros: new FormGroup({
      carbs: new FormControl(),
      protein: new FormControl(),
      fat: new FormControl(),
    }),
  });

  constructor(private ingredientService: IngredientService) {}

  ngOnInit(): void {
    this.fetchMetaData();
  }

  onSubmit(data: any): void {
    console.debug('submitting create ingredient form: ', data);
    const postData: Ingredient = {
      name: data.name,
      brand: data.brand || '',
      unit: data.unit,
      kcal: data.kcal,
      carbs: data.makros.carbs,
      protein: data.makros.protein,
      fat: data.makros.fat,
    };
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
