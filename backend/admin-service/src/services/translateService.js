// Mock Translation Service for Enterprise CMS
// In production, this would integrate with Google Translate, DeepL, or OpenAI.

export class TranslateService {
  /**
   * Mock translation logic
   * @param {string} text - The text to translate
   * @param {string} targetLang - 'en' or 'ar'
   */
  static async translate(text, targetLang) {
    return new Promise((resolve) => {
      // Simulate network latency for "Async" feel
      setTimeout(() => {
        if (!text) return resolve('');
        
        // Simple mock translations for demonstration
        if (targetLang === 'ar') {
          // If it's already Arabic, return it
          if (/[\u0600-\u06FF]/.test(text)) return resolve(text);
          return resolve(`[AR] ${text} (مترجم)`);
        } else {
          // If it's already English, return it
          if (!/[\u0600-\u06FF]/.test(text)) return resolve(text);
          return resolve(`[EN] ${text} (Translated)`);
        }
      }, 1500); 
    });
  }

  /**
   * Synchronizes languages in a content object
   * @param {object} data - The content object
   * @param {string} triggerSource - 'en' or 'ar'
   */
  static async syncLanguages(data, triggerSource) {
    if (!data) return data;
    const newData = JSON.parse(JSON.stringify(data)); // Deep clone

    const translateField = async (obj, fieldBase) => {
      const enKey = `${fieldBase}_en`;
      const arKey = `${fieldBase}_ar`;
      
      if (triggerSource === 'en' && obj[enKey]) {
        obj[arKey] = await this.translate(obj[enKey], 'ar');
      } else if (triggerSource === 'ar' && obj[arKey]) {
        obj[enKey] = await this.translate(obj[arKey], 'en');
      }
    };

    // Generic Sync for Title/Description pattern
    await translateField(newData, 'title');
    await translateField(newData, 'description');
    await translateField(newData, 'text');

    // Section Specific Logic
    // Home Hero
    if (newData.hero) await translateField(newData.hero, 'title');
    
    // Home Vision
    if (newData.vision) {
      await translateField(newData.vision, 'title');
      await translateField(newData.vision, 'desc');
    }

    // Home Map (Locations)
    if (newData.map && Array.isArray(newData.map.locations)) {
      newData.map.locations = await Promise.all(newData.map.locations.map(async (loc) => {
        if (triggerSource === 'en' && loc.name) {
          loc.nameAr = await this.translate(loc.name, 'ar');
        } else if (triggerSource === 'ar' && loc.nameAr) {
          loc.name = await this.translate(loc.nameAr, 'en');
        }
        return loc;
      }));
    }

    // About Corporate Profile
    if (newData.profile) {
      await translateField(newData.profile, 'text');
    }

    // About Certificates
    if (Array.isArray(newData.certificates)) {
      newData.certificates = await Promise.all(newData.certificates.map(async (cert) => {
        await translateField(cert, 'title');
        return cert;
      }));
    }

    // Careers
    if (Array.isArray(newData.open_roles)) {
      newData.open_roles = await Promise.all(newData.open_roles.map(async (role) => {
        await translateField(role, 'title');
        await translateField(role, 'department');
        await translateField(role, 'location');
        await translateField(role, 'description');
        return role;
      }));
    }

    // Legacy Service Features
    if (newData.features) {
      newData.features = await Promise.all(newData.features.map(async (f) => ({
        en: triggerSource === 'en' ? f.en : await this.translate(f.ar, 'en'),
        ar: triggerSource === 'ar' ? f.ar : await this.translate(f.en, 'ar')
      })));
    }

    return newData;
  }
}
