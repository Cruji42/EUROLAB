import { Component } from '@angular/core';
import { blog } from '../../../data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-right-more',
  imports: [CommonModule],
  templateUrl: './blog-right-more.component.html',
  styles: ``
})
export class BlogRightMOreComponent {
  blogPosts = blog
}
