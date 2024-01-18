import { Component, Inject, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { RecipeService } from '../../recipes/shared/services/recipe.service';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-recipe-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './delete-recipe-dialog.component.html',
  styleUrl: './delete-recipe-dialog.component.css',
})
export class DeleteRecipeDialogComponent {
  @Output() success: EventEmitter<void> = new EventEmitter();

  id!: number;

  dialogRef: MatDialogRef<DeleteRecipeDialogComponent> = inject(MatDialogRef);
  recipeService: RecipeService = inject(RecipeService);
  router: Router = inject(Router);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.id = data.id;
  }

  deleteRecipe(): void {
    this.recipeService.deleteRecipe(this.id).subscribe({
      next: (id) => {
        console.debug('recipe deleted: ', id);
        this.success.emit();
        this.dialogRef.close();
        this.router.navigate(['recipes']);
      },
      error: (error) => {
        console.error('failed to delete recipe: ', error);
      },
    });
  }
}
