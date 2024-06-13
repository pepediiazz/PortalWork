import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolleyballNewsComponent } from './volleyball-news.component';

describe('VolleyballNewsComponent', () => {
  let component: VolleyballNewsComponent;
  let fixture: ComponentFixture<VolleyballNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolleyballNewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VolleyballNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
