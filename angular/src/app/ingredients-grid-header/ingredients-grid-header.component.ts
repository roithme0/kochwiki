import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientService } from '../services/ingredient/ingredient.service';
import { IngredientMetaData } from '../interfaces/ingredient-meta-data';

@Component({
  selector: 'app-ingredients-grid-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ingredients-grid-header.component.html',
  styleUrl: './ingredients-grid-header.component.css',
})
export class IngredientsGridHeaderComponent {
  metaData: IngredientMetaData | null = null;
  @Input() fieldsToDisplay!: string[];

  constructor(private ingredientService: IngredientService) {}

  ngOnInit(): void {
    this.fetchMetaData();
  }

  fetchMetaData(): void {
    this.ingredientService.fetchMetaData().subscribe({
      next: (data) => {
        console.debug('fetched ingredient meta data: ', data);
        this.metaData = data;
      },
      error: (error) => {
        console.error('failed to fetch ingredient meta data: ', error);
      },
    });
  }
}
