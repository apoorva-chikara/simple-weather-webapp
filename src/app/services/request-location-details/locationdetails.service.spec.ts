import { TestBed } from '@angular/core/testing';

import { LocationdetailsService } from './locationdetails.service';

describe('LocationdetailsService', () => {
  let service: LocationdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
