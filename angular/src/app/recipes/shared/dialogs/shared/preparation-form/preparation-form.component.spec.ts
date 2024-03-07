import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreparationFormComponent } from './preparation-form.component';

describe('PreparationFormComponent', () => {
  let component: PreparationFormComponent;
  let fixture: ComponentFixture<PreparationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreparationFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreparationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
