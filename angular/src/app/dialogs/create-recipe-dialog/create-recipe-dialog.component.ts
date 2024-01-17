import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeCreateFormComponent } from '../../forms/recipe-create-form/recipe-create-form.component';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-recipe-dialog',
  standalone: true,
  imports: [CommonModule, RecipeCreateFormComponent],
  templateUrl: './create-recipe-dialog.component.html',
  styleUrl: './create-recipe-dialog.component.css',
})
export class CreateRecipeDialogComponent {
  dialogRef: MatDialogRef<CreateRecipeDialogComponent> = inject(MatDialogRef);
}
