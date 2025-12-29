import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingPlan4Component } from './pricing-plan4.component';

describe('PricingPlan4Component', () => {
  let component: PricingPlan4Component;
  let fixture: ComponentFixture<PricingPlan4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingPlan4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricingPlan4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
