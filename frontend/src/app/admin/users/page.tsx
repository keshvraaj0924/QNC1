'use client';

import { useState, useEffect } from 'react';
import { adminApi } from '@/services/adminApi';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../AdminLayout.module.css';

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ 
    username: '', 
    password: '', 
    role: 'editor', 
    email: '' 
  });
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('qnc_admin_user') || '{}');
    if (userData.role !== 'admin') {
      window.location.href = '/admin/dashboard';
      return;
    }
    setCurrentUser(userData);
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await adminApi.getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('');
    try {
      await adminApi.createUser(formData);
      setMsg('User created successfully!');
      setFormData({ username: '', password: '', role: 'editor', email: '' });
      setShowAddForm(false);
      fetchUsers();
    } catch (err: any) {
      setMsg(err.message || 'Failed to create user');
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>QNC PANEL</div>
        <nav className={styles.navSection}>
          <a href="/admin/dashboard" className={styles.navItem}>Overview</a>
          <a href="/admin/content" className={styles.navItem}>Service Content</a>
          <a href="/admin/users" className={`${styles.navItem} ${styles.activeNavItem}`}>User Management</a>
          <a href="/admin/settings" className={styles.navItem}>Settings</a>
        </nav>
      </aside>

      <main className={styles.mainContent}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
          <h1>User Management</h1>
          <button 
            className={styles.logoutBtn} 
            onClick={() => setShowAddForm(!showAddForm)}
            style={{ padding: '12px 24px', background: '#1a1a1a', color: 'white', border: 'none' }}
          >
            {showAddForm ? 'Cancel' : '+ Create New User'}
          </button>
        </div>

        <AnimatePresence>
          {showAddForm && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                background: 'white',
                padding: '32px',
                borderRadius: '16px',
                border: '1px solid #eee',
                marginBottom: '32px',
                maxWidth: '600px'
              }}
            >
              <h3 style={{ marginBottom: '24px' }}>Create New Login</h3>
              <form onSubmit={handleCreateUser}>
                <div style={{ marginBottom: '16px' }}>
                   <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Username</label>
                   <input 
                     type="text" 
                     className={styles.input} 
                     value={formData.username} 
                     onChange={(e) => setFormData({...formData, username: e.target.value})}
                     required
                   />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                   <div>
                     <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Password</label>
                     <input 
                       type="password" 
                       className={styles.input} 
                       value={formData.password} 
                       onChange={(e) => setFormData({...formData, password: e.target.value})}
                       required
                     />
                   </div>
                   <div>
                     <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Role</label>
                     <select 
                       className={styles.input}
                       value={formData.role} 
                       onChange={(e) => setFormData({...formData, role: e.target.value})}
                     >
                       <option value="editor">Editor</option>
                       <option value="admin">Admin</option>
                     </select>
                   </div>
                </div>
                <div style={{ marginBottom: '24px' }}>
                   <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Email Address</label>
                   <input 
                     type="email" 
                     className={styles.input} 
                     value={formData.email} 
                     onChange={(e) => setFormData({...formData, email: e.target.value})}
                     required
                   />
                </div>
                <button 
                  type="submit" 
                  style={{ padding: '14px 32px', background: '#1a1a1a', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                >
                  Confirm Registration
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #eee', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fa', textAlign: 'left', borderBottom: '1px solid #eee' }}>
                <th style={{ padding: '20px' }}>Username</th>
                <th style={{ padding: '20px' }}>Role</th>
                <th style={{ padding: '20px' }}>Email</th>
                <th style={{ padding: '20px' }}>ID</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid #f8f9fa' }}>
                  <td style={{ padding: '20px', fontWeight: 600 }}>{user.username}</td>
                  <td style={{ padding: '20px' }}>
                    <span style={{ 
                      padding: '4px 12px', 
                      borderRadius: '100px', 
                      fontSize: '11px', 
                      background: user.role === 'admin' ? '#eef2ff' : '#f0fdf4',
                      color: user.role === 'admin' ? '#4f46e5' : '#16a34a',
                      fontWeight: 700,
                      textTransform: 'uppercase'
                    }}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: '20px', color: '#666' }}>{user.email}</td>
                  <td style={{ padding: '20px', fontSize: '12px', color: '#aaa' }}>{user.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {msg && <div style={{ marginTop: '24px', color: '#4f46e5', fontWeight: 600 }}>{msg}</div>}
      </main>
    </div>
  );
}
