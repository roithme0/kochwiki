import {
  Component,
  Signal,
  WritableSignal,
  computed,
  signal,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ingredient } from '../../shared/interfaces/ingredient';

import { IngredientService } from '../../shared/services/ingredient.service';
import { IngredientsGridControlsService } from './shared/ingredients-grid-controls.service';

import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { IngredientsGridControlsComponent } from './ingredients-grid-controls/ingredients-grid-controls.component';
import { IngredientsGridHeaderComponent } from './ingredients-grid-header/ingredients-grid-header.component';
import { IngredientsGridRowComponent } from './ingredients-grid-row/ingredients-grid-row.component';

import { IngredientCreateDialogComponent } from '../../shared/dialogs/ingredient-create-dialog/ingredient-create-dialog.component';

@Component({
  selector: 'app-ingredients-grid',
  standalone: true,
  imports: [
    CommonModule,
    IngredientsGridControlsComponent,
    IngredientsGridHeaderComponent,
    IngredientsGridRowComponent,
    MatIconModule,
  ],
  templateUrl: './ingredients-grid.component.html',
  styleUrl: './ingredients-grid.component.css',
})
export class IngredientsGridComponent {
  // fetch all ingredients
  // filter ingredients by search & filter input
  // render ingredients-grid-controls component
  // render ingredients as grid
  ingredients: WritableSignal<Ingredient[]> = signal([]);
  displayedIngredients: Signal<Ingredient[]> = computed(() => {
    // apply search & filter functions to ingredients
    var displayedIngredients = this.ingredients();
    displayedIngredients =
      this.searchIngredientsByNameOrBrand(displayedIngredients);
    displayedIngredients = this.filterIngredientsByUnit(displayedIngredients);
    return displayedIngredients;
  });

  windowInnerWidth = signal(window.innerWidth);
  displayedFields: Signal<string[]> = computed(() => {
    // adjust displayed fields based on window with
    var displayedFields: string[] = ['name', 'brand'];
    if (this.windowInnerWidth() > 600) {
      displayedFields.push('kcal');
    }
    if (this.windowInnerWidth() > 700) {
      displayedFields.push('unitVerbose');
    }
    if (this.windowInnerWidth() > 1200) {
      displayedFields.push('carbs', 'protein', 'fat');
    }
    return displayedFields;
  });

  dialog: MatDialog = inject(MatDialog);
  ingredientService: IngredientService = inject(IngredientService);
  ingredientsGridControlsService: IngredientsGridControlsService = inject(
    IngredientsGridControlsService
  );

  constructor() {
    // track changes to ingredients
    this.ingredientService.ingredients$.subscribe(() => {
      this.fetchIngredients();
    });
  }

  ngOnInit(): void {
    // fetch all ingredients
    // track changes to window width
    this.fetchIngredients();
    window.addEventListener('resize', this.windowEventListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.windowEventListener);
  }

  windowEventListener = (): void => {
    this.windowInnerWidth.set(window.innerWidth);
  };

  fetchIngredients(): void {
    // fetch all ingredients
    this.ingredientService.getAllIngredients().subscribe({
      next: (ingredients) => {
        console.debug('fetched ingredients: ', ingredients);
        this.ingredients.set(ingredients);
      },
      error: (error) => {
        console.error('failed to fetch ingredients: ', error);
      },
    });
  }

  searchIngredientsByNameOrBrand(ingredients: Ingredient[]): Ingredient[] {
    const searchBy: string = this.ingredientsGridControlsService.searchBy();
    console.debug('searching ingredients by: ' + searchBy);
    if (searchBy === '') {
      return ingredients;
    }
    return ingredients.filter((ingredient) => {
      return (
        ingredient.name.toLowerCase().includes(searchBy.toLowerCase()) ||
        ingredient.brand?.toLowerCase().includes(searchBy.toLowerCase())
      );
    });
  }

  filterIngredientsByUnit(ingredients: Ingredient[]): Ingredient[] {
    const filterBy: string = this.ingredientsGridControlsService.filterBy();
    console.debug('filtering ingredients by: ' + filterBy);
    if (filterBy === 'all') {
      return ingredients;
    }
    return ingredients.filter((ingredient) => {
      return ingredient.unit === filterBy;
    });
  }

  loggi(): void {
    console.log('sorti');
  }

  openCreateIngredientDialog(): void {
    this.dialog.open(IngredientCreateDialogComponent);
  }
}
