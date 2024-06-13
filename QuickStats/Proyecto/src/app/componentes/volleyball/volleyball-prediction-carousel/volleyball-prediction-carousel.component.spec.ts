import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolleyballPredictionCarouselComponent } from './volleyball-prediction-carousel.component';

describe('VolleyballPredictionCarouselComponent', () => {
  let component: VolleyballPredictionCarouselComponent;
  let fixture: ComponentFixture<VolleyballPredictionCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolleyballPredictionCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VolleyballPredictionCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
