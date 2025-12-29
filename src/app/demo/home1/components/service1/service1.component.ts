import { Component } from '@angular/core';

@Component({
  selector: 'app-service1',
  imports: [],
  templateUrl: './service1.component.html',
  styles: ``,
})
export class Service1Component {
  activeIndex: number | null = null;
  
  services = [
    {
      image: 'assets/img/service/ca-expand-gallery3.1.png',
      title: 'Lorem ipsum dolor sit amet',
      icon: 'assets/img/icon/ca-expand-ic3.1.svg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at ultricies ex. Fusce purus sem, venenatis in mauris at, pulvinar dignissim massa. Duis nec tincidunt eros, at gravida urna. ',
    },
    {
      image: 'assets/img/service/ca-expand-gallery3.2.png',
      title: 'Lorem ipsum dolor sit amet',
      icon: 'assets/img/icon/ca-expand-ic3.1.svg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at ultricies ex. Fusce purus sem, venenatis in mauris at, pulvinar dignissim massa. Duis nec tincidunt eros, at gravida urna. ',
    },
    {
      image: 'assets/img/service/ca-expand-gallery3.3.png',
      title: 'Lorem ipsum dolor sit amet',
      icon: 'assets/img/icon/ca-expand-ic3.1.svg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at ultricies ex. Fusce purus sem, venenatis in mauris at, pulvinar dignissim massa. Duis nec tincidunt eros, at gravida urna. ',
    },
    {
      image: 'assets/img/service/ca-expand-gallery3.1.png',
      title: 'Lorem ipsum dolor sit amet',
      icon: 'assets/img/icon/ca-expand-ic3.1.svg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at ultricies ex. Fusce purus sem, venenatis in mauris at, pulvinar dignissim massa. Duis nec tincidunt eros, at gravida urna. ',
    },
    {
      image: 'assets/img/service/ca-expand-gallery3.2.png',
      title: 'Lorem ipsum dolor sit amet',
      icon: 'assets/img/icon/ca-expand-ic3.1.svg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at ultricies ex. Fusce purus sem, venenatis in mauris at, pulvinar dignissim massa. Duis nec tincidunt eros, at gravida urna. ',
    },
  ];
}
