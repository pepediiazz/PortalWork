import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseballNewsComponent } from './baseball-news.component';

describe('BaseballNewsComponent', () => {
  let component: BaseballNewsComponent;
  let fixture: ComponentFixture<BaseballNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseballNewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseballNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
