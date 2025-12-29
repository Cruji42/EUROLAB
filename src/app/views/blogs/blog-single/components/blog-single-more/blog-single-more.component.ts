import { Component } from '@angular/core';
import { blog } from '../../../data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-single-more',
  imports: [CommonModule],
  templateUrl: './blog-single-more.component.html',
  styles: ``
})
export class BlogSingleMOreComponent {
  blogPosts = blog
}
