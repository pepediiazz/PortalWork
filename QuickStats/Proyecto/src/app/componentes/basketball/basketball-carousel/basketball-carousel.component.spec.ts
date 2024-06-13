import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketballCarouselComponent } from './basketball-carousel.component';

describe('BasketballCarouselComponent', () => {
  let component: BasketballCarouselComponent;
  let fixture: ComponentFixture<BasketballCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasketballCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasketballCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
