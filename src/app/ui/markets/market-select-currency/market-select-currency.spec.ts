import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketSelectCurrency } from './market-select-currency';

describe('MarketSelectCurrency', () => {
  let component: MarketSelectCurrency;
  let fixture: ComponentFixture<MarketSelectCurrency>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketSelectCurrency]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketSelectCurrency);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
