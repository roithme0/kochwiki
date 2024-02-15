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
  // provide displayed ingredients for ingredients grid
  private ingredientService: IngredientService = inject(IngredientService);
  private ingredientsGridControlsService: IngredientsGridControlsService =
    inject(IngredientsGridControlsService);

  private ingredients: WritableSignal<Ingredient[]> = signal([]);
  private displayedIngredients: Signal<Ingredient[]> = computed(() => {
    // apply search & filter functions to ingredients
    var displayedIngredients = this.ingredients();
    displayedIngredients =
      this.searchIngredientsByNameOrBrand(displayedIngredients);
    displayedIngredients = this.filterIngredientsByUnit(displayedIngredients);
    return displayedIngredients;
  });

  private searchBy: Signal<string> =
    this.ingredientsGridControlsService.searchBy;
  private filterBy: Signal<string> =
    this.ingredientsGridControlsService.filterBy;

  private loading: WritableSignal<boolean> = signal(true);

  constructor() {
    // track changes to ingredients
    this.ingredientService.ingredients$.subscribe(() => {
      this.loading.set(true);
      this.fetchIngredients();
      this.loading.set(false);
    });

    this.loading.set(true);
    this.fetchIngredients();
    this.loading.set(false);
  }

  getDisplayedIngredients(): Signal<Ingredient[]> {
    return this.displayedIngredients;
  }

  getLoading(): Signal<boolean> {
    return this.loading;
  }

  private fetchIngredients(): void {
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

  private searchIngredientsByNameOrBrand(
    ingredients: Ingredient[]
  ): Ingredient[] {
    const searchBy: string = this.searchBy();
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

  private filterIngredientsByUnit(ingredients: Ingredient[]): Ingredient[] {
    const filterBy: string = this.filterBy();
    console.debug('filtering ingredients by: ' + filterBy);
    if (filterBy === 'all') {
      return ingredients;
    }
    return ingredients.filter((ingredient) => {
      return ingredient.unit === filterBy;
    });
  }
}
