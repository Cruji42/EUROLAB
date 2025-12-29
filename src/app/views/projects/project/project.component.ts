import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../../components/breadcrumb/breadcrumb.component";
import { portfolioItems } from '../data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project',
  imports: [BreadcrumbComponent, CommonModule],
  templateUrl: './project.component.html',
  styles: ``,
})
export class ProjectComponent {
  group = portfolioItems;

  portfolioGroups: any[] = [];

  constructor() {
    this.groupPortfolioItems();
  }

  groupPortfolioItems() {
    let index = 0;
    let columnCount = 0;

    while (index < this.group.length) {
      if (columnCount < 3 && this.group[index + 1]) {
        // First 3 columns have 2 items each
        this.portfolioGroups.push([this.group[index], this.group[index + 1]]);
        index += 2;
      } else {
        // The fourth column has only 1 item
        this.portfolioGroups.push([this.group[index]]);
        index += 1;
      }
      columnCount++;
      if (columnCount === 6) columnCount = 0; // Reset for the next row
    }
  }
}
