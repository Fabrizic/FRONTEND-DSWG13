/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ObtenerRespuestasService } from './ObtenerRespuestas.service';

describe('Service: ObtenerRespuestas', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObtenerRespuestasService]
    });
  });

  it('should ...', inject([ObtenerRespuestasService], (service: ObtenerRespuestasService) => {
    expect(service).toBeTruthy();
  }));
});
