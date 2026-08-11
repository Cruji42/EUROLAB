import { Component } from '@angular/core';
import { blog } from '../../../data';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-blog-right-more',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './blog-right-more.component.html',
  styles: ``
})
export class BlogRightMOreComponent {
  blogPosts = blog
}
