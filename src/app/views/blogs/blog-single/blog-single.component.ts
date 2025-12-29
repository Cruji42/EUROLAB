import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../../components/breadcrumb/breadcrumb.component";
import { BlogSingleSidebarComponent } from "./components/blog-single-sidebar/blog-single-sidebar.component";
import { BlogSingleMOreComponent } from "./components/blog-single-more/blog-single-more.component";

@Component({
  selector: 'app-blog-single',
  imports: [BreadcrumbComponent, BlogSingleSidebarComponent, BlogSingleMOreComponent],
  templateUrl: './blog-single.component.html',
  styles: ``
})
export class BlogSingleComponent {

}
