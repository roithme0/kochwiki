import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { IngredientFormComponent } from '../../forms/ingredient-form/ingredient-form.component';

@Component({
  selector: 'app-create-ingredient-dialog',
  standalone: true,
  imports: [CommonModule, IngredientFormComponent],
  templateUrl: './create-ingredient-dialog.component.html',
  styleUrl: './create-ingredient-dialog.component.css',
})
export class CreateIngredientDialogComponent {
  constructor(public dialog: MatDialogRef<CreateIngredientDialogComponent>) {}
}
