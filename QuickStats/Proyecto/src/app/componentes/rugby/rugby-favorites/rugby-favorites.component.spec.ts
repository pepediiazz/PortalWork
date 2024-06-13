import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RugbyFavoritesComponent } from './rugby-favorites.component';

describe('RugbyFavoritesComponent', () => {
  let component: RugbyFavoritesComponent;
  let fixture: ComponentFixture<RugbyFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RugbyFavoritesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RugbyFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
