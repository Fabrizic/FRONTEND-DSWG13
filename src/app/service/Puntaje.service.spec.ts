/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PuntajeService } from './Puntaje.service';

describe('Service: Puntaje', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PuntajeService]
    });
  });

  it('should ...', inject([PuntajeService], (service: PuntajeService) => {
    expect(service).toBeTruthy();
  }));
});
