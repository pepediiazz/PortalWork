import { TestBed } from '@angular/core/testing';

import { FavoritesRugbyService } from './favorites-rugby.service';

describe('FavoritesRugbyService', () => {
  let service: FavoritesRugbyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesRugbyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
