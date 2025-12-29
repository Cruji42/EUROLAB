import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../../components/breadcrumb/breadcrumb.component";
import { BlogLeftSidebarComponent } from "./components/blog-left-sidebar/blog-left-sidebar.component";
import { BlogMoreLEftComponent } from "./components/blog-more-left/blog-more-left.component";

@Component({
  selector: 'app-blog-left',
  imports: [BreadcrumbComponent, BlogLeftSidebarComponent, BlogMoreLEftComponent],
  templateUrl: './blog-left.component.html',
  styles: ``
})
export class BlogLeftComponent {

}
