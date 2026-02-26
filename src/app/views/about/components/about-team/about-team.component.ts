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
    "title": "El equipo detrás de cada resultado confiable",
    "subtitle": "Nuestro Equipo",
    "description": "Contamos con profesionales capacitados en análisis de laboratorio, comprometidos con la excelencia técnica y el cumplimiento de estándares de calidad. Cada integrante contribuye a garantizar precisión, trazabilidad y responsabilidad en cada proceso analítico.",
    "team_members": [
      {
        "name": "Alex Fargusion",
        "role": "Responsable Técnico",
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
        "role": "Analista de Laboratorio",
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
        "role": "Coordinador de Calidad",
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
        "role": "Especialista en Microbiología",
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
