import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { moreProjects, ProjectItem } from '../../../data';

@Component({
  selector: 'app-project-left-more',
  imports: [FormsModule],
  templateUrl: './project-left-more.component.html',
  styles: ``
})
export class ProjectLeftMoreComponent {
  projects: ProjectItem[] = moreProjects;
}
