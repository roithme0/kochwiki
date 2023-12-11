import { Component, Inject, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../services/recipe/recipe.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-recipe-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-recipe-dialog.component.html',
  styleUrl: './delete-recipe-dialog.component.css',
})
export class DeleteRecipeDialogComponent {
  @Output() success: EventEmitter<void> = new EventEmitter();
  id!: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteRecipeDialogComponent>,
    private recipeService: RecipeService,
    private router: Router
  ) {
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
