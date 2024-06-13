import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigasPopularesComponent } from './ligas-populares.component';

describe('LigasPopularesComponent', () => {
  let component: LigasPopularesComponent;
  let fixture: ComponentFixture<LigasPopularesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LigasPopularesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LigasPopularesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
