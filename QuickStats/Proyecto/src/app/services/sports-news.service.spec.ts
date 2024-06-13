import { TestBed } from '@angular/core/testing';

import { SportsNewsService } from './sports-news.service';

describe('SportsNewsService', () => {
  let service: SportsNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportsNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
