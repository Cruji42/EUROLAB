interface PricingPlan {
    title: string;
    description: string;
    price: number;
    duration: string;
    features: string[];
    active?: boolean;
  }
  
export const pricingPlans: PricingPlan[] = [
    {
      title: 'Starter Pack',
      description: 'Our Freight Forwarding Services ensure your goods are transported efficiently.',
      price: 99,
      duration: 'month',
      features: [
        'Single Plane Service',
        'Additional Plane Available',
        'Insurance Included',
        '1000km Maximum Distance'
      ]
    },
    {
      title: 'Pro Pack',
      description: 'While our Comprehensive Warehousing Solutions provide secure storage.',
      price: 149,
      duration: 'month',
      features: [
        'Dual Plane Service',
        'Additional Plane Available',
        'Insurance Included',
        '3000km Maximum Distance'
      ],
      active: true
    },
    {
      title: 'Business Pack',
      description: 'With Specialized Project Cargo Handling and Cold Chain Logistics Services.',
      price: 199,
      duration: 'month',
      features: [
        'Single Plane Service',
        'Additional Plane Available',
        'Insurance Included',
        '1000km Maximum Distance'
      ]
    }
  ];
  