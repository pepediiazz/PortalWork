import { TestBed } from '@angular/core/testing';

import { FootbalService } from './football.service';
describe('FootbalService', () => {
  let service: FootbalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FootbalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
