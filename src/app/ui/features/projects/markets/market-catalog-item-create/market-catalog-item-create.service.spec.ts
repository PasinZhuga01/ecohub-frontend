import { TestBed } from '@angular/core/testing';

import { MarketCatalogItemCreateService } from './market-catalog-item-create.service';

describe('MarketCatalogItemCreateService', () => {
  let service: MarketCatalogItemCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketCatalogItemCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
