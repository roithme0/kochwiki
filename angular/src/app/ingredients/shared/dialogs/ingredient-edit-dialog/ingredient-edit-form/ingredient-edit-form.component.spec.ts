import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientEditFormComponent } from './ingredient-edit-form.component';

describe('IngredientEditFormComponent', () => {
  let component: IngredientEditFormComponent;
  let fixture: ComponentFixture<IngredientEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientEditFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngredientEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
