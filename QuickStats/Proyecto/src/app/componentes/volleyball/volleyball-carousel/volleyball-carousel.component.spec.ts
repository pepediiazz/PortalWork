import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolleyballCarouselComponent } from './volleyball-carousel.component';

describe('VolleyballCarouselComponent', () => {
  let component: VolleyballCarouselComponent;
  let fixture: ComponentFixture<VolleyballCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolleyballCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VolleyballCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
