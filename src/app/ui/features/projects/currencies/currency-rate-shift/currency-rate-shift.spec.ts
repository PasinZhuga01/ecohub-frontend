import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyRateShift } from './currency-rate-shift';

describe('CurrencyRateShift', () => {
  let component: CurrencyRateShift;
  let fixture: ComponentFixture<CurrencyRateShift>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyRateShift]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyRateShift);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
