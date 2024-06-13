import { TestBed } from '@angular/core/testing';

import { FavoritesBasketballService } from './favorites-basketball.service';

describe('FavoritesBasketballService', () => {
  let service: FavoritesBasketballService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesBasketballService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
