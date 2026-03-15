import { Component, Input } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { serviceItems } from '../../../data';
import { NewsPostDetail } from '../../../../../models/news.model';

@Component({
  selector: 'app-blog-single-sidebar',
  imports: [CommonModule, DatePipe],
  templateUrl: './blog-single-sidebar.component.html',
  styles: ``
})
export class BlogSingleSidebarComponent {
  @Input() post: NewsPostDetail | null = null;

  serviceItems = serviceItems;
}
