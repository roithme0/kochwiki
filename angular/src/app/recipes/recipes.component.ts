import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderService } from '../services/page-header/page-header.service';

import { RecipesGridComponent } from '../recipes-grid/recipes-grid.component';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, RecipesGridComponent],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent {
  // set header values
  // render the recipes-grid component
  constructor(private pageHeaderService: PageHeaderService) {}

  ngOnInit() {
    // set header values
    this.pageHeaderService.setHeadline('Rezepte');
    this.pageHeaderService.setBack('');
  }
}
