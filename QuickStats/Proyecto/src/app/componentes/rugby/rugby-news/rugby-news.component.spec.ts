import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RugbyNewsComponent } from './rugby-news.component';

describe('RugbyNewsComponent', () => {
  let component: RugbyNewsComponent;
  let fixture: ComponentFixture<RugbyNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RugbyNewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RugbyNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
