import { Component } from '@angular/core';
import { blog } from '../../../data';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-blog-more-left',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './blog-more-left.component.html',
  styles: ``
})
export class BlogMoreLEftComponent {
  blogPosts = blog
}
