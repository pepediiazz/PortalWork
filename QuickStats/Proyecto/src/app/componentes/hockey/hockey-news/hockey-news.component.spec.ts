import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HockeyNewsComponent } from './hockey-news.component';

describe('HockeyNewsComponent', () => {
  let component: HockeyNewsComponent;
  let fixture: ComponentFixture<HockeyNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HockeyNewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HockeyNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
