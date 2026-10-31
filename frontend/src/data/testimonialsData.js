export const TESTIMONIAL_TOPICS = [
  {
    id: 'ecom',
    label: 'E-Commerce & Marketplaces',
    shortLabel: 'E-Com & Marketplaces',
    icon: 'Store',
    count: 5,
    tagline: 'Amazon, Flipkart, Meesho, Shopify & Blinkit Growth'
  },
  {
    id: 'web-app',
    label: 'Web & App Development',
    shortLabel: 'Web & App Dev',
    icon: 'Code2',
    count: 5,
    tagline: 'Custom Web Platforms, 3D Motion & Mobile Apps'
  },
  {
    id: 'branding',
    label: 'Brand Identity & Design',
    shortLabel: 'Brand Identity',
    icon: 'Palette',
    count: 5,
    tagline: '5 Custom Vector Logos, Packaging & Guidelines'
  },
  {
    id: 'ai-automation',
    label: 'AI Integration & Chatbots',
    shortLabel: 'AI & Automations',
    icon: 'Bot',
    count: 5,
    tagline: 'WhatsApp AI Agents, Auto-Qualifiers & ERP Bots'
  },
  {
    id: 'growth-marketing',
    label: 'Digital Growth & Campaigns',
    shortLabel: 'Growth & SEO',
    icon: 'TrendingUp',
    count: 5,
    tagline: 'Search SEO, Social Creatives & Omnichannel Reach'
  }
];

