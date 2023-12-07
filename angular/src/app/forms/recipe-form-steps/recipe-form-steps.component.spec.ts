import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeFormStepsComponent } from './recipe-form-steps.component';

describe('RecipeFormStepsComponent', () => {
  let component: RecipeFormStepsComponent;
  let fixture: ComponentFixture<RecipeFormStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeFormStepsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeFormStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
