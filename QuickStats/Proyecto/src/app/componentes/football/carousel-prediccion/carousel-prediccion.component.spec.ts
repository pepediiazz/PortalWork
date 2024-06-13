import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselPrediccionComponent } from './carousel-prediccion.component';

describe('CarouselPrediccionComponent', () => {
  let component: CarouselPrediccionComponent;
  let fixture: ComponentFixture<CarouselPrediccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselPrediccionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarouselPrediccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
