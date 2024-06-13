/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RegistrarService } from './Register.service';

describe('Service: Register', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistrarService]
    });
  });

  it('should ...', inject([RegistrarService], (service: RegistrarService) => {
    expect(service).toBeTruthy();
  }));
});
