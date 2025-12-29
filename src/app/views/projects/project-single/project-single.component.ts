import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../../components/breadcrumb/breadcrumb.component";
import { ProjectSingleSidebarComponent } from "./components/project-single-sidebar/project-single-sidebar.component";
import { ProjectSingleMoreComponent } from "./components/project-single-more/project-single-more.component";

@Component({
  selector: 'app-project-single',
  imports: [BreadcrumbComponent, ProjectSingleSidebarComponent, ProjectSingleMoreComponent],
  templateUrl: './project-single.component.html',
  styles: ``
})
export class ProjectSingleComponent {

}
