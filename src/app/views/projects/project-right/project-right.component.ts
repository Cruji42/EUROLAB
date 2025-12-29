import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../../components/breadcrumb/breadcrumb.component";
import { ProjectMoreSidebarComponent } from "./components/project-more-sidebar/project-more-sidebar.component";
import { ProjectRightMoreComponent } from "./components/project-right-more/project-right-more.component";

@Component({
  selector: 'app-project-right',
  imports: [BreadcrumbComponent, ProjectMoreSidebarComponent, ProjectRightMoreComponent],
  templateUrl: './project-right.component.html',
  styles: ``
})
export class ProjectRightComponent {

}
