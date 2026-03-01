import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-working1',
  imports: [RouterLink],
  templateUrl: './working1.component.html',
  styles: ``
})
export class Working1Component {
  workingProcess = [
    { icon: 'assets/img/icon/ca-work-1.1.svg', title: 'Acreditado ante EMA', link: 'about', description: 'Contamos con acreditaciones A-0667-063/15 y SA-0101-004/12 de la Entidad Mexicana de Acreditación, garantizando la confiabilidad de cada resultado.' },
    { icon: 'assets/img/icon/ca-work-1.2.svg', title: 'Equipos modernos (NIR, UPLC, etc.)', link: 'services', description: 'Laboratorio equipado con tecnología de punta para análisis rápidos y de alta precisión, incluyendo NIRSLAB, VIDAS y Rancimat.' },
    { icon: 'assets/img/icon/ca-work1.3.svg', title: 'Certificado y aprobado por aplicaciones TIF', link: 'about', description: 'Aprobados por SADER como laboratorio de constatación y control interno. Atendemos establecimientos TIF con servicio de muestreo microbiológico especializado.' },
    { icon: 'assets/img/icon/ca-work1.4.svg', title: '40% más rápido con resultados en línea', link: 'contact', description: 'Con EuroLab Online puedes consultar tus resultados en tiempo real, desde cualquier dispositivo, en cualquier momento.' }
  ];
}

