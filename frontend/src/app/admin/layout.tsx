'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { 
  LayoutDashboard, 
  Menu, 
  X, 
  LogOut, 
  ShieldCheck, 
  Globe, 
  Users, 
  Settings,
  Briefcase,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AdminLayout.module.css';

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentView = searchParams.get('view') || 'dashboard';

  useEffect(() => {
    const storedUser = localStorage.getItem('qnc_admin_user');
    const token = localStorage.getItem('qnc_admin_token');
    
    if (!storedUser || !token) {
      router.push('/admin/login');
      return;
    }
    
    setUser(JSON.parse(storedUser));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('qnc_admin_token');
    localStorage.removeItem('qnc_admin_user');
    router.push('/admin/login');
  };

  const navGroups = [
    {
      group: 'WEB PAGES',
      items: [
        { name: 'Dashboard', href: '/admin/content', view: 'dashboard', icon: LayoutDashboard, role: 'editor' },
        { name: 'Home Page', href: '/admin/content?view=home', view: 'home', icon: Globe, role: 'editor' },
        { name: 'About Us', href: '/admin/content?view=about', view: 'about', icon: FileText, role: 'editor' },
        { name: 'Services Pillars', href: '/admin/content?view=services', view: 'services', icon: Briefcase, role: 'editor' },
        { name: 'Partner Suite', href: '/admin/content?view=partners', view: 'partners', icon: ImageIcon, role: 'editor' },
      ]
    },
    {
      group: 'OPERATIONS',
      items: [
        { name: 'Job Board', href: '/admin/content?view=careers', view: 'careers', icon: ShieldCheck, role: 'editor' },
      ]
    },
    {
      group: 'SYSTEM',
      items: [
        { name: 'User Management', href: '/admin/content?view=users', view: 'users', icon: Users, role: 'admin' },
        { name: 'Global Settings', href: '/admin/content?view=settings', view: 'settings', icon: Settings, role: 'admin' },
      ]
    }
  ];

  if (!user && pathname !== '/admin/login') return null;
  
  // Login page should not have the sidebar/layout
  if (pathname === '/admin/login') {
    return <div className={styles.loginPageWrapper}>{children}</div>;
  }

  return (
    <div className={styles.adminShell}>
      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {!isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.overlay}
            onClick={() => setIsSidebarOpen(true)}
          />
        )}
      </AnimatePresence>

      <aside className={`${styles.sidebar} ${!isSidebarOpen ? styles.closed : ''}`}>
        <div className={styles.logoArea}>
          <ShieldCheck size={28} className={styles.logoIcon} />
          <span className={styles.logoText}>QNC Console</span>
        </div>

        <nav className={styles.nav}>
          {navGroups.map((group) => (
            <div key={group.group} className={styles.navGroup}>
              <h5 className={styles.groupTitle}>{group.group}</h5>
              {group.items.map((item) => {
                if (item.role === 'admin' && user.role !== 'admin') return null;
                const isActive = currentView === item.view;
                return (
                  <button
                    key={item.name}
                    onClick={() => router.push(item.href)}
                    className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                  >
                    <item.icon size={20} />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>{user.username[0].toUpperCase()}</div>
            <div className={styles.userDetails}>
              <p className={styles.username}>{user.username}</p>
              <p className={styles.userRole}>{user.role}</p>
            </div>
          </div>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.topHeader}>
          <button 
            className={styles.menuToggle}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className={styles.headerBreadcrumbs}>
             Admin / {pathname.split('/').pop()}
          </div>
        </header>
        <div className={styles.pageContainer}>
          {children}
        </div>
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className={styles.adminShell}>Loading...</div>}>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </Suspense>
  );
}
