import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { IngredientCreateFormComponent } from '../../forms/ingredient-create-form/ingredient-create-form.component';

@Component({
  selector: 'app-create-ingredient-dialog',
  standalone: true,
  imports: [CommonModule, IngredientCreateFormComponent],
  templateUrl: './create-ingredient-dialog.component.html',
  styleUrls: ['./create-ingredient-dialog.component.css', '../dialog.css'],
})
export class CreateIngredientDialogComponent {
  constructor(public dialog: MatDialogRef<CreateIngredientDialogComponent>) {}
}
