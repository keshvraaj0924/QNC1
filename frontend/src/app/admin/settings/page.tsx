'use client';

import { useState } from 'react';
import { adminApi } from '@/services/adminApi';
import { motion } from 'framer-motion';
import styles from '../AdminLayout.module.css';

export default function AdminSettings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg({ text: '', type: '' });

    if (newPassword !== confirmPassword) {
      setMsg({ text: 'New passwords do not match.', type: 'error' });
      return;
    }

    setIsUpdating(true);
    try {
      const res = await adminApi.changePassword(currentPassword, newPassword);
      if (res.error) throw new Error(res.error);
      setMsg({ text: 'Password changed successfully.', type: 'success' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setMsg({ text: err.message || 'Failed to change password.', type: 'error' });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>QNC PANEL</div>
        <nav className={styles.navSection}>
          <a href="/admin/dashboard" className={styles.navItem}>Overview</a>
          <a href="/admin/content" className={styles.navItem}>Service Content</a>
          <a href="/admin/users" className={styles.navItem}>User Management</a>
          <a href="/admin/settings" className={`${styles.navItem} ${styles.activeNavItem}`}>Settings</a>
        </nav>
      </aside>

      <main className={styles.mainContent}>
        <h1>Account Settings</h1>
        <p style={{ color: '#666', marginBottom: '40px' }}>Manage your security and access credentials.</p>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'white',
            padding: '40px',
            borderRadius: '16px',
            border: '1px solid #eee',
            maxWidth: '500px'
          }}
        >
          <h3 style={{ marginBottom: '24px' }}>Change Password</h3>
          <form onSubmit={handleChangePassword}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', marginBottom: '8px' }}>Current Password</label>
              <input 
                type="password" 
                className={styles.input} 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', marginBottom: '8px' }}>New Password</label>
              <input 
                type="password" 
                className={styles.input} 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', marginBottom: '8px' }}>Confirm New Password</label>
              <input 
                type="password" 
                className={styles.input} 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={isUpdating}
              style={{
                width: '100%',
                padding: '14px',
                background: '#1a1a1a',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {isUpdating ? 'Updating...' : 'Update Password'}
            </button>

            {msg.text && (
              <div style={{ 
                marginTop: '20px', 
                color: msg.type === 'error' ? '#ff4d4d' : '#22c55e',
                fontSize: '14px',
                textAlign: 'center',
                fontWeight: 600
              }}>
                {msg.text}
              </div>
            )}
          </form>
        </motion.div>
      </main>
    </div>
  );
}
