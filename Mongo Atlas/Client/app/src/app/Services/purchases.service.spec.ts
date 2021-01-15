import { TestBed } from '@angular/core/testing';

import { PurchasesService } from './purchases.service';

describe('PurchasesService', () => {
  let service: PurchasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
