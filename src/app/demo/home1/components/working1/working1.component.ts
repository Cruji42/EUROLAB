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
    { icon: 'assets/img/icon/ca-work-1.1.svg', title: 'Análisis Bromatológico', link: 'service', description: '<li>Determina la composición nutricional de alimentos y materias primas tras evaluar: humedad, proteína, grasa, fibra y cenizas.</li><li> Detecta variaciones entre lotes antes de que impacten tu proceso o generen pérdidas económicas.</li>' },
    { icon: 'assets/img/icon/ca-work-1.2.svg', title: 'Micotoxinas y Digestibilidad de Proteína', link: 'service', description: '<li>Detectamos aflatoxinas, zearalenona, ocratoxina y más — incluso sin signos visibles.</li><li> Conoce qué porcentaje de proteína realmente aprovecha el animal y optimiza la eficiencia de tus ingredientes.</li>' },
    { icon: 'assets/img/icon/ca-work1.3.svg', title: 'Microbiología · Laboratorio Tipo 2', link: 'service', description: '<li>Somos el único laboratorio de alimentos de la región con instalaciones Tipo 2. </li><li>Detectamos Salmonella y Listeria monocytogenes por PCR en horas y validamos la efectividad real de tus sanitizantes.</li>' },
    // { icon: 'assets/img/icon/ca-work1.4.svg', title: 'Esterilidad Comercial', link: 'service', description: '<li>Resultados en segundos, sin preparación de muestra.</li><li> Nuestra plataforma digital te permite consultar históricos, visualizar tendencias y dar seguimiento a múltiples muestras desde cualquier dispositivo.</li>' },
    { icon: 'assets/img/icon/ca-work1.4.svg', title: 'Indicadores Microbiológicos', link: 'service', description: '<li>Nuestro "Semáforo Microbiológico" evalúa factores de riesgo en tu producción: Mesófilos Aerobios, Levaduras, Coliformes Totales y Mohos.</li><li>Detecta a tiempo fallas de higiene y previene riesgos de crecimiento bacteriano antes de que impacten tu producto terminado.</li>' }
  ];
}

