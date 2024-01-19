import { TestBed } from '@angular/core/testing';

import { IngredientsGridService } from './ingredients-grid.service';

describe('IngredientsGridService', () => {
  let service: IngredientsGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientsGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
