import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigasPopularesVolleyballComponent } from './ligas-populares-volleyball.component';

describe('LigasPopularesVolleyballComponent', () => {
  let component: LigasPopularesVolleyballComponent;
  let fixture: ComponentFixture<LigasPopularesVolleyballComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LigasPopularesVolleyballComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LigasPopularesVolleyballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
