import { TestBed } from '@angular/core/testing';

import { CatsListService } from './cats-list.service';

describe('CatsListService', () => {
  let service: CatsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
