import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPossessionComponent } from './match-possession.component';

describe('MatchPossessionComponent', () => {
  let component: MatchPossessionComponent;
  let fixture: ComponentFixture<MatchPossessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchPossessionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchPossessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
