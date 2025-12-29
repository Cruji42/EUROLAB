import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../../components/breadcrumb/breadcrumb.component";
import { pricingPlans } from './data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pricing-plan',
  imports: [BreadcrumbComponent,CommonModule],
  templateUrl: './pricing-plan.component.html',
  styles: ``
})
export class PricingPlanComponent {
  pricingPlan = pricingPlans
}
