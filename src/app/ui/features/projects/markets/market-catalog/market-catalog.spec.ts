import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketCatalog } from './market-catalog';

describe('MarketCatalog', () => {
  let component: MarketCatalog;
  let fixture: ComponentFixture<MarketCatalog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketCatalog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketCatalog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
