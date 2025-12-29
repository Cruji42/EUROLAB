import { Component } from '@angular/core';
import { Hero1Component } from "./components/hero1/hero1.component";
import { About1Component } from "./components/about1/about1.component";
import { Service1Component } from "./components/service1/service1.component";
import { Portfolio1Component } from "./components/portfolio1/portfolio1.component";
import { VideoAreaComponent } from "./components/video-area/video-area.component";
import { Working1Component } from "./components/working1/working1.component";
import { Testimonial1Component } from "./components/testimonial1/testimonial1.component";
import { Contact1Component } from "./components/contact1/contact1.component";
import { Blog1Component } from "./components/blog1/blog1.component";

@Component({
  selector: 'app-home1',
  imports: [Hero1Component, About1Component, Service1Component, Portfolio1Component, VideoAreaComponent, Working1Component, Testimonial1Component, Contact1Component, Blog1Component],
  templateUrl: './home1.component.html',
  styles: ``
})
export class Home1Component {

}
