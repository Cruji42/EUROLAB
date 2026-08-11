import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { BreadcrumbComponent } from "../../components/breadcrumb/breadcrumb.component";
import { AboutPageComponent } from "./components/about-page/about-page.component";
import { AboutchooseComponent } from "./components/aboutchoose/aboutchoose.component";
import { AboutValuesComponent } from "./components/about-values/about-values.component";
import { AboutTeamComponent } from "./components/about-team/about-team.component";

@Component({
  selector: 'app-about',
  imports: [BreadcrumbComponent, AboutPageComponent, AboutchooseComponent, AboutValuesComponent, AboutTeamComponent, TranslatePipe],
  templateUrl: './about.component.html',
  styles: ``
})
export class AboutComponent {

}
