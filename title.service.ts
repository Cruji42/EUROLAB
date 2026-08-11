// title.service.ts
import { Injectable } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { filter } from 'rxjs/operators'
import { TranslateService } from '@ngx-translate/core'

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private currentTitleKey: string | null = null

  constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService
  ) {}

  init(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateTitle()
      })

    this.translate.onLangChange.subscribe(() => {
      if (this.currentTitleKey) {
        this.applyTitle(this.currentTitleKey)
      }
    })
  }

  private updateTitle(): void {
    let route = this.activatedRoute
    while (route.firstChild) {
      route = route.firstChild
    }

    const titleKey = route.snapshot.data['title']
    if (titleKey) {
      this.currentTitleKey = titleKey
      this.applyTitle(titleKey)
    }
  }

  private applyTitle(titleKey: string): void {
    this.translate.get(titleKey).subscribe((translated) => {
      this.titleService.setTitle(translated)
    })
  }
}
