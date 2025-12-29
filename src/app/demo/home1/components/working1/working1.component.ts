import { Component } from '@angular/core';

@Component({
  selector: 'app-working1',
  imports: [],
  templateUrl: './working1.component.html',
  styles: ``
})
export class Working1Component {
  workingProcess = [
    { icon: 'assets/img/icon/ca-work-1.1.svg', title: 'Coordination & Execution', link: 'service-single.html', description: 'We then coordinate & manage all aspects of transportation, leveraging our global network.' },
    { icon: 'assets/img/icon/ca-work-1.2.svg', title: 'Planning and Strategy', link: 'service-single.html', description: 'Throughout the journey, our team monitors progress in real-time, providing you with updates.' },
    { icon: 'assets/img/icon/ca-work1.3.svg', title: 'Real-Time Monitoring', link: 'service-single.html', description: 'Finally, we ensure timely and secure delivery of your goods, followed by a thorough review.' },
    { icon: 'assets/img/icon/ca-work1.4.svg', title: 'Secure Transportation', link: 'service-single.html', description: 'Trust our meticulous process to streamline your supply chain and drive your business forward.' }
  ];
}
