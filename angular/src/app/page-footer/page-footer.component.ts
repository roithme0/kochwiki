import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageFooterService } from '../services/page-footer/page-footer.service';
import { FooterButton } from '../interfaces/footer-button';

@Component({
  selector: 'app-page-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-footer.component.html',
  styleUrl: './page-footer.component.css',
})
export class PageFooterComponent {
  pageFooterService: PageFooterService = inject(PageFooterService);
  buttons: FooterButton[] = [];

  constructor() {}

  ngOnInit() {
    this.pageFooterService.buttons$.subscribe((buttons) => {
      this.buttons = buttons;
    });
  }
}
