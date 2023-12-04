import { Component, inject } from '@angular/core';
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
  pageHeaderService: PageHeaderService = inject(PageHeaderService);

  constructor() {}

  ngOnInit() {
    this.pageHeaderService.setHeadline('Rezepte');
    this.pageHeaderService.setBack('');
  }
}
