
export type DataPlan = {
  id: string;
  name: string;
  price: number;
  data: string;
  validity: string;
  description: string;
  features: string[];
  bestValue?: boolean;
};

export type Hostel = {
  id: string;
  name:string;
  active: boolean;
};

export type Location = {
  id: string;
  name: string;
  hostels: Hostel[];
  active: boolean;
};

export type Faq = {
  question: string;
  answer: string;
};

export const locations: Location[] = [
  {
    id: 'abraka',
    name: 'ABRAKA',
    active: true,
    hostels: [
      { id: '1121', name: '11/21 Twin Apartment', active: true },
      { id: 'champions', name: 'Champions Hostel', active: true },
      { id: 'silversand', name: 'Silver Sand Hostel', active: true },
      { id: 'oursaviour', name: 'Our Saviour Hostel', active: false },
    ],
  },
  {
    id: 'ozoro',
    name: 'OZORO',
    active: false,
    hostels: [],
  },
  {
    id: 'oleh',
    name: 'OLEH',
    active: false,
    hostels: [],
  },
  {
    id: 'oghara',
    name: 'OGHARA',
    active: false,
    hostels: [],
  },
];

export const dataPlans: DataPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 500,
    data: '2GB',
    validity: '7 Days',
    description: 'Light browsing & social media.',
    features: ['2GB Data', '7 Day Validity', 'Great for Socials', 'Basic Speed'],
  },
  {
    id: 'student',
    name: 'Student Plan',
    price: 600,
    data: '3GB',
    validity: '30 Days',
    description: 'Perfect for student assignments.',
    features: ['3GB Data', '30 Day Validity', 'Reliable Speed', 'Single Device'],
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 1500,
    data: '10GB',
    validity: '14 Days',
    description: 'Ideal for streaming & study.',
    features: ['10GB Data', '14 Day Validity', 'HD Streaming', 'High-Speed Access'],
    bestValue: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 5000,
    data: '50GB',
    validity: '30 Days',
    description: 'For gaming & heavy use.',
    features: ['50GB Data', '30 Day Validity', 'Pro-Gamer Speed', '4K Streaming'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 15000,
    data: '100GB',
    validity: '30 Days',
    description: 'Ultimate power & speed.',
    features: ['100GB Data', '30 Day Validity', 'Blazing-Fast Speed', 'Multi-Device Use'],
  },
];

export const allFaqs: Faq[] = [
    {
        question: "What payment methods do you accept?",
        answer: "We accept payments via Paystack, which supports credit/debit cards, bank transfers, and USSD."
    },
    {
        question: "How do I connect to the WiFi after purchase?",
        answer: "After a successful purchase, you will receive a voucher code. Go to your device's WiFi settings, select 'Rosec WiFi', and you will be redirected to a login page where you can enter your voucher code."
    },
    {
        question: "Is there a fair usage policy?",
        answer: "Yes, to ensure quality service for all users, we have a fair usage policy. Excessive usage may result in reduced speeds during peak hours."
    },
    {
        question: "Can I use one plan on multiple devices?",
        answer: "Our standard plans are for single device use. For multiple devices, please consider our Enterprise plan or contact support for custom solutions."
    },
    {
        question: "What are the WiFi operational hours in Champions Hostel?",
        answer: "The WiFi service in Champions Hostel runs 24/7, but undergoes a scheduled maintenance every Wednesday from 3 AM to 4 AM."
    },
    {
        question: "I'm in 11/21 Twin Apartment and my connection is slow. What should I do?",
        answer: "For residents of 11/21 Twin Apartment, we have a dedicated support line. Please call 080-ROSEC-1121. Common issues can often be resolved by moving closer to a corridor where our access points are located."
    },
    {
        question: "Is the service available in Ozoro yet?",
        answer: "We are actively working on expanding our services. Service in Ozoro is marked as 'coming soon'. Please check back for updates on our official launch."
    }
];
