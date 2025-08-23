import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityCreate } from './entity-create';

describe('EntityCreate', () => {
  let component: EntityCreate;
  let fixture: ComponentFixture<EntityCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntityCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
