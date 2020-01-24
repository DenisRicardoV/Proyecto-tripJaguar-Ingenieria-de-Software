import { TestBed, async, inject } from '@angular/core/testing';

import { AuthAgencyGuard } from './auth-agency.guard';

describe('AuthAgencyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthAgencyGuard]
    });
  });

  it('should ...', inject([AuthAgencyGuard], (guard: AuthAgencyGuard) => {
    expect(guard).toBeTruthy();
  }));
});