export const TESTIMONIALS_DATA = {
  ecom: [
    {
      id: 'ecom-1',
      name: 'Rajesh Singhania',
      role: 'Founder & MD',
      company: 'VedaKriti Handloom & Ethnic',
      location: 'Surat, Gujarat',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      initials: 'RS',
      rating: 5.0,
      metric: '+380% Monthly Orders',
      serviceUsed: 'Amazon & Meesho Retainer + Listing',
      review:
        'Pixelix completely turned around our Amazon & Meesho accounts. Our cataloging was messy and returns were above 32%. Their operations team rebuilt our listings with A+ Content, optimized logistics via Shiprocket, and cut our RTO to 14%. Within 45 days, our daily dispatches jumped from 20 to 110+ orders.'
    },
    {
      id: 'ecom-2',
      name: 'Pooja Agarwal',
      role: 'Co-Founder',
      company: 'Aura Organics (Herbal Cosmetics)',
      location: 'Jaipur, Rajasthan',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      initials: 'PA',
      rating: 5.0,
      metric: '₹38L Monthly GMV',
      serviceUsed: 'Cataloging & Returns Management',
      review:
        'We struggled with Amazon category ungating and Safe-T claims for months. Vikas and his operations team resolved all compliance issues in one week and recovered ₹1.8 Lakhs in SPF claims. Truly the most reliable and hands-on e-commerce partner in India.'
    },
    {
      id: 'ecom-3',
      name: 'Kunal Malhotra',
      role: 'CEO',
      company: 'ZenFit Activewear & Gear',
      location: 'Delhi NCR',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      initials: 'KM',
      rating: 5.0,
      metric: '4.8★ Brand Store Rating',
      serviceUsed: 'Dispatch & Logistics + Multi-Channel',
      review:
        'From parent-child SKU variations to Blinkit quick-commerce listing and Shiprocket multi-courier manifest, Pixelix runs our operations like clockwork. Our festival sale (BBD & GIF) broke all previous revenue records with zero late dispatch penalties.'
    },
    {
      id: 'ecom-4',
      name: 'Suresh Nambiar',
      role: 'Export Director & Founder',
      company: 'Malabar Spices & Gourmet',
      location: 'Kochi, Kerala',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      initials: 'SN',
      rating: 5.0,
      metric: '4.2x ROAS on Ads',
      serviceUsed: 'Flipkart & Amazon FBA Management',
      review:
        'The team doesn’t just list products; they optimize backend search terms, high-res lifestyle visuals, and daily Buy Box retention. Our Flipkart Assured badge was secured in just 18 days. You speak directly to the founders, which saves so much time.'
    },
    {
      id: 'ecom-5',
      name: 'Tanvi Shah',
      role: 'Head of Operations',
      company: 'LittleStar Kidswear',
      location: 'Ahmedabad, Gujarat',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      initials: 'TS',
      rating: 5.0,
      metric: '-42% Return RTO Rate',
      serviceUsed: 'Order Creation & RTO Reduction',
      review:
        'Their automated NDR calling and address verification system stopped fraudulent COD orders right at checkout. Pixelix saved us lakhs of rupees in courier freight charges alone in just the first quarter.'
    }
  ],

  'web-app': [
    {
      id: 'web-1',
      name: 'Aditya Vikram Roy',
      role: 'CTO & Co-Founder',
      company: 'FinPulse Neo-Banking',
      location: 'Bengaluru, Karnataka',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      initials: 'AR',
      rating: 5.0,
      metric: '99.98% Uptime / 0.8s Load',
      serviceUsed: 'Full-Stack Web Dev & 3D Interactive',
      review:
        'We needed a high-performance web dashboard with real-time analytics and interactive 3D elements. Pixelix engineered the entire platform using React, Node.js, and Three.js ahead of deadline. Code architecture is enterprise-grade, clean, and scalable.'
    },
    {
      id: 'web-2',
      name: 'Dr. Meera Iyer',
      role: 'Founder & Chief Medical Officer',
      company: 'TeleCure Health Systems',
      location: 'Chennai, Tamil Nadu',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      initials: 'MI',
      rating: 5.0,
      metric: '45,000+ App Downloads',
      serviceUsed: 'Cross-Platform Mobile App (iOS/Android)',
      review:
        'Pixelix built both our iOS and Android telemedicine apps with secure doctor appointment booking, Razorpay integration, and automated WhatsApp patient reminders. Flawless execution and patient feedback has been overwhelming.'
    },
    {
      id: 'web-3',
      name: 'Gaurav Taneja',
      role: 'Managing Director',
      company: 'PropNest Realty Tech',
      location: 'Gurugram, Haryana',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      initials: 'GT',
      rating: 5.0,
      metric: '+240% Lead Conversion',
      serviceUsed: 'Custom Web Portal & Speed Optimization',
      review:
        'Our real estate portal was sluggish on mobile. The Pixelix dev team restructured our frontend, added 360-degree virtual tour widgets, and our conversion rate from property inquiries doubled in just 3 weeks.'
    },
    {
      id: 'web-4',
      name: 'Siddharth Jain',
      role: 'Co-Founder & COO',
      company: 'LogiTrack Fleet Management',
      location: 'Pune, Maharashtra',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      initials: 'SJ',
      rating: 5.0,
      metric: 'Zero Downtime Migration',
      serviceUsed: 'SaaS Dashboard & Cloud Migration',
      review:
        'Migrated our legacy tracking dashboard to a modern cloud-native stack. Shubham Singh and the dev team were available on call at midnight during cutover. Extremely trustworthy engineering team with rare dedication.'
    },
    {
      id: 'web-5',
      name: 'Ananya Sen',
      role: 'Creative Director & Founder',
      company: 'ArtisanStudio Marketplace',
      location: 'Kolkata, West Bengal',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      initials: 'AS',
      rating: 5.0,
      metric: '3.2x Faster Checkout',
      serviceUsed: 'E-Commerce Web Dev & Animations',
      review:
        'The custom cart experience and animations they created gave our handcrafted jewelry portal an international luxury aesthetic. Customers frequently compliment how smooth and premium the site feels.'
    }
  ],

  branding: [
    {
      id: 'brand-1',
      name: 'Vikramaditya Rathore',
      role: 'Managing Partner',
      company: 'Heritage Haveli Resorts',
      location: 'Udaipur, Rajasthan',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80',
      initials: 'VR',
      rating: 5.0,
      metric: '5 Full Vector Logos Delivered',
      serviceUsed: '5 Custom Vector Logos & Full Identity Kit',
      review:
        'We were blown away by the 5 distinct logo concepts Pixelix presented. They gave us deep royal terracotta, gold, and monogram options with full vector SVG masters, print guidelines, and signage mockups. Pure art and precision.'
    },
    {
      id: 'brand-2',
      name: 'Ritu Chawla',
      role: 'Brand Founder',
      company: 'Sattvic Nutrition & Wellness',
      location: 'Mumbai, Maharashtra',
      avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
      initials: 'RC',
      rating: 5.0,
      metric: 'Complete Packaging in 10 Days',
      serviceUsed: 'Packaging Design & Brand Guidelines',
      review:
        'Designing food packaging that complies with FSSAI standards while looking modern on retail shelves is tough. Pixelix nailed our pouches, bottles, and gift boxes. Our brand now commands premium pricing in organic supermarkets.'
    },
    {
      id: 'brand-3',
      name: 'Farhan Qureshi',
      role: 'Co-Founder',
      company: 'Kebab & Co. Gourmet Cloud Kitchens',
      location: 'Hyderabad, Telangana',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      initials: 'FQ',
      rating: 5.0,
      metric: '12 Cloud Outlets Branded',
      serviceUsed: 'Brand Identity & Print Collaterals',
      review:
        'Pixelix delivered our logo, menu flyers, delivery box packaging, and social templates in less than 2 weeks. Consistent branding helped us open 12 cloud kitchen outlets in Hyderabad and Bengaluru effortlessly.'
    },
    {
      id: 'brand-4',
      name: 'Kavita Nair',
      role: 'Founder',
      company: 'BloomCraft Sustainable Stationery',
      location: 'Bengaluru, Karnataka',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
      initials: 'KN',
      rating: 5.0,
      metric: 'Award-Winning Visual Identity',
      serviceUsed: 'Brand Book & PDF Deliverables Kit',
      review:
        'Their understanding of color psychology, typography pairing, and vector precision is unmatched. The PDF brand book they handed over is what our manufacturing vendors follow every day without confusion.'
    },
    {
      id: 'brand-5',
      name: 'Nitin Saxena',
      role: 'Senior Partner',
      company: 'Acuity Legal Advocates',
      location: 'Chandigarh, Punjab',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
      initials: 'NS',
      rating: 5.0,
      metric: '100% Vector Scalability',
      serviceUsed: 'Corporate Identity & Vector System',
      review:
        'Professional, authoritative, and clean corporate identity. From our letterheads to our office brass signboards, the vector files scaled flawlessly. Vikas Chauhan gave exceptional personal attention.'
    }
  ],

  'ai-automation': [
    {
      id: 'ai-1',
      name: 'Harshvardhan Goel',
      role: 'Director of Admissions',
      company: 'EduPro Coaching Network',
      location: 'Noida, Uttar Pradesh',
      avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&auto=format&fit=crop&q=80',
      initials: 'HG',
      rating: 5.0,
      metric: '82% Auto-Qualified Leads',
      serviceUsed: 'WhatsApp AI Agent & Lead Automation',
      review:
        'Our counseling team was drowning in 600+ student queries daily. Pixelix deployed an intelligent WhatsApp AI agent trained on our courses and fee structure. It qualifies leads 24/7 and books counselor appointments automatically.'
    },
    {
      id: 'ai-2',
      name: 'Deepak Singhal',
      role: 'Managing Director',
      company: 'Singhal Auto Parts & Distribution',
      location: 'Indore, Madhya Pradesh',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
      initials: 'DS',
      rating: 5.0,
      metric: '₹12L Saved in Support Costs',
      serviceUsed: 'ERP AI Bot & Inventory Query Agent',
      review:
        'We integrated their AI inventory bot with our ERP. Mechanics and retailers can now check spare parts availability and prices on WhatsApp instantly without waiting for a sales rep. Game changer for B2B operations.'
    },
    {
      id: 'ai-3',
      name: 'Shreya Mukherjee',
      role: 'Operations Head',
      company: 'GlamLook Salon & Academy Chain',
      location: 'Kolkata, West Bengal',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
      initials: 'SM',
      rating: 5.0,
      metric: '3.5x Bookings via AI Chat',
      serviceUsed: '24/7 Intelligent Booking Chatbot',
      review:
        'Clients can book salon appointments at 11 PM or 2 AM through our website AI bot. It handles rescheduling, technician allocation, and payment links with zero human intervention.'
    },
    {
      id: 'ai-4',
      name: 'Manish Bansal',
      role: 'Vice President',
      company: 'Apex Textile Mills',
      location: 'Ludhiana, Punjab',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      initials: 'MB',
      rating: 5.0,
      metric: '94% Query Resolution Rate',
      serviceUsed: 'Custom Enterprise AI Integration',
      review:
        'Pixelix trained a custom internal AI agent on our company’s technical textile manuals and export standards. Our sales team gets instant answers on fabric specs during client negotiations.'
    },
    {
      id: 'ai-5',
      name: 'Rashmi Deshmukh',
      role: 'Founder',
      company: 'CarePoint Diagnostic Labs',
      location: 'Nagpur, Maharashtra',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      initials: 'RD',
      rating: 5.0,
      metric: 'Instant Report Delivery via Bot',
      serviceUsed: 'Automated WhatsApp Dispatch AI',
      review:
        'Automated PDF lab report dispatch and test inquiry handling via their WhatsApp chatbot reduced our reception phone calls by 70%. Super smooth integration and HIPAA-grade privacy.'
    }
  ],

  'growth-marketing': [
    {
      id: 'growth-1',
      name: 'Alok Khandelwal',
      role: 'Managing Director',
      company: 'Khandelwal Jewels & Diamonds',
      location: 'Kanpur, Uttar Pradesh',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      initials: 'AK',
      rating: 5.0,
      metric: '+520% Local Search Footfall',
      serviceUsed: 'Festive Omnichannel Campaign & Print',
      review:
        'Pixelix handled our Diwali festive campaign across Google Ads, Instagram, and printed showroom flyers. We witnessed the highest showroom footfall in our 18-year family business history.'
    },
    {
      id: 'growth-2',
      name: 'Neha Kapoor',
      role: 'Digital Marketing Head',
      company: 'GlowDaily Skincare',
      location: 'Delhi NCR',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      initials: 'NK',
      rating: 5.0,
      metric: '120K Organic Monthly Visits',
      serviceUsed: 'SEO & Search Growth Retainer',
      review:
        'Their SEO team restructured our product category taxonomy and fixed all technical crawl errors. Our search traffic went from 8,000 to over 120,000 organic visits in 5 months without paying for clicks.'
    },
    {
      id: 'growth-3',
      name: 'Rohit Bhardwaj',
      role: 'Founder & CEO',
      company: 'Himalayan Escapes Resorts & Treks',
      location: 'Dehradun, Uttarakhand',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      initials: 'RB',
      rating: 5.0,
      metric: 'Sold Out 3 Months in Advance',
      serviceUsed: 'Social Content Systems & Ad Creatives',
      review:
        'Their 5 social creative PDFs and high-converting video reels captured the magic of our mountain retreats perfectly. Our winter season sold out completely before November ended.'
    },
    {
      id: 'growth-4',
      name: 'Sanjay Varma',
      role: 'Co-Founder',
      company: 'Awadh Crafts & Chikan Couture',
      location: 'Lucknow, Uttar Pradesh',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      initials: 'SV',
      rating: 5.0,
      metric: '4.5x Return on Ad Spend',
      serviceUsed: 'Ad Campaigns & Retainer Management',
      review:
        'They don’t just post random graphics; they understand buyer psychology. Every creative has a strong hook, clear USP, and direct WhatsApp CTA. Vikas & Shubham are genuine growth partners.'
    },
    {
      id: 'growth-5',
      name: 'Bhavna Trivedi',
      role: 'Head of Brand Growth',
      company: 'NourishBite Organic Foods',
      location: 'Vadodara, Gujarat',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      initials: 'BT',
      rating: 5.0,
      metric: '+185% Repeat Customer Rate',
      serviceUsed: 'Content Systems & Customer Retention',
      review:
        'From social storytelling to email newsletters and packaging inserts, Pixelix built a loyal customer base for our organic snacks. Highly recommended for any consumer brand looking for real growth.'
    }
  ]
};

