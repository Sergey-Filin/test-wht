import { TestBed } from '@angular/core/testing';

import { CatsApiService } from './cats-api.service';

describe('CatsApiService', () => {
  let service: CatsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
