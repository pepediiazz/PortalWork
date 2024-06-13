import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigasPopularesBaseballComponent } from './ligas-populares-baseball.component';

describe('LigasPopularesBaseballComponent', () => {
  let component: LigasPopularesBaseballComponent;
  let fixture: ComponentFixture<LigasPopularesBaseballComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LigasPopularesBaseballComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LigasPopularesBaseballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
