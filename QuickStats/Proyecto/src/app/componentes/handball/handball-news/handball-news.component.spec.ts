import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandballNewsComponent } from './handball-news.component';

describe('HandballNewsComponent', () => {
  let component: HandballNewsComponent;
  let fixture: ComponentFixture<HandballNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandballNewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HandballNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
