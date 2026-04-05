'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import styles from './AdminLogin.module.css';
import { adminApi } from '@/services/adminApi';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Redirect to content dashboard if already logged in
    const token = localStorage.getItem('qnc_admin_token');
    if (token) {
      router.push('/admin/content');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const data = await adminApi.login(username, password);
      localStorage.setItem('qnc_admin_token', data.token);
      localStorage.setItem('qnc_admin_user', JSON.stringify(data.user));
      
      if (data.user.mustChangePassword) {
        // Use a special internal flag for first-login reset
        router.push(`/admin/reset-password?mode=first-login`);
      } else {
        router.push('/admin/content');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
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
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.logoArea}>
          <h1 className={styles.logoText}>QNC ADMIN</h1>
          <p className={styles.subTitle}>Enter credentials to access CMS</p>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div 
              className={styles.errorMsg}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Username</label>
            <input 
              type="text" 
              className={styles.input} 
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <div className={styles.passwordWrapper}>
              <input 
                type={showPassword ? "text" : "password"} 
                className={styles.input} 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <motion.button 
            type="submit" 
            className={styles.loginBtn}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Authenticating...' : 'Sign In'}
          </motion.button>
        </form>

        <a href="/admin/forgot-password" className={styles.forgotLink}>
          Forgot your password?
        </a>
      </motion.div>

      {/* Subtle Background Elements */}
      <motion.div 
        className={styles.blurBlob}
        animate={{ 
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '300px',
          height: '300px',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          zIndex: 1
        }}
      />
    </div>
  );
}
