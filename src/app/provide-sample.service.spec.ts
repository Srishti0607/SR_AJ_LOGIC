import { TestBed } from '@angular/core/testing';

import { ProvideSampleService } from './provide-sample.service';

describe('ProvideSampleService', () => {
  let service: ProvideSampleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvideSampleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
