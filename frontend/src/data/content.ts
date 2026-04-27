export interface LocalizedString {
  en: string;
  ar: string;
}

export interface ServiceDetails {
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  longDescription?: LocalizedString;
  features: LocalizedString[];
  technicalScope?: LocalizedString[];
  benefits?: LocalizedString[];
  industryFocus?: LocalizedString;
  image: string;
  secondaryImage?: string;
  category: 'hard' | 'soft' | 'specialized';
}

export const servicesData: ServiceDetails[] = [
  // HARD SERVICES
  {
    slug: 'hvac-services',
    category: 'hard',
    title: { en: 'HVAC', ar: 'التكييف والتهوية' },
    description: { 
      en: 'Mission-critical climate control utilizing "Q-Intelligence" predictive monitoring for high-stakes industrial efficiency.', 
      ar: 'التحكم في المناخ للمهام الحرجة باستخدام مراقبة "Q-Intelligence" التنبؤية للكفاءة الصناعية العالية.' 
    },
    longDescription: {
      en: 'QNC redefines climate resilience across the Kingdom\'s most demanding industrial environments. Through the "Q-Sync" ecosystem, we harmonize predictive IoT intelligence with mission-critical engineering to guarantee 100% operational uptime and clinical-grade air quality for high-stakes assets.',
      ar: 'تعيد قدرات الوطنية تعريف المرونة المناخية في أكثر البيئات الصناعية تطلباً في المملكة. من خلال نظام "Q-Sync" البيئي، نقوم بمواءمة ذكاء إنترنت الأشياء التنبؤي مع الهندسة الحيوية لضمان وقت تشغيل بنسبة 100٪ وجودة هواء بمستوى سريري للأصول عالية الأهمية.'
    },
    industryFocus: {
      en: 'Specialized HVAC lifecycle management for Tier-3 Data Centers, Petrochemical laboratories, and High-Occupancy Commercial Hubs across Saudi Arabia.',
      ar: 'إدارة دورة حياة التكييف المتخصصة لمراكز البيانات من المستوى الثالث، والمختبرات البتروكيماوية، والمراكز التجارية عالية الإشغال في جميع أنحاء المملكة العربية السعودية.'
    },
    features: [
      { en: 'Q-Intelligence 24/7 Remote Monitoring', ar: 'مراقبة Q-Intelligence عن بعد على مدار الساعة' },
      { en: 'IoT-Driven Predictive Diagnostics', ar: 'التشخيص التنبؤي المدفوع بإنترنت الأشياء' },
      { en: 'High-Efficiency Chiller Plant Overhauls', ar: 'عمرات محطات المبردات عالية الكفاءة' },
      { en: 'Clinical Air Quality & HEPA Filtration', ar: 'جودة هواء سريرية وفلترة HEPA' },
      { en: 'District Cooling Network Optimization', ar: 'تحسين شبكات تبريد المناطق' },
      { en: 'Smart Thermostat & Zone Automation', ar: 'ترموستات ذكي وأتمتة المناطق' },
      { en: 'Thermodynamic Efficiency Audits', ar: 'تدقيق الكفاءة الديناميكية الحرارية' }
    ],
    technicalScope: [
      { en: 'Industrial Centrifugal & Screw Chiller Care', ar: 'صيانة المبردات المركزية واللولبية الصناعية' },
      { en: 'BMS Integration & Automated Logic Control', ar: 'تكامل نظام إدارة المباني والتحكم المنطقي المؤتمت' },
      { en: 'AHU, FAHU & DX System Restoration', ar: 'ترميم أنظمة AHU و FAHU و DX' },
      { en: 'Psychrometric Environment Optimization', ar: 'تحسين البيئة السيكرومترية' },
      { en: 'VRF/VRV Multi-Split System Management', ar: 'إدارة أنظمة VRF/VRV المتعددة' },
      { en: 'Robotic Duct Cleaning & Disinfection', ar: 'تنظيف وتعقيم القنوات بالروبوتات' },
      { en: 'Cooling Tower Lifecycle Performance', ar: 'أداء دورة حياة أبراج التبريد' },
      { en: 'Acoustic & Vibration Impact Analysis', ar: 'تحليل التأثير الصوتي والاهتزازي' }
    ],
    benefits: [
      { en: 'Zero Unplanned Downtime Commitment', ar: 'الالتزام بصفر توقف غير مخطط له' },
      { en: '45% Reduction in Energy Expenditure', ar: 'تخفيض بنسبة 45٪ في نفقات الطاقة' },
      { en: 'Extended Asset Longevity via Q-Maintenance', ar: 'إطالة عمر الأصول عبر صيانة Q' },
      { en: 'Aramco & HCIS Safety Standards Compliance', ar: 'الامتثال لمعايير سلامة أرامكو وHCIS' },
      { en: 'Enhanced Workforce Thermal Comfort', ar: 'تعزيز الراحة الحرارية للقوى العاملة' },
      { en: 'Predictive Leakage & Gas Detection', ar: 'كشف التسرب والغاز التنبؤي' }
    ],
    image: '/assets/images/services/hvac.png',
    secondaryImage: '/assets/images/services/hvac.png'
  },
  {
    slug: 'mep-engineering',
    category: 'hard',
    title: { en: 'MEP', ar: 'الكهروميكانيكية' },
    description: { 
      en: 'Integrated maintenance and support for Mechanical, Electrical, and Plumbing systems across the facility, powered by "Q-Sync" for seamless utility resilience.', 
      ar: 'صيانة ودعم متكامل لأنظمة الميكانيكا والكهرباء والسباكة في جميع أنحاء المنشأة، مدعومة بـ "Q-Sync" لمرونة المرافق السلسة.' 
    },
    longDescription: {
      en: 'QNC manages the facility\'s digital and physical nervous system. By integrating high-voltage power with advanced water treatment and FLS systems, we ensure total operational resilience through the "Q-Sync" intelligence layer.',
      ar: 'تدير قدرات الوطنية الجهاز العصبي الرقمي والمادي للمنشأة. من خلال دمج الطاقة عالية الجهد مع أنظمة معالجة المياه وسلامة الأرواح المتقدمة (FLS)، نضمن مرونة تشغيلية كاملة من خلال طبقة ذكاء "Q-Sync".'
    },
    industryFocus: {
      en: 'Full-spectrum utility management for industrial zones, hospitality complexes, and mission-critical government infrastructure.',
      ar: 'إدارة المرافق بكامل طيفها للمناطق الصناعية، ومجمعات الضيافة، والبنية التحتية الحكومية ذات المهام الحرجة.'
    },
    features: [
      { en: 'High-Voltage Q-Sync Power Grids', ar: 'شبكات طاقة عالية الجهد Q-Sync' },
      { en: 'Fire Life Safety (FLS) Assurance', ar: 'تأمين سلامة الأرواح من الحرائق (FLS)' },
      { en: 'Industrial Water Treatment Systems', ar: 'أنظمة معالجة المياه الصناعية' },
      { en: 'Real-time Electrical Grid Telemetry', ar: 'قياس أداء الشبكة الكهربائية فورياً' }
    ],
    technicalScope: [
      { en: 'Transformer Oil Analysis & Filtering', ar: 'تحليل وفلترة زيت المحولات' },
      { en: 'Infrared Thermal Grid Surveys', ar: 'مسوحات الشبكة الحرارية بالأشعة تحت الحمراء' },
      { en: 'Sewerage (STP) & Backup Power', ar: 'تشغيل محطات الصرف الصحي والطاقة الاحتياطية' },
      { en: 'Substation Lifecycle Maintenance', ar: 'صيانة دورة حياة المحطات الفرعية' }
    ],
    benefits: [
      { en: 'Total Regulatory Peace of Mind', ar: 'راحة بال تنظيمية تامة' },
      { en: 'Mission-Critical Backup Resilience', ar: 'مرونة النسخ الاحتياطي للمهام الحرجة' },
      { en: 'Reduced Operational Overlap Costs', ar: 'تقليل تكاليف التداخل التشغيلي' },
      { en: 'Enhanced Grid Stability Index', ar: 'تحسين مؤشر استقرار الشبكة' },
      { en: 'Predictive Load-Balancing Logic', ar: 'منطق موازنة الأحمال التنبؤي' }
    ],
    image: '/assets/images/services/mep.png',
    secondaryImage: '/assets/images/services/mep.png'
  },
  {
    slug: 'civil-construction',
    category: 'hard',
    title: { en: 'Civil Works', ar: 'الأعمال المدنية' },
    description: { 
      en: 'General repair and maintenance works to keep building structures safe, functional, and well maintained using "Q-Shield" technology.', 
      ar: 'أعمال الإصلاح والصيانة العامة للحفاظ على هياكل المباني آمنة وعملية ومصونة جيداً باستخدام تقنية "Q-Shield".' 
    },
    longDescription: {
      en: 'Preserving the physical integrity of your assets through advanced materials science. Our "Q-Shield" protocols restore and fortify industrial infrastructure against the Kingdom\'s harshest corrosive and thermal challenges.',
      ar: 'الحفاظ على السلامة المادية لأصولك من خلال علوم المواد المتقدمة. تعمل بروتوكولات "Q-Shield" الخاصة بنا على ترميم وتحصين البنية التحتية الصناعية ضد أقسى تحديات التآكل والحرارة في المملكة.'
    },
    industryFocus: {
      en: 'Structural rehabilitation for marine facilities, coastal infrastructure, and high-load industrial logistics centers.',
      ar: 'إعادة التأهيل الهيكلي للمرافق البحرية، والبنية التحتية الساحلية، ومراكز الخدمات اللوجستية الصناعية عالية الأحمال.'
    },
    features: [
      { en: 'Q-Shield Structural Fortification', ar: 'تحصين Q-Shield الهيكلي' },
      { en: 'Aviation & Industrial Epoxy Solutions', ar: 'حلول الإيبوكسي للطيران والصناعة' },
      { en: 'HCIS Structural Risk Audits', ar: 'تدقيق المخاطر الهيكلية بمعايير HCIS' },
      { en: 'Advanced Corrosion Mitigation', ar: 'تخفيف التآكل المتقدم' }
    ],
    technicalScope: [
      { en: 'Carbon-Fiber Structural Strengthening', ar: 'التقوية الهيكلية بألياف الكربون' },
      { en: 'High-Precision Concrete Restoration', ar: 'ترميم الخرسانة عالي الدقة' },
      { en: 'Industrial Grade Waterproofing', ar: 'عزل مائي من الدرجة الصناعية' },
      { en: 'Seismic & Thermal Crack Analysis', ar: 'تحليل التصدعات الزلزالية والحرارية' }
    ],
    benefits: [
      { en: 'Extended Facility Lifecycle', ar: 'إطالة دورة حياة المنشأة' },
      { en: 'Mitigation of Latent Structural Risks', ar: 'تخفيف المخاطر الهيكلية الكامنة' },
      { en: 'Reinforced Asset Structural Value', ar: 'تعزيز القيمة الهيكلية للأصل' },
      { en: 'Aesthetic & Functional Integrity', ar: 'السلامة الجمالية والوظيفية' },
      { en: 'Rapid Restoration Protocols', ar: 'بروتوكولات الترميم السريع' }
    ],
    image: '/assets/images/services/civil.png',
    secondaryImage: '/assets/images/services/civil.png'
  },
  {
    slug: 'low-current-systems',
    category: 'hard',
    title: { en: 'Low Current', ar: 'التيار المنخفض' },
    description: { 
      en: 'Support for CCTV, access control, fire alarm, and other smart low-voltage systems within a "Q-Secure" environment.', 
      ar: 'دعم الدوائر التلفزيونية المغلقة، والتحكم في الوصول، وإنذار الحريق، والأنظمة الذكية الأخرى ذات الجهد المنخفض ضمن بيئة "Q-Secure".' 
    },
    longDescription: {
      en: 'QNC secures the digital perimeter of mission-critical facilities. Through "Q-Secure" logic, we unify CCTV, access control, and communication networks into a singular, cyber-hardened operational intelligence hub.',
      ar: 'تؤمن قدرات الوطنية المحيط الرقمي للمرافق ذات المهام الحرجة. من خلال منطق "Q-Secure"، نقوم بتوحيد الدوائر التلفزيونية المغلقة، والتحكم في الوصول، وشبكات الاتصال في مركز ذكاء تشغيلي واحد محصن سيبرانياً.'
    },
    industryFocus: {
      en: 'High-security ELV integration for financial institutions, oil & gas sites, and automated corporate headquarters.',
      ar: 'تكامل التيار المنخفض عالي الأمن للمؤسسات المالية، ومواقع النفط والغاز، والمقرات الرئيسية للشركات المؤتمتة.'
    },
    features: [
      { en: 'Q-Secure Security Logic', ar: 'منطق الأمن Q-Secure' },
      { en: 'HCIS-Certified Access Control', ar: 'التحكم في الوصول المعتمد من HCIS' },
      { en: 'Q-Intelligence Video Analytics', ar: 'تحليلات فيديو Q-Intelligence' },
      { en: 'Unified ELV Command Ecosystem', ar: 'نظام قيادة تيار منخفض موحد' }
    ],
    technicalScope: [
      { en: 'Fiber Optic Backbone Fusion', ar: 'دمج العمود الفقري للألياف البصرية' },
      { en: 'PAGA & Mass Notification Matrix', ar: 'مصفوفة PAGA والإشعارات الجماعية' },
      { en: 'BMS & SCADA Security Integration', ar: 'تكامل أمن أنظمة BMS و SCADA' },
      { en: 'Structured Industrial Cabling', ar: 'الكابلات الهيكلية الصناعية' }
    ],
    benefits: [
      { en: '100% SIRA & HCIS Compliance', ar: 'امتثال بنسبة 100٪ لمعايير SIRA وHCIS' },
      { en: 'Autonomous Threat Detection Logic', ar: 'منطق كشف التهديدات المستقل' },
      { en: 'Seamless Digital Scalability', ar: 'قابلية التوسع الرقمي السلسة' },
      { en: 'Cyber-Hardened Perimeter Protection', ar: 'حماية المحيط المحصنة سيبرانياً' },
      { en: 'Real-Time Incident Visualization', ar: 'تصور الحوادث في الوقت الفعلي' }
    ],
    image: '/assets/images/services/lowcurrent.png',
    secondaryImage: '/assets/images/services/lowcurrent.png'
  },
  {
    slug: 'renovation-and-fitout',
    category: 'hard',
    title: { en: 'Renovation', ar: 'التجديد والتجهيز' },
    description: { 
      en: 'Upgrade and interior modification works to improve functionality, appearance, and space utilisation via "Q-Design".', 
      ar: 'أعمال الترقية والتعديل الداخلي لتحسين الوظائف والمظهر واستغلال المساحة عبر "Q-Design".' 
    },
    longDescription: {
      en: 'Transforming workspaces into high-performance environments with zero operational downtime. Our "Q-Design" methodology balances luxury aesthetics with the heavy-duty resilience required for modern enterprise hubs.',
      ar: 'تحويل مساحات العمل إلى بيئات عالية الأداء مع صفر توقف تشغيلي. توازن منهجية "Q-Design" الخاصة بنا بين الجماليات الفاخرة والمرونة العالية المطلوبة لمراكز الشركات الحديثة.'
    },
    industryFocus: {
      en: 'Modernizing corporate real estate and industrial administrative centers with LEED-compliant sustainability and premium finishings.',
      ar: 'تحديث العقارات المؤسسية والمراكز الإدارية الصناعية مع استدامة متوافقة مع LEED وتشطيبات فاخرة.'
    },
    features: [
      { en: 'Q-Design Space Ergonomics', ar: 'بيئة العمل المكانية Q-Design' },
      { en: 'Live-Operation Renovation Logic', ar: 'منطق التجديد أثناء التشغيل المباشر' },
      { en: 'High-End Sustainable Fit-outs', ar: 'تجهيزات راقية ومستدامة' },
      { en: 'Strategic Material Curation', ar: 'تقييم المواد الاستراتيجي' }
    ],
    technicalScope: [
      { en: 'Acoustic & Open-Plan Modification', ar: 'التعديلات الصوتية والمخطط المفتوح' },
      { en: 'Custom High-End Millwork', ar: 'أعمال الخشب الراقية المخصصة' },
      { en: 'Intelligent Lighting & AV Control', ar: 'التحكم الذكي في الإضاءة والصوت والصورة' },
      { en: 'MEP-Aligned Space Partitioning', ar: 'تقسيم المساحات المتوافق مع MEP' }
    ],
    benefits: [
      { en: 'Zero Operational Downtime', ar: 'صفر توقف تشغيلي' },
      { en: 'Reinforced Corporate Identity', ar: 'تعزيز الهوية المؤسسية' },
      { en: 'Maximized Space Productivity', ar: 'زيادة إنتاجية المساحة' },
      { en: 'LEED-Compliant Finishings', ar: 'تشطيبات متوافقة مع LEED' },
      { en: 'Ergonomic Excellence', ar: 'التميز في بيئة العمل' }
    ],
    image: '/assets/images/services/renovation.png',
    secondaryImage: '/assets/images/services/renovation.png'
  },
  {
    slug: 'third-party-management',
    category: 'hard',
    title: { en: '3rd Party', ar: 'إدارة الموردين' },
    description: { 
      en: 'Coordination and oversight of specialised external vendors to ensure quality service delivery and compliance through "Q-Vendor".', 
      ar: 'تنسيق وإشراف الموردين الخارجيين المتخصصين لضمان جودة تقديم الخدمة والامتثال من خلال "Q-Vendor".' 
    },
    longDescription: {
      en: 'Consolidating specialized services into a unified performance framework. QNC eliminates contractor fragmentation through the "Q-Vendor" matrix, ensuring absolute compliance and transparency across complex procurement cycles.',
      ar: 'دمج الخدمات المتخصصة في إطار أداء موحد. تقضي قدرات الوطنية على تشتت المقاولين من خلال مصفوفة "Q-Vendor"، مما يضمن الامتثال المطلق والشفافية عبر دورات الشراء المعقدة.'
    },
    industryFocus: {
      en: 'Managing specialized technical contractors for power plants, refineries, and mega-projects with integrated performance metrics.',
      ar: 'إدارة مقاولي الخدمات الفنية المتخصصة لمحطات الطاقة والمصافي والمشاريع الكبرى بمقاييس أداء متكاملة.'
    },
    features: [
      { en: 'Q-Vendor Consolidated SLAs', ar: 'اتفاقيات مستوى الخدمة الموحدة Q-Vendor' },
      { en: 'Unified Performance Reporting', ar: 'تقارير الأداء الموحدة' },
      { en: 'Strategic Vendor Risk Vetting', ar: 'فحص مخاطر الموردين الاستراتيجي' },
      { en: 'Centralized Procurement Intelligence', ar: 'ذكاء المشتريات المركزي' }
    ],
    technicalScope: [
      { en: 'Specialized Asset Compliance', ar: 'امتثال الأصول المتخصصة' },
      { en: 'Multi-Vendor Safety Induction', ar: 'التعريف بالسلامة للموردين المتعددين' },
      { en: 'SLA Performance Analytics', ar: 'تحليلات أداء اتفاقية مستوى الخدمة' },
      { en: 'Vendor Accountability Matrices', ar: 'مصفوفات مسؤولية الموردين' }
    ],
    benefits: [
      { en: 'Significant Overhead Reduction', ar: 'تخفيض كبير في النفقات الإضافية' },
      { en: 'Centralized Executive Control', ar: 'التحكم التنفيذي المركزي' },
      { en: 'Risk Mitigation via Standardization', ar: 'تخفيف المخاطر عبر التوحيد' },
      { en: 'Consolidated Procurement Analytics', ar: 'تحليلات المشتريات الموحدة' },
      { en: 'Transparent KPI Tracking', ar: 'تتبع مؤشرات الأداء الرئيسية بشفافية' }
    ],
    image: '/assets/images/services/3rdparty.png',
    secondaryImage: '/assets/images/services/3rdparty.png'
  },

  // SOFT SERVICES
  {
    slug: 'housekeeping-and-maintenance',
    category: 'soft',
    title: { en: 'Housekeeping', ar: 'خدمات النظافة' },
    description: { 
      en: 'Daily cleaning and Office support service that maintain a clean, organised, and efficient workplace using "Q-Soft" protocols.', 
      ar: 'خدمة التنظيف اليومي ودعم المكتب التي تحافظ على مكان عمل نظيف ومنظم وفعال باستخدام بروتوكولات "Q-Soft".' 
    },
    longDescription: {
      en: 'QNC elevates facility hygiene to a hospitality benchmark. Through "Q-Soft" clinical standards, we deliver pristine environments that enhance user well-being while ensuring total sanitation across corporate, medical, and industrial sectors.',
      ar: 'ترتقي قدرات الوطنية بنظافة المرافق إلى معايير الضيافة. من خلال المعايير السريرية "Q-Soft"، نقدم بيئات بكر تعزز رفاهية المستخدم مع ضمان التطهير الكامل عبر القطاعات المؤسسية والطبية والصناعية.'
    },
    industryFocus: {
      en: 'Environmental services for medical facilities, luxury corporate HQ, and high-frequency aviation hubs.',
      ar: 'الخدمات البيئية للمرافق الطبية، والمقرات الرئيسية للشركات الفاخرة، ومراكز الطيران عالية الكثافة.'
    },
    features: [
      { en: 'Q-Soft Clinical Sanitation', ar: 'التطهير السريري Q-Soft' },
      { en: 'High-End Hospitality Standards', ar: 'معايير الضيافة الراقية' },
      { en: 'Bio-Safe Cleaning Solutions', ar: 'حلول تنظيف آمنة حيوياً' },
      { en: 'Real-time Deployment Tracking', ar: 'تتبع النشر في الوقت الفعلي' }
    ],
    technicalScope: [
      { en: 'Hospital-Grade Infection Control', ar: 'مكافحة العدوى بمستوى المستشفيات' },
      { en: 'Specialized Marble & Stone Care', ar: 'صيانة متخصصة للرخام والأحجار' },
      { en: 'Eco-Friendly Chemical Management', ar: 'إدارة الكيماويات الصديقة للبيئة' },
      { en: 'Deep Steam Sterilization Units', ar: 'وحدات التعقيم بالبخار العميق' }
    ],
    benefits: [
      { en: 'Enhanced Occupant Well-being', ar: 'تعزيز رفاهية المقيمين' },
      { en: 'Certified Bio-Hazard Compliance', ar: 'الامتثال المعتمد للمخاطر البيولوجية' },
      { en: 'Premium Asset Surface Longevity', ar: 'إطالة عمر أسطح الأصول المتميزة' },
      { en: 'Micro-Biological Purity Assurance', ar: 'تأمين النقاء الميكروبيولوجي' },
      { en: 'Sensory Experience Management', ar: 'إدارة التجربة الحسية' }
    ],
    image: '/assets/images/services/housekeeping.png',
    secondaryImage: '/assets/images/services/housekeeping.png'
  },
  {
    slug: 'catering-services',
    category: 'soft',
    title: { en: 'Catering', ar: 'خدمات التموين' },
    description: { 
      en: 'Food service and on-site support solutions that enhance convenience, comfort, and day-to-day facility operations.', 
      ar: 'حلول الخدمات الغذائية والدعم في الموقع التي تعزز الراحة والملاءمة وعمليات المرافق اليومية.' 
    },
    longDescription: {
      en: 'Nurturing talent through world-class nutrition. QNC delivers gourmet-grade catering ecosystems tailored for executive boardrooms and high-performance industrial workforces, ensuring health, morale, and productivity.',
      ar: 'رعاية المواهب من خلال تغذية عالمية المستوى. تقدم قدرات الوطنية أنظمة تموين بمستوى فاخر مصممة خصيصاً لقاعات اجتماعات التنفيذيين والقوى العاملة الصناعية عالية الأداء، مما يضمن الصحة والروح المعنوية والإنتاجية.'
    },
    industryFocus: {
      en: 'Premium catering for offshore rigs, remote industrial cities, and executive corporate campuses.',
      ar: 'تموين متميز للمنصات البحرية، والمدن الصناعية النائية، والمجمعات السكنية للموظعين التنفيذيين.'
    },
    features: [
      { en: 'Gourmet Executive Dining', ar: 'تناول طعام تنفيذي فاخر' },
      { en: 'HACCP-Certified Food Safety', ar: 'سلامة الغذاء المعتمدة من HACCP' },
      { en: 'Industrial Workforce Nutrition', ar: 'تغذية القوى العاملة الصناعية' },
      { en: 'Smart Menu Personalization', ar: 'تخصيص القائمة الذكي' }
    ],
    technicalScope: [
      { en: 'Advanced Cold-Chain Logistics', ar: 'خدمات لوجستية متطورة لسلسلة التبريد' },
      { en: 'Dietary Restriction Management', ar: 'إدارة القيود الغذائية' },
      { en: 'On-site Kitchen Management', ar: 'إدارة المطابخ في الموقع' },
      { en: 'Sustainable Waste Management', ar: 'إدارة النفايات المستدامة' }
    ],
    benefits: [
      { en: 'Optimized Workforce Vitality', ar: 'تحسين حيوية القوى العاملة' },
      { en: 'Zero Food-Safety Incident Goal', ar: 'هدف صفر حوادث سلامة غذاء' },
      { en: 'Premium Dining Experience', ar: 'تجربة طعام متميزة' },
      { en: 'Health-Driven Performance Menus', ar: 'قوائم أداء مدفوعة بالصحة' },
      { en: 'Seamless Large-Scale Deployment', ar: 'نشر واسع النطاق وبشكل سلس' }
    ],
    image: '/assets/images/services/catering.png',
    secondaryImage: '/assets/images/services/catering.png'
  },
  {
    slug: 'facade-cleaning',
    category: 'soft',
    title: { en: 'Facade Cleaning', ar: 'تنظيف الواجهات' },
    description: { 
      en: 'Professional high-access building envelope maintenance and cleaning services using "Q-Vision" protocols.', 
      ar: 'خدمات تنظيف وصيانة غلاف المباني الاحترافية ذات الوصول العالي باستخدام بروتوكولات "Q-Vision".' 
    },
    longDescription: {
      en: 'Upholding the visual prestige of the Kingdom\'s skyline. Through the "Q-Vision" high-access protocol, we provide surgical-grade cleaning for complex architectural envelopes, ensuring asset longevity and aesthetic brilliance.',
      ar: 'الحفاظ على الهيبة البصرية لأفق المملكة. من خلال بروتوكول "Q-Vision" للوصول العالي، نقدم تنظيفاً بمستوى جراحي للأغلفة المعمارية المعقدة، مما يضمن طول عمر الأصل والتألق الجمالي.'
    },
    industryFocus: {
      en: 'Maintaining architectural integrity for skyscrapers in Riyadh and Jeddah, and specialized cleaning for solar energy parks.',
      ar: 'الحفاظ على السلامة المعمارية لناطحات السحاب في الرياض وجدة، والتنظيف المتخصص لمحطات الطاقة الشمسية.'
    },
    features: [
      { en: 'Q-Vision High-Access Safety', ar: 'سلامة الوصول العالي Q-Vision' },
      { en: 'Rope Access & BMU Specialists', ar: 'متخصصو الوصول بالحبال ووحدات BMU' },
      { en: 'Non-Corrosive Solar Cleaning', ar: 'تنظيف الألواح الشمسية غير المسبب للتآكل' },
      { en: 'Precision Glass Restoration', ar: 'ترميم الزجاج عالي الدقة' }
    ],
    technicalScope: [
      { en: 'Ultra-Pure Water Filtration', ar: 'فلترة المياه فائقة النقاء' },
      { en: 'Architectural Glazing Audits', ar: 'تدقيق الزجاج المعماري' },
      { en: 'Nano-Coating Protection', ar: 'حماية بطبقة النانو' },
      { en: 'Thermal Imaging Inspection', ar: 'الفحص بالتصوير الحراري' }
    ],
    benefits: [
      { en: 'Maximum Asset Curb Appeal', ar: 'أقصى قدر من الجاذبية الخارجية للأصل' },
      { en: 'Zero-Impact Safety Record', ar: 'سجل سلامة خالٍ من الحوادث' },
      { en: 'Prevention of Glass Fatigue', ar: 'منع إجهاد الزجاج' },
      { en: 'Enhanced Thermal Efficiency', ar: 'تعزيز الكفاءة الحرارية' },
      { en: 'Architectural Value Preservation', ar: 'الحفاظ على القيمة المعمارية' }
    ],
    image: '/assets/images/services/facade.png',
    secondaryImage: '/assets/images/services/facade.png'
  },
  {
    slug: 'landscaping-services',
    category: 'soft',
    title: { en: 'Landscaping', ar: 'تنسيق الحدائق' },
    description: { 
      en: 'Outdoor maintenance services that keep green spaces healthy, attractive, and well maintained via "Q-Green".', 
      ar: 'خدمات الصيانة الخارجية التي تحافظ على المساحات الخضراء صحية وجذابة ومصونة جيداً عبر "Q-Green".' 
    },
    longDescription: {
      en: 'Cultivating sustainable oases in desert environments. QNC combines botanical art with "Q-Green" precision irrigation to create resilient, eco-friendly landscapes that enhance the aesthetic and environmental value of your assets.',
      ar: 'زراعة واحات مستدامة في البيئات الصحراوية. تدمج قدرات الوطنية فن النباتات مع الري الدقيق "Q-Green" لإنشاء مناظر طبيعية مرنة وصديقة للبيئة تعزز القيمة الجمالية والبيئية لأصولك.'
    },
    industryFocus: {
      en: 'Developing green masterplans for smart cities, luxury residential compounds, and eco-tourism resorts.',
      ar: 'تطوير المخططات الخضراء للمدن الذكية، والمجمعات السكنية الفاخرة، ومنتجعات السياحة البيئية.'
    },
    features: [
      { en: 'Q-Green Precision Irrigation', ar: 'الري الدقيق Q-Green' },
      { en: 'Native Flora Ecosystem Design', ar: 'تصميم النظام البيئي للنباتات المحلية' },
      { en: 'Seasonal Floral Management', ar: 'إدارة الزهور الموسمية' },
      { en: 'Sustainable Water Reclamation', ar: 'استصلاح المياه المستدام' }
    ],
    technicalScope: [
      { en: 'Soil Nutrient & Salinity Audits', ar: 'تدقيق مغذيات التربة والملوحة' },
      { en: 'Xeriscaping for Arid Climates', ar: 'تنسيق الحدائق الجافة للمناخات القاحلة' },
      { en: 'Arboricultural Health Monitoring', ar: 'مراقبة الصحة الشجرية' },
      { en: 'Automated Fertigation Systems', ar: 'أنظمة التسميد الآلية' }
    ],
    benefits: [
      { en: 'Optimized Water Expenditure', ar: 'تحسين نفقات المياه' },
      { en: 'Reduced Urban Heat-Island Effect', ar: 'تقليل تأثير الجزيرة الحرارية الحضرية' },
      { en: 'Enhanced Bio-Diversity Value', ar: 'تعزيز قيمة التنوع البيولوجي' },
      { en: 'Psychological Wellness Spaces', ar: 'مساحات الرفاهية النفسية' },
      { en: 'Strategic Environmental Branding', ar: 'العلامة التجارية البيئية الاستراتيجية' }
    ],
    image: '/assets/images/services/landscaping.png',
    secondaryImage: '/assets/images/services/landscaping.png'
  },
  {
    slug: 'pest-control-management',
    category: 'soft',
    title: { en: 'Pest Control', ar: 'مكافحة الحشرات' },
    description: { 
      en: 'Preventive and responsive pest control solutions to ensure safe, hygienic, and compliant environment using "Q-Bio" logic.', 
      ar: 'حلول مكافحة الحشرات الوقائية والاستجابية لضمان بيئة آمنة وصحية ومتوافقة باستخدام منطق "Q-Bio".' 
    },
    longDescription: {
      en: 'Eliminating biological threats with surgical precision. Our "Q-Bio" methodology utilizes non-toxic, eco-certified eradication techniques and predictive mapping to secure industrial and corporate perimeters without compromising human health.',
      ar: 'القضاء على التهديدات البيولوجية بدقة جراحية. تستخدم منهجية "Q-Bio" تقنيات إبادة غير سامة ومعتمدة بيئياً ورسماً خرائطياً تنبؤياً لتأمين المحيط الصناعي والمؤسسي دون المساس بصحة الإنسان.'
    },
    industryFocus: {
      en: 'Securing food processing plants, pharmaceutical storage, and high-occupancy labor cities with zero-toxin protocols.',
      ar: 'تأمين مصانع معالجة الأغذية، ومستودعات الأدوية، والمدن العمالية عالية الإشغال ببروتوكولات خالية من السموم.'
    },
    features: [
      { en: 'Q-Bio Non-Toxic IPM Logic', ar: 'منطق Q-Bio IPM غير السام' },
      { en: 'Real-time Biological Audits', ar: 'عمليات تدقيق بيولوجية فورية' },
      { en: 'Industrial Termite Barriers', ar: 'حواجز النمل الأبيض الصناعية' },
      { en: '24/7 Digital Trap Monitoring', ar: 'مراقبة المصائد الرقمية على مدار الساعة' }
    ],
    technicalScope: [
      { en: 'Pheromone-Logic Monitoring', ar: 'المراقبة بمنطق الفيرومونات' },
      { en: 'Low-Impact ULV Fogging', ar: 'التضبيب بأسلوب ULV منخفض الأثر' },
      { en: 'Predictive Infestation Mapping', ar: 'رسم خرائط الإصابة التنبؤية' },
      { en: 'Micro-Biological Risk Profiling', ar: 'توصيف المخاطر الميكروبيولوجية' }
    ],
    benefits: [
      { en: 'Guaranteed Municipal Approval', ar: 'ضمان الموافقة البلدية' },
      { en: 'Long-term Asset Protection', ar: 'حماية الأصول على المدى الطويل' },
      { en: 'Zero-Toxin Environment', ar: 'بيئة خالية من السموم' },
      { en: 'Predictive Infestation Mitigation', ar: 'التخفيف التنبؤي من الإصابة' },
      { en: 'Autonomous Bio-Mapping Integrity', ar: 'سلامة رسم الخرائط البيولوجية المستقلة' }
    ],
    image: '/assets/images/services/pestcontrol.png',
    secondaryImage: '/assets/images/services/pestcontrol.png'
  },
  {
    slug: 'facility-help-desk',
    category: 'soft',
    title: { en: 'Help Desk', ar: 'مكتب المساعدة' },
    description: { 
      en: 'Round-the-clock support for service requests, issue reporting, and timely coordination across facility operations via "Q-Command".', 
      ar: 'دعم على مدار الساعة لطلبات الخدمة والإبلاغ عن المشكلات والتنسيق في الوقت المناسب عبر عمليات المرافق من خلال "Q-Command".' 
    },
    longDescription: {
      en: 'The centralized nerve center for mission-critical operations. Through the "Q-Command" matrix, we orchestrate thousands of global asset parameters daily, ensuring total transparency and rapid-response coordination across your entire facility ecosystem.',
      ar: 'مركز الأعصاب المركزي للعمليات ذات المهام الحرجة. من خلال مصفوفة "Q-Command"، نقوم بتنسيق الآلاف من معايير الأصول العالمية يومياً، مما يضمن الشفافية الكاملة وتنسيق الاستجابة السريعة عبر النظام البيئي لمنشأتك بالكامل.'
    },
    industryFocus: {
      en: 'Omnichannel operational support for distributed enterprise assets, multi-site retail chains, and government facility complexes.',
      ar: 'دعم تشغيلي متعدد القنوات للأصول المؤسسية الموزعة، وسلاسل التجزئة متعددة المواقع، والمجمعات المرافق الحكومية.'
    },
    features: [
      { en: 'Q-Command 24/7 Intelligent Hub', ar: 'مركز ذكاء Q-Command على مدار الساعة' },
      { en: 'CAFM-Integrated Work Logic', ar: 'منطق عمل متكامل مع CAFM' },
      { en: 'Performance Data Dashboards', ar: 'لوحات معلومات بيانات الأداء' },
      { en: 'Predictive Multi-Channel Triage', ar: 'فرز تنبؤي متعدد القنوات' }
    ],
    technicalScope: [
      { en: 'Incident Lifecycle Optimization', ar: 'تحسين دورة حياة الحوادث' },
      { en: 'Dynamic Asset Synchronization', ar: 'المزامنة الديناميكية للأصول' },
      { en: 'Mission-Critical Escalation', ar: 'التصعيد للمهام الحرجة' },
      { en: 'IoT-Helpdesk Telemetry Link', ar: 'رابط بيانات إنترنت الأشياء ومكتب المساعدة' }
    ],
    benefits: [
      { en: 'Unified Single Point of Control', ar: 'نقطة تحكم موحدة واحدة' },
      { en: 'Strategic Cost Reduction Data', ar: 'بيانات خفض التكاليف الاستراتيجية' },
      { en: 'Maximized Response Velocity', ar: 'أقصى سرعة استجابة' },
      { en: 'Transparent SLA Performance', ar: 'أداء شفاف لاتفاقية مستوى الخدمة' },
      { en: 'Predictive Resource Orchestration', ar: 'تنسيق الموارد التنبؤي' }
    ],
    image: '/assets/images/services/helpdesk.png',
    secondaryImage: '/assets/images/services/helpdesk.png'
  },
];

