import { Component, Signal, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientsGridControlsService } from '../services/ingredients-grid-controls/ingredients-grid-controls.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { IngredientService } from '../services/ingredient/ingredient.service';
import { IngredientMetaData } from '../interfaces/ingredient-meta-data';

@Component({
  selector: 'app-ingredients-grid-controls',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './ingredients-grid-controls.component.html',
  styleUrl: './ingredients-grid-controls.component.css',
})
export class IngredientsGridControlsComponent {
  metaData: IngredientMetaData | null = null;
  searchBy: string = '';
  filterBy: string = 'all';

  constructor(
    public ingredientsGridControlsService: IngredientsGridControlsService,
    private ingredientService: IngredientService
  ) {}

  ngOnInit(): void {
    this.ingredientService.fetchMetaData().subscribe({
      next: (metaData) => {
        console.debug('fetched ingredient meta data: ', metaData);
        this.metaData = metaData;
      },
      error: (error) => {
        console.error('failed to fetch ingredient meta data: ', error);
      },
    });

    this.ingredientsGridControlsService.setSearchBy(this.searchBy);
    this.ingredientsGridControlsService.setFilterBy(this.filterBy);
  }
}
