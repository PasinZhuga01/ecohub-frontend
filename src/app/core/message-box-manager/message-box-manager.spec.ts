import { TestBed } from '@angular/core/testing';

import { MessageBoxManager } from './message-box-manager';

describe('MessageBoxManager', () => {
  let service: MessageBoxManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageBoxManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
