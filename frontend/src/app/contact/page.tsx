'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import PageWrapper from '@/components/layout/PageWrapper/PageWrapper';
import { motion } from 'framer-motion';
import styles from './Contact.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
  const { language, t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:4000/api/v1/public/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setSuccess(true);
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err) {
      console.error('Contact Error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.main}>
      <Header />
      <PageWrapper>
        <section className={styles.heroSection}>
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className={styles.title}
          >
            {t('contact_title')}
          </motion.h1>
        </section>

        <section className={styles.splitSection}>
          <div className={styles.container}>
            
            {/* Left: Contact Info */}
            <motion.div 
              className={styles.infoCol}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className={styles.subTitle}>{t('contact_sub')}</h2>
              <div className={styles.contactBlock}>
                <h4>{t('contact_address')}</h4>
                <p>{language === 'en' ? 'Al-Khobar, Kingdom of Saudi Arabia' : 'الخبر، المملكة العربية السعودية'}</p>
              </div>
              <div className={styles.contactBlock}>
                <h4>{t('contact_email')}</h4>
                <a href="mailto:info@qudratnational.com">info@qudratnational.com</a>
              </div>
              <div className={styles.contactBlock}>
                <h4>{t('contact_phone')}</h4>
                <p dir="ltr" className="ltr-content">+966 13 000 0000</p>
              </div>

            </motion.div>

            {/* Right: Form */}
            <motion.div 
              className={styles.formCol}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {!success ? (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.inputGroup}>
                    <label>{t('contact_name_label')}</label>
                    <input 
                      type="text" 
                      required
                      placeholder={t('contact_placeholder_name')} 
                      value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>{t('contact_email_label')}</label>
                    <input 
                      type="email" 
                      required
                      placeholder={t('contact_placeholder_email')} 
                      value={form.email}
                      onChange={(e) => setForm({...form, email: e.target.value})}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>{t('contact_message_label')}</label>
                    <textarea 
                      required
                      rows={4} 
                      placeholder={t('contact_placeholder_msg')}
                      value={form.message}
                      onChange={(e) => setForm({...form, message: e.target.value})}
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className={styles.submitBtn} 
                    data-cursor="hover"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : t('contact_send')}
                  </button>
                </form>
              ) : (
                <div className={styles.successMessage}>
                   <h3>Thank You!</h3>
                   <p>Your message has been sent successfully. Our team will contact you soon.</p>
                </div>
              )}
            </motion.div>

          </div>
        </section>
      </PageWrapper>
      <Footer />
    </main>
  );
}
