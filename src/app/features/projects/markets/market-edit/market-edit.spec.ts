import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketEdit } from './market-edit';

describe('MarketEdit', () => {
  let component: MarketEdit;
  let fixture: ComponentFixture<MarketEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
