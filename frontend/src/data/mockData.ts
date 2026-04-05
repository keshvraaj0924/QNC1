import { servicesData } from './content';

export const MOCK_CONTENT = {
  home: {
    hero: {
      title: { 
        en: 'Qudrat National Company', 
        ar: 'شركة قدرات الوطنية' 
      },
      subtitle: { 
        en: 'Building the Future of Facility Management in Saudi Arabia.', 
        ar: 'بناء مستقبل إدارة المرافق في المملكة العربية السعودية.' 
      },
      image: '/Hero/Hero_BG.jpg',
      video: '/Hero/Hero_Video.mp4'
    },
    about: {
      title: { en: 'About QNC', ar: 'عن قدرات الوطنية' },
      description: { 
        en: 'Qudrat National Company (QNC) is a leading provider of integrated facility management services in the Kingdom of Saudi Arabia. With a focus on quality, safety, and innovation, we support vision 2030 through specialized infrastructure solutions.', 
        ar: 'شركة قدرات الوطنية هي مزود رائد لخدمات إدارة المرافق المتكاملة في المملكة العربية السعودية. مع التركيز على الجودة والسلامة والابتكار، نحن ندعم رؤية 2030 من خلال حلول البنية التحتية المتخصصة.' 
      }
    },
    mission_vision: {
      mission: {
        title: { en: 'Our Mission', ar: 'مهمتنا' },
        text: { 
          en: 'To provide world-class facility management services that exceed client expectations through operational excellence and dedicated workforce.', 
          ar: 'تقديم خدمات إدارة مرافق عالمية المستوى تتجاوز توقعات العملاء من خلال التميز التشغيلي والقوى العاملة المتفانية.' 
        }
      },
      vision: {
        title: { en: 'Our Vision', ar: 'رؤيتنا' },
        text: { 
          en: 'To be the most trusted and preferred partner for integrated facility management across the Middle East.', 
          ar: 'أن نكون الشريك الأكثر موثوقية وتفضيلاً لإدارة المرافق المتكاملة في جميع أنحاء الشرق الأوسط.' 
        }
      }
    },
    vision: {
      title: { en: 'Supporting Vision 2030', ar: 'دعم رؤية 2030' },
      description: { 
        en: 'QNC is deeply committed to the Saudi Vision 2030. We invest in local talent and sustainable technologies to build a thriving economy.', 
        ar: 'تلتزم شركة قدرات الوطنية التزاماً عميقاً برؤية السعودية 2030. نحن نستثمر في المواهب المحلية والتقنيات المستدامة لبناء اقتصاد مزدهر.' 
      }
    },
    map: {
      title: { en: 'Project Locations', ar: 'مواقع المشاريع' },
      description: { 
        en: 'Our presence spans across the Kingdom, from Neom to the Empty Quarter.', 
        ar: 'يمتد تواجدنا عبر المملكة، من نيوم إلى الربع الخالي.' 
      }
    }
  },
  services: servicesData.reduce((acc: any, service) => {
    acc[service.slug] = {
      title_en: service.title.en,
      title_ar: service.title.ar,
      desc_en: service.description.en,
      desc_ar: service.description.ar,
      image: service.image
    };
    return acc;
  }, {}),
  clients: [
    { id: 1, name: 'Aramco', logo: '/Clients/Aramco.png' },
    { id: 2, name: 'NEOM', logo: '/Clients/Neom.png' },
    { id: 3, name: 'SABIC', logo: '/Clients/Sabic.png' },
    { id: 4, name: 'Red Sea Global', logo: '/Clients/RedSea.png' }
  ]
};
