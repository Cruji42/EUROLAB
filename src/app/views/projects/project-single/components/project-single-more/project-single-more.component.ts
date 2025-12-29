import { Component } from '@angular/core';
import { moreProjects, ProjectItem } from '../../../data';

@Component({
  selector: 'app-project-single-more',
  imports: [],
  templateUrl: './project-single-more.component.html',
  styles: ``
})
export class ProjectSingleMoreComponent {
  projects: ProjectItem[] = moreProjects;

}
