import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseballCarouselComponent } from './baseball-carousel.component';

describe('BaseballCarouselComponent', () => {
  let component: BaseballCarouselComponent;
  let fixture: ComponentFixture<BaseballCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseballCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseballCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
