import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeEditFormComponent } from '../../forms/recipe-edit-form/recipe-edit-form.component';

import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-recipe-dialog',
  standalone: true,
  imports: [CommonModule, RecipeEditFormComponent],
  templateUrl: './edit-recipe-dialog.component.html',
  styleUrls: ['./edit-recipe-dialog.component.css', '../dialog.css'],
})
export class EditRecipeDialogComponent {
  dialogRef: MatDialogRef<EditRecipeDialogComponent> = inject(MatDialogRef);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
