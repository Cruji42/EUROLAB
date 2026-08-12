import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ServicesService } from '../../../../services/services.service';

/** Fallback background images cycled by index when the API does not provide one */
const FALLBACK_IMAGES = [
  'assets/img/service/ca-expand-gallery3.1.png',
  'assets/img/service/ca-expand-gallery3.2.png',
  'assets/img/service/ca-expand-gallery3.3.png',
];

const DEFAULT_ICON = 'assets/img/icon/ca-expand-ic3.1.svg';

interface ServiceDisplay {
  image: string;
  title: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-service1',
  imports: [RouterLink, CommonModule, TranslatePipe],
  templateUrl: './service1.component.html',
  styles: ``,
})
export class Service1Component implements OnInit {
  activeIndex: number | null = null;
  services: ServiceDisplay[] = [];
  isLoading = true;
  hasError = false;

  constructor(private servicesService: ServicesService) {}

  ngOnInit(): void {
    this.servicesService.getServices().subscribe({
      next: (data) => {
        this.services = data.map((svc, index) => ({
          image: svc.card_icon_url ?? FALLBACK_IMAGES[index % FALLBACK_IMAGES.length],
          title: svc.name,
          icon: svc.card_icon_url ?? DEFAULT_ICON,
          description: svc.card_hover_text ?? '',
        }));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching services:', err);
        this.hasError = true;
        this.isLoading = false;
      },
    });
  }
}
