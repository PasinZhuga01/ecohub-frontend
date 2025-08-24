import { TestBed } from '@angular/core/testing';

import { ProjectEditService } from './project-edit.service';

describe('ProjectEditService', () => {
  let service: ProjectEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
