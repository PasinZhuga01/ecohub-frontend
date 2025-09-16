import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyConvert } from './currency-convert';

describe('CurrencyConvert', () => {
  let component: CurrencyConvert;
  let fixture: ComponentFixture<CurrencyConvert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyConvert]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyConvert);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
