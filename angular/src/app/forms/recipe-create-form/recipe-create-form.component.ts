import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-create-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recipe-create-form.component.html',
  styleUrl: './recipe-create-form.component.css',
})
export class RecipeCreateFormComponent {
  recipeForm = new FormGroup({
    name: new FormControl(),
    image: new FormControl(),
    origin_name: new FormControl(),
    origin_url: new FormControl(),
    original: new FormControl(),
    amounts: new FormArray([
      new FormGroup({
        index: new FormControl(),
        ingredient: new FormControl(),
        amount: new FormControl(),
      }),
    ]),
    steps: new FormArray([
      new FormGroup({
        index: new FormControl(),
        description: new FormControl(),
      }),
    ]),
  });

  onSubmit(data: any): void {
    console.debug('submitting create recipe form: ', data);
  }
}
