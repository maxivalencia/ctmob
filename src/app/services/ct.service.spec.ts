import { TestBed } from '@angular/core/testing';

import { CtService } from './ct.service';

describe('CtService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CtService = TestBed.get(CtService);
    expect(service).toBeTruthy();
  });
});
