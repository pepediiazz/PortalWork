import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigasPopularesRugbyComponent } from './ligas-populares-rugby.component';

describe('LigasPopularesRugbyComponent', () => {
  let component: LigasPopularesRugbyComponent;
  let fixture: ComponentFixture<LigasPopularesRugbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LigasPopularesRugbyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LigasPopularesRugbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
