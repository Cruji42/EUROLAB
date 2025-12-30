import { Component } from '@angular/core';

@Component({
  selector: 'app-working1',
  imports: [],
  templateUrl: './working1.component.html',
  styles: ``
})
export class Working1Component {
  workingProcess = [
    { icon: 'assets/img/icon/ca-work-1.1.svg', title: 'Especializado en análisis de alimentos e ingredientes (nutrición animal).', link: 'service-single.html', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { icon: 'assets/img/icon/ca-work-1.2.svg', title: 'Equipo moderno (NIRS, UPLC, etc.).', link: 'service-single.html', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { icon: 'assets/img/icon/ca-work1.3.svg', title: 'Confiable (Acreditaciones y aprobaciones EMA, SAGARPA, Cofepris, Ring test europeo).', link: 'service-single.html', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { icon: 'assets/img/icon/ca-work1.4.svg', title: 'Alta velocidad de respuesta y sistema de consulta de resultados “On Line” las 24 horas del día.', link: 'service-single.html', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' }
  ];
}
