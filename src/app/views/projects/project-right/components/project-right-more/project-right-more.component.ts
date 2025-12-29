
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
export interface Tag {
  name: string;
  link: string;
}

export interface SocialLink {
  icon: string;
  link: string;
}

interface ServiceItem {
  title: string;
  icon: string;
}
@Component({
  selector: 'app-project-right-more',
  imports: [FormsModule],
  templateUrl: './project-right-more.component.html',
  styles: ``
})
export class ProjectRightMoreComponent {
  tags: Tag[] = [
    { name: 'Warehousing', link: '#' },
    { name: 'Domestic Transport', link: '#' },
    { name: 'Efficient Logistics', link: '#' },
    { name: 'Project Cargo', link: '#' },
    { name: 'Cold Chain', link: '#' },
    { name: 'Express Delivery', link: '#' }
  ];

  socialLinks: SocialLink[] = [
    { icon: 'fa-brands fa-instagram', link: '#' },
    { icon: 'fa-brands fa-facebook-f', link: '#' },
    { icon: 'fa-brands fa-linkedin-in', link: '#' },
    { icon: 'fa-brands fa-x-twitter', link: '#' }
  ];


 serviceItems: ServiceItem[] = [
  {
    title: 'Secure Warehousing',
    icon: 'fa-solid fa-check'
  },
  {
    title: 'Customs Brokerage',
    icon: 'fa-solid fa-check'
  },
  {
    title: 'E-commerce Fulfillment',
    icon: 'fa-solid fa-check'
  },
  {
    title: 'Heavy Lift and Project Cargo',
    icon: 'fa-solid fa-check'
  },
  {
    title: 'Rapid Express Delivery',
    icon: 'fa-solid fa-check'
  },
  {
    title: 'Inventory Optimization',
    icon: 'fa-solid fa-check'
  }
];
  searchQuery: string = '';
  contactForm = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };


  onSearch() {
    console.log('Searching for:', this.searchQuery);
  }

  onSubmitForm() {
    console.log('Form submitted:', this.contactForm);
  }
}
