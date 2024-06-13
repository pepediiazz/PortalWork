import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RugbyCarouselComponent } from './rugby-carousel.component';

describe('RugbyCarouselComponent', () => {
  let component: RugbyCarouselComponent;
  let fixture: ComponentFixture<RugbyCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RugbyCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RugbyCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
