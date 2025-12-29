import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Portfolio3Component } from './portfolio3.component';

describe('Portfolio3Component', () => {
  let component: Portfolio3Component;
  let fixture: ComponentFixture<Portfolio3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Portfolio3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Portfolio3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
