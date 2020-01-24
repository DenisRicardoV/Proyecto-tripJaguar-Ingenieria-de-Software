import { TestBed, async, inject } from '@angular/core/testing';

import { AuthFreeGuard } from './auth-free.guard';

describe('AuthFreeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthFreeGuard]
    });
  });

  it('should ...', inject([AuthFreeGuard], (guard: AuthFreeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
