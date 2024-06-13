import { TestBed } from '@angular/core/testing';

import { FavoritesBaseballService } from './favorites-baseball.service';

describe('FavoritesBaseballService', () => {
  let service: FavoritesBaseballService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesBaseballService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
