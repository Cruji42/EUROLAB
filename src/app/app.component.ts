import { AfterViewInit, Component, ElementRef, HostListener, inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import * as AOS from 'aos';
import { TranslateService } from '@ngx-translate/core';
import { TitleService } from '../../title.service';
import { ChatbotComponent } from './components/chatbot/chatbot.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ChatbotComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'laboratorio-euronutec';
  isLoading = false;
  showButton = true;
  private titleService = inject(TitleService);
  private translate = inject(TranslateService);

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
    this.initLanguage();
    this.titleService.init()

    AOS.init();
  }

  private initLanguage(): void {
    this.translate.addLangs(['es', 'en']);
    const saved = localStorage.getItem('lang');
    this.translate.use(saved === 'en' ? 'en' : 'es');
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