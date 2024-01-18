import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Recipe } from '../recipes/shared/interfaces/recipe';

@Component({
  selector: 'app-steps-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './steps-grid.component.html',
  styleUrl: './steps-grid.component.css',
})
export class StepsGridComponent {
  // render steps as grid
  @Input() recipe!: Recipe;
}