// Map service names / categories to topic ID
export function getTopicIdForService(serviceName = '') {
  const s = (serviceName || '').toLowerCase();
  if (s.includes('ecom') || s.includes('amazon') || s.includes('flipkart') || s.includes('meesho') || s.includes('listing') || s.includes('dispatch') || s.includes('order') || s.includes('inventory') || s.includes('return') || s.includes('marketplace')) {
    return 'ecom';
  }
  if (s.includes('web') || s.includes('app') || s.includes('dev') || s.includes('software') || s.includes('code') || s.includes('site') || s.includes('dashboard')) {
    return 'web-app';
  }
  if (s.includes('brand') || s.includes('logo') || s.includes('identity') || s.includes('vector') || s.includes('packaging') || s.includes('visual') || s.includes('graphic')) {
    return 'branding';
  }
  if (s.includes('ai') || s.includes('bot') || s.includes('chat') || s.includes('automation') || s.includes('agent')) {
    return 'ai-automation';
  }
  if (s.includes('seo') || s.includes('search') || s.includes('campaign') || s.includes('marketing') || s.includes('social') || s.includes('content') || s.includes('growth')) {
    return 'growth-marketing';
  }
  return 'ecom'; // default topic
}

export function getAllTestimonials() {
  return [
    ...TESTIMONIALS_DATA.ecom,
    ...TESTIMONIALS_DATA['web-app'],
    ...TESTIMONIALS_DATA.branding,
    ...TESTIMONIALS_DATA['ai-automation'],
    ...TESTIMONIALS_DATA['growth-marketing']
  ];
}

