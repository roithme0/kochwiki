import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientsGridControlsService } from '../services/ingredients-grid-controls/ingredients-grid-controls.service';

@Component({
  selector: 'app-ingredients-grid-controls',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ingredients-grid-controls.component.html',
  styleUrl: './ingredients-grid-controls.component.css',
})
export class IngredientsGridControlsComponent {
  searchBy: string = '';
  filterBy: string = 'all';
  ingredientsGridControlsService: IngredientsGridControlsService = inject(
    IngredientsGridControlsService
  );

  constructor() {}

  ngOnInit(): void {
    this.ingredientsGridControlsService.setSearchBy(this.searchBy);
    this.ingredientsGridControlsService.setFilterBy(this.filterBy);
  }

  updateSearchBy(event: any) {
    this.searchBy = event.target.value;
    this.ingredientsGridControlsService.setSearchBy(this.searchBy);
  }

  updateFilterBy(event: any) {
    this.filterBy = event.target.value;
    this.ingredientsGridControlsService.setFilterBy(this.filterBy);
  }
}
