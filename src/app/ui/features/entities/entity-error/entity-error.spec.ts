import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityError } from './entity-error';

describe('EntityError', () => {
  let component: EntityError;
  let fixture: ComponentFixture<EntityError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityError]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntityError);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
