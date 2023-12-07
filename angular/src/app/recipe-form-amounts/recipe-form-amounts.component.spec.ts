import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeFormAmountsComponent } from './recipe-form-amounts.component';

describe('RecipeFormAmountsComponent', () => {
  let component: RecipeFormAmountsComponent;
  let fixture: ComponentFixture<RecipeFormAmountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeFormAmountsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeFormAmountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
