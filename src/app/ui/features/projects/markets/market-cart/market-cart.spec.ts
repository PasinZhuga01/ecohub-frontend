import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketCart } from './market-cart';

describe('MarketCart', () => {
  let component: MarketCart;
  let fixture: ComponentFixture<MarketCart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketCart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketCart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
