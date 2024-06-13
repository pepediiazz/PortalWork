import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandballFavoritesComponent } from './handball-favorites.component';

describe('HandballFavoritesComponent', () => {
  let component: HandballFavoritesComponent;
  let fixture: ComponentFixture<HandballFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandballFavoritesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HandballFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
