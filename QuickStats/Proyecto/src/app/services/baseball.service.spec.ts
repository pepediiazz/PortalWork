import { TestBed } from '@angular/core/testing';

import { BaseballService } from './baseball.service';

describe('BaseballService', () => {
  let service: BaseballService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseballService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
