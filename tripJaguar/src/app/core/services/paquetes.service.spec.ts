import { TestBed } from '@angular/core/testing';

import { PaquetesService } from './paquetes.service';

describe('PaquetesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaquetesService = TestBed.get(PaquetesService);
    expect(service).toBeTruthy();
  });
});
