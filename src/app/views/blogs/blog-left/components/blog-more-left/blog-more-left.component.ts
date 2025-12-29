import { Component } from '@angular/core';
import { blog } from '../../../data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-more-left',
  imports: [CommonModule],
  templateUrl: './blog-more-left.component.html',
  styles: ``
})
export class BlogMoreLEftComponent {
  blogPosts = blog
}
