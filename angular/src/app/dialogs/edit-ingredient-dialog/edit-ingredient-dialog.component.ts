import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IngredientEditFormComponent } from '../../forms/ingredient-edit-form/ingredient-edit-form.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IngredientService } from '../../services/ingredient/ingredient.service';

@Component({
  selector: 'app-edit-ingredient-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IngredientEditFormComponent],
  templateUrl: './edit-ingredient-dialog.component.html',
  styleUrl: './edit-ingredient-dialog.component.css',
})
export class EditIngredientDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialogRef<EditIngredientDialogComponent>
  ) {}
}
