import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../../components/breadcrumb/breadcrumb.component";
import { SingleServiceSidebarComponent } from "./component/single-service-sidebar/single-service-sidebar.component";
import { MoreServiceSingleComponent } from "./component/more-service-single/more-service-single.component";

@Component({
  selector: 'app-service-single',
  imports: [BreadcrumbComponent, SingleServiceSidebarComponent, MoreServiceSingleComponent],
  templateUrl: './service-single.component.html',
  styles: ``
})
export class ServiceSingleComponent {

}
