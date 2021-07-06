import { TestBed } from '@angular/core/testing';

import { LocationListsService } from './location-lists.service';

describe('LocationListsService', () => {
  let service: LocationListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
