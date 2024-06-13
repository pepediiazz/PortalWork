import { TestBed } from '@angular/core/testing';

import { FavoritesHockeyService } from './favorites-hockey.service';

describe('FavoritesHockeyService', () => {
  let service: FavoritesHockeyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesHockeyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
