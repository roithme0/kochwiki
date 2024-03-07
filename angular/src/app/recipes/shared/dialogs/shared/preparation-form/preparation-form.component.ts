import { Component, Input, inject } from '@angular/core';
import {
  FormArray,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-preparation-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatStepperModule,
    MatIconModule,
    PreparationFormComponent,
  ],
  templateUrl: './preparation-form.component.html',
  styleUrl: './preparation-form.component.css'
})
export class PreparationFormComponent {

  @Input() recipeForm!: FormGroup;

  fb: FormBuilder = inject(FormBuilder);

  get steps(): FormArray {
    return this.recipeForm.get('preparationFormGroup.steps') as FormArray;
  }

  addStep(): void {
    this.steps.push(
      this.fb.group({
        index: [<number | null>0, Validators.required],
        // index: [<number | null>null, Validators.required],
        description: ['', Validators.required],
      })
    );
  }

  removeStep(index: number): void {
    this.steps.removeAt(index);
  }
}
