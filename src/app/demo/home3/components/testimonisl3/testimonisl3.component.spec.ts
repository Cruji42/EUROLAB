import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testimonisl3Component } from './testimonisl3.component';

describe('Testimonisl3Component', () => {
  let component: Testimonisl3Component;
  let fixture: ComponentFixture<Testimonisl3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Testimonisl3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Testimonisl3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
