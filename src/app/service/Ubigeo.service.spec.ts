/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UbigeoService } from './Ubigeo.service';

describe('Service: Ubigeo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UbigeoService]
    });
  });

  it('should ...', inject([UbigeoService], (service: UbigeoService) => {
    expect(service).toBeTruthy();
  }));
});
