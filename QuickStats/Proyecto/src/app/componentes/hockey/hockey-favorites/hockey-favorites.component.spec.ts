import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HockeyFavoritesComponent } from './hockey-favorites.component';

describe('HockeyFavoritesComponent', () => {
  let component: HockeyFavoritesComponent;
  let fixture: ComponentFixture<HockeyFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HockeyFavoritesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HockeyFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
