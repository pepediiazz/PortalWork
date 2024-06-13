import { TestBed } from '@angular/core/testing';

import { RugbyService } from './rugby.service';

describe('RugbyService', () => {
  let service: RugbyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RugbyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
