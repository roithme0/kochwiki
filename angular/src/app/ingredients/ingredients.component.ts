import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientsGridComponent } from '../ingredients-grid/ingredients-grid.component';
import { PageHeaderService } from '../services/page-header/page-header.service';
import { PageFooterService } from '../services/page-footer/page-footer.service';

@Component({
  selector: 'app-ingredients',
  standalone: true,
  imports: [CommonModule, IngredientsGridComponent],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.css',
})
export class IngredientsComponent {
  pageHeaderService: PageHeaderService = inject(PageHeaderService);
  pageFooterService: PageFooterService = inject(PageFooterService);

  constructor() {}

  ngOnInit() {
    this.pageHeaderService.setHeadline('Zutaten');
    this.pageHeaderService.setBack('');
    this.pageFooterService.setButtons([
      {
        text: 'Zutat hinzufügen',
        action: () => {},
      },
    ]);
  }
}
