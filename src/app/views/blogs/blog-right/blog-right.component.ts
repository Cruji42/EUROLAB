import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../../components/breadcrumb/breadcrumb.component";
import { BlogRightSidebarComponent } from "./components/blog-right-sidebar/blog-right-sidebar.component";
import { BlogRightMOreComponent } from "./components/blog-right-more/blog-right-more.component";

@Component({
  selector: 'app-blog-right',
  imports: [BreadcrumbComponent, BlogRightSidebarComponent, BlogRightMOreComponent],
  templateUrl: './blog-right.component.html',
  styles: ``
})
export class BlogRightComponent {

}
