import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketRename } from './market-rename';

describe('MarketRename', () => {
  let component: MarketRename;
  let fixture: ComponentFixture<MarketRename>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketRename]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketRename);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
