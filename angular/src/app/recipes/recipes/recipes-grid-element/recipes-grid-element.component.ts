import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Recipe } from '../../shared/interfaces/recipe';

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-recipes-grid-element',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './recipes-grid-element.component.html',
  styleUrl: './recipes-grid-element.component.css',
})
export class RecipesGridElementComponent {
  @Input() recipe!: Recipe | undefined; // type 'undefined' to allow for optional chaining in template
}
