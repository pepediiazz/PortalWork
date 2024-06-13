import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandballPredictionCarouselComponent } from './handball-prediction-carousel.component';

describe('HandballPredictionCarouselComponent', () => {
  let component: HandballPredictionCarouselComponent;
  let fixture: ComponentFixture<HandballPredictionCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandballPredictionCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HandballPredictionCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
