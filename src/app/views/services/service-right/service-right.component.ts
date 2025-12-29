import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../../components/breadcrumb/breadcrumb.component";
import { RightServiceSidebarComponent } from "./component/right-service-sidebar/right-service-sidebar.component";
import { MoreServiceRightComponent } from "./component/more-service-right/more-service-right.component";

@Component({
  selector: 'app-service-right',
  imports: [BreadcrumbComponent, RightServiceSidebarComponent, MoreServiceRightComponent],
  templateUrl: './service-right.component.html',
  styles: ``
})
export class ServiceRightComponent {

}
