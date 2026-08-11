import { Component } from '@angular/core';
import { blog } from '../../../data';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-blog-single-more',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './blog-single-more.component.html',
  styles: ``
})
export class BlogSingleMOreComponent {
  blogPosts = blog
}
