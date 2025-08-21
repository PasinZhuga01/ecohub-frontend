import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonInput } from './button-input';

describe('ButtonInput', () => {
  let component: ButtonInput;
  let fixture: ComponentFixture<ButtonInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
