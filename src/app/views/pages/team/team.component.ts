import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../../components/breadcrumb/breadcrumb.component";

@Component({
  selector: 'app-team',
  imports: [BreadcrumbComponent],
  templateUrl: './team.component.html',
  styles: ``
})
export class TeamComponent {
  teamMembers = [
    {
      "name": "Alex Fargusion",
      "position": "Manager",
      "image": "assets/img/team/ca-team-inner1.11.png",
      "socialLinks": {
        "twitter": "#",
        "linkedin": "#",
        "instagram": "#",
        "facebook": "#"
      }
    },
    {
      "name": "Richad Stones",
      "position": "Coordinator",
      "image": "assets/img/team/ca-team-iner1.4.png",
      "socialLinks": {
        "twitter": "#",
        "linkedin": "#",
        "instagram": "#",
        "facebook": "#"
      }
    },
    {
      "name": "Pep Gurdiola",
      "position": "Specialist",
      "image": "assets/img/team/ca-team-iner1.3.png",
      "socialLinks": {
        "twitter": "#",
        "linkedin": "#",
        "instagram": "#",
        "facebook": "#"
      }
    },
    {
      "name": "Alex Fargusion",
      "position": "CEO & Founder",
      "image": "assets/img/team/ca-team-1.3.png",
      "socialLinks": {
        "twitter": "#",
        "linkedin": "#",
        "instagram": "#",
        "facebook": "#"
      }
    },
    {
      "name": "Jyle Richardson",
      "position": "Coordinator",
      "image": "assets/img/team/ca-team-iner1.1.png",
      "socialLinks": {
        "twitter": "#",
        "linkedin": "#",
        "instagram": "#",
        "facebook": "#"
      }
    },
    {
      "name": "Kyle Richardson",
      "position": "Courier",
      "image": "assets/img/team/ca-team-iner1.6.png",
      "socialLinks": {
        "twitter": "#",
        "linkedin": "#",
        "instagram": "#",
        "facebook": "#"
      }
    },
    {
      "name": "Kyle Jamension",
      "position": "Specialist",
      "image": "assets/img/team/ca-team-iner1.7.png",
      "socialLinks": {
        "twitter": "#",
        "linkedin": "#",
        "instagram": "#",
        "facebook": "#"
      }
    },
    {
      "name": "Phill Foden",
      "position": "Manager",
      "image": "assets/img/team/ca-team-iner1.8.png",
      "socialLinks": {
        "twitter": "#",
        "linkedin": "#",
        "instagram": "#",
        "facebook": "#"
      }
    }
  ]
}
