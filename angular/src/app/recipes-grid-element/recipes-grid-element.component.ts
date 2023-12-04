import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../interfaces/recipe';

@Component({
  selector: 'app-recipes-grid-element',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipes-grid-element.component.html',
  styleUrl: './recipes-grid-element.component.css',
})
export class RecipesGridElementComponent {
  @Input() recipe!: Recipe;
}
