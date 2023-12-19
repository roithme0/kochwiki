import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngredientsGridComponent } from '../ingredients-grid/ingredients-grid.component';

import { PageHeaderService } from '../services/page-header/page-header.service';

@Component({
  selector: 'app-ingredients',
  standalone: true,
  imports: [CommonModule, IngredientsGridComponent],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.css',
})
export class IngredientsComponent {
  // set header values
  // render ingredients-grid component
  constructor(private pageHeaderService: PageHeaderService) {}

  ngOnInit() {
    // set header values
    this.pageHeaderService.setHeadline('Zutaten');
    this.pageHeaderService.setBack('');
  }
}
