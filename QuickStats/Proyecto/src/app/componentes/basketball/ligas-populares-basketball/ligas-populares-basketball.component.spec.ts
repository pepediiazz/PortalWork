import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigasPopularesBasketballComponent } from './ligas-populares-basketball.component';

describe('LigasPopularesBasketballComponent', () => {
  let component: LigasPopularesBasketballComponent;
  let fixture: ComponentFixture<LigasPopularesBasketballComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LigasPopularesBasketballComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LigasPopularesBasketballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
