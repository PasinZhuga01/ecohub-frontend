import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketCatalogItemCreate } from './market-catalog-item-create';

describe('MarketCatalogItemCreate', () => {
  let component: MarketCatalogItemCreate;
  let fixture: ComponentFixture<MarketCatalogItemCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketCatalogItemCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketCatalogItemCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
