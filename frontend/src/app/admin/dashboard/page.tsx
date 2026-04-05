'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../AdminLayout.module.css';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('qnc_admin_token');
    if (!token) {
      router.push('/admin');
      return;
    }
    const userData = JSON.parse(localStorage.getItem('qnc_admin_user') || '{}');
    setUser(userData);
  }, [router]);

  if (!user) return null;

  const stats = [
    { label: 'Active Services', value: '11', trend: '+2 this month' },
    { label: 'Pending Updates', value: '3', trend: 'Critical' },
    { label: 'Total CMS Users', value: '4', trend: 'Role-based' }
  ];

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>QNC PANEL</div>
        <nav className={styles.navSection}>
          <a href="/admin/dashboard" className={`${styles.navItem} ${styles.activeNavItem}`}>Overview</a>
          <a href="/admin/content" className={styles.navItem}>Service Content</a>
          {user.role === 'admin' && (
            <a href="/admin/users" className={styles.navItem}>User Management</a>
          )}
          <a href="/admin/settings" className={styles.navItem}>Settings</a>
        </nav>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.topBar}>
          <div className={styles.userInfo}>
            <span>{user.username} ({user.role})</span>
            <button className={styles.logoutBtn} onClick={() => {
              localStorage.removeItem('qnc_admin_token');
              localStorage.removeItem('qnc_admin_user');
              router.push('/admin');
            }}>Sign Out</button>
          </div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>
            Welcome back, {user.username}.
          </h1>
          <p style={{ color: '#666', marginBottom: '40px' }}>
            Manage your enterprise content and user roles with precision.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: 'white',
                  padding: '32px',
                  borderRadius: '20px',
                  border: '1px solid #eee',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ fontSize: '14px', color: '#888', marginBottom: '12px' }}>{stat.label}</div>
                <div style={{ fontSize: '36px', fontWeight: 800, marginBottom: '8px' }}>{stat.value}</div>
                <div style={{ fontSize: '12px', color: stat.trend === 'Critical' ? '#ff4d4d' : '#22c55e' }}>
                  {stat.trend}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
