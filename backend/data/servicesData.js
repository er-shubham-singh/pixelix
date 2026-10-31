export const initialServices = [
  {
    slug: 'web-development',
    title: 'Website Development',
    titleHi: 'वेबसाइट डेवलपमेंट',
    category: 'digital-products',
    shortDescription: 'High-performance, bespoke web platforms engineered for lightning speed, modern conversions, and brand elevation.',
    shortDescriptionHi: 'आपके बिज़नेस के लिए तेज़, रिस्पॉन्सिव और आधुनिक वेबसाइट।',
    fullDescription: 'Pixelix designs and develops custom digital storefronts and web experiences that merge architectural precision with warm, tactile branding. Built on modern stacks like Vite, React, Next.js, and Node.js with responsive layouts, accessible UI, and peak performance.',
    badge: 'Core Service',
    iconName: 'Globe',
    deliverables: [
      'Responsive multi-device layout (Mobile, Tablet, Desktop)',
      'Custom animations and interactive 3D visualizers',
      'SEO-friendly semantic HTML5 structure',
      'Admin CMS and analytics integration',
      'High-speed hosting & SSL configuration'
    ],
    deliverablesHi: [
      'सभी डिवाइस पर अनुकूलित रिस्पॉन्सिव लेआउट',
      'कस्टम एनिमेशन और 3D इंटरैक्टिव तत्व',
      'SEO फ्रेंडली संरचना और तेज़ लोडिंग स्पीड'
    ],
    features: [
      {
        title: 'Modern Tech Stack',
        titleHi: 'आधुनिक तकनीक',
        description: 'Vite, React, Tailwind CSS, Next.js, and Node microservices for blazing performance.'
      },
      {
        title: 'Conversion Focused',
        titleHi: 'कन्वर्ज़न केंद्रित',
        description: 'Built to turn casual visitors into loyal inquiries and transactions.'
      },
      {
        title: 'Complete Ownership',
        titleHi: 'पूर्ण स्वामित्व',
        description: 'Clean documented codebase with zero platform vendor lock-in.'
      }
    ],
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Next.js', 'REST API'],
    featured: true,
    order: 1
  },
  {
    slug: 'app-development',
    title: 'Mobile App Development',
    titleHi: 'मोबाइल ऐप डेवलपमेंट',
    category: 'digital-products',
    shortDescription: 'Cross-platform native iOS & Android applications tailored for sleek user workflows and offline reliability.',
    shortDescriptionHi: 'iOS और Android के लिए तेज़ और यूज़र-फ्रेंडली मोबाइल ऍप्स।',
    fullDescription: 'We build intuitive, fluid mobile applications that bring your business directly into your customers\' pockets. From concept to App Store and Google Play deployment, our mobile engineering ensures smooth gestures, low latency, and secure backend synchronization.',
    badge: 'Popular',
    iconName: 'Smartphone',
    deliverables: [
      'Production-ready iOS & Android application binaries',
      'Figma wireframes and high-fidelity interaction prototypes',
      'Store listing setup (Apple App Store & Google Play)',
      'Push notification & authentication architecture',
      'Source code repository and documentation'
    ],
    deliverablesHi: [
      'iOS और Android ऍप बिल्ड',
      'प्ले स्टोर व ऐप स्टोर पब्लिशिंग सपोर्ट',
      'पुश नोटिफिकेशन और सुरक्षित ऑथेंटिकेशन'
    ],
    features: [
      {
        title: 'Single Codebase Agility',
        titleHi: 'क्रॉस-प्लेटफॉर्म क्षमता',
        description: 'Cost-effective multi-platform delivery with React Native and Flutter.'
      },
      {
        title: 'Offline-First Sync',
        titleHi: 'ऑफलाइन क्षमता',
        description: 'Ensures users can interact seamlessly even in poor network zones.'
      }
    ],
    technologies: ['React Native', 'Flutter', 'Firebase', 'Node.js', 'Redux', 'Expo'],
    featured: true,
    order: 2
  },
  {
    slug: 'ai-integration',
    title: 'AI Integration & Automation',
    titleHi: 'AI इंटीग्रेशन और ऑटोमेशन',
    category: 'digital-products',
    shortDescription: 'Connect cutting-edge Large Language Models and intelligent workflow pipelines directly into your operational stack.',
    shortDescriptionHi: 'स्मार्ट AI मॉडल और ऑटोमेशन के साथ अपने बिज़नेस को आगे बढ़ाएं।',
    fullDescription: 'Supercharge your daily operations with custom AI integrations. From semantic document processing and automatic catalog tag generation to predictive recommendations and customized internal knowledge agents, Pixelix makes AI practical, measurable, and reliable.',
    badge: 'Next-Gen',
    iconName: 'Cpu',
    deliverables: [
      'Custom LLM API orchestration (OpenAI, Gemini, Claude)',
      'Automated background data pipeline workflows',
      'Intelligent document summarization & extraction',
      'AI-assisted customer insight dash',
      'Privacy-first security & token cost optimization'
    ],
    deliverablesHi: [
      'कस्टम LLM API इंटीग्रेशन',
      'वर्कफ़्लो ऑटोमेशन और डेटा समरी',
      'डेटा प्राइवेसी और टोकन कॉस्ट ऑप्टिमाइजेशन'
    ],
    features: [
      {
        title: 'Practical ROI',
        titleHi: 'मापने योग्य परिणाम',
        description: 'We prioritize tangible time-savings and automation over flashy gimmicks.'
      },
      {
        title: 'Secure & Private',
        titleHi: 'सुरक्षित और निजी',
        description: 'Zero data leakage; safe API gateway enforcement.'
      }
    ],
    technologies: ['OpenAI', 'Gemini API', 'LangChain', 'Python', 'Vector DB', 'FastAPI'],
    featured: true,
    order: 3
  },
  {
    slug: 'chatbot-solutions',
    title: 'Intelligent Chatbot Solutions',
    titleHi: 'चैटबॉट सॉल्यूशंस',
    category: 'digital-products',
    shortDescription: '24/7 autonomous customer care, lead qualification, and WhatsApp / Web conversational assistants.',
    shortDescriptionHi: '24/7 ग्राहकों की मदद और लीड्स हासिल करने वाले स्मार्ट चैटबॉट।',
    fullDescription: 'Never lose another midnight lead or support ticket. Pixelix builds conversational AI assistants that understand bilingual vernaculars, answer complex business questions accurately, book appointments, and hand off smoothly to human operators when needed.',
    badge: 'High Conversion',
    iconName: 'MessageSquareCode',
    deliverables: [
      'Omnichannel chatbot (Web, WhatsApp Business, Instagram DM)',
      'Contextual FAQ database training and dynamic retrieval',
      'Lead capture routing straight to CRM / Email / WhatsApp',
      'Multi-language conversational support (Hindi, English, Hinglish)',
      'Live chat agent fallback and control dashboard'
    ],
    deliverablesHi: [
      'वेब और WhatsApp चैटबॉट इंटीग्रेशन',
      'द्विभाषी बातचीत (हिंदी + अंग्रेजी)',
      'सीधे CRM या ईमेल में लीड नोटिफिकेशन'
    ],
    features: [
      {
        title: 'Natural Vernacular',
        titleHi: 'सहज भाषा समझ',
        description: 'Fluid comprehension of conversational nuances, Hindi, and English.'
      },
      {
        title: 'Instant Action Triggers',
        titleHi: 'तुरंत एक्शन',
        description: 'Schedules calls, takes orders, and captures verified contact details.'
      }
    ],
    technologies: ['WhatsApp Cloud API', 'WebSockets', 'NLP', 'Node.js', 'React'],
    featured: true,
    order: 4
  },
  {
    slug: 'seo-search-growth',
    title: 'SEO & Search Growth',
    titleHi: 'SEO और सर्च ग्रोथ',
    category: 'digital-products',
    shortDescription: 'Technical SEO audits, high-intent keyword positioning, and organic rank momentum that drives lasting revenue.',
    shortDescriptionHi: 'गूगल पर आपकी वेबसाइट को शीर्ष पर लाने के लिए सर्च ऑप्टिमाइजेशन।',
    fullDescription: 'Climb Google ranks and capture high-intent buyers organically. We address Core Web Vitals, semantic schema markups, backlink profiles, competitive keyword mapping, and local Google My Business signals for maximum visibility.',
    badge: 'Growth Engine',
    iconName: 'TrendingUp',
    deliverables: [
      'Comprehensive 40+ point technical SEO audit & fix report',
      'Competitor keyword gap analysis & target search roadmap',
      'On-page metadata, schema markup, and speed optimization',
      'Local SEO setup (Google Business Profile & local citations)',
      'Monthly rank tracking and traffic analytics reports'
    ],
    deliverablesHi: [
      'तकनीकी SEO ऑडिट और सुधार',
      'कीवर्ड रिसर्च और ऑन-पेज ऑप्टिमाइजेशन',
      'गूगल माय बिज़नेस प्रोफाइल सेटअप'
    ],
    features: [
      {
        title: 'Core Web Vitals Perfection',
        titleHi: 'सुपरफ़ास्ट परफॉरमेंस',
        description: 'Sub-second loads to ensure both Google crawler approval and user delight.'
      },
      {
        title: 'Intent Matching',
        titleHi: 'सटीक ग्राहक रीच',
        description: 'Targets searchers who are actively ready to purchase your services.'
      }
    ],
    technologies: ['Google Search Console', 'Ahrefs', 'Schema.org', 'Lighthouse', 'Vite SSR'],
    featured: false,
    order: 5
  },
  {
    slug: 'brand-identity',
    title: 'Brand Identity & Logo Systems',
    titleHi: 'ब्रांड पहचान और लोगो सिस्टम',
    category: 'brand-identity',
    shortDescription: 'Memorable brand marks, complete identity kits, business cards, letterheads, and digital ID cards that leave an impression.',
    shortDescriptionHi: 'याद रहने वाली ब्रांड पहचान — लोगो सिस्टम, बिज़नेस कार्ड और आइडेंटिटी किट।',
    fullDescription: 'As outlined in our design philosophy, your brand is the soul of your business. We craft memorable visual identities that blend warm sunset tones, soft dimensional depth, and typographic elegance. From initial sketch concepts to vector masters.',
    badge: '5 Vector Logos Deliverable',
    iconName: 'Sparkles',
    deliverables: [
      'Deliverable: 5 custom vector logos in professional PDF format',
      'Complete brand identity kit with typography & color standards',
      'Print-ready premium business card designs',
      'Official corporate letterhead templates',
      'Digital employee & executive ID cards'
    ],
    deliverablesHi: [
      'डिलीवरेबल: प्रोफेशनल PDF में 5 कस्टम वेक्टर लोगो',
      'लोगो सिस्टम और आइडेंटिटी किट',
      'बिज़नेस कार्ड और लेटरहेड डिज़ाइन',
      'डिजिटल ID कार्ड'
    ],
    features: [
      {
        title: 'Complete Identity Kit',
        titleHi: 'कम्प्लीट आइडेंटिटी किट',
        description: 'Cohesive design language across social, digital, and physical paper touchpoints.'
      },
      {
        title: '5 Custom Logo Concepts',
        titleHi: '5 कस्टम लोगो',
        description: 'Versatile vector options with distinct thematic directions (e.g., Sunset Pixel, Orbit, Glass).'
      }
    ],
    technologies: ['Adobe Illustrator', 'Figma', 'Vector Math', 'PDF/X-4', 'CMYK Specs'],
    featured: true,
    order: 6
  },
  {
    slug: 'marketplace-growth',
    title: 'Marketplace Growth (Catalog to Checkout)',
    titleHi: 'मार्केटप्लेस ग्रोथ (कैटलॉग से चेकआउट तक)',
    category: 'marketplace-growth',
    shortDescription: 'End-to-end catalog management and product listing support optimized for Amazon, Meesho, and Flipkart.',
    shortDescriptionHi: 'Amazon, Meesho और Flipkart पर कैटलॉग मैनेजमेंट और प्रोडक्ट लिस्टिंग सपोर्ट।',
    fullDescription: 'Turn marketplace traffic into consistent checkouts. We handle complete catalog creation, high-converting product titles, keyword-rich bullet points, backend search terms, A+ content layouts, and pricing strategy for India\'s leading e-commerce marketplaces.',
    badge: 'E-Commerce Power',
    iconName: 'ShoppingBag',
    deliverables: [
      'End-to-end catalog management & batch product listing setup',
      'Optimized listing copy for Amazon, Meesho, and Flipkart',
      'A+ Content (EBC) banner layouts and brand store design',
      'Marketplace keyword indexing & category node mapping',
      'Inventory sync guidance & buy-box optimization'
    ],
    deliverablesHi: [
      'Amazon, Meesho और Flipkart के लिए कैटलॉग मैनेजमेंट',
      'प्रोडक्ट लिस्टिंग और A+ कंटेंट डिज़ाइन',
      'चेकआउट तक बिक्री बढ़ाने की रणनीति'
    ],
    features: [
      {
        title: 'Multi-Marketplace Reach',
        titleHi: 'मल्टी-मार्केटप्लेस रीच',
        description: 'Structured workflows across Amazon India, Flipkart, and Meesho.'
      },
      {
        title: 'Catalog to Checkout',
        titleHi: 'कैटलॉग से चेकआउट',
        description: 'Holistic funnel focus from first search impression to final confirmed order.'
      }
    ],
    technologies: ['Amazon Seller Central', 'Flipkart Seller Hub', 'Meesho Supplier Panel', 'Excel Batch', 'A+ Builder'],
    featured: true,
    order: 7
  },
  {
    slug: 'product-visuals',
    title: 'Product Visuals & Retouching',
    titleHi: 'प्रोडक्ट विजुअल्स और रीचिंग',
    category: 'product-visuals',
    shortDescription: 'Background removal, clean cut-outs, color correction, high-resolution upscaling, lifestyle visuals, and packaging specs.',
    shortDescriptionHi: 'प्रोडक्ट को बेहतर दिखाने वाले एडिटेड इमेज, क्लीन कट-आउट और लाइफस्टाइल विजुअल्स।',
    fullDescription: 'High-converting e-commerce starts with visuals that inspire trust. Pixelix provides studio-grade background removal, ultra-clean shadow generation, precise color matching, sharp callout infographics, and lifestyle 3D renders that showcase products in real-world environments.',
    badge: 'Studio Precision',
    iconName: 'Image',
    deliverables: [
      'Clean background removal & crisp edge cut-outs',
      'High-resolution upscaling and detail retouching',
      'Feature callout infographics and dimension breakdown cards',
      'Lifestyle contextual visuals showing product in use',
      'Packaging specification mockups and 3D preview wraps'
    ],
    deliverablesHi: [
      'क्लीन बैकग्राउंड रिमूवल और रीचिंग',
      'कलर करेक्शन और हाई-रेज़ोल्यूशन अपस्केलिंग',
      'फीचर कॉलआउट्स और लाइफस्टाइल विजुअल्स'
    ],
    features: [
      {
        title: 'Clean Cut-Outs',
        titleHi: 'क्लीन कट-आउट्स',
        description: 'Surgical edge refinement on transparent and pure white e-commerce backgrounds.'
      },
      {
        title: 'Lifestyle Visuals',
        titleHi: 'लाइफस्टाइल विजुअल्स',
        description: 'Contextual staging that illustrates scale, utility, and sensory appeal.'
      }
    ],
    technologies: ['Photoshop', 'Lightroom', 'AI Upscaling', 'Substance 3D', 'Canva Pro'],
    featured: false,
    order: 8
  },
  {
    slug: 'campaigns-marketing',
    title: 'Campaigns (Screen & Paper)',
    titleHi: 'कैंपेन (स्क्रीन और प्रिंट)',
    category: 'campaigns',
    shortDescription: 'Digital marketing strategies, promotional assets, pamphlets, menus, catalogs, brochures, and offline banners.',
    shortDescriptionHi: 'स्क्रीन और प्रिंट दोनों पर असरदार कैंपेन — पैम्फलेट, ब्रोशर, मेन्यू और डिजिटल मार्केटिंग।',
    fullDescription: 'Integrated advertising that connects online impressions with physical street presence. Whether launching a festive discount on social media or distributing luxury print collateral at trade shows, our campaigns command attention and drive footfall.',
    badge: '5 Print Collaterals Deliverable',
    iconName: 'Megaphone',
    deliverables: [
      'Deliverable: 5 professional flyers, brochures, and offline banners in high-resolution PDF',
      'Comprehensive digital marketing strategy & launch calendar',
      'Social media ad creative sets with targeted copy variations',
      'Physical print collateral (menus, catalogs, folded brochures)',
      'Large format outdoor hoardings and offline exhibition banners'
    ],
    deliverablesHi: [
      'डिलीवरेबल: हाई-रेज़ोल्यूशन PDF में 5 फ्लायर/ब्रोशर/बैनर',
      'डिजिटल मार्केटिंग रणनीति और प्रमोशनल क्रिएटिव',
      'ऑफलाइन बैनर और पैम्फलेट डिज़ाइन'
    ],
    features: [
      {
        title: 'Unified Omni-Channel',
        titleHi: 'ओमनी-चैनल प्रभाव',
        description: 'Harmonious brand messaging on smartphone screens and tangible paper.'
      },
      {
        title: 'Print-Ready Precision',
        titleHi: 'प्रिंट-रेडी फॉर्मैट',
        description: 'Exact 300 DPI, CMYK color profiles, bleeds, and vector typography.'
      }
    ],
    technologies: ['Meta Ads', 'Google Ads', 'InDesign', 'Illustrator', 'High-Res PDF/X'],
    featured: true,
    order: 9
  },
  {
    slug: 'content-systems',
    title: 'Content Systems & Social Media',
    titleHi: 'कंटेंट सिस्टम्स और सोशल मीडिया',
    category: 'content-systems',
    shortDescription: 'Social media posts, Facebook covers, profile graphics, and campaign creatives that keep your brand consistently active.',
    shortDescriptionHi: 'कंटेंट जो ब्रांड को एक्टिव रखे — सोशल मीडिया पोस्ट, फेसबुक कवर और प्रोफाइल ग्राफिक्स।',
    fullDescription: 'Consistent presence is the key to digital dominance. Pixelix builds repeatable content engines: bespoke social post templates, dynamic carousel graphics, eye-catching profile covers, and campaign banners ready for weekly distribution.',
    badge: '5 Social Creative PDFs Deliverable',
    iconName: 'Share2',
    deliverables: [
      'Deliverable: 5 social media creative PDFs tailored to your brand voice',
      'Custom Facebook, LinkedIn & Twitter banners and cover graphics',
      'Polished profile avatars and recognizable icon lockups',
      'Weekly social post calendar framework and caption copy',
      'High-impact carousel graphics and promotional announcement cards'
    ],
    deliverablesHi: [
      'डिलीवरेबल: 5 सोशल मीडिया क्रिएटिव PDF',
      'सोशल मीडिया पोस्ट्स और फेसबुक कवर्स',
      'प्रोफाइल ग्राफिक्स और कैंपेन क्रिएटिव'
    ],
    features: [
      {
        title: 'Always Active Presence',
        titleHi: 'निरंतर ब्रांड उपस्थिति',
        description: 'Never go dark; maintain constant authority in your audience\'s feeds.'
      },
      {
        title: 'Multi-Format Fit',
        titleHi: 'हर फॉर्मेट में परफेक्ट',
        description: 'Tailored aspect ratios for 1:1 feeds, 9:16 reels/stories, and widescreen covers.'
      }
    ],
    technologies: ['Figma', 'Photoshop', 'After Effects', 'Canva', 'Social Buffer'],
    featured: true,
    order: 10
  },
  {
    slug: 'order-creation-processing',
    title: 'Order Creation & Processing',
    titleHi: 'ऑर्डर क्रिएशन और प्रोसेसिंग',
    category: 'ecom-operations',
    shortDescription: 'High-speed multi-channel order capture, automated GST invoice generation, packaging slip printing, and SKU mapping across Amazon, Flipkart, Meesho & Shopify.',
    shortDescriptionHi: 'अमेज़न, फ्लिपकार्ट, मीशो और शॉपिफाई के लिए सटीक और तेज़ ऑर्डर प्रोसेसिंग।',
    fullDescription: 'Pixelix manages your daily e-commerce order flow from the moment a customer clicks Buy to the final pack. We handle bulk order fetching, batch GST tax invoice generation, shipping label printing, SKU bundling, address validation, and marketplace status confirmation with zero fulfillment delays.',
    badge: 'E-Com Core',
    iconName: 'PackageCheck',
    deliverables: [
      'Multi-marketplace automated order pulling & validation',
      'Batch GST tax invoice & packing slip generation',
      'Combo & virtual bundle SKU mapping to physical warehouse inventory',
      'Address hygiene & COD customer confirmation follow-up',
      'Marketplace fulfillment status auto-updates (Amazon Easy Ship, Flipkart Smart, Meesho Direct)'
    ],
    deliverablesHi: [
      'मल्टी-प्लेटफ़ॉर्म ऑटोमेटेड ऑर्डर सिंक व सत्यापन',
      'बैच GST टैक्स इनवॉइस और पैकिंग स्लिप जनरेशन',
      'COD कन्फर्मेशन व एड्रेस वेरिफिकेशन'
    ],
    features: [
      {
        title: 'Zero Latency Order Dispatch',
        titleHi: 'शून्य देरी',
        description: 'Processes bulk orders within 2 hours of arrival to maintain top seller tier badges.'
      },
      {
        title: 'Error-Free SKU Mapping',
        titleHi: 'सटीक इन्वेंट्री मैपिंग',
        description: 'Translates complex combo listings into exact individual warehouse pick items.'
      },
      {
        title: 'COD Verification',
        titleHi: 'COD पुष्टि',
        description: 'Filters bogus cash-on-delivery orders before dispatch to slash return-to-origin rates.'
      }
    ],
    technologies: ['Amazon Seller Central', 'Flipkart Seller Hub', 'Meesho Supplier Panel', 'Shopify Plus', 'Unicommerce', 'EasyEcom'],
    featured: true,
    order: 11
  },
  {
    slug: 'product-listing-cataloging',
    title: 'Product Listing & Cataloging',
    titleHi: 'प्रोडक्ट लिस्टिंग और कैटलॉगिंग',
    category: 'marketplace-growth',
    shortDescription: 'Algorithm-optimized product listings, parent-child variation setups, keyword-dense bullet points, and high-converting A+ Content / EBC for online marketplaces.',
    shortDescriptionHi: 'अमेज़न, फ्लिपकार्ट और मीशो पर आकर्षक और SEO-अनुकूलित प्रोडक्ट लिस्टिंग।',
    fullDescription: 'Win search visibility and click-through rates across Amazon, Flipkart, Meesho, Shopify, and Myntra. We build high-ranking product titles, bullet points engineered around customer pain points, backend search term indexing, and visually stunning A+ Content / Enhanced Brand Content (EBC) that turns browsers into buyers.',
    badge: 'High Conversion',
    iconName: 'FileSpreadsheet',
    deliverables: [
      'Parent-child multi-variant matrix setup (Size, Color, Material, Pack combinations)',
      'High-intent search keyword integration in Titles, Bullet Points & Backend Terms',
      'A+ Content (Enhanced Brand Content) modules, banner layouts & comparison charts',
      'Brand Registry, GTIN/UPC exemption & category ungating documentation',
      'Multi-marketplace catalog syndication (Amazon, Flipkart, Meesho, Shopify, Blinkit, Zepto)'
    ],
    deliverablesHi: [
      'मल्टी-वेरिएंट लिस्टिंग और पैरेंट-चाइल्ड सेटअप',
      'उच्च सर्च वॉल्यूम वाले कीवर्ड्स और बुलेट पॉइंट्स',
      'A+ कंटेंट / EBC बैनर डिज़ाइन व ब्रांड रजिस्ट्री सपोर्ट'
    ],
    features: [
      {
        title: 'Marketplace Search Optimization',
        titleHi: 'सर्च ऑप्टिमाइज़ेशन',
        description: 'In-depth keyword extraction from Helium 10 and Jungle Scout for top organic ranking.'
      },
      {
        title: 'A+ Visual Conversion Storytelling',
        titleHi: 'A+ कंटेंट डिज़ाइन',
        description: 'Rich graphic modules that boost listing conversion rates by up to 28%.'
      },
      {
        title: 'Zero Category Rejection',
        titleHi: 'कैटेगरी अप्रूवल',
        description: '100% compliant with strict marketplace attributes and mandatory compliance values.'
      }
    ],
    technologies: ['Helium 10', 'Jungle Scout', 'Photoshop', 'Amazon Brand Registry', 'Flipkart Assured', 'Shopify'],
    featured: true,
    order: 12
  },
  {
    slug: 'dispatch-logistics-management',
    title: 'Dispatch & Logistics Management',
    titleHi: 'डिस्पैच और लॉजिस्टिक्स ऑपरेशन्स',
    category: 'ecom-operations',
    shortDescription: 'Warehouse packaging coordination, multi-courier partner allocation, manifest creation, SLA-driven pickup handover, and transit tracking.',
    shortDescriptionHi: 'समय पर सुरक्षित पैकिंग, कूरियर हैंडओवर और रियल-टाइम ट्रैकिंग।',
    fullDescription: 'Pixelix ensures your packed orders leave the warehouse swiftly, securely, and strictly within marketplace shipping SLAs. We coordinate multi-courier partner allocations, automate manifest generation, monitor carrier pickup handoffs, and proactively track parcels to deliver stellar customer satisfaction and 99.8%+ on-time dispatch metrics.',
    badge: 'Operational SLA',
    iconName: 'Truck',
    deliverables: [
      'Multi-carrier shipping integration (Shiprocket, Delhivery, BlueDart, Ecom Express, Xpressbees)',
      'Batch manifest printing and physical courier pickup handover sign-offs',
      'Late-dispatch alert prevention & SLA breach safeguards',
      'Packaging spec compliance (fragile taping, bubble wrap specs, corrugated box sizing)',
      'Proof of Delivery (POD) archiving and transit tracking'
    ],
    deliverablesHi: [
      'मल्टी-कूरियर इंटीग्रेशन और सबसे तेज़ रूटिंग',
      'बैच मैनिफेस्ट जनरेशन और कूरियर हैंडओवर',
      'पैकेजिंग स्पेसिफिकेशन और सुरक्षित पारगमन'
    ],
    features: [
      {
        title: 'Carrier Rate Optimization',
        titleHi: 'कूरियर दर अनुकूलन',
        description: 'Dynamically routes orders to the lowest-cost, highest-reliability carrier per pin code.'
      },
      {
        title: '99.8% On-Time SLA',
        titleHi: 'SLA अनुपालन',
        description: 'Protects your seller rating and avoids marketplace late-shipment penalty fees.'
      },
      {
        title: 'Manifest Audit Trail',
        titleHi: 'मैनिफेस्ट रिकॉर्ड',
        description: 'Counters courier misplacement claims with signed digital & paper manifests.'
      }
    ],
    technologies: ['Shiprocket', 'Delhivery One', 'BlueDart', 'Ecom Express', 'Amazon Easy Ship', 'Smart Pack'],
    featured: true,
    order: 13
  },
  {
    slug: 'returns-rto-claims',
    title: 'Returns & Claims Management (RTO)',
    titleHi: 'रिटर्न और सेफ-टी क्लेम रिकवरी (RTO)',
    category: 'ecom-operations',
    shortDescription: 'Aggressive RTO reduction strategies, physical returns unboxing audit, and recovery of lost/damaged funds via Amazon Safe-T and Flipkart SPF claims.',
    shortDescriptionHi: 'RTO नुकसान कम करें और डैमेज पार्सल पर शत-प्रतिशत क्लेम रिकवरी पाएं।',
    fullDescription: 'Unmonitored returns and RTOs (Return to Origin) drain e-commerce profitability. Pixelix deploys automated NDR IVR/WhatsApp customer verification to save in-transit deliveries, runs a meticulous return inspection audit with video/photo evidence upon arrival, and relentlessly files Safe-T claims and SPF claims to recover money for damaged or switched inventory.',
    badge: 'Profit Recovery',
    iconName: 'RotateCcw',
    deliverables: [
      'Automated NDR (Non-Delivery Report) customer WhatsApp & IVR outreach',
      'Physical return package unboxing inspection with high-res photo/video evidence',
      'Amazon Safe-T claim & Flipkart SPF claim filing with 90%+ recovery success rate',
      'Courier return transit monitoring to prevent lost in transit (LIT) inventory leaks',
      'Bi-weekly damage reimbursement audit report'
    ],
    deliverablesHi: [
      'व्हाट्सएप और IVR द्वारा NDR फॉलो-अप (RTO में कमी)',
      'अमेज़न Safe-T क्लेम और फ्लिपकार्ट SPF क्लेम फाइलिंग',
      'वीडियो साक्ष्य के साथ रिटर्न पार्सल अनबॉक्सिंग ऑडिट'
    ],
    features: [
      {
        title: 'Up to 35% RTO Reduction',
        titleHi: 'RTO में भारी कमी',
        description: 'Proactively corrects flawed addresses and re-attempts deliveries before courier return.'
      },
      {
        title: 'Maximum Claim Payouts',
        titleHi: 'अधिकतम क्लेम रिकवरी',
        description: 'Recovers hundreds of thousands of rupees annually in wrongful return reimbursements.'
      },
      {
        title: 'Fraud Buyer Blacklisting',
        titleHi: 'धोखाधड़ी से बचाव',
        description: 'Maintains internal database of chronic return abusers to block future losses.'
      }
    ],
    technologies: ['Safe-T Portal', 'Flipkart SPF', 'WhatsApp Business API', 'WMS Returns Desk', 'Excel Claims Tracker'],
    featured: true,
    order: 14
  },
  {
    slug: 'inventory-stock-sync',
    title: 'Inventory & Stock Management',
    titleHi: 'इन्वेंट्री और स्टॉक सिंक्रोनाइज़ेशन',
    category: 'ecom-operations',
    shortDescription: 'Centralized multi-channel stock allocation across FBA, Flipkart Assured/Lite, Meesho, and self-ship warehouses to prevent stockouts and high cancel penalties.',
    shortDescriptionHi: 'मल्टी-प्लेटफ़ॉर्म स्टॉक सिंक, FBA इनबाउंडिंग और स्टॉकआउट रोकथाम।',
    fullDescription: 'Stop overselling and out-of-stock cancellations. Pixelix synchronizes your inventory pool across Amazon, Flipkart, Meesho, Shopify, and local hubs in real time. We manage low-stock threshold alerts, forecast seasonal reorder quantities, create FBA/Fulfillment Center inbounds, and optimize stock velocity across all regional nodes.',
    badge: 'Stock Protection',
    iconName: 'Boxes',
    deliverables: [
      'Centralized multi-channel stock sync pool across all selling channels',
      'Low-stock threshold triggers and supplier reorder lead-time forecasting',
      'Amazon FBA & Flipkart warehouse inbound shipment creation (box labeling, pallet prep)',
      'Dead stock and aging inventory velocity reports to minimize storage fees',
      'Virtual bundle inventory allocation with auto-adjusting child counts'
    ],
    deliverablesHi: [
      'सभी ई-कॉमर्स प्लेटफ़ॉर्म पर एक साथ रियल-टाइम स्टॉक सिंक',
      'अमेज़न FBA और फ्लिपकार्ट वेयरहाउस इनबाउंड शिपमेंट',
      'री-ऑर्डर पूर्वानुमान और डेड स्टॉक रिपोर्ट'
    ],
    features: [
      {
        title: 'Zero Cancellation Penalties',
        titleHi: 'शून्य कैंसिलेशन',
        description: 'Real-time multi-channel inventory locking stops duplicate sales on identical stock.'
      },
      {
        title: 'FBA & FC Inbounding',
        titleHi: 'FBA इनबाउंडिंग',
        description: 'End-to-end appointment scheduling, barcode labeling, and shipment manifests.'
      },
      {
        title: 'Aging Stock Liquidation',
        titleHi: 'स्टोरेज शुल्क बचत',
        description: 'Identifies slow-moving SKUs before expensive long-term storage fees kick in.'
      }
    ],
    technologies: ['Amazon FBA', 'Flipkart Assured', 'Meesho Inventory Hub', 'Unicommerce', 'Vinculum', 'Excel WMS'],
    featured: true,
    order: 15
  },
  {
    slug: 'ecom-account-management',
    title: 'End-to-End E-Commerce Account Management',
    titleHi: 'फुल ई-कॉमर्स अकाउंट मैनेजमेंट',
    category: 'marketplace-growth',
    shortDescription: 'Dedicated operational team managing daily seller central health, Buy Box retention, festival promotion campaigns, and aggressive sales growth.',
    shortDescriptionHi: 'अमेज़न, फ्लिपकार्ट और मीशो पर आपके ब्रांड का सम्पूर्ण दैनिक संचालन और ग्रोथ।',
    fullDescription: 'Focus on manufacturing and product sourcing while Pixelix runs your complete e-commerce enterprise. From maintaining green account health metrics (ODR, LSR, VTR) and winning the Buy Box to managing festival mega-sales (Great Indian Festival, Big Billion Days) and running precision PPC ad campaigns, we are your dedicated digital commerce workforce.',
    badge: 'Flagship Retainer',
    iconName: 'Store',
    deliverables: [
      'Dedicated E-Commerce Operations Lead managing Seller Central & Supplier Hubs',
      'Daily account health maintenance (ODR, Late Dispatch, Cancellation Rate safeguards)',
      'Festival sale deal registration (Lightning Deals, 7-Day Deals, Price Drops, Coupons)',
      'Buy Box price parity monitoring and automated competitor repricing',
      'Weekly unit economics, gross merchandise value (GMV), and P&L financial reports'
    ],
    deliverablesHi: [
      'समर्पित ई-कॉमर्स ऑपरेशन्स मैनेजर और दैनिक अकाउंट मॉनिटरिंग',
      'फेस्टिवल सेल (Big Billion Days, GIF) डील रजिस्ट्रेशन',
      'बाय बॉक्स (Buy Box) सुरक्षा और साप्ताहिक P&L रिपोर्ट'
    ],
    features: [
      {
        title: 'Proactive Policy Guardian',
        titleHi: 'पॉलिसी सुरक्षा',
        description: 'Quick resolution of listing suppressions, trademark claims, and performance flags.'
      },
      {
        title: 'Festival Event Scaling',
        titleHi: 'फेस्टिवल सेल तैयारी',
        description: 'Pre-stocks inventory and optimizes bids to capture 5x-10x sales surges during festive seasons.'
      },
      {
        title: 'Transparent Unit Economics',
        titleHi: 'पारदर्शी लाभ रिपोर्ट',
        description: 'Tracks net margins after commission, shipping fees, ads, and GST deductions.'
      }
    ],
    technologies: ['Amazon Seller Central', 'Flipkart Seller Hub', 'Meesho Supplier Panel', 'Shopify Admin', 'Helium 10', 'PowerBI'],
    featured: true,
    order: 16
  }
];

