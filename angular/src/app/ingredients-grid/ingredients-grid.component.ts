import { Component, Input } from '@angular/core';
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
  @Input() ingredients!: Ingredient[];
}
