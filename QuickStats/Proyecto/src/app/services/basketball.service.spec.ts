import { TestBed } from '@angular/core/testing';

import { BasketballService } from './basketball.service';

describe('BasketballService', () => {
  let service: BasketballService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasketballService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
