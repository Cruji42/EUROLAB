import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-working1',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './working1.component.html',
  styles: `.ca-work-ic-box {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.ca-work-ic-box-content ul {
    flex: 1;
}`
})
export class Working1Component {
  workingProcess = [
    { icon: 'assets/img/icon/ca-work-1.1.svg', title: 'home.working1.items.bromatological.title', link: 'service', description: 'home.working1.items.bromatological.description' },
    { icon: 'assets/img/icon/ca-work-1.2.svg', title: 'home.working1.items.mycotoxins.title', link: 'service', description: 'home.working1.items.mycotoxins.description' },
    { icon: 'assets/img/icon/ca-work1.3.svg', title: 'home.working1.items.microbiology.title', link: 'service', description: 'home.working1.items.microbiology.description' },
    // { icon: 'assets/img/icon/ca-work1.4.svg', title: 'Esterilidad Comercial', link: 'service', description: '<li>Resultados en segundos, sin preparación de muestra.</li><li> Nuestra plataforma digital te permite consultar históricos, visualizar tendencias y dar seguimiento a múltiples muestras desde cualquier dispositivo.</li>' },
    { icon: 'assets/img/icon/ca-work1.4.svg', title: 'home.working1.items.indicators.title', link: 'service', description: 'home.working1.items.indicators.description' }
  ];
}

