import { TestBed } from '@angular/core/testing';

import { ReservarService } from './reservar.service';

describe('ReservarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReservarService = TestBed.get(ReservarService);
    expect(service).toBeTruthy();
  });
});
