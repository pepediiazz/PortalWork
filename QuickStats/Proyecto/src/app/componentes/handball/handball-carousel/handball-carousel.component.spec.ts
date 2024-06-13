import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandballCarouselComponent } from './handball-carousel.component';

describe('HandballCarouselComponent', () => {
  let component: HandballCarouselComponent;
  let fixture: ComponentFixture<HandballCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandballCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HandballCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
