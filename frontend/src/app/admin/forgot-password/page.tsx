'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../login/AdminLogin.module.css';
import { adminApi } from '@/services/adminApi';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await adminApi.forgotPassword(email);
      setIsSent(true);
    } catch (err: any) {
      setError(err.message || 'Error processing request');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.backgroundGrain} />
      
      <motion.div 
        className={styles.loginCard}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.logoArea}>
          <h1 className={styles.logoText}>RESET ACCESS</h1>
          <p className={styles.subTitle}>Recover your enterprise account</p>
        </div>

        <AnimatePresence>
          {isSent ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              style={{ textAlign: 'center', color: '#22c55e' }}
            >
              <h3 style={{ marginBottom: '16px' }}>Recovery Link Sent</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#666' }}>
                If an account exists for <b>{email}</b>, you will receive a password reset link shortly.
              </p>
              <a href="/admin" className={styles.forgotLink} style={{ marginTop: '32px' }}>
                Back to Login
              </a>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Email Address</label>
                <input 
                  type="email" 
                  className={styles.input} 
                  placeholder="admin@qnc.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {error && <div className={styles.errorMsg}>{error}</div>}

              <motion.button 
                type="submit" 
                className={styles.loginBtn}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending Request...' : 'Send Recovery Link'}
              </motion.button>

              <a href="/admin" className={styles.forgotLink}>
                Remember your password? Sign in
              </a>
            </form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
