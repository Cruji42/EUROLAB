import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Working1Component } from './working1.component';

describe('Working1Component', () => {
  let component: Working1Component;
  let fixture: ComponentFixture<Working1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Working1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Working1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
