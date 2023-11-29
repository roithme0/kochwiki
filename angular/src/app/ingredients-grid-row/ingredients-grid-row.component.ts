import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ingredient } from '../interfaces/ingredient';

@Component({
  selector: 'app-ingredients-grid-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ingredients-grid-row.component.html',
  styleUrl: './ingredients-grid-row.component.css',
})
export class IngredientsGridRowComponent {
  @Input() ingredient!: Ingredient;
}
