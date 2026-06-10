import { Component, OnInit } from '@angular/core';
import { CounterDirective } from '../../../../directives/counter.directive';
import { SettingsService } from '../../../../services/settings.service';

@Component({
  selector: 'app-video-area',
  imports: [CounterDirective],
  templateUrl: './video-area.component.html',
  styles: ``
})
export class VideoAreaComponent implements OnInit {
  youtubeUrl = '';

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.getYoutubeUrl().subscribe({
      next: (data) => this.youtubeUrl = data.youtube_url,
    });
  }
}
