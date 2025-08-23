import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketCreateItem } from './market-create-item';

describe('MarketCreateItem', () => {
  let component: MarketCreateItem;
  let fixture: ComponentFixture<MarketCreateItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketCreateItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketCreateItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
