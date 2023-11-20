import { TestBed } from '@angular/core/testing';

import { EspacosEsportivosService } from './espacos-esportivos.service';

describe('EspacosEsportivosService', () => {
  let service: EspacosEsportivosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspacosEsportivosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