export const initialProjects = [
  {
    title: 'Terracotta Artisans E-Commerce',
    client: 'Vanya Lifestyle',
    category: 'digital-products',
    tagline: 'Modern D2C storefront with tactile terracotta branding and 3D product view',
    description: 'Complete digital makeover including headless React commerce, catalog overhaul across Amazon & Meesho, and warm sunset branding.',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'Brand Identity', 'Marketplace', '3D UI'],
    metrics: [
      { label: 'Conversion Lift', value: '+142%' },
      { label: 'Page Speed', value: '98/100' },
      { label: 'Order Growth', value: '3.4x' }
    ],
    featured: true
  },
  {
    slug: 'urban-bistro-campaign',
    title: 'Bistro 52 Brand & Launch Campaign',
    client: 'Bistro 52 Hospitality',
    category: 'campaigns',
    tagline: 'Dual screen and print campaign with 5 vector logos and offline menus',
    description: 'Crafted the entire visual identity kit, digital ID cards, QR smart menus, and outdoor advertising that drove packed tables from opening week.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    tags: ['Brand Identity', 'Print Collateral', 'Social Creatives'],
    metrics: [
      { label: 'Footfall Increase', value: '+210%' },
      { label: 'Social Engagement', value: '+450%' },
      { label: 'Design Deliverables', value: '15 Assets' }
    ],
    featured: true
  },
  {
    slug: 'aura-health-ai-chat',
    title: 'Aura Telehealth AI Assistant & Mobile App',
    client: 'Aura Care Networks',
    category: 'ai-solutions',
    tagline: 'Bilingual conversational assistant and iOS/Android app with seamless booking',
    description: 'Engineered an intelligent Hindi & English medical intake bot with automated triage, reducing front-desk response times to under 10 seconds.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    tags: ['Mobile App', 'AI Chatbot', 'FastAPI', 'Node.js'],
    metrics: [
      { label: 'Avg Wait Time', value: '< 10s' },
      { label: 'Booking Rate', value: '+88%' },
      { label: 'User Satisfaction', value: '4.9/5' }
    ],
    featured: true
  }
];
