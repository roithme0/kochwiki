import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IngredientPatchFormComponent } from './ingredient-patch-form/ingredient-patch-form.component';

import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ingredient-patch-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IngredientPatchFormComponent],
  templateUrl: './ingredient-patch-dialog.component.html',
  styleUrl: './ingredient-patch-dialog.component.css',
})
export class IngredientEditDialogComponent {
  // get ingredient id from mat dialog data
  // render ingredient-patch-form
  dialogRef: MatDialogRef<IngredientEditDialogComponent> = inject(MatDialogRef);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
