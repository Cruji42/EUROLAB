import { Component, Input } from '@angular/core';
import { NavLinkComponent } from "../../../components/nav-link/nav-link.component";
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertComponent } from "../../../components/alert/alert.component";
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { menu, MenuItem } from './data';

@Component({
  selector: 'app-navbar',
  imports: [NavLinkComponent, CommonModule, AlertComponent, RouterLink, TranslatePipe, LanguageSwitcherComponent],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent {
  @Input() headerClass: string = ''
  @Input() containerClass: string = ''
  @Input() logo: string = ''
  @Input() navClass: string = ''
  @Input() mainNavClass: string = ''
  @Input() buttonText: string = '';
  @Input() buttonLink: string = '';
  @Input() buttonClass: string = '';
  @Input() columnClass: string = '';
  @Input() showMobileMenu: boolean = false;
  @Input() alert: boolean = false;
menuItems = menu
  isMenuOpen = false;

  socialLinks = [
    { icon: 'fa-brands fa-instagram', url: 'https://www.instagram.com/lab_euronutec' },
    { icon: 'fa-brands fa-facebook-f', url: 'https://www.facebook.com/LaboratorioEuronutec' },
    { icon: 'fa-brands fa-linkedin-in', url: 'https://mx.linkedin.com/in/laboratorio-euronutec-b4ba9621b' }
  ];

  toggleSubMenu(item: MenuItem, event?: Event): void {
    if (event) {
      event.stopPropagation();  // Prevents click from propagating to the parent <a>
    }
  
    if (item.subMenu) {
      item.isOpen = !item.isOpen;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
  
}
