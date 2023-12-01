import {
  Component,
  Signal,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ingredient } from '../interfaces/ingredient';
import { IngredientService } from '../services/ingredient/ingredient.service';
import { IngredientsGridControlsComponent } from '../ingredients-grid-controls/ingredients-grid-controls.component';
import { IngredientsGridHeaderComponent } from '../ingredients-grid-header/ingredients-grid-header.component';
import { IngredientsGridRowComponent } from '../ingredients-grid-row/ingredients-grid-row.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateIngredientDialogComponent } from '../dialogs/create-ingredient-dialog/create-ingredient-dialog.component';
import { IngredientsGridControlsService } from '../services/ingredients-grid-controls/ingredients-grid-controls.service';

@Component({
  selector: 'app-ingredients-grid',
  standalone: true,
  imports: [
    CommonModule,
    IngredientsGridControlsComponent,
    IngredientsGridHeaderComponent,
    IngredientsGridRowComponent,
  ],
  templateUrl: './ingredients-grid.component.html',
  styleUrl: './ingredients-grid.component.css',
})
export class IngredientsGridComponent {
  dialog: MatDialog = inject(MatDialog);
  ingredientService: IngredientService = inject(IngredientService);
  ingredientsGridControlsService: IngredientsGridControlsService = inject(
    IngredientsGridControlsService
  );
  ingredients: WritableSignal<Ingredient[]> = signal([]);
  displayedIngredients: Signal<Ingredient[]> = computed(() =>
    this.getDisplayedIngredients()
  );
  searchBy: WritableSignal<string> = signal('');
  filterBy: WritableSignal<string> = signal('all');

  constructor() {
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
    this.fetchIngredients();
  }

  fetchIngredients(): void {
    this.ingredientService.getAllIngredients().subscribe({
      next: (ingredients) => {
        console.debug('ingredients fetched: ', ingredients);
        this.ingredients.set(ingredients);
      },
      error: (error) => {
        console.error('failed to fetch ingredients: ', error);
      },
    });
  }

  openCreateIngredientDialog(): void {
    this.dialog.open(CreateIngredientDialogComponent);
  }

  getDisplayedIngredients(): Ingredient[] {
    var displayedIngredients = this.ingredients();
    displayedIngredients = this.searchIngredientsByNameOrBrand(
      displayedIngredients,
      this.searchBy()
    );
    displayedIngredients = this.filterIngredientsByUnit(
      displayedIngredients,
      this.filterBy()
    );
    return displayedIngredients;
  }

  searchIngredientsByNameOrBrand(
    ingredients: Ingredient[],
    searchBy: string
  ): Ingredient[] {
    if (searchBy === '') {
      return ingredients;
    }
    return ingredients.filter((ingredient) => {
      return (
        ingredient.name.toLowerCase().includes(searchBy.toLowerCase()) ||
        ingredient.brand.toLowerCase().includes(searchBy.toLowerCase())
      );
    });
  }

  filterIngredientsByUnit(
    ingredients: Ingredient[],
    filterBy: string
  ): Ingredient[] {
    if (filterBy === 'all') {
      return ingredients;
    }
    return ingredients.filter((ingredient) => {
      return ingredient.unit === filterBy;
    });
  }
}
