/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PreguntasService } from './Preguntas.service';

describe('Service: Preguntas', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreguntasService]
    });
  });

  it('should ...', inject([PreguntasService], (service: PreguntasService) => {
    expect(service).toBeTruthy();
  }));
});
