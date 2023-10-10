import { TestBed } from '@angular/core/testing';

import { NovaReservaService } from './nova-reserva.service';

describe('NovaReservaService', () => {
  let service: NovaReservaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NovaReservaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
