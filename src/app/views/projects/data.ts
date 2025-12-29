export interface PortfolioItem {
    id: number;
    size: 'sm' | 'big';
    image: string;
    arrowIcon: string;
    category: string;
    title: string;
    link: string;

    
}

export interface ProjectItem {
    id: number;
    image: string;
    arrowIcon: string;
    category: string;
    title: string;
    link: string;
  }

export const portfolioItems = [
    {
        id: 1,
        size: 'sm',
        image: 'assets/img/portfolio/portfolio-sm-1.1.png',
        arrowIcon: 'assets/img/icon/ca-portfolio-arrow-1.1.svg',
        category: 'Transportation 2024',
        title: 'Experts in Logistics Management',
        link: '#'
    },
    {
        id: 2,
        size: 'big',
        image: 'assets/img/portfolio/portfolio-big-1.1.png',
        arrowIcon: 'assets/img/icon/ca-portfolio-arrow-1.1.svg',
        category: 'Transportation 2024',
        title: 'Experts in Logistics Management',
        link: '#'
    },
    {
        id: 3,
        size: 'big',
        image: 'assets/img/portfolio/portfolio-big-1.1.png',
        arrowIcon: 'assets/img/icon/ca-portfolio-arrow-1.1.svg',
        category: 'Transportation 2024',
        title: 'Experts in Logistics Management',
        link: '#'
    },
    {
        id: 4,
        size: 'sm',
        image: 'assets/img/portfolio/portfolio-sm-1.2.png',
        arrowIcon: 'assets/img/icon/ca-portfolio-arrow-1.1.svg',
        category: 'Transportation 2024',
        title: 'Experts in Logistics Management',
        link: '#'
    },
    {
        id: 5,
        size: 'sm',
        image: 'assets/img/portfolio/portfolio-sm-1.3.png',
        arrowIcon: 'assets/img/icon/ca-portfolio-arrow-1.1.svg',
        category: 'Transportation 2024',
        title: 'Experts in Logistics Management',
        link: '#'
    },
    {
        id: 6,
        size: 'big',
        image: 'assets/img/portfolio/portfolio-big-1.3.png',
        arrowIcon: 'assets/img/icon/ca-portfolio-arrow-1.1.svg',
        category: 'Transportation 2024',
        title: 'Experts in Logistics Management',
        link: '#'
    },
    {
        id: 7,
        size: 'sm',
        image: 'assets/img/portfolio/portfolio-sm-1.4.png',
        arrowIcon: 'assets/img/icon/ca-portfolio-arrow-1.1.svg',
        category: 'Transportation 2024',
        title: 'Experts in Logistics Management',
        link: '#'
    },
    {
        id: 8,
        size: 'sm',
        image: 'assets/img/portfolio/portfolio-sm-1.5.png',
        arrowIcon: 'assets/img/icon/ca-portfolio-arrow-1.1.svg',
        category: 'Transportation 2024',
        title: 'Experts in Logistics Management',
        link: '#'
    },
    {
        id: 9,
        size: 'sm',
        image: 'assets/img/portfolio/portfolio-sm-1.6.png',
        arrowIcon: 'assets/img/icon/ca-portfolio-arrow-1.1.svg',
        category: 'Transportation 2024',
        title: 'Experts in Logistics Management',
        link: '#'
    }
];
export const moreProjects: ProjectItem[] = [
    {
      id: 1,
      image: 'assets/img/portfolio/portfolio-sm-1.4.png',
      arrowIcon: 'assets/img/icon/ca-portfolio-arrow-1.1.svg',
      category: 'Transportation 2024',
      title: 'Experts in Logistics Management',
      link: '#'
    },
    {
      id: 2,
      image: 'assets/img/portfolio/portfolio-sm-1.5.png',
      arrowIcon: 'assets/img/icon/ca-portfolio-arrow-1.1.svg',
      category: 'Transportation 2024',
      title: 'Experts in Logistics Management',
      link: '#'
    },
    {
      id: 3,
      image: 'assets/img/portfolio/portfolio-sm-1.6.png',
      arrowIcon: 'assets/img/icon/ca-portfolio-arrow-1.1.svg',
      category: 'Transportation 2024',
      title: 'Experts in Logistics Management',
      link: '#'
    }
  ];