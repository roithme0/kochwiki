import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientEditDialogComponent } from './ingredient-patch-dialog.component';

describe('IngredientEditDialogComponent', () => {
  let component: IngredientEditDialogComponent;
  let fixture: ComponentFixture<IngredientEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientEditDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IngredientEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
