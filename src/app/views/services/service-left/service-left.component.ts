import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../../components/breadcrumb/breadcrumb.component";
import { LeftServiceSidebarComponent } from "./components/left-service-sidebar/left-service-sidebar.component";
import { MoreServiceLeftComponent } from "./components/more-service-left/more-service-left.component";

@Component({
  selector: 'app-service-left',
  imports: [BreadcrumbComponent, LeftServiceSidebarComponent, MoreServiceLeftComponent],
  templateUrl: './service-left.component.html',
  styles: ``
})
export class ServiceLeftComponent {

}
