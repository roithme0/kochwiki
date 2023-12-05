import { Component, Input, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Amount } from '../interfaces/amount';
import { Ingredient } from '../interfaces/ingredient';
import { IngredientService } from '../services/ingredient/ingredient.service';

@Component({
  selector: 'app-amounts-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './amounts-grid.component.html',
  styleUrl: './amounts-grid.component.css',
})
export class AmountsGridComponent {
  @Input() amounts!: Amount[];
  // ingredients: Signal<(Ingredient | null)[]> = computed(() =>
  //   this.fetchIngredients()
  // );

  constructor(private ingredientService: IngredientService) {}
}
