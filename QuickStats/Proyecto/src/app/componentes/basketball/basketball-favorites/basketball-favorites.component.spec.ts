import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketballFavoritesComponent } from './basketball-favorites.component';

describe('BasketballFavoritesComponent', () => {
  let component: BasketballFavoritesComponent;
  let fixture: ComponentFixture<BasketballFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasketballFavoritesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasketballFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
