import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-meta-form',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatStepperModule],
  templateUrl: './meta-form.component.html',
  styleUrl: './meta-form.component.css'
})
export class MetaFormComponent {

}
