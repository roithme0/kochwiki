import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientsGridComponent } from '../ingredients-grid/ingredients-grid.component';

@Component({
  selector: 'app-ingredients',
  standalone: true,
  imports: [CommonModule, IngredientsGridComponent],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.css',
})
export class IngredientsComponent {}
