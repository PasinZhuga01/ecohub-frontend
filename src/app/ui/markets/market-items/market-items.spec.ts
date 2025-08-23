import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketItems } from './market-items';

describe('MarketItems', () => {
  let component: MarketItems;
  let fixture: ComponentFixture<MarketItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketItems]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketItems);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
