import { Component, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';

import { PageHeaderService } from '../services/page-header.service';

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, MatIconModule],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css',
})
export class PageHeaderComponent {
  // render page header
  pageHeaderService: PageHeaderService = inject(PageHeaderService);

  headline: Signal<string> = this.pageHeaderService.getHeadline();
  back: Signal<string> = this.pageHeaderService.getBack();
}
