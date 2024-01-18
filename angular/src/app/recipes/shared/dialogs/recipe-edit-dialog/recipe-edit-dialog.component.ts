import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeEditFormComponent } from './recipe-edit-form/recipe-edit-form.component';

import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-recipe-edit-dialog',
  standalone: true,
  imports: [CommonModule, RecipeEditFormComponent],
  templateUrl: './recipe-edit-dialog.component.html',
  styleUrl: './recipe-edit-dialog.component.css',
})
export class RecipeEditDialogComponent {
  dialogRef: MatDialogRef<RecipeEditDialogComponent> = inject(MatDialogRef);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
