import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseballFavoritesComponent } from './baseball-favorites.component';

describe('BaseballFavoritesComponent', () => {
  let component: BaseballFavoritesComponent;
  let fixture: ComponentFixture<BaseballFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseballFavoritesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseballFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
