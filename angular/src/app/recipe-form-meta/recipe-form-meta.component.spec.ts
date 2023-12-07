import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeFormMetaComponent } from './recipe-form-meta.component';

describe('RecipeFormMetaComponent', () => {
  let component: RecipeFormMetaComponent;
  let fixture: ComponentFixture<RecipeFormMetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeFormMetaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeFormMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
