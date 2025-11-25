import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityErrorWrapper } from './entity-error-wrapper';

describe('EntityErrorWrapper', () => {
  let component: EntityErrorWrapper;
  let fixture: ComponentFixture<EntityErrorWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityErrorWrapper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntityErrorWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
