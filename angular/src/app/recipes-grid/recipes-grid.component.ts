import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesGridControlsComponent } from '../recipes-grid-controls/recipes-grid-controls.component';
import { RecipesGridElementComponent } from '../recipes-grid-element/recipes-grid-element.component';

@Component({
  selector: 'app-recipes-grid',
  standalone: true,
  imports: [
    CommonModule,
    RecipesGridControlsComponent,
    RecipesGridElementComponent,
  ],
  templateUrl: './recipes-grid.component.html',
  styleUrl: './recipes-grid.component.css',
})
export class RecipesGridComponent {}
