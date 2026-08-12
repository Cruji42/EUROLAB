import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-about-team',
  imports: [RouterLink, TranslatePipe, CommonModule],
  templateUrl: './about-team.component.html',
  styles: [`
  .ca-team-iner .row {
    display: flex;
    flex-wrap: wrap;
  }

  .ca-team-iner .row > [class*="col-"] {
    display: flex;
  }

  .ca-team-inner {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .ca-team-iner-img {
    position: relative;
    width: 100%;
    padding-top: 100%;
    overflow: hidden;
  }

  .ca-team-iner-img img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
  }

  .ca-iner-content-team {
    flex-shrink: 0;
  }

  .ca-team-iner-content {
    height: 190px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .ca-team-iner-heading {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .ca-team-iner-heading p:last-of-type {
    margin-top: auto;
  }
`]
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
          // "phone": "#"
        }
      },
      {
        "name": "QFB. Mónica Arreguín",
        "role": "views.aboutTeam.roles.deputyLabManager",
        "image": "assets/img/team/ca-team-iner1.2.png",
        "social_links": {
          "email": "marreguin@gponutec.com",
          // "phone": "#"
        }
      },
      {
        "name": "Edmundo Hernández",
        "role": "views.aboutTeam.roles.commercialLab",
        "image": "assets/img/team/no-profile.png",
        "social_links": {
          "email": "ehernandez@gponutec.com",
          "phone": "4421280968"
        }
      },
      {
        "name": "Ing. Alejandra Ibarra Díaz",
        "role": "views.aboutTeam.roles.commercialLab",
        "image": "assets/img/team/no-profile.png",
        "social_links": {
          "email": "aibarra@gponutec.com",
          "phone": "4422742397"
        }
      }
    ]
  }

}
