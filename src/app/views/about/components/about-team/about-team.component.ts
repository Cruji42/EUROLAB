import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-team',
  imports: [RouterLink],
  templateUrl: './about-team.component.html',
  styles: ``
})
export class AboutTeamComponent {
  teamData = {
    "title": "El equipo detrás de cada resultado confiable",
    "subtitle": "Nuestro Equipo",
    "description": "Contamos con profesionales capacitados en análisis de laboratorio, comprometidos con la excelencia técnica y el cumplimiento de estándares de calidad. Cada integrante contribuye a garantizar precisión, trazabilidad y responsabilidad en cada proceso analítico.",
    "team_members": [
      {
        "name": "MICP. Lucía Robles Garay",
        "role": "Responsable de Laboratorio",
        "image": "assets/img/team/ca-team-iner1.1.png",
        "social_links": {
          "email": "lrobles@gponutec.com",
          "phone": "#"
        }
      },
      {
        "name": "QFB. Mónica Arreguín",
        "role": "Responsable adjunto de Laboratorio",
        "image": "assets/img/team/ca-team-iner1.2.png",
        "social_links": {
          "email": "marreguin@gponutec.com",
          "phone": "#"
        }
      },
      {
        "name": "IBQ. Alejandra Ibarra Díaz",
        "role": "Comercial Laboratorio",
        "image": "assets/img/team/ca-team-iner1.3.png",
        "social_links": {
          "email": "aibarra@gponutec.com",
          "phone": "4422742397"
        }
      },
      {
        "name": "QFI. Marisol Vertiz Alcantara",
        "role": "Comercial Laboratorio",
        "image": "assets/img/team/ca-team-iner1.4.png",
        "social_links": {
          "email": "mvertiz@gponutec.com",
          "phone": "4421280968"
        }
      }
    ]
  }

}
