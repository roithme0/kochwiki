import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../interfaces/recipe';

@Component({
  selector: 'app-amounts-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './amounts-grid.component.html',
  styleUrl: './amounts-grid.component.css',
})
export class AmountsGridComponent {
  @Input() recipe!: Recipe;
}
