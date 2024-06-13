import { TestBed } from '@angular/core/testing';

import { FootballFeatureService } from './football-feature.service';

describe('FootballFeatureService', () => {
  let service: FootballFeatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FootballFeatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
