import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Ingredient } from '../../interfaces/ingredient';
import { IngredientService } from '../../services/ingredient/ingredient.service';
import { IngredientMetaData } from '../../interfaces/ingredient-meta-data';

@Component({
  selector: 'app-ingredient-edit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ingredient-edit-form.component.html',
  styleUrl: './ingredient-edit-form.component.css',
})
export class IngredientEditFormComponent {
  @Input() id!: number;
  @Output() success: EventEmitter<void> = new EventEmitter();
  metaData: IngredientMetaData | null = null;
  ingredientForm = new FormGroup({
    id: new FormControl(),
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

    this.ingredientService.getIngredientById(this.id).subscribe({
      next: (ingredient) => {
        console.debug('ingredient fetched: ', ingredient);
        this.ingredientForm.setValue({
          id: ingredient.id,
          name: ingredient.name,
          brand: ingredient.brand,
          unit: ingredient.unit,
          kcal: ingredient.kcal,
          makros: {
            carbs: ingredient.carbs,
            protein: ingredient.protein,
            fat: ingredient.fat,
          },
        });
      },
      error: (error) => {
        console.error('failed to fetch ingredient: ', error);
      },
    });
  }

  onSubmit(data: any): void {
    console.debug('submitting edit ingredient form: ', data);
    const ingredient: Ingredient = {
      id: data.id,
      name: data.name,
      brand: data.brand,
      unit: data.unit,
      kcal: data.kcal,
      carbs: data.makros.carbs,
      protein: data.makros.protein,
      fat: data.makros.fat,
    };
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
