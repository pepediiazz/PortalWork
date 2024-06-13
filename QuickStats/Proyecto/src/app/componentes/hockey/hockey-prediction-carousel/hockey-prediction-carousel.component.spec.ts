import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HockeyPredictionCarouselComponent } from './hockey-prediction-carousel.component';

describe('HockeyPredictionCarouselComponent', () => {
  let component: HockeyPredictionCarouselComponent;
  let fixture: ComponentFixture<HockeyPredictionCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HockeyPredictionCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HockeyPredictionCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
