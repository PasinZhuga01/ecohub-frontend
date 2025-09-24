import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyShift } from './currency-shift';

describe('CurrencyShift', () => {
  let component: CurrencyShift;
  let fixture: ComponentFixture<CurrencyShift>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyShift]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyShift);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
