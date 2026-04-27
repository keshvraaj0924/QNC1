'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import PageWrapper from '@/components/layout/PageWrapper/PageWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, Building2, Upload, Send, CheckCircle2, Loader2, X } from 'lucide-react';
import styles from './Careers.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { adminApi } from '@/services/adminApi';
import ScrollReveal from '@/components/modern/ScrollReveal';
import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function CareersPage() {
  const { language, t } = useLanguage();
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState<any | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const STATIC_ROLES = [
    {
      id: 'st-01',
      title_en: 'Facility Manager',
      title_ar: 'مدير مرافق',
      department_en: 'Operations',
      department_ar: 'العمليات',
      location_en: 'Al-Khobar',
      location_ar: 'الخبر',
      description_en: 'Leading total facility management operations for major industrial projects.',
      description_ar: 'قيادة عمليات إدارة المرافق الشاملة للمشاريع الصناعية الكبرى.'
    },
    {
      id: 'st-02',
      title_en: 'HVAC Technician',
      title_ar: 'فني تكييف وتبريد',
      department_en: 'Maintenance',
      department_ar: 'الصيانة',
      location_en: 'Jeddah',
      location_ar: 'جدة',
      description_en: 'Specialized maintenance and repair of industrial HVAC systems.',
      description_ar: 'صيانة وإصلاح أنظمة التكييف والتهوية الصناعية المتخصصة.'
    },
    {
      id: 'st-03',
      title_en: 'HSE Officer',
      title_ar: 'مسؤول صحة وسلامة',
      department_en: 'Compliance',
      department_ar: 'الامتثال',
      location_en: 'NEOM',
      location_ar: 'نيوم',
      description_en: 'Ensuring strict adherence to health, safety, and environmental standards.',
      description_ar: 'ضمان الالتزام الصارم بمعايير الصحة والسلامة والبيئة.'
    }
  ];

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await adminApi.getPublicContent();
        if (data.careers?.open_roles && data.careers.open_roles.length > 0) {
          setRoles(data.careers.open_roles);
        } else {
          setRoles(STATIC_ROLES);
        }
      } catch (err: any) {
        if (err.message === 'NETWORK_ERROR') {
          console.warn('Backend offline, using static fallback.');
        } else {
          console.error('Failed to load careers:', err);
        }
        setRoles(STATIC_ROLES);
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, []);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !selectedRole) return;

    setIsSubmitting(true);
    setError(null);

    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('email', formData.email);
    submitData.append('roleId', selectedRole.id);
    submitData.append('roleTitle', language === 'en' ? selectedRole.title_en : selectedRole.title_ar);
    submitData.append('resume', file);
    submitData.append('destination_email', 'HR@QNC.sa');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/v1/public/apply`, {
        method: 'POST',
        body: submitData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Submission failed');
      }
      
      setSubmitted(true);
      setTimeout(() => {
        setSelectedRole(null);
        setSubmitted(false);
        setFormData({ name: '', email: '' });
        setFile(null);
      }, 8000);
    } catch (err: any) {
      if (err.name === 'TypeError') {
        setError(language === 'en' ? 'Server is currently offline. Please try again later.' : 'الخادم غير متصل حالياً. يرجى المحاولة لاحقاً.');
      } else {
        setError(err.message || 'Failed to submit application.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className={styles.loader}><Loader2 className={styles.spin} size={40} /></div>;

  return (
    <main className={styles.main} ref={containerRef}>
      <Header />
      <PageWrapper noPadding={true}>
        <section className={styles.heroSection}>
          <div className={styles.imageOverlay} />
          <motion.div style={{ y, scale }} className={styles.heroImageContainer}>
            <Image 
              src="/assets/images/qudrat-clients_0032_Layer-2.jpg"
              alt="Careers at QNC"
              fill
              className={styles.heroImage}
              priority
            />
          </motion.div>
          <motion.div style={{ opacity }} className={styles.heroContent}>
            <ScrollReveal direction="up" duration={1}>
              <h1 className={styles.title}>
                {language === 'en' ? 'Careers at QNC' : 'الوظائف في قدرات الوطنية'}
              </h1>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.2} duration={1}>
              <p className={styles.subtitle}>
                {language === 'en' 
                  ? 'Join an industry leader in Total Facilities Management and help shape the future of Saudi Arabia.'
                  : 'انضم إلى شركة رائدة في مجال إدارة المرافق المتكاملة وساهم في تشكيل مستقبل المملكة العربية السعودية.'}
              </p>
            </ScrollReveal>
          </motion.div>
        </section>

        <section className={styles.rolesSection}>
          <div className={styles.container}>
            <ScrollReveal direction="up" className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                {language === 'en' ? 'Open Opportunities' : 'الفرص الحالية'}
              </h2>
              <div className={styles.titleUnderline} />
            </ScrollReveal>

            <div className={styles.rolesGrid}>
              {roles.map((role, idx) => (
                <ScrollReveal 
                  key={role.id}
                  direction="up"
                  delay={0.1 * idx}
                >
                  <motion.div 
                    className={styles.roleCard}
                    whileHover={{ y: -10, borderColor: 'var(--qnc-gold)' }}
                  >
                    <div className={styles.roleHeader}>
                      <Briefcase className={styles.roleIcon} size={24} />
                      <h3 className={styles.roleTitle}>
                        {language === 'en' ? role.title_en : role.title_ar}
                      </h3>
                    </div>
                    
                    <div className={styles.roleMeta}>
                      <div className={styles.metaItem}>
                        <Building2 size={16} />
                        <span>{language === 'en' ? role.department_en : role.department_ar}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <MapPin size={16} />
                        <span>{language === 'en' ? role.location_en : role.location_ar}</span>
                      </div>
                    </div>

                    <p className={styles.roleDesc}>
                      {language === 'en' ? role.description_en : role.description_ar}
                    </p>

                    <button 
                      className={styles.applyBtn}
                      onClick={() => setSelectedRole(role)}
                      data-cursor="hover"
                    >
                      {language === 'en' ? 'Apply Now' : 'قدم الآن'}
                    </button>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Application Modal */}
        <AnimatePresence>
          {selectedRole && (
            <div className={styles.modalOverlay}>
              <motion.div 
                className={styles.modal}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
              >
                <button className={styles.closeBtn} onClick={() => setSelectedRole(null)}>
                  <X size={24} />
                </button>

                {!submitted ? (
                  <>
                    <h2 className={styles.modalTitle}>
                      {language === 'en' ? 'Apply for Position' : 'التقديم على الوظيفة'}
                    </h2>
                    <p className={styles.modalSubtitle}>
                      {language === 'en' ? selectedRole.title_en : selectedRole.title_ar}
                    </p>

                    <form className={styles.form} onSubmit={handleApply}>
                      <div className={styles.field}>
                        <label>{language === 'en' ? 'Full Name' : 'الاسم الكامل'}</label>
                        <input 
                          type="text" 
                          required 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div className={styles.field}>
                        <label>{language === 'en' ? 'Email Address' : 'البريد الإلكتروني'}</label>
                        <input 
                          type="email" 
                          required 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                      
                      <div className={styles.fileField}>
                        <label className={styles.fileLabel}>
                          <Upload size={20} />
                          <span>{file ? file.name : (language === 'en' ? 'Upload Resume (PDF/DOCX)' : 'تحميل السيرة الذاتية')}</span>
                          <input 
                            type="file" 
                            hidden 
                            accept=".pdf,.doc,.docx" 
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                            required
                          />
                        </label>
                      </div>

                      {error && <div className={styles.error}>{error}</div>}

                      <button 
                        type="submit" 
                        className={styles.submitBtn}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <Loader2 className={styles.spin} />
                        ) : (
                          <>
                            <Send size={18} />
                            <span>{language === 'en' ? 'Submit Application' : 'إرسال الطلب'}</span>
                          </>
                        )}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className={styles.successState}>
                    <CheckCircle2 size={64} className={styles.successIcon} />
                    <h3>{language === 'en' ? 'Application Sent!' : 'تم إرسال الطلب!'}</h3>
                    <p>{language === 'en' ? 'Our HR team will review your profile and get back to you.' : 'سيقوم فريق الموارد البشرية لدينا بمراجعة ملفك الشخصي والتواصل معك.'}</p>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </PageWrapper>
      <Footer />
    </main>
  );
}
