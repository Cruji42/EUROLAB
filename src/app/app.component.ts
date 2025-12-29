import { AfterViewInit, Component, ElementRef, HostListener, inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import * as AOS from 'aos';
import { TitleService } from '../../title.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'cargon-ng';
  isLoading = false;
  showButton = true;
  private titleService = inject(TitleService);

  @ViewChild('preloader') preloader!: ElementRef;
  @ViewChild('ctnPreloader') ctnPreloader!: ElementRef;

  constructor(private router: Router) {
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
    this.titleService.init()

    AOS.init();
  }

  ngAfterViewInit() {
    AOS.refresh();
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