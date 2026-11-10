import { AfterViewInit, Component, ElementRef, inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import * as AOS from 'aos';
import { TranslateService } from '@ngx-translate/core';
import { SeoService } from './core/services/seo.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'laboratorio-euronutec';
  isLoading = false;
  showButton = true;
  private seo = inject(SeoService);
  private translate = inject(TranslateService);
  // Durante el prerender (build) no hay window/localStorage/DOM real
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  @ViewChild('preloader') preloader!: ElementRef;
  @ViewChild('ctnPreloader') ctnPreloader!: ElementRef;

  constructor(private router: Router) {
    if (!this.isBrowser) return;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.showPreloader();
      }
      if (event instanceof NavigationEnd) {
        this.hidePreloader();
        AOS.refresh();
      }
    });
  }

  ngOnInit() {
    this.seo.init();
    this.initLanguage();

    if (this.isBrowser) AOS.init();
  }

  private initLanguage(): void {
    this.translate.addLangs(['es', 'en']);
    const saved = this.isBrowser ? localStorage.getItem('lang') : null;
    this.translate.use(saved === 'en' ? 'en' : 'es');
  }

  ngAfterViewInit() {
    if (this.isBrowser) AOS.refresh();
  }

  showPreloader() {
    this.ctnPreloader.nativeElement.classList.remove('loaded');
    this.preloader.nativeElement.style.display = 'block';
  }

  hidePreloader() {
    this.ctnPreloader.nativeElement.classList.add('loaded');
    setTimeout(() => {
      this.preloader.nativeElement.style.display = 'none';
    }, 900);
  }
}