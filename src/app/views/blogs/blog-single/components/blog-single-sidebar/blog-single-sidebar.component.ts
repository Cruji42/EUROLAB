import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { serviceItems } from '../../../data';
import { NewsPostDetail } from '../../../../../models/news.model';
import { LocalizedDatePipe } from '../../../../../core/pipes/localized-date.pipe';

@Component({
  selector: 'app-blog-single-sidebar',
  imports: [CommonModule, TranslatePipe, LocalizedDatePipe],
  templateUrl: './blog-single-sidebar.component.html',
  styles: ``
})
export class BlogSingleSidebarComponent {
  @Input() post: NewsPostDetail | null = null;

  serviceItems = serviceItems;
}
