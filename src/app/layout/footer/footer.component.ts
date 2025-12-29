import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface FooterLink {
  text: string;
  url: string;
}

export interface FooterSection {
  title?: string;
  links?: FooterLink[];
  content?: string;
}
@Component({
  selector: 'app-footer',
  imports: [RouterLink,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './footer.component.html',
  styles: ``
})
export class FooterComponent {
  email: string = '';

  socialLinks = [
    { icon: 'fa-brands fa-instagram', url: '#' },
    { icon: 'fa-brands fa-facebook-f', url: '#' },
    { icon: 'fa-brands fa-linkedin-in', url: '#' },
    { icon: 'fa-brands fa-x-twitter', url: '#' }
  ];

  footerSections = [
    {
      title: 'Quick Links',
      widgetClass: 'widget-2',
      links: [
        { text: 'Home', url: '/' },
        { text: 'Service', url: '/service' },
        { text: 'About Us', url: '/about' },
        { text: 'Latest News', url: '/blog' },
        { text: 'Contact Us', url: '/contact' }
      ]
    },
    {
      title: 'Other Links',
      widgetClass: 'widget-3',
      links: [
        { text: 'Maintenance', url: '#' },
        { text: 'Our Team', url: '#' },
        { text: 'Reviews & Awards', url: '#' },
        { text: 'Personal', url: '#' },
        { text: 'Certifications', url: '#' }
      ]
    }
  ];

  subscribe() {
    if (this.email) {
      alert(`Subscribed with ${this.email}`);
      this.email = '';
    } else {
      alert('Please enter a valid email');
    }
  }
}
