import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

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
  imports: [RouterLink,FormsModule,CommonModule,ReactiveFormsModule,TranslatePipe],
  templateUrl: './footer.component.html',
  styles: ``
})
export class FooterComponent {
  email: string = '';

  socialLinks = [
    { icon: 'fa-brands fa-instagram', url: 'https://www.instagram.com/lab_euronutec' },
    { icon: 'fa-brands fa-facebook-f', url: 'https://www.facebook.com/LaboratorioEuronutec' },
    { icon: 'fa-brands fa-linkedin-in', url: 'https://mx.linkedin.com/in/laboratorio-euronutec-b4ba9621b' }
  ];

  footerSections = [
    {
      title: 'footer.sections.title',
      widgetClass: 'widget-2',
      links: [
        { text: 'nav.home', url: '/' },
        { text: 'nav.about', url: '/about' },
        { text: 'nav.services', url: '/service' },
        { text: 'nav.news', url: '/blog' },
        { text: 'nav.contact', url: '/contact' }
      ]
    },
    // {
    //   title: 'Other Links',
    //   widgetClass: 'widget-3',
    //   links: [
    //     { text: 'Maintenance', url: '#' },
    //     { text: 'Our Team', url: '#' },
    //     { text: 'Reviews & Awards', url: '#' },
    //     { text: 'Personal', url: '#' },
    //     { text: 'Certifications', url: '#' }
    //   ]
    // }
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
