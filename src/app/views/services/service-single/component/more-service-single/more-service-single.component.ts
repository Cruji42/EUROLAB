import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ServicesService } from '../../../../../services/services.service';
import { ServiceCard } from '../../../../../models/service.model';

@Component({
  selector: 'app-more-service-single',
  imports: [CommonModule, RouterLink],
  templateUrl: './more-service-single.component.html',
  styles: ``
})
export class MoreServiceSingleComponent implements OnInit, OnChanges {
  @Input() currentServiceId: number | null = null;
  
  services: ServiceCard[] = [];
  isLoading = true;

  constructor(private servicesService: ServicesService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Reload services when current service changes
    if (changes['currentServiceId'] && !changes['currentServiceId'].firstChange) {
      this.loadServices();
    }
  }

  loadServices(): void {
    this.isLoading = true;
    this.servicesService.getServices().subscribe({
      next: (data) => {
        // Filter out the current service and shuffle to get random services
        let filteredServices = data;
        
        // Filter out current service if we have one
        if (this.currentServiceId) {
          filteredServices = data.filter(s => s.id !== this.currentServiceId);
        }
        
        // Shuffle and take 3 random services
        this.services = this.shuffleArray([...filteredServices]).slice(0, 3);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching services:', err);
        this.isLoading = false;
      },
    });
  }

  private shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
