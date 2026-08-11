import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';
import { CertificationsService } from '../../../services/certifications.service';
import { CertificationCard } from '../../../models/certification.model';

@Component({
  selector: 'app-certification-list',
  imports: [CommonModule, RouterLink, DatePipe, BreadcrumbComponent, TranslatePipe],
  templateUrl: './certification-list.component.html',
  styles: ``
})
export class CertificationListComponent implements OnInit {
  certifications: CertificationCard[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private certService: CertificationsService) {}

  ngOnInit(): void {
    this.certService.getCertifications({ limit: 50 }).subscribe({
      next: (data) => {
        this.certifications = data ?? [];
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'views.certificationList.loadError';
        this.isLoading = false;
      }
    });
  }
}
