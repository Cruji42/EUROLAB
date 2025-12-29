import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../../components/breadcrumb/breadcrumb.component";
import { ProjectLeftSidebarComponent } from "./components/project-left-sidebar/project-left-sidebar.component";
import { ProjectLeftMoreComponent } from "./components/project-left-more/project-left-more.component";

@Component({
  selector: 'app-project-left',
  imports: [BreadcrumbComponent, ProjectLeftSidebarComponent, ProjectLeftMoreComponent],
  templateUrl: './project-left.component.html',
  styles: ``
})
export class ProjectLeftComponent {

}
