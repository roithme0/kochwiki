import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IngredientEditFormComponent } from './ingredient-edit-form/ingredient-edit-form.component';

import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ingredient-edit-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IngredientEditFormComponent],
  templateUrl: './ingredient-edit-dialog.component.html',
  styleUrl: './ingredient-edit-dialog.component.css',
})
export class IngredientEditDialogComponent {
  // get ingredient id from mat dialog data
  // render ingredient-edit-form
  dialogRef: MatDialogRef<IngredientEditDialogComponent> = inject(MatDialogRef);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
