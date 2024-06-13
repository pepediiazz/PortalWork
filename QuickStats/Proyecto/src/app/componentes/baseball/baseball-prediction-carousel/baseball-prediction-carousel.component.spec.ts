import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseballPredictionCarouselComponent } from './baseball-prediction-carousel.component';

describe('BaseballPredictionCarouselComponent', () => {
  let component: BaseballPredictionCarouselComponent;
  let fixture: ComponentFixture<BaseballPredictionCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseballPredictionCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseballPredictionCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
