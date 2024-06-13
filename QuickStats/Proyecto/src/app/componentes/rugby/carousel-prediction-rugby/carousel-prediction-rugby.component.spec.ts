import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselPredictionRugbyComponent } from './rugby-prediction-carousel.component';

describe('CarouselPredictionRugbyComponent', () => {
  let component: CarouselPredictionRugbyComponent;
  let fixture: ComponentFixture<CarouselPredictionRugbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselPredictionRugbyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarouselPredictionRugbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
