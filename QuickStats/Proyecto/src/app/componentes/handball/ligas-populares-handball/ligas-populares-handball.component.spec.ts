import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigasPopularesHandballComponent } from './ligas-populares-handball.component';

describe('LigasPopularesHandballComponent', () => {
  let component: LigasPopularesHandballComponent;
  let fixture: ComponentFixture<LigasPopularesHandballComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LigasPopularesHandballComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LigasPopularesHandballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
