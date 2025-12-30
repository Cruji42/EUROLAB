
export interface MenuItem {
    title: string;
    link: string;
    icon?: string;
    subMenu?: MenuItem[];
    isOpen?:boolean
  }
  
export const menu: MenuItem[] = [
    {
      title: 'Home',
      link: '/index',
      // icon: 'fa-solid fa-angle-down',
      // subMenu: [
      //   { title: 'Inicio', link: '/index' }
      //   { title: 'Home 02', link: '/index-02' },
      //   { title: 'Home 03', link: '/index-' },
      //   { title: 'Home 04', link: '/index-04' }
      // ],
      // isOpen:false
    },
    { title: 'Nosotros', link: '/index' },
    {
      title: 'Servicios',
      link: '/service',
      // icon: 'fa-solid fa-angle-down',
      // subMenu: [
      //   { title: 'Service', link: '/service' },
      //   { title: 'Service Left', link: '/service-left' },
      //   { title: 'Service Right', link: '/service-right' },
      //   { title: 'Service Single', link: '/service-single' }
      // ],
      // isOpen:false
    },
    // {
    //   title: 'Pages',
    //   link: '#',
    //   icon: 'fa-solid fa-angle-down',
    //   subMenu: [
    //     { title: 'Team', link: '/team' },
    //     { title: 'Testimonial', link: '/testimonial' },
    //     { title: 'Faq', link: '/faq' },
    //     { title: 'Pricing Plan', link: '/pricing' },
    //     { title: 'Contact', link: '/contact' },
    //     { title: '404', link: '/404' }
    //   ]
    // },
    {
      title: 'Noticias',
      link: '/',
      // icon: 'fa-solid fa-angle-down',
      // subMenu: [
      //   { title: 'Blog', link: '/blog' },
      //   { title: 'Blog Left', link: '/blog-left' },
      //   { title: 'Blog Right', link: '/blog-right' },
      //   { title: 'Blog Single', link: '/blog-single' },
        
      // ],
      // isOpen:false
    },{
      title:'Contacto',
      link:'/'
    }
    // ,
    // {
    //   title: 'Projects',
    //   link: '#',
    //   icon: 'fa-solid fa-angle-down',
    //   subMenu: [
    //     { title: 'Project', link: '/projects' },
    //     { title: 'Project Left', link: '/project-left' },
    //     { title: 'Project Right', link: '/project-right' },
    //     { title: 'Project Single', link: '/project-single' }
    //   ],
    //   isOpen:false
    // }
  ];
