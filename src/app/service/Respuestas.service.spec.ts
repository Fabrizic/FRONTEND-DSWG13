/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RespuestasService } from './Respuestas.service';

describe('Service: Respuestas', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RespuestasService]
    });
  });

  it('should ...', inject([RespuestasService], (service: RespuestasService) => {
    expect(service).toBeTruthy();
  }));
});
