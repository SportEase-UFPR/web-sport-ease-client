import { TestBed } from '@angular/core/testing';

import { MinhasReservasService } from './minhas-reservas.service';

describe('MinhasReservasService', () => {
  let service: MinhasReservasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinhasReservasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
