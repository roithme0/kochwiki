import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Step } from '../interfaces/step';

@Component({
  selector: 'app-steps-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './steps-grid.component.html',
  styleUrl: './steps-grid.component.css',
})
export class StepsGridComponent {
  @Input() steps!: Step[];
}
