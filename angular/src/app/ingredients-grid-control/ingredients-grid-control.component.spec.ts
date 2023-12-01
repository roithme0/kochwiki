import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsGridControlComponent } from './ingredients-grid-control.component';

describe('IngredientsGridControlComponent', () => {
  let component: IngredientsGridControlComponent;
  let fixture: ComponentFixture<IngredientsGridControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientsGridControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngredientsGridControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
