import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientsGridComponent } from '../ingredients-grid/ingredients-grid.component';
import { PageHeaderService } from '../services/page-header/page-header.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ingredients',
  standalone: true,
  imports: [CommonModule, IngredientsGridComponent],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.css',
})
export class IngredientsComponent {
  dialog: MatDialog = inject(MatDialog);
  pageHeaderService: PageHeaderService = inject(PageHeaderService);

  ngOnInit() {
    this.pageHeaderService.setHeadline('Zutaten');
    this.pageHeaderService.setBack('');
  }
}
