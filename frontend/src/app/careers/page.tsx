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

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await adminApi.getPublicContent();
        if (data.careers?.open_roles) {
          setRoles(data.careers.open_roles);
        }
      } catch (err) {
        console.error('Failed to load careers:', err);
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

    try {
      const res = await fetch('http://localhost:4000/api/v1/public/apply', {
        method: 'POST',
        body: submitData,
      });

      if (!res.ok) throw new Error('Submission failed');
      
      setSubmitted(true);
      setTimeout(() => {
        setSelectedRole(null);
        setSubmitted(false);
        setFormData({ name: '', email: '' });
        setFile(null);
      }, 3000);
    } catch (err) {
      setError('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className={styles.loader}><Loader2 className={styles.spin} size={40} /></div>;

  return (
    <main className={styles.main}>
      <Header />
      <PageWrapper>
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.title}
            >
              {language === 'en' ? 'Careers at QNC' : 'الوظائف في قدرات الوطنية'}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={styles.subtitle}
            >
              {language === 'en' 
                ? 'Join an industry leader in Total Facilities Management and help shape the future of Saudi Arabia.'
                : 'انضم إلى شركة رائدة في مجال إدارة المرافق المتكاملة وساهم في تشكيل مستقبل المملكة العربية السعودية.'}
            </motion.p>
          </div>
        </section>

        <section className={styles.rolesSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                {language === 'en' ? 'Open Opportunities' : 'الفرص الحالية'}
              </h2>
              <div className={styles.titleUnderline} />
            </div>

            <div className={styles.rolesGrid}>
              {roles.map((role) => (
                <motion.div 
                  key={role.id}
                  className={styles.roleCard}
                  whileHover={{ y: -5 }}
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
