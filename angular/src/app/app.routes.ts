import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IngredientsListComponent } from './ingredients-list/ingredients-list.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  {
    path: 'ingredients',
    component: IngredientsListComponent,
    title: 'Zutaten',
  },
  { path: 'recipes', component: RecipesListComponent, title: 'Rezepte' },
  {
    path: 'recipes/:id',
    component: RecipeDetailsComponent,
    title: 'Rezept Details',
  },
];
