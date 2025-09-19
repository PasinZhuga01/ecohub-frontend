import { TestBed } from '@angular/core/testing';

import { ObjectValidationService } from './object-validation-service';

describe('ObjectValidationService', () => {
  let service: ObjectValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
