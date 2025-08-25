import { TestBed } from '@angular/core/testing';

import { MarketEditService } from './market-edit.service';

describe('MarketEditService', () => {
  let service: MarketEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
