import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyCreate } from './currency-create';

describe('CurrencyCreate', () => {
  let component: CurrencyCreate;
  let fixture: ComponentFixture<CurrencyCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
