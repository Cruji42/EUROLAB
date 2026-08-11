import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-about-team',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './about-team.component.html',
  styles: ``
})
export class AboutTeamComponent {
  teamData = {
    "title": "views.aboutTeam.title",
    "subtitle": "views.aboutTeam.subtitle",
    "description": "views.aboutTeam.description",
    "team_members": [
      {
        "name": "MICP. Lucía Robles Garay",
        "role": "views.aboutTeam.roles.labManager",
        "image": "assets/img/team/ca-team-iner1.1.png",
        "social_links": {
          "email": "lrobles@gponutec.com",
          "phone": "#"
        }
      },
      {
        "name": "QFB. Mónica Arreguín",
        "role": "views.aboutTeam.roles.deputyLabManager",
        "image": "assets/img/team/ca-team-iner1.2.png",
        "social_links": {
          "email": "marreguin@gponutec.com",
          "phone": "#"
        }
      },
      {
        "name": "IBQ. Alejandra Ibarra Díaz",
        "role": "views.aboutTeam.roles.commercialLab",
        "image": "assets/img/team/ca-team-iner1.3.png",
        "social_links": {
          "email": "aibarra@gponutec.com",
          "phone": "4422742397"
        }
      },
      {
        "name": "QFI. Marisol Vertiz Alcantara",
        "role": "views.aboutTeam.roles.commercialLab",
        "image": "assets/img/team/ca-team-iner1.4.png",
        "social_links": {
          "email": "mvertiz@gponutec.com",
          "phone": "4421280968"
        }
      }
    ]
  }

}
