import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityNameInput } from './entity-name-input';

describe('EntityNameInput', () => {
  let component: EntityNameInput;
  let fixture: ComponentFixture<EntityNameInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityNameInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntityNameInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
