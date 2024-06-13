import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchTimelineComponent } from './match-timeline.component';

describe('MatchTimelineComponent', () => {
  let component: MatchTimelineComponent;
  let fixture: ComponentFixture<MatchTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchTimelineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
