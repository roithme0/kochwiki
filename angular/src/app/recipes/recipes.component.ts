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
  constructor(private pageHeaderService: PageHeaderService) {}

  ngOnInit() {
    this.pageHeaderService.setHeadline('Rezepte');
    this.pageHeaderService.setBack('');
  }
}
