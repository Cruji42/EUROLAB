import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cta4Component } from './cta4.component';

describe('Cta4Component', () => {
  let component: Cta4Component;
  let fixture: ComponentFixture<Cta4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cta4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cta4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
