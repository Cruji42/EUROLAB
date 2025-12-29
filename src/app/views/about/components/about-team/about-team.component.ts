import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-team',
  imports: [RouterLink],
  templateUrl: './about-team.component.html',
  styles: ``
})
export class AboutTeamComponent {
  teamData={
    "title": "The People Behind Our Success",
    "subtitle": "Our Team",
    "description": "Each member brings a wealth of knowledge and expertise, ensuring that we deliver top-notch transport and logistics solutions to our clients.",
    "team_members": [
      {
        "name": "Alex Fargusion",
        "role": "Specialist",
        "image": "assets/img/team/ca-team-iner1.1.png",
        "social_links": {
          "twitter": "#",
          "linkedin": "#",
          "instagram": "#",
          "facebook": "#"
        }
      },
      {
        "name": "Richad Stones",
        "role": "CEO & Founder",
        "image": "assets/img/team/ca-team-iner1.2.png",
        "social_links": {
          "twitter": "#",
          "linkedin": "#",
          "instagram": "#",
          "facebook": "#"
        }
      },
      {
        "name": "Pep Gurdiola",
        "role": "Manager",
        "image": "assets/img/team/ca-team-iner1.3.png",
        "social_links": {
          "twitter": "#",
          "linkedin": "#",
          "instagram": "#",
          "facebook": "#"
        }
      },
      {
        "name": "Alex Fargusion",
        "role": "Coordinator",
        "image": "assets/img/team/ca-team-iner1.4.png",
        "social_links": {
          "twitter": "#",
          "linkedin": "#",
          "instagram": "#",
          "facebook": "#"
        }
      }
    ]
  }
  
}
