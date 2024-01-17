import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IngredientEditFormComponent } from '../../forms/ingredient-edit-form/ingredient-edit-form.component';

import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-ingredient-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IngredientEditFormComponent],
  templateUrl: './edit-ingredient-dialog.component.html',
  styleUrl: './edit-ingredient-dialog.component.css',
})
export class EditIngredientDialogComponent {
  dialogRef: MatDialogRef<EditIngredientDialogComponent> = inject(MatDialogRef);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
