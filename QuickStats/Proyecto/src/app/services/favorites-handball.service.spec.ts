import { TestBed } from '@angular/core/testing';

import { FavoritesHandballService } from './favorites-handball.service';

describe('FavoritesHandballService', () => {
  let service: FavoritesHandballService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesHandballService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
