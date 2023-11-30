import { TestBed } from '@angular/core/testing';

import { PageFooterService } from './page-footer.service';

describe('PageFooterService', () => {
  let service: PageFooterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageFooterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
