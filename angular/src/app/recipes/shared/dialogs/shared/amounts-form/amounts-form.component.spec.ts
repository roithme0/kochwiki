import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountsFormComponent } from './amounts-form.component';

describe('AmountsFormComponent', () => {
  let component: AmountsFormComponent;
  let fixture: ComponentFixture<AmountsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmountsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AmountsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
