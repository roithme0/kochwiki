import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

import { PageHeaderService } from '../shared/services/page-header.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  // set header values
  // render navigation
  pageHeaderService: PageHeaderService = inject(PageHeaderService);

  ngOnInit() {
    // set header values
    this.pageHeaderService.setHeadline('Home');
    this.pageHeaderService.setBack('');
  }
}
