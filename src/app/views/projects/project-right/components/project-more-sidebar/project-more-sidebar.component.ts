import { Component } from '@angular/core';
import { moreProjects, ProjectItem } from '../../../data';

@Component({
  selector: 'app-project-more-sidebar',
  imports: [],
  templateUrl: './project-more-sidebar.component.html',
  styles: ``
})
export class ProjectMoreSidebarComponent {
  projects: ProjectItem[] = moreProjects;

}
