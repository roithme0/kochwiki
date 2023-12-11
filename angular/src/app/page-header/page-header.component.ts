import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { PageHeaderService } from '../services/page-header/page-header.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
  ],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css',
})
export class PageHeaderComponent {
  headline!: string;
  back!: string;

  constructor(private pageHeaderService: PageHeaderService) {}

  ngOnInit() {
    this.pageHeaderService.headline$.subscribe((headline) => {
      this.headline = headline;
    });
    this.pageHeaderService.back$.subscribe((back) => {
      this.back = back;
    });
  }
}
