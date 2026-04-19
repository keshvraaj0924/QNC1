export interface NewsItem {
  id: string;
  slug: string;
  date: {
    en: string;
    ar: string;
  };
  category: {
    en: string;
    ar: string;
  };
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  content: {
    en: string;
    ar: string;
  };
  mainImage: string;
  gallery?: string[];
}

export const newsData: NewsItem[] = [
  {
    id: "01",
    slug: "audio-technology-partnership",
    date: { en: "January 15, 2026", ar: "15 يناير 2026" },
    category: { en: "Strategic Partnership", ar: "شراكة استراتيجية" },
    title: { 
      en: "Audio Technology Partnership", 
      ar: "شراكة استراتيجية مع أوديو تكنولوجي" 
    },
    description: {
      en: "Qudrat National Company (QNC) announces a strategic partnership with Audio Technology Egypt to elevate the Saudi technology market.",
      ar: "شركة قدرات الوطنية (QNC) تعلن عن شراكة استراتيجية مع شركة أوديو تكنولوجي مصر للنهوض بسوق التكنولوجيا السعودي."
    },
    content: {
      en: `Qudrat National Company (QNC) is proud to announce the establishment of a new company in the Kingdom of Saudi Arabia through a strategic partnership with Audio Technology Egypt, one of the region's most respected leaders in professional audio, visual, and integrated technology solutions.

This partnership brings together QNC's deep local market expertise and operational excellence with Audio Technology's decades of technical leadership and innovation. The newly formed entity will deliver advanced AV, acoustics, control systems, and integrated technology solutions tailored to the evolving needs of Saudi Arabia's rapidly growing sectors—including entertainment, culture, tourism, education, and smart infrastructure.

By combining global experience with local capability, this collaboration will contribute to the Kingdom's Vision 2030 goals by enhancing technology readiness, supporting national talent development, and elevating the quality of specialized services available in the Saudi market.

QNC and Audio Technology share a commitment to excellence, innovation, and long term value creation. Together, we look forward to shaping a new benchmark for integrated technology solutions in Saudi Arabia.`,
      ar: `تفخر شركة قدرات الوطنية (QNC) بالإعلان عن تأسيس شركة جديدة في المملكة العربية السعودية من خلال شراكة استراتيجية مع شركة أوديو تكنولوجي مصر، أحد القادة المرموقين في المنطقة في مجال الحلول الصوتية والمرئية الاحترافية والحلول التكنولوجية المتكاملة.

تجمع هذه الشراكة بين الخبرة العميقة لشركة قدرات الوطنية في السوق المحلي والتميز التشغيلي، وبين الريادة التقنية والابتكار الذي تتمتع به شركة أوديو تكنولوجي على مدار عقود. ستقدم الكيان الجديد حلولاً متقدمة في مجالات الصوت والصورة، وأنظمة التحكم، والحلول التكنولوجية المتكاملة المصممة خصيصاً لتلبية الاحتياجات المتطورة للقطاعات سريعة النمو في المملكة - بما في ذلك الترفيه والثقافة والسياحة والتعليم والبنية التحتية الذكية.

من خلال الجمع بين الخبرة العالمية والقدرة المحلية، ستساهم هذه التعاونات في تحقيق أهداف رؤية المملكة 2030 من خلال تعزيز الجاهزية التكنولوجية، ودعم تطوير المواهب الوطنية، والارتقاء بجودة الخدمات المتخصصة المتاحة في السوق السعودي.

تتشارك شركتي قدرات الوطنية وأوديو تكنولوجي الالتزام بالتميز والابتكار وخلق قيمة طويلة الأجل. معاً، نتطلع إلى وضع معيار جديد للحلول التكنولوجية المتكاملة في المملكة العربية السعودية.`
    },
    mainImage: "/assets/NewsEvents/NewsInformationPhotosForWebsite/News information & Photos for Website/AudioTechnologyPartenership/QNC-AudioTechnologyParteneship.jpg"
  },
  {
    id: "02",
    slug: "disruptx-strategic-agreement",
    date: { en: "January 10, 2026", ar: "10 يناير 2026" },
    category: { en: "Digital Transformation", ar: "التحول الرقمي" },
    title: { 
      en: "DisruptX Strategic Agreement", 
      ar: "اتفاقية استراتيجية مع ديزرابت إكس (DisruptX)" 
    },
    description: {
      en: "QNC signs a strategic agreement with DisruptX UAE to implement advanced CAFM solutions for Total Facilities Management.",
      ar: "شركة قدرات توقع اتفاقية استراتيجية مع ديزرابت إكس الإمارات العربية المتحدة لتطبيق حلول CAFM المتقدمة لإدارة المرافق الشاملة."
    },
    content: {
      en: `Qudrat National Company (QNC) is pleased to announce the signing of a strategic contract with DisruptX UAE, a leading provider of smart building technologies and digital facility management platforms. Through this partnership, DisruptX will become QNC's official CAFM (Computer Aided Facility Management) system provider, supporting QNC's mission to elevate Total Facilities Management (TFM) services across the Kingdom of Saudi Arabia.

This collaboration marks a significant step in QNC's digital transformation journey. By integrating DisruptX's advanced CAFM platform, QNC will enhance operational efficiency, improve service response times, and deliver higher transparency and performance across all managed facilities.

This partnership aligns with QNC's commitment to adopting innovative technologies that strengthen its TFM capabilities and support the Kingdom's Vision 2030 goals for smart, sustainable, and digitally enabled infrastructure.

QNC looks forward to a successful collaboration with DisruptX as we continue to raise the standard of facility management services in Saudi Arabia.`,
      ar: `يسر شركة قدرات الوطنية (QNC) الإعلان عن توقيع عقد استراتيجي مع شركة ديزرابت إكس (DisruptX) الإمارات العربية المتحدة، المزود الرائد لتقنيات المباني الذكية ومنصات إدارة المرافق الرقمية. من خلال هذه الشراكة، ستصبح ديزرابت إكس المزود الرسمي لنظام إدارة المرافق بمعونة الحاسوب (CAFM) لشركة قدرات، مما يدعم مهمة الشركة في الارتقاء بخدمات إدارة المرافق الشاملة (TFM) في جميع أنحاء المملكة العربية السعودية.

يمثل هذا التعاون خطوة مهمة في رحلة التحول الرقمي لشركة قدرات. من خلال دمج منصة CAFM المتقدمة من ديزرابت إكس، ستعزز شركة قدرات الكفاءة التشغيلية، وتحسن أوقات الاستجابة للخدمة، وتقدم مستويات أعلى من الشفافية والأداء في جميع المرافق المدارة.

تتماشى هذه الشراكة مع التزام شركة قدرات بتبني تقنيات مبتكرة تعزز قدراتها في إدارة المرافق الشاملة وتدعم أهداف رؤية المملكة 2030 للبنية التحتية الذكية والمستدامة والممكنة رقمياً.

تتطلع شركة قدرات إلى تعاون ناجح مع ديزرابت إكس بينما نواصل رفع معايير خدمات إدارة المرافق في المملكة العربية السعودية.`
    },
    mainImage: "/assets/NewsEvents/NewsInformationPhotosForWebsite/News information & Photos for Website/DisruptXStrategicAgreement/QNC-DisruptXStrategicAgreement.jpg"
  },
  {
    id: "03",
    slug: "gardenia-landscaping-partnership",
    date: { en: "December 20, 2025", ar: "20 ديسمبر 2025" },
    category: { en: "Landscaping", ar: "تنسيق الحدائق" },
    title: { 
      en: "Gardenia Partnership for Landscaping Services", 
      ar: "شراكة جاردينيا لخدمات تنسيق الحدائق" 
    },
    description: {
      en: "QNC establishes a new entity with Gardenia Egypt to deliver world-class landscaping and horticulture solutions in KSA.",
      ar: "شركة قدرات تؤسس كياناً جديداً مع جاردينيا مصر لتقديم حلول تنسيق الحدائق والبستنة العالمية في المملكة."
    },
    content: {
      en: `Qudrat National Company (QNC) is pleased to announce the establishment of a new company in the Kingdom of Saudi Arabia through a strategic partnership with Gardenia Egypt, one of the region's most respected leaders in landscaping, horticulture, and outdoor environment development.

This partnership brings together QNC's strong local presence and operational excellence with Gardenia's decades of expertise in landscape design, construction, irrigation systems, and green area management. The newly formed entity will deliver world-class landscaping solutions tailored to the needs of Saudi Arabia's rapidly expanding sectors—including real estate, tourism, hospitality, public spaces, giga-projects, and urban development.

QNC and Gardenia share a commitment to excellence, innovation, and long-term value creation. Together, we look forward to shaping a greener, more sustainable future for the Kingdom.`,
      ar: `يسر شركة قدرات الوطنية (QNC) الإعلان عن تأسيس شركة جديدة في المملكة العربية السعودية من خلال شراكة استراتيجية مع شركة جاردينيا مصر، أحد القادة المرموقين في المنطقة في مجال تنسيق الحدائق والبستنة وتطوير البيئات الخارجية.

تجمع هذه الشراكة بين الحضور المحلي القوي لشركة قدرات والتميز التشغيلي، وبين خبرة جاردينيا الممتدة لعقود في تصميم المناظر الطبيعية وبنائها وأنظمة الري وإدارة المساحات الخضراء. سيقدم الكيان الجديد حلولاً عالمية لتنسيق الحدائق مصممة خصيصاً لاحتياجات القطاعات سريعة التوسع في المملكة - بما في ذلك العقارات والسياحة والضيافة والمساحات العامة والمشاريع العملاقة والتنمية الحضرية.

تتشارك شركتي قدرات الوطنية وجاردينيا الالتزام بالتميز والابتكار وخلق قيمة طويلة الأجل. معاً، نتطلع إلى تشكيل مستقبل أكثر خضرة واستدامة للملكة.`
    },
    mainImage: "/assets/NewsEvents/NewsInformationPhotosForWebsite/News information & Photos for Website/GardeniaPartenership/QNC-GardeniaParteneship.jpg"
  },
  {
    id: "04",
    slug: "qnc-major-contracts-2026",
    date: { en: "February 05, 2026", ar: "05 فبراير 2026" },
    category: { en: "Expansion", ar: "توسع" },
    title: { 
      en: "QNC Secures Major New Contracts", 
      ar: "شركة قدرات الوطنية تبرم عقوداً كبرى جديدة" 
    },
    description: {
      en: "Qudrat National Company continues its growth trajectory by signing several major Total Facility Management contracts with industry leaders.",
      ar: "تواصل شركة قدرات الوطنية مسار نموها من خلال توقيع العديد من عقود إدارة المرافق الشاملة الكبرى مع قادة الصناعة."
    },
    content: {
      en: `Qudrat National Company (QNC) is proud to announce a series of significant new contract wins that further solidify its position as a leading provider of Total Facilities Management (TFM) in Saudi Arabia. These strategic agreements cover a wide range of specialized services, including hard services, soft services, and integrated technology management for prestigious clients across the Kingdom.

Among the key highlights is our expanded collaboration with Saudi Arabia Railways (SAR), involving new operations at major hubs. We have also secured key agreements with the C.A.T. Group and other influential organizations in the real estate and industrial sectors.

These partnerships underscore the trust that industry leaders place in QNC's operational standards and our commitment to supporting the Kingdom's economic growth through world-class facility support services. We remain dedicated to operational excellence, sustainability, and safety across all our new and existing projects.`,
      ar: `تفخر شركة قدرات الوطنية (QNC) بالإعلان عن سلسلة من العقود الكبرى الجديدة التي تعزز مكانتها كمزود رائد لإدارة المرافق الشاملة (TFM) في المملكة العربية السعودية. تغطي هذه الاتفاقيات الاستراتيجية مجموعة واسعة من الخدمات المتخصصة، بما في ذلك الخدمات الصلبة، والخدمات اللينة، وإدارة التكنولوجيا المتكاملة لعملاء مرموقين في جميع أنحاء المملكة.

من بين أبرز الإنجازات هو تعاوننا الموسع مع الخطوط الحديدية السعودية (SAR)، والذي يتضمن عمليات جديدة في مراكز رئيسية. كما أبرمنا اتفاقيات رئيسية مع مجموعة C.A.T. وغيرها من المنظمات المؤثرة في القطاعات العقارية والصناعية.

تؤكد هذه الشراكات على الثقة التي يضعها قادة الصناعة في المعايير التشغيلية لشركة قدرات والتزامنا بدعم النمو الاقتصادي للملكة من خلال خدمات دعم المرافق العالمية. سنظل ملتزمين بالتميز التشغيلي والاستدامة والسلامة في جميع مشاريعنا الجديدة والقائمة.`
    },
    mainImage: "/assets/NewsEvents/NewsInformationPhotosForWebsite/News information & Photos for Website/QNCNewContractssignedwithClients/QNC-SARNewContract.jpg",
    gallery: [
      "/assets/NewsEvents/NewsInformationPhotosForWebsite/News information & Photos for Website/QNCNewContractssignedwithClients/EastWestRealEstateNewContract.jpg",
      "/assets/NewsEvents/NewsInformationPhotosForWebsite/News information & Photos for Website/QNCNewContractssignedwithClients/QNC-C.A.TGroupNewContract.jpg",
      "/assets/NewsEvents/NewsInformationPhotosForWebsite/News information & Photos for Website/QNCNewContractssignedwithClients/QNC-SAR New Opening in SAR HQ 2.jpg",
      "/assets/NewsEvents/NewsInformationPhotosForWebsite/News information & Photos for Website/QNCNewContractssignedwithClients/QNC-SARNewContract.jpg",
      "/assets/NewsEvents/NewsInformationPhotosForWebsite/News information & Photos for Website/QNCNewContractssignedwithClients/QNC-SARNewOpeninginSARHQ.jpg",
      "/assets/NewsEvents/NewsInformationPhotosForWebsite/News information & Photos for Website/QNCNewContractssignedwithClients/QNC-ZPADCNewContract.jpg"
    ]
  }
];
