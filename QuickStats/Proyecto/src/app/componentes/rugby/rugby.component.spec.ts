import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RugbyComponent } from './rugby.component';

describe('RugbyComponent', () => {
  let component: RugbyComponent;
  let fixture: ComponentFixture<RugbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RugbyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RugbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
