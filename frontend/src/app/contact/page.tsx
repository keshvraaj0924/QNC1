'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import PageWrapper from '@/components/layout/PageWrapper/PageWrapper';
import ScrollReveal from '@/components/modern/ScrollReveal';
import styles from './Contact.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function ContactPage() {
  const { language, t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:4000/api/v1/public/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, destination_email: 'info@QNC.sa' })
      });
      if (res.ok) {
        setSuccess(true);
        setForm({ name: '', email: '', message: '' });
        // Keeping success message longer for user assurance
        setTimeout(() => setSuccess(false), 8000);
      }
    } catch (err) {
      console.error('Contact Error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.main} ref={containerRef}>
      <Header />
      <PageWrapper noPadding={true}>
        <section className={styles.heroSection}>
          <div className={styles.imageOverlay} />
          <motion.div style={{ y, scale }} className={styles.heroImageContainer}>
            <Image 
              src="/assets/images/showcase-hero-v2.png"
              alt="Contact QNC"
              fill
              className={styles.heroImage}
              priority
            />
          </motion.div>
          <motion.div style={{ opacity }} className={styles.container}>
            <ScrollReveal direction="up" duration={1.2}>
              <h1 className={styles.title}>
                {t('contact_title')}
              </h1>
            </ScrollReveal>
          </motion.div>
        </section>

        <section className={styles.splitSection}>
          <div className={styles.container}>
            
            {/* Left: Contact Info */}
            <ScrollReveal 
              className={styles.infoCol}
              direction="left"
              delay={0.2}
              duration={1}
            >
              <h2 className={styles.subTitle}>{t('contact_sub')}</h2>
              <div className={styles.contactBlock}>
                <h4>{t('contact_address')}</h4>
                <p>{language === 'en' ? 'Al-Khobar, Kingdom of Saudi Arabia' : 'الخبر، المملكة العربية السعودية'}</p>
              </div>
              <div className={styles.contactBlock}>
                <h4>{t('contact_email')}</h4>
                <a href={`mailto:${t('footer_email')}`}>{t('footer_email')}</a>
              </div>
              <div className={styles.contactBlock}>
                <h4>{t('contact_phone')}</h4>
                <p className="ltr-content">{t('footer_phone_mobile')}</p>
              </div>

            </ScrollReveal>

            {/* Right: Form */}
            <ScrollReveal 
              className={styles.formCol}
              direction="right"
              delay={0.4}
              duration={1}
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
            </ScrollReveal>

          </div>
        </section>
      </PageWrapper>
      <Footer />
    </main>
  );
}
