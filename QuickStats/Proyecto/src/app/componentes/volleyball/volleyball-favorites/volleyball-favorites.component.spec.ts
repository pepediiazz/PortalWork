import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolleyballFavoritesComponent } from './volleyball-favorites.component';

describe('VolleyballFavoritesComponent', () => {
  let component: VolleyballFavoritesComponent;
  let fixture: ComponentFixture<VolleyballFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolleyballFavoritesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VolleyballFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
