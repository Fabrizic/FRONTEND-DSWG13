/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ObservacionService } from './Observacion.service';

describe('Service: Observacion', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObservacionService]
    });
  });

  it('should ...', inject([ObservacionService], (service: ObservacionService) => {
    expect(service).toBeTruthy();
  }));
});
