import ConstructionConfig from '../models/ConstructionConfigModel.js';
import PropertyShowcase from '../models/PropertyShowcaseModel.js';
import AdvertisingService from '../models/AdvertisingServiceModel.js';
import ChatbotConfig from '../models/ChatbotConfigModel.js';

export async function ensureDefaultModulesSeed() {
  try {
    // 1. Construction Calculator Config
    const configExists = await ConstructionConfig.findOne();
    if (!configExists) {
      await ConstructionConfig.create({
        isActive: true,
        coverageDefaultPercent: 70,
        contingencyPercentage: 5,
        consumptionFactors: {
          bricksPerSqFt: 19,
          cementBagsPerSqFt: 0.42,
          steelKgPerSqFt: 3.8,
          sandCftPerSqFt: 1.8,
          aggregateCftPerSqFt: 1.35
        },
        rates: {
          basic: {
            name: 'Basic Standard',
            description: 'Standard red brick, grade 43 cement, Fe-500 steel, local sand, vitrified tiles, standard electrical/plumbing fittings.',
            brickRate: 8.5,
            cementRate: 380,
            steelRate: 68,
            labourRatePerSqFt: 320,
            otherExpensesPerSqFt: 180,
            estimatedRatePerSqFt: 1450
          },
          standard: {
            name: 'Premium Standard',
            description: 'First-class fly ash / red bricks, branded grade 53 cement, Fe-550D TMT steel, river sand, designer porcelain tiles, concealed CPVC & branded brass fittings.',
            brickRate: 10.5,
            cementRate: 430,
            steelRate: 76,
            labourRatePerSqFt: 410,
            otherExpensesPerSqFt: 280,
            estimatedRatePerSqFt: 1950
          },
          premium: {
            name: 'Luxury Architectural',
            description: 'AAC lightweight blocks / high-strength bricks, UltraTech/ACC Super cement, Tata Tiscon Fe-550D steel, Italian marble/granite finishes, premium modular electrics, branded bath fittings (Kohler/Jaquar).',
            brickRate: 13.0,
            cementRate: 490,
            steelRate: 86,
            labourRatePerSqFt: 550,
            otherExpensesPerSqFt: 460,
            estimatedRatePerSqFt: 2750
          }
        }
      });
      console.log('🏗️ Construction Calculator default configuration seeded successfully.');
    }

    // 2. Property Showcases (Real Estate 3D Tours)
    const showcasesCount = await PropertyShowcase.countDocuments();
    if (showcasesCount === 0) {
      const demoShowcases = [
        {
          title: 'The Skyview Horizon Villa',
          slug: 'skyview-horizon-villa',
          propertyType: 'Luxury Villa',
          category: '3D House Walkthrough',
          description: 'Contemporary 4 BHK architectural villa featuring a double-height living room, private infinity terrace, cantilevered glass balconies, and landscaped internal courtyards.',
          previewImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          tourUrl: 'https://momento360.com/e/u/7d14cb351d3844f2bbd717651a029c95',
          tourType: 'interactive_3d',
          specs: {
            bedrooms: '4 BHK',
            bathrooms: '5 Bath',
            areaSqFt: 4200,
            location: 'Golf Course Extension, Gurugram',
            floors: 3
          },
          tags: ['Luxury Villa', '3D Walkthrough', 'Architecture', 'Interior 3D'],
          isPublished: true,
          isFeatured: true,
          order: 1
        },
        {
          title: 'Aura Heights Luxury Penthouse',
          slug: 'aura-heights-luxury-penthouse',
          propertyType: 'Penthouse',
          category: 'Virtual Apartment Tour',
          description: 'Full-floor 360-degree panoramic virtual tour of a luxury high-rise penthouse overlooking city skyline, featuring an open-concept Italian modular kitchen and spa bathrooms.',
          previewImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
          tourUrl: 'https://momento360.com/e/u/7d14cb351d3844f2bbd717651a029c95',
          tourType: 'panorama_360',
          specs: {
            bedrooms: '3 BHK + Lounge',
            bathrooms: '4 Bath',
            areaSqFt: 3100,
            location: 'Sector 62, Noida, NCR',
            floors: 1
          },
          tags: ['Penthouse', '360 Tour', 'Virtual Staging', 'Interior'],
          isPublished: true,
          isFeatured: true,
          order: 2
        },
        {
          title: 'Signature One Commercial Business Hub',
          slug: 'signature-one-commercial-hub',
          propertyType: 'Commercial Complex',
          category: 'Commercial Visualization',
          description: 'Photorealistic architectural render & walkthrough for an A-grade commercial corporate center with double-glazed acoustic facade, atrium, and flexible modular offices.',
          previewImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
          tourUrl: 'https://momento360.com/e/u/7d14cb351d3844f2bbd717651a029c95',
          tourType: 'interactive_3d',
          specs: {
            bedrooms: 'Corporate Suites',
            bathrooms: 'Executive Restrooms',
            areaSqFt: 18500,
            location: 'Cyber City, Gurugram',
            floors: 6
          },
          tags: ['Commercial', 'Office Spaces', 'Retail Hub', 'Facade 3D'],
          isPublished: true,
          isFeatured: false,
          order: 3
        },
        {
          title: 'The Green Meadows Duplex Residence',
          slug: 'green-meadows-duplex',
          propertyType: 'Duplex Bungalow',
          category: 'Interior & Exterior 3D',
          description: 'Detailed interior walkthrough highlighting custom lighting scenes, wooden acoustic panelling, master bedroom suite with walk-in wardrobe, and terrace barbecue garden.',
          previewImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
          tourUrl: 'https://momento360.com/e/u/7d14cb351d3844f2bbd717651a029c95',
          tourType: 'interactive_3d',
          specs: {
            bedrooms: '3 BHK Duplex',
            bathrooms: '3 Bath',
            areaSqFt: 2200,
            location: 'Sohna Road, Gurugram',
            floors: 2
          },
          tags: ['Duplex', 'Interior Design', 'Lighting Simulation'],
          isPublished: true,
          isFeatured: true,
          order: 4
        },
        {
          title: 'Grand Royal Palms Township & Plots',
          slug: 'grand-royal-palms-township',
          propertyType: 'Township & Plots',
          category: 'Residential Visualization',
          description: 'Masterplan 3D elevation and master site tour showing 200+ residential plots, wide arterial roads, clubhouse, sports arenas, and gated security infrastructure.',
          previewImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
          tourUrl: 'https://momento360.com/e/u/7d14cb351d3844f2bbd717651a029c95',
          tourType: 'video_walkthrough',
          specs: {
            bedrooms: 'Plots 100 - 500 Sq Yd',
            bathrooms: 'Clubhouse Amenities',
            areaSqFt: 45000,
            location: 'Greater Noida West, UP',
            floors: 1
          },
          tags: ['Township', 'Plots', 'Masterplan', 'Drone View'],
          isPublished: true,
          isFeatured: false,
          order: 5
        },
        {
          title: 'Casa Serenade Boutique Apartments',
          slug: 'casa-serenade-apartments',
          propertyType: 'Modern Apartment',
          category: '360 Virtual Tour',
          description: 'Room-by-room interactive 360-degree virtual tour allowing buyers to inspect master bedroom, living lounge, modular kitchen, and balcony views with distance measurement overlays.',
          previewImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
          tourUrl: 'https://momento360.com/e/u/7d14cb351d3844f2bbd717651a029c95',
          tourType: 'panorama_360',
          specs: {
            bedrooms: '2 & 3 BHK Models',
            bathrooms: '2 Bath',
            areaSqFt: 1450,
            location: 'Whitefield, Bengaluru',
            floors: 1
          },
          tags: ['Apartment', 'Sample Flat', '360 Panorama'],
          isPublished: true,
          isFeatured: true,
          order: 6
        }
      ];

      await PropertyShowcase.insertMany(demoShowcases);
      console.log('🏡 Virtual 3D Property Tour demo showcases seeded successfully.');
    }

    // 3. Digital Advertising Services
    const adServicesCount = await AdvertisingService.countDocuments();
    if (adServicesCount === 0) {
      const demoAdServices = [
        {
          title: 'Meta Ads & Social Media Lead Engine',
          slug: 'social-media-advertising',
          category: 'social_media',
          badge: 'High-Volume Lead Gen',
          shortDesc: 'Precision-targeted Facebook & Instagram advertising engineered to generate high-intent inquiries with custom lead capture funnels.',
          fullDesc: 'We build end-to-end social media growth architectures. From custom motion design and high-converting creative ad copy to advanced demographic, geographic, and lookalike audience targeting, our Meta ad systems minimize cost-per-lead while maximizing verified buyer intent.',
          icon: 'Share2',
          platforms: ['Facebook Ads', 'Instagram Ads', 'Meta Audience Network', 'Instant Lead Forms', 'WhatsApp Click-to-Chat'],
          features: [
            {
              title: 'Hyper-Targeted Demographics',
              description: 'Target prospects by exact pincode, purchasing power, real estate interest, household income, and digital behaviors.',
              icon: 'Target'
            },
            {
              title: 'High-Converting Creative Suites',
              description: 'Carousel ads, vertical 9:16 reels, video tours, and carousel graphic creatives produced in-house by Pixelix designers.',
              icon: 'Palette'
            },
            {
              title: 'Retargeting & LAL Audiences',
              description: 'Re-engage website visitors, video viewers, and lead form drop-offs with persuasive testimonials and limited-time incentives.',
              icon: 'RefreshCw'
            },
            {
              title: 'Real-Time CRM & WhatsApp Sync',
              description: 'Instant lead delivery directly into WhatsApp, Google Sheets, or your internal CRM within 3 seconds of submission.',
              icon: 'Zap'
            }
          ],
          targetAudience: ['Real Estate Builders', 'D2C Brands', 'Local Clinics & Doctors', 'B2B Exporters', 'Service Companies'],
          deliverables: [
            'Dedicated Campaign Manager',
            '10-15 Custom Ad Creatives / Month',
            'Weekly Performance Dashboard',
            'A/B Creative & Headline Testing',
            'Automated Lead Notification Webhook'
          ],
          packages: [
            {
              name: 'Starter Launchpad',
              price: '₹14,999',
              priceNote: 'per month + ad spend',
              description: 'Ideal for local businesses and independent builders testing paid customer acquisition.',
              features: ['Up to ₹50,000 Monthly Ad Spend', '8 Custom Designed Creatives', '1 Campaign Goal (Leads / WhatsApp)', 'Bi-weekly Performance Reports', 'Standard Email & Chat Support'],
              isPopular: false,
              ctaText: 'Start Meta Ads'
            },
            {
              name: 'Growth Lead Accelerator',
              price: '₹24,999',
              priceNote: 'per month + ad spend',
              description: 'Our most popular package for active real estate developers and growing brands demanding consistent daily inquiries.',
              features: ['Up to ₹2,00,000 Monthly Ad Spend', '16 Custom Creatives & 4 Short Video Reels', 'Multi-tier Funnel (Top + Retargeting)', 'Direct WhatsApp Lead Routing', 'Weekly Strategy Zoom Call', 'Dedicated Account Strategist'],
              isPopular: true,
              ctaText: 'Scale Your Leads'
            },
            {
              name: 'Enterprise Dominance',
              price: '₹44,999',
              priceNote: 'per month + ad spend',
              description: 'Comprehensive omnichannel marketing system for large developers, multi-city brands, and high-ticket projects.',
              features: ['Unlimited Managed Ad Spend', 'Full Creative Studio (3D, Video, Motion)', 'Advanced Lookalike & Pincode Exclusion', 'CRM Integration & Telecaller Setup', 'Daily Optimization & 24/7 Priority Support'],
              isPopular: false,
              ctaText: 'Custom Enterprise Plan'
            }
          ],
          faqs: [
            {
              question: 'How quickly do inquiries begin coming in once campaigns launch?',
              answer: 'Once creatives and campaign structures are approved, Meta typically approves ads within 12 to 24 hours. Most clients start receiving incoming leads within 24 to 48 hours of launch.'
            },
            {
              question: 'Who pays the advertisement budget (Ad Spend) directly to Facebook?',
              answer: 'Ad spend is billed directly from your Meta Business account using your business credit/debit card. Our agency fee covers strategy, creative production, targeting setup, split-testing, and ongoing optimization.'
            },
            {
              question: 'Do you guarantee an exact number of leads or sales?',
              answer: 'No reputable agency can ethically guarantee fixed sales numbers because closing depends on sales team response time, pricing, project location, and market competition. However, we relentlessly optimize for the lowest cost per verified, qualified inquiry.'
            }
          ],
          isActive: true,
          isFeatured: true,
          order: 1
        },
        {
          title: 'Google Search & High-Intent PPC Ads',
          slug: 'google-advertising',
          category: 'google_ads',
          badge: 'High-Intent Buyers',
          shortDesc: 'Capture active buyers searching on Google Search, Maps, and YouTube with precision bidding and conversion-focused landing pages.',
          fullDesc: 'Google Ads capture prospects at the exact moment they are actively seeking your solution. We engineer laser-focused keyword hierarchies, negative keyword barriers to prevent wasted spend, compelling ad extensions, and dedicated mobile-optimized landing pages to turn search clicks into profitable client calls.',
          icon: 'Search',
          platforms: ['Google Search', 'Google Display Network', 'Google Maps / Local Pack', 'YouTube Ads', 'Performance Max (PMax)'],
          features: [
            {
              title: 'High-Intent Keyword Architecture',
              description: 'Target exact match and phrase match searches like "buy 3 BHK flat in Gurugram" or "best e-commerce agency".',
              icon: 'Key'
            },
            {
              title: 'Negative Keyword Filtering',
              description: 'Aggressively exclude irrelevant terms (free, cheap, jobs, syllabus) to ensure every rupee goes toward paying clients.',
              icon: 'Shield'
            },
            {
              title: 'Google Maps Local Domination',
              description: 'Promote your site office, showroom, or retail presence directly atop local Google Maps searches.',
              icon: 'MapPin'
            },
            {
              title: 'Conversion Rate Optimization',
              description: 'A/B test landing page headlines, phone click buttons, and lead capture forms to push conversion rates above 8%.',
              icon: 'TrendingUp'
            }
          ],
          targetAudience: ['Real Estate Agencies', 'Commercial Property Owners', 'Manufacturers', 'Service Providers', 'B2B Software'],
          deliverables: [
            'Search & PMax Campaign Setup',
            'Full Conversion Tracking & GA4 Setup',
            'Call Tracking & Lead Logging',
            'Weekly Search Term Hygiene',
            'Landing Page CRO Recommendations'
          ],
          packages: [
            {
              name: 'Search Core',
              price: '₹16,999',
              priceNote: 'per month + ad spend',
              description: 'Focused Google Search campaign for local keywords and direct inbound call generation.',
              features: ['Up to ₹60,000 Managed Ad Spend', 'Up to 3 Search Ad Groups', 'Negative Keyword Audit', 'GA4 Event Tracking', 'Monthly Performance Report'],
              isPopular: false,
              ctaText: 'Launch Google Ads'
            },
            {
              name: 'PPC Growth Engine',
              price: '₹28,999',
              priceNote: 'per month + ad spend',
              description: 'Comprehensive Search + Google Maps + Remarketing setup for high-ticket buyers.',
              features: ['Up to ₹2,50,000 Managed Ad Spend', 'Search + Maps + Display Remarketing', 'Dynamic Call Tracking Integration', 'Custom High-Speed Landing Page', 'Bi-weekly Strategy Review'],
              isPopular: true,
              ctaText: 'Maximize Search Leads'
            }
          ],
          faqs: [
            {
              question: 'What is the minimum recommended budget for Google Ads?',
              answer: 'For competitive niches like real estate, we recommend a minimum ad spend of ₹15,000 to ₹30,000 per month so the Google algorithm has sufficient search volume to optimize bidding.'
            },
            {
              question: 'Can you track incoming phone calls directly from ads?',
              answer: 'Yes! We configure call extensions and dynamic number insertion (DNI) to track callers, duration, and keywords that generated the conversation.'
            }
          ],
          isActive: true,
          isFeatured: true,
          order: 2
        },
        {
          title: 'Specialized Real Estate Buyer Lead Generation',
          slug: 'real-estate-lead-generation',
          category: 'real_estate_lead_gen',
          badge: 'Property Specialist',
          shortDesc: 'End-to-end buyer acquisition system built exclusively for property builders, developers, colonizers, and real estate consultants.',
          fullDesc: 'Real estate requires a fundamentally different marketing strategy than retail e-commerce. High ticket prices demand trust, localized geographic targeting, verified contact validation, and immediate human follow-up. Pixelix combines photorealistic 3D renders with targeted Meta and Google ad funnels to generate qualified inquiries for residential plots, luxury villas, commercial showrooms, and upcoming township launches.',
          icon: 'Building2',
          platforms: ['Meta Ads (FB/Insta)', 'Google Search Ads', 'WhatsApp Direct', 'Custom Property Landing Pages', '3D Virtual Tour Integration'],
          features: [
            {
              title: 'Segmented Buyer Personas',
              description: 'Distinct campaigns tailored for End-Users (families), Investors (rental yield / capital gains), and NRI buyers.',
              icon: 'Users'
            },
            {
              title: '3D Virtual Walkthrough Integration',
              description: 'Embed immersive 3D house and floorplan tours directly into ad landing pages to increase lead quality by over 240%.',
              icon: 'Box'
            },
            {
              title: 'Two-Step OTP/Number Verification',
              description: 'Filter out fake numbers and tire-kickers with automated WhatsApp OTP verification and mandatory budget filters.',
              icon: 'ShieldCheck'
            },
            {
              title: 'Automated Instant WhatsApp Greeting',
              description: 'Automatically send project brochures, floor plans, and Google Maps location pins to the buyer within 10 seconds.',
              icon: 'MessageSquare'
            }
          ],
          targetAudience: [
            'Real Estate Builders & Colonizers',
            'Independent Property Dealers',
            'Land & Agricultural Plot Owners',
            'Residential Project Developers',
            'Commercial Plaza & Mall Owners',
            'Luxury Apartment & Penthouse Promoters'
          ],
          deliverables: [
            'Project-Specific Dedicated Landing Page',
            'Interactive 3D / Video Tour Showcase',
            'Omnichannel Ad Distribution (Meta + Google)',
            'WhatsApp Lead Auto-Responder',
            'Weekly CRM Hygiene & Lead Review',
            'Direct Founder Strategy Support'
          ],
          packages: [
            {
              name: 'Single Project Launch',
              price: '₹29,999',
              priceNote: 'per project / month + spend',
              description: 'Custom-tailored acquisition sprint for a specific residential building, plotting project, or commercial plaza.',
              features: [
                'Dedicated High-Speed Landing Page',
                'Facebook, Instagram & Google Ads',
                '12 High-Res 3D/Photo Ad Creatives',
                'Lead Delivery via WhatsApp & Sheets',
                'Targeting NRI & High-Net-Worth Buyers'
              ],
              isPopular: true,
              ctaText: 'Launch Project Campaign'
            },
            {
              name: 'Township / Multi-Project Suite',
              price: '₹54,999',
              priceNote: 'per month + spend',
              description: 'Full-scale marketing department handling multiple inventory lines (Plots + Villas + Retail).',
              features: [
                'Multiple Landing Pages & 3D Walkthroughs',
                'Full Funnel Video & Drone Integration',
                'Telecalling Script & CRM Integration',
                'Priority Campaign Manager & Weekly Audits',
                'Dedicated Creative Design & Copy Team'
              ],
              isPopular: false,
              ctaText: 'Discuss Enterprise Project'
            }
          ],
          faqs: [
            {
              question: 'How do you ensure leads are genuine and not just curious clickers?',
              answer: 'We implement multi-step qualifying questions in our forms (e.g., asking for budget range, preferred timeline to buy, and purchasing method). This extra friction weeds out casual scrollers and delivers serious buyers with budget clarity.'
            },
            {
              question: 'Can you target NRI buyers living in the USA, UK, UAE, or Canada?',
              answer: 'Yes! We run specialized international campaigns targeting Indian expats with high disposable income interested in buying property in Delhi-NCR, Gurugram, Bengaluru, and tier-1/tier-2 emerging investment corridors.'
            }
          ],
          isActive: true,
          isFeatured: true,
          order: 3
        }
      ];

      await AdvertisingService.insertMany(demoAdServices);
      console.log('📈 Digital Advertising & Lead Gen services seeded successfully.');
    }

    // 4. Chatbot & WhatsApp Config
    const botConfigExists = await ChatbotConfig.findOne();
    if (!botConfigExists) {
      await ChatbotConfig.create({
        isActive: true,
        botName: 'Pixelix AI Assistant',
        welcomeMessage: 'Hello! Welcome to Pixelix. I can help you calculate construction costs, explore 3D virtual property tours, launch digital ad campaigns, or connect directly with our founders.',
        whatsappNumber: '917056063863',
        whatsappMessages: {
          calculator: 'Hello Pixelix Team, I just calculated a construction estimate on your website and would like a detailed architectural quotation.',
          virtual_tours: 'Hello Pixelix Team, I am interested in creating interactive 3D Virtual Property Walkthroughs for my real estate project.',
          digital_advertising: 'Hello Pixelix Team, I want to discuss Digital Advertising and Real Estate Lead Generation campaigns for my business.',
          lead_generation: 'Hello Pixelix Team, I want to generate verified buyer inquiries for my real estate/business projects.',
          general: 'Hello Pixelix Team, I reviewed your website and would like to speak directly with the founders.'
        },
        suggestedQuestions: [
          'How do I calculate house construction cost?',
          'Can you create 3D virtual tours for my building?',
          'What are your Facebook & Google ad packages?',
          'How does real estate lead generation work?',
          'I want to speak directly with the founders.'
        ],
        faqs: [
          {
            topic: 'Construction Calculator',
            keywords: ['construction', 'calculator', 'cost', 'estimate', 'brick', 'cement', 'steel', 'material', 'sq ft', 'rate', 'plot'],
            question: 'How does the Real Estate Construction Calculator estimate costs?',
            answer: 'Our calculator uses your plot area, coverage percentage, and number of floors to calculate total built-up area. It then calculates the exact quantity of bricks (~19/sq ft), cement bags (~0.42/sq ft), and steel (~3.8 kg/sq ft) using live market rates for Basic, Standard, and Premium finishes.'
          },
          {
            topic: '3D Property Tours',
            keywords: ['3d', 'virtual tour', 'walkthrough', '360', 'panorama', 'property', 'flat', 'villa', 'apartment'],
            question: 'What types of 3D property tours does Pixelix build?',
            answer: 'We design photorealistic 3D house walkthroughs, 360-degree interactive apartment tours, exterior & interior architectural elevations, and drone site showcases that allow prospective buyers to virtually inspect every room from anywhere in the world.'
          },
          {
            topic: 'Digital Advertising',
            keywords: ['ads', 'meta', 'facebook', 'instagram', 'google', 'marketing', 'ppc', 'lead gen', 'advertising'],
            question: 'What advertising services does Pixelix provide?',
            answer: 'We engineer high-ROI Meta (Facebook & Instagram) ads and Google Search/Display/Maps campaigns with custom ad creatives, hyper-local audience targeting, and real-time WhatsApp lead delivery.'
          },
          {
            topic: 'Real Estate Leads',
            keywords: ['real estate', 'property dealer', 'builder', 'plot', 'flat', 'buyer', 'leads'],
            question: 'How do you help real estate builders and property dealers find buyers?',
            answer: 'We build targeted campaigns specifically for residential plots, commercial plazas, flats, and villas. By qualifying prospects with budget filters and instant WhatsApp follow-ups, we deliver genuine buyer inquiries.'
          },
          {
            topic: 'Founders & Agency',
            keywords: ['founder', 'vikas', 'shubham', 'contact', 'call', 'office', 'phone', 'whatsapp'],
            question: 'How can I speak directly with Pixelix founders?',
            answer: 'You can connect directly with our founders: Vikas Chauhan (+91 7056063863) for business strategy & growth, and Shubham Singh (+91 95595 06650) for technology and 3D dev. You can also click the WhatsApp button anytime!'
          }
        ],
        aiProvider: 'none',
        aiModel: 'gemini-1.5-flash',
        enableLeadCapture: true
      });
      console.log('🤖 Chatbot & WhatsApp default configuration seeded successfully.');
    }
  } catch (error) {
    console.error('Error during modules default seeding:', error);
  }
}

