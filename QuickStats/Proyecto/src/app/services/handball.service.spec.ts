import { TestBed } from '@angular/core/testing';

import { HandballService } from './handball.service';

describe('HandballService', () => {
  let service: HandballService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandballService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
