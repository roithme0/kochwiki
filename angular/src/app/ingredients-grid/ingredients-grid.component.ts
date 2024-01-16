import {
  Component,
  Signal,
  WritableSignal,
  computed,
  signal,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ingredient } from '../interfaces/ingredient';

import { IngredientService } from '../services/ingredient/ingredient.service';
import { IngredientsGridControlsService } from '../services/ingredients-grid-controls/ingredients-grid-controls.service';

import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { IngredientsGridControlsComponent } from '../ingredients-grid-controls/ingredients-grid-controls.component';
import { IngredientsGridHeaderComponent } from '../ingredients-grid-header/ingredients-grid-header.component';
import { IngredientsGridRowComponent } from '../ingredients-grid-row/ingredients-grid-row.component';

import { CreateIngredientDialogComponent } from '../dialogs/create-ingredient-dialog/create-ingredient-dialog.component';

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
  // render ingredients-grid-controls component
  // render ingredients as grid
  ingredients: WritableSignal<Ingredient[]> = signal([]);
  displayedIngredients: Signal<Ingredient[]> = computed(() => {
    // apply search and filter functions to ingredients
    var displayedIngredients = this.ingredients();
    displayedIngredients =
      this.searchIngredientsByNameOrBrand(displayedIngredients);
    displayedIngredients = this.filterIngredientsByUnit(displayedIngredients);
    return displayedIngredients;
  });

  searchBy: WritableSignal<string> = signal('');
  filterBy: WritableSignal<string> = signal('all');

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
    // track changes to searchBy
    // track changes to filterBy
    this.ingredientService.ingredients$.subscribe(() => {
      this.fetchIngredients();
    });
    this.ingredientsGridControlsService.searchBy$.subscribe((searchBy) => {
      this.searchBy.set(searchBy);
    });
    this.ingredientsGridControlsService.filterBy$.subscribe((filterBy) => {
      this.filterBy.set(filterBy);
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

  windowEventListener = (): void => {
    this.windowInnerWidth.set(window.innerWidth);
  };

  searchIngredientsByNameOrBrand(ingredients: Ingredient[]): Ingredient[] {
    console.debug('searching ingredients by: ' + this.searchBy());
    if (this.searchBy() === '') {
      return ingredients;
    }
    return ingredients.filter((ingredient) => {
      return (
        ingredient.name.toLowerCase().includes(this.searchBy().toLowerCase()) ||
        ingredient.brand?.toLowerCase().includes(this.searchBy().toLowerCase())
      );
    });
  }

  filterIngredientsByUnit(ingredients: Ingredient[]): Ingredient[] {
    console.debug('filtering ingredients by: ' + this.filterBy());
    if (this.filterBy() === 'all') {
      return ingredients;
    }
    return ingredients.filter((ingredient) => {
      return ingredient.unit === this.filterBy();
    });
  }

  openCreateIngredientDialog(): void {
    // open dialog to create new ingredient
    this.dialog.open(CreateIngredientDialogComponent);
  }
}
