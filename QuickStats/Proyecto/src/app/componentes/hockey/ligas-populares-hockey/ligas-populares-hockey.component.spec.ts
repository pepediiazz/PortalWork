import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigasPopularesHockeyComponent } from './ligas-populares-hockey.component';

describe('LigasPopularesHockeyComponent', () => {
  let component: LigasPopularesHockeyComponent;
  let fixture: ComponentFixture<LigasPopularesHockeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LigasPopularesHockeyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LigasPopularesHockeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
