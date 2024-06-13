/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TestService } from './Test.service';

describe('Service: Test', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestService]
    });
  });

  it('should ...', inject([TestService], (service: TestService) => {
    expect(service).toBeTruthy();
  }));
});
