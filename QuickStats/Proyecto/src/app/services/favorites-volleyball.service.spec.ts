import { TestBed } from '@angular/core/testing';

import { FavoritesVolleyballService } from './favorites-volleyball.service';

describe('FavoritesVolleyballService', () => {
  let service: FavoritesVolleyballService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesVolleyballService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
