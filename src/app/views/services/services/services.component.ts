import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "../../../components/breadcrumb/breadcrumb.component";
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ServicesService } from '../../../services/services.service';
import { ServiceCard } from '../../../models/service.model';

/** Fallback background images cycled by index when the API does not provide one */
const FALLBACK_IMAGES = [
  'assets/img/service/ca-expand-gallery3.1.png',
  'assets/img/service/ca-expand-gallery3.2.png',
  'assets/img/service/ca-expand-gallery3.3.png',
];

const DEFAULT_ICON = 'assets/img/icon/ca-expand-ic3.1.svg';

interface ServiceDisplay {
  id: number;
  slug: string;
  image: string;
  title: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-services',
  imports: [BreadcrumbComponent, RouterLink, CommonModule, TranslatePipe],
  templateUrl: './services.component.html',
  styles: ``
})
export class ServicesComponent implements OnInit {
  services: ServiceDisplay[] = [];
  isLoading = true;
  hasError = false;
  
  // Pagination
  currentPage = 1;
  itemsPerPage = 6;
  totalItems = 0;
  totalPages = 0;

  constructor(
    private servicesService: ServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    console
    this.servicesService.getServices().subscribe({
      next: (data) => {
        this.services = data.map((svc, index) => ({
          id: svc.id,
          slug: svc.slug,
          image: svc.card_icon_url ?? FALLBACK_IMAGES[index % FALLBACK_IMAGES.length],
          title: svc.name,
          icon: svc.card_icon_url ?? DEFAULT_ICON,
          description: svc.card_hover_text ?? '',
        }));
        this.totalItems = this.services.length;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching services:', err);
        this.hasError = true;
        this.isLoading = false;
      },
    });
  }

  get paginatedServices(): ServiceDisplay[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.services.slice(startIndex, endIndex);
  }

  get visiblePages(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  onServiceClick(service: ServiceDisplay): void {
    this.router.navigate(['/service-single', service.slug]);
  }
}
