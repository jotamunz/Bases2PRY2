import { TestBed } from '@angular/core/testing';

import { SalesGoalsService } from './sales-goals.service';

describe('SalesGoalsService', () => {
  let service: SalesGoalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesGoalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
