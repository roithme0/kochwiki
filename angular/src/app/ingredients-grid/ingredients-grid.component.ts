import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ingredient } from '../interfaces/ingredient';
import { IngredientsGridHeaderComponent } from '../ingredients-grid-header/ingredients-grid-header.component';
import { IngredientsGridRowComponent } from '../ingredients-grid-row/ingredients-grid-row.component';

@Component({
  selector: 'app-ingredients-grid',
  standalone: true,
  imports: [
    CommonModule,
    IngredientsGridHeaderComponent,
    IngredientsGridRowComponent,
  ],
  templateUrl: './ingredients-grid.component.html',
  styleUrl: './ingredients-grid.component.css',
})
export class IngredientsGridComponent {
  ingredients: Ingredient[] = [
    {
      id: 1,
      name: 'Zutat 1',
      brand: 'Marke 1',
      unit: 'g',
      kcal: 100,
      carbs: 20,
      protein: 10,
      fat: 10,
    },
    {
      id: 2,
      name: 'Zutat 2',
      brand: 'Marke 2',
      unit: 'ml',
      kcal: 10,
      carbs: 2,
      protein: 1,
      fat: 1,
    },
    {
      id: 3,
      name: 'Zutat 3',
      brand: 'Marke 3',
      unit: 'Stk.',
      kcal: 150,
      carbs: 30,
      protein: 15,
      fat: 15,
    },
  ];
}
