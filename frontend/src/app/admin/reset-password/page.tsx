'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import styles from '../login/AdminLogin.module.css';
import { adminApi } from '@/services/adminApi';

function ResetPasswordForm({ mode }: { mode: string | null }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token && mode !== 'first-login') {
      setError('Invalid or missing reset token.');
    }
  }, [token, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match.');
    }
    if (password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }

    setIsSubmitting(true);
    setError('');

    try {
      if (mode === 'first-login') {
        const storedUser = localStorage.getItem('qnc_admin_user');
        if (!storedUser) throw new Error('Session expired');
        // For first login, we use the regular changePassword but we need the current one
        // User just logged in, so they know it. But for a better UX, I'll use a direct reset if Admin.
        // Actually, I'll just use resetPassword with a special mode or token if possible.
        // Let's assume the user knows their temporary password.
        await adminApi.changePassword(
          prompt("Please enter your temporary password again for security:"), 
          password
        );
      } else {
        if (!token) throw new Error('Token is missing');
        await adminApi.resetPassword(token, password);
      }
      setIsDone(true);
      // Clear flag
      const userData = JSON.parse(localStorage.getItem('qnc_admin_user') || '{}');
      userData.mustChangePassword = false;
      localStorage.setItem('qnc_admin_user', JSON.stringify(userData));
      
      setTimeout(() => router.push('/admin/content'), 3000);
    } catch (err: any) {
      setError(err.message || 'Action failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isDone) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <CheckCircle size={64} color="#22c55e" style={{ margin: '0 auto 24px' }} />
        </motion.div>
        <h2 style={{ color: '#fff', marginBottom: '16px' }}>Password Reset Success</h2>
        <p style={{ color: 'rgba(255,255,255,0.6)' }}>Redirecting you to login...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label className={styles.label}>New Password</label>
        <input 
          type="password" 
          className={styles.input} 
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <div className={styles.formGroup}>
        <label className={styles.label}>Confirm New Password</label>
        <input 
          type="password" 
          className={styles.input} 
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      {error && (
        <div className={styles.errorMsg} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <motion.button 
        type="submit" 
        className={styles.loginBtn}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isSubmitting || !token}
      >
        {isSubmitting ? (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Loader2 className={styles.spin} size={18} /> Updating...
          </span>
        ) : 'Update Password'}
      </motion.button>
    </form>
  );
}

function ResetPasswordFormContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  
  return (
    <motion.div 
      className={styles.loginCard}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className={styles.logoArea}>
        <ShieldCheck size={40} color="#CBA152" style={{ marginBottom: '16px' }} />
        <h1 className={styles.logoText}>{mode === 'first-login' ? 'FIRST ACCESS' : 'SECURE RESET'}</h1>
        <p className={styles.subTitle}>
          {mode === 'first-login' 
            ? 'Finalize your enterprise security' 
            : 'Establish your new QNC access'
          }
        </p>
      </div>

      <ResetPasswordForm mode={mode} />

      <a href="/admin/login" className={styles.forgotLink} style={{ marginTop: '24px', opacity: 0.6 }}>
        Cancel and return to sign in
      </a>
    </motion.div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.backgroundGrain} />
      
      <Suspense fallback={
        <div className={styles.loginCard} style={{ padding: '40px', textAlign: 'center' }}>
          <Loader2 className={styles.spin} size={32} color="#CBA152" />
        </div>
      }>
        <ResetPasswordFormContent />
      </Suspense>
    </div>
  );
}
