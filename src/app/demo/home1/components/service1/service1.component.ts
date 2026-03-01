import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-service1',
  imports: [RouterLink],
  templateUrl: './service1.component.html',
  styles: ``,
})
export class Service1Component {
  activeIndex: number | null = null;
  
  services = [
    {
      image: 'assets/img/service/ca-expand-gallery3.1.png',
      title: 'Análisis Bromatológicos',
      icon: 'assets/img/icon/ca-expand-ic3.1.svg',
      description: 'Determinación de humedad, proteína, grasa, fibra, cenizas y más. Resultados el mismo día por tecnología NIRS o química húmeda.',
    },
    {
      image: 'assets/img/service/ca-expand-gallery3.2.png',
      title: 'Análisis Microbiológicos',
      icon: 'assets/img/icon/ca-expand-ic3.1.svg',
      description: 'Detección de E. coli, Salmonella, Listeria, Coliformes y más. Laboratorio de Bioseguridad Tipo 2 acreditado ante EMA y Cofepris.',
    },
    {
      image: 'assets/img/service/ca-expand-gallery3.3.png',
      title: 'Metales Pesados',
      icon: 'assets/img/icon/ca-expand-ic3.1.svg',
      description: 'Análisis de Arsénico, Cadmio, Plomo y Mercurio para garantizar la inocuidad de tus productos alimenticios.',
    },
    {
      image: 'assets/img/service/ca-expand-gallery3.1.png',
      title: 'Análisis de Minerales',
      icon: 'assets/img/icon/ca-expand-ic3.1.svg',
      description: 'Calcio, Cobre, Cromo, Fósforo, Hierro, Magnesio, Manganeso, Potasio, Sodio y Zinc. Todo en un solo laboratorio.',
    },
    {
      image: 'assets/img/service/ca-expand-gallery3.2.png',
      title: 'Tecnología NIRSLAB',
      icon: 'assets/img/icon/ca-expand-ic3.1.svg',
      description: 'Análisis no destructivo por espectroscopía infrarroja. Resultados multiparamétricos el mismo día para materias primas y productos terminados.',
    },
    {
      image: 'assets/img/service/ca-expand-gallery3.3.png',
      title: 'Vida de Anaquel',
      icon: 'assets/img/icon/ca-expand-ic3.1.svg',
      description: 'Estudios de estabilidad acelerada a 40°C / 70% HR bajo NOM-073-SSA1. Conoce con precisión la vida útil de tus productos.',
    },
    {
      image: 'assets/img/service/ca-expand-gallery3.1.png',
      title: 'Monitoreo Ambiental',
      icon: 'assets/img/icon/ca-expand-ic3.1.svg',
      description: 'Muestreo en 4 zonas de riesgo en tu planta: equipos de producción, herramientas, áreas de proceso y zonas periféricas.',
    },
    {
      image: 'assets/img/service/ca-expand-gallery3.3.png',
      title: 'Asesorías y Capacitación',
      icon: 'assets/img/icon/ca-expand-ic3.1.svg',
      description: 'ISO/IEC 17025:2017, Buenas Prácticas de Laboratorio, Validación de métodos de análisis e Inocuidad alimentaria.',
    },
  ];
}
