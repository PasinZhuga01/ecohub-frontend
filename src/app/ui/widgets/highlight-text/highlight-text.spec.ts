import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightText } from './highlight-text';

describe('HighlightText', () => {
  let component: HighlightText;
  let fixture: ComponentFixture<HighlightText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighlightText]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighlightText);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
