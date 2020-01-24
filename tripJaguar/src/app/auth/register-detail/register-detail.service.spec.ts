import { TestBed } from '@angular/core/testing';

import { RegisterDetailService } from './register-detail.service';

describe('RegisterDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterDetailService = TestBed.get(RegisterDetailService);
    expect(service).toBeTruthy();
  });
});
