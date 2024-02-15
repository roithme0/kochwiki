import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-amount-field',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './amount-field.component.html',
  styleUrl: './amount-field.component.css'
})
export class AmountFieldComponent {
}
