import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngredientService } from '../services/ingredient/ingredient.service';
import { VerboseNames } from '../interfaces/ingredient-meta-data';

@Component({
  selector: 'app-ingredients-grid-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ingredients-grid-header.component.html',
  styleUrl: './ingredients-grid-header.component.css',
})
export class IngredientsGridHeaderComponent {
  // fetch ingredient verbose names
  // render ingredient verbose names
  @Input() displayedFields!: string[];
  verboseNames: VerboseNames | null = null;

  constructor(private ingredientService: IngredientService) {}

  ngOnInit(): void {
    this.fetchVerboseNames();
  }

  fetchVerboseNames(): void {
    this.ingredientService.fetchVerboseNames().subscribe({
      next: (verboseNames) => {
        console.debug('fetched ingredient verbose names: ', verboseNames);
        this.verboseNames = verboseNames;
      },
      error: (error) => {
        console.error('failed to fetch ingredient verbose names: ', error);
      },
    });
  }
}
