'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './AdminLayout.module.css';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if authenticated
    const token = localStorage.getItem('qnc_admin_token');
    
    if (!token) {
      router.push('/admin/login');
    } else {
      // Redirect to the unified content management workspace
      router.push('/admin/content');
    }
  }, [router]);

  return (
    <div className={styles.initScreen}>
      <div className={styles.initContent}>
        <h2 className={styles.initTitle}>Initializing QNC Console</h2>
        <div className={styles.spinner}></div>
      </div>
    </div>
  );
}
