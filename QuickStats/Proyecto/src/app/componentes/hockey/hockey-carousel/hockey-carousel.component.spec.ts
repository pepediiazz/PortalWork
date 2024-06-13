import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HockeyCarouselComponent } from './hockey-carousel.component';

describe('HockeyCarouselComponent', () => {
  let component: HockeyCarouselComponent;
  let fixture: ComponentFixture<HockeyCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HockeyCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HockeyCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
