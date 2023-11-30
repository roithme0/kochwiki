import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { PageHeaderService } from '../services/page-header/page-header.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  pageHeaderService: PageHeaderService = inject(PageHeaderService);

  constructor() {}

  ngOnInit() {
    this.pageHeaderService.setHeadline('Home');
    this.pageHeaderService.setBack('');
  }
}
