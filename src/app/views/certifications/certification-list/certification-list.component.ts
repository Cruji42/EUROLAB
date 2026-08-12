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
  styles: [`
  .row {
    display: flex;
    flex-wrap: wrap;
  }
 
  .row > [class*="col-"] {
    display: flex;
  }
 
  .ca-team-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }
 
  .ca-team-img {
    position: relative;
    flex-shrink: 0;
  }
 
  .ca-blog-box-content {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
 
  .ca-blog-box-content p {
    flex: 1;
  }
 
  /* Fix: el tipo de certificación debe quedar sobre la imagen, no sobre el meta de abajo */
  .ca-blog-date-3 {
    position: absolute;
    top: 16px;
    right: 16px;
    bottom: auto;
    z-index: 2;
  }
 
  .ca-b-meta {
    position: relative;
    z-index: 1;
  }
`]
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
