import { TestBed } from '@angular/core/testing';

import { CurrencyCreateService } from './currency-create.service';

describe('CurrencyCreateService', () => {
  let service: CurrencyCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
