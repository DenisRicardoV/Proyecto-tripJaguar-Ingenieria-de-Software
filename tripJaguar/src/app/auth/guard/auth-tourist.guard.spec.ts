import { TestBed, async, inject } from '@angular/core/testing';

import { AuthTouristGuard } from './auth-tourist.guard';

describe('AuthTouristGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthTouristGuard]
    });
  });

  it('should ...', inject([AuthTouristGuard], (guard: AuthTouristGuard) => {
    expect(guard).toBeTruthy();
  }));
});
