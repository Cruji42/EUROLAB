import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "../../../components/breadcrumb/breadcrumb.component";
import { SingleServiceSidebarComponent } from "./component/single-service-sidebar/single-service-sidebar.component";
import { MoreServiceSingleComponent } from "./component/more-service-single/more-service-single.component";
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServicesService } from '../../../services/services.service';
import { ServiceDetail } from '../../../models/service.model';

@Component({
  selector: 'app-service-single',
  imports: [BreadcrumbComponent, SingleServiceSidebarComponent, MoreServiceSingleComponent, CommonModule],
  templateUrl: './service-single.component.html',
  styles: ``
})
export class ServiceSingleComponent implements OnInit {
  service: ServiceDetail | null = null;
  isLoading = true;
  hasError = false;

  constructor(
    private route: ActivatedRoute,
    private servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      if (slug) {
        this.loadService(slug);
      } else {
        // No slug provided, just show the default content
        this.isLoading = false;
      }
    });
  }

  loadService(slug: string): void {
    this.servicesService.getServiceBySlug(slug).subscribe({
      next: (data: ServiceDetail) => {
        this.service = data;
        this.isLoading = false;
      },
      error: (err: Error) => {
        console.error('Error fetching service:', err);
        this.hasError = true;
        this.isLoading = false;
      },
    });
  }
}
