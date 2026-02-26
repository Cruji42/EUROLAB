import { Component } from '@angular/core';

@Component({
  selector: 'app-working1',
  imports: [],
  templateUrl: './working1.component.html',
  styles: ``
})
export class Working1Component {
  workingProcess = [
    { icon: 'assets/img/icon/ca-work-1.1.svg', title: 'Resultados confiables', link: 'service-single.html', description: 'Aplicamos controles internos y metodologías verificadas para asegurar precisión.' },
    { icon: 'assets/img/icon/ca-work-1.2.svg', title: 'Equipo moderno (NIRS, UPLC, etc.).', link: 'service-single.html', description: 'Contamos con tecnología analítica especializada para diferentes matrices.' },
    { icon: 'assets/img/icon/ca-work1.3.svg', title: 'Confiable (Acreditaciones y aprobaciones EMA, SAGARPA, Cofepris, Ring test europeo).', link: 'service-single.html', description: 'Métodos alineados a estándares y regulaciones aplicables.' },
    { icon: 'assets/img/icon/ca-work1.4.svg', title: 'Alta velocidad de respuesta y sistema de consulta de resultados “On Line” las 24 horas del día.', link: 'service-single.html', description: 'Tiempos de entrega definidos para facilitar la operación del cliente.' }
  ];
}
