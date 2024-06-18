/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RealizarTestService } from './RealizarTest.service';

describe('Service: RealizarTest', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RealizarTestService]
    });
  });

  it('should ...', inject([RealizarTestService], (service: RealizarTestService) => {
    expect(service).toBeTruthy();
  }));
});
