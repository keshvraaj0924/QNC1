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
      // Simulate minimal network latency for a responsive feel
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
      }, 300); 
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
      if (!obj) return;
      const enKey = `${fieldBase}_en`;
      const arKey = `${fieldBase}_ar`;
      
      if (triggerSource === 'en' && obj[enKey] !== undefined) {
        obj[arKey] = await this.translate(obj[enKey], 'ar');
      } else if (triggerSource === 'ar' && obj[arKey] !== undefined) {
        obj[enKey] = await this.translate(obj[arKey], 'en');
      }
    };

    // 1. Generic Fields (title, description, text, subtitle, content)
    await translateField(newData, 'title');
    await translateField(newData, 'description');
    await translateField(newData, 'text');
    await translateField(newData, 'subtitle');
    await translateField(newData, 'content');

    // 2. HERO SECTION
    if (newData.hero) await translateField(newData.hero, 'title');

    // 3. STATS SECTION
    if (Array.isArray(newData.stats)) {
      newData.stats = await Promise.all(newData.stats.map(async (stat) => {
        await translateField(stat, 'label');
        return stat;
      }));
    }

    // 4. MISSION & VISION SECTION
    if (Array.isArray(newData.mission_vision)) {
      newData.mission_vision = await Promise.all(newData.mission_vision.map(async (mv) => {
        await translateField(mv, 'title');
        await translateField(mv, 'content');
        return mv;
      }));
    }

    // 5. NATIONAL VISION SECTION
    if (newData.vision) {
      await translateField(newData.vision, 'title');
    }

    // 6. INTELLIGENT ECOSYSTEM SECTION
    if (newData.intelligent_ecosystem) {
      await translateField(newData.intelligent_ecosystem, 'title');
      await translateField(newData.intelligent_ecosystem, 'subtitle');
      if (Array.isArray(newData.intelligent_ecosystem.items)) {
        newData.intelligent_ecosystem.items = await Promise.all(newData.intelligent_ecosystem.items.map(async (item) => {
          await translateField(item, 'title');
          await translateField(item, 'desc');
          return item;
        }));
      }
    }

    // 7. PARTNERS & GROUP RELATIONS
    if (newData.partners_group) {
      await translateField(newData.partners_group, 'title');
      await translateField(newData.partners_group, 'subtitle');
      // Logos/Names usually don't need translation unless specific
    }

    // 8. ALEF 360 SECTION
    if (newData.alef360) {
      await translateField(newData.alef360, 'title');
      await translateField(newData.alef360, 'content');
    }

    // 9. MAP SECTORS & LOCATIONS
    if (newData.map) {
      if (Array.isArray(newData.map.sectors)) {
        newData.map.sectors = await Promise.all(newData.map.sectors.map(async (sector) => {
          await translateField(sector, 'title');
          await translateField(sector, 'desc');
          return sector;
        }));
      }
      if (Array.isArray(newData.map.locations)) {
        newData.map.locations = await Promise.all(newData.map.locations.map(async (loc) => {
          if (triggerSource === 'en' && loc.name) {
            loc.nameAr = await this.translate(loc.name, 'ar');
          } else if (triggerSource === 'ar' && loc.nameAr) {
            loc.name = await this.translate(loc.nameAr, 'en');
          }
          return loc;
        }));
      }
    }

    // 10. ABOUT & SERVICES & CAREERS (Unified Logic)
    if (newData.profile) await translateField(newData.profile, 'text');
    
    // 11. PREMIUM SERVICES SPECIFIC FIELDS
    await translateField(newData, 'industryFocus');
    await translateField(newData, 'longDescription');

    if (Array.isArray(newData.technicalScope)) {
      newData.technicalScope = await Promise.all(newData.technicalScope.map(async (item) => ({
        en: triggerSource === 'en' ? item.en : await this.translate(item.ar, 'en'),
        ar: triggerSource === 'ar' ? item.ar : await this.translate(item.en, 'ar')
      })));
    }

    if (Array.isArray(newData.benefits)) {
      newData.benefits = await Promise.all(newData.benefits.map(async (item) => ({
        en: triggerSource === 'en' ? item.en : await this.translate(item.ar, 'en'),
        ar: triggerSource === 'ar' ? item.ar : await this.translate(item.en, 'ar')
      })));
    }

    if (Array.isArray(newData.certificates)) {
      newData.certificates = await Promise.all(newData.certificates.map(async (cert) => {
        await translateField(cert, 'title');
        return cert;
      }));
    }

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
    if (Array.isArray(newData.features)) {
      newData.features = await Promise.all(newData.features.map(async (f) => ({
        en: triggerSource === 'en' ? f.en : await this.translate(f.ar, 'en'),
        ar: triggerSource === 'ar' ? f.ar : await this.translate(f.en, 'ar')
      })));
    }

    return newData;
  }
}
