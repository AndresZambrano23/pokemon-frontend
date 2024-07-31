import { TestBed } from '@angular/core/testing';

import { PersistedBaseService } from './persisted-base.service';

describe('PersistedBaseService', () => {
  let service: PersistedBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersistedBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
