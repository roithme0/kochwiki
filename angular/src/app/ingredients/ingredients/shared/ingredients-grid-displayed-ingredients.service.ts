import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  signal,
  inject,
} from '@angular/core';

import { Ingredient } from '../../shared/interfaces/ingredient';

import { IngredientService } from '../../shared/services/ingredient.service';
import { IngredientsGridControlsService } from './ingredients-grid-controls.service';

@Injectable({
  providedIn: 'root',
})
export class IngredientsGridDisplayedIngredientsService {
  ingredientService: IngredientService = inject(IngredientService);
  ingredientsGridControlsService: IngredientsGridControlsService = inject(
    IngredientsGridControlsService
  );

  ingredients: WritableSignal<Ingredient[]> = signal([]);
  displayedIngredients: Signal<Ingredient[]> = computed(() => {
    // apply search & filter functions to ingredients
    var displayedIngredients = this.ingredients();
    displayedIngredients =
      this.searchIngredientsByNameOrBrand(displayedIngredients);
    displayedIngredients = this.filterIngredientsByUnit(displayedIngredients);
    return displayedIngredients;
  });

  constructor() {
    // track changes to ingredients
    this.ingredientService.ingredients$.subscribe(() => {
      this.fetchIngredients();
    });
    this.fetchIngredients();
  }

  fetchIngredients(): void {
    // fetch all ingredients
    this.ingredientService.getAllIngredients().subscribe({
      next: (ingredients) => {
        console.log('()()()()' + ingredients + '()()()()');
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
}
