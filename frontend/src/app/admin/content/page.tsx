'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { adminApi } from '@/services/adminApi';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Languages, Save, Loader2, Sparkles, CheckCircle, 
  Plus, Trash2, Globe, Users, LogOut, LayoutDashboard,
  ShieldCheck, UserPlus, Briefcase, FileText, Image as ImageIcon,
  ChevronRight, AlertCircle, Menu, X
} from 'lucide-react';
import FileUpload from '@/components/admin/FileUpload';
import styles from './ContentEditor.module.css';

function ContentEditorInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const view = searchParams.get('view') || 'dashboard';

  const setView = (v: string) => {
    router.push(`/admin/content?view=${v}`);
    setIsSidebarOpen(false); // Close on mobile navigation
  };

  const [content, setContent] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<string>('logistics-and-transportation');
  
  const [user, setUser] = useState<any>(null);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'editor', email: '' });
  
  const [homeTab, setHomeTab] = useState('hero');
  const [aboutTab, setAboutTab] = useState('profile');
  
  const [formData, setFormData] = useState<any>({});
  const [clientsData, setClientsData] = useState<any[]>([]);
  const [homeData, setHomeData] = useState<any>({
    hero: {},
    vision: {},
    map: { locations: [] },
    capabilities: {}
  });
  const [aboutData, setAboutData] = useState<any>({
    profile: {},
    certificates: []
  });
  const [careersData, setCareersData] = useState<any>({ open_roles: [] });
  const [settingsData, setSettingsData] = useState<any>({ contact_email: '', careers_email: '' });
  const [uploadingSvcs, setUploadingSvcs] = useState<Record<string, boolean>>({});
  
  const [isSaving, setIsSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [autoTranslateSource, setAutoTranslateSource] = useState<string | null>(null);
  const [isDynamicSync, setIsDynamicSync] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('qnc_admin_user') : null;
    if (storedUser) setUser(JSON.parse(storedUser));
    
    fetchContent();
  }, []);

  // Handle direct navigation from Sidebar (via state or alias)
  useEffect(() => {
    if (view === 'certificates') {
      setView('about');
      setAboutTab('certificates');
    }
  }, [view]);

  useEffect(() => {
    if (content) {
      if (view === 'services' && content.services[selectedService]) {
        setFormData(content.services[selectedService]);
      } else if (view === 'home') {
        // Deep merge or ensure structure for updatable all content
        setHomeData({
          hero: content.home?.hero || {},
          vision: content.home?.vision || {},
          map: content.home?.map || { locations: [] },
          capabilities: content.home?.capabilities || {}
        });
        setClientsData(content.clients || []);
      } else if (view === 'about') {
        setAboutData({
          profile: content.about?.profile || content.about || {}, // Handle legacy migration
          certificates: content.about?.certificates || []
        });
      } else if (view === 'partners') {
        setClientsData(content.clients || []);
      } else if (view === 'careers') {
        setCareersData(content.careers || { open_roles: [] });
      } else if (view === 'settings' && user?.role === 'admin') {
        setSettingsData(content.settings || {});
      } else if (view === 'users' && user?.role === 'admin') {
        fetchUsers();
      }
    }
  }, [view, content, selectedService]);

  const fetchContent = async () => {
    try {
      setError(null);
      const data = await adminApi.getContent();
      setContent(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load content');
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await adminApi.getUsers();
      setUsersList(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    setMsg('');
    setError(null);
    try {
      let syncSource = autoTranslateSource;
      
      // Dynamic Smart Detection if Dynamic ON and no force source
      if (isDynamicSync && !syncSource) {
        // Simple heuristic: if EN is more than 3 chars and AR is empty, sync from EN
        // or just default to EN for now as per enterprise standard for this project
        syncSource = 'en'; 
      }

      if (view === 'users') {
        await adminApi.createUser(newUser);
        setMsg('User created successfully');
        setNewUser({ username: '', password: '', role: 'viewer', email: '' });
        fetchUsers();
      } else if (view === 'partners') {
        await adminApi.updateContent('clients', clientsData);
        setMsg('Partners loop updated');
      } else if (view === 'home') {
        await adminApi.updateContent('home', homeData, syncSource || undefined);
        setMsg('Homepage sections updated');
      } else if (view === 'about') {
        await adminApi.updateContent('about', aboutData, syncSource || undefined);
        setMsg('About page updated');
      } else if (view === 'careers') {
        await adminApi.updateContent('careers', careersData, syncSource || undefined);
        setMsg('Job listings synchronized');
      } else if (view === 'settings') {
        await adminApi.updateContent('settings', settingsData);
        setMsg('Global configurations updated');
      } else if (view === 'services') {
        const result = await adminApi.updateContent(selectedService, formData, syncSource || undefined);
        setMsg(`${selectedService.replace(/-/g, ' ')} updated`);
        if (result.data) {
          const updatedContent = { ...content };
          updatedContent.services[selectedService] = result.data;
          setContent(updatedContent);
        }
      }
      setTimeout(() => setMsg(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  const handleBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsSaving(true);
    try {
      const result = await adminApi.uploadImages(files);
      if (result.urls && Array.isArray(result.urls)) {
        // Filter out any undefineds to prevent "http://...undefined" issues
        const validUrls = result.urls.filter((url: any) => !!url);
        
        const newLogos = validUrls.map((url: string) => ({ 
          src: `http://localhost:4000${url}`, 
          alt: 'Partner Logo', 
          href: '#' 
        }));
        
        setClientsData([...clientsData, ...newLogos]);
        setMsg('Bulk upload complete');
      } else {
        throw new Error('Bulk upload failed: Invalid response from server');
      }
    } catch (err: any) {
      setError('Bulk upload failed');
    } finally {
      setIsSaving(false);
    }
  };

  if (error && !content) {
    return (
      <div className={styles.loading}>
        <AlertCircle size={48} className={styles.errorIcon} />
        <h2 className={styles.errorTitle}>Synchronization Failed</h2>
        <p className={styles.errorText}>{error}</p>
        <button 
          onClick={() => fetchContent()} 
          className={styles.retryBtn}
        >
          Retry Connection
        </button>
      </div>
    );
  }

  if (!content) return (
    <div className={styles.loading}>
      <Loader2 className={styles.spin} size={48} />
      <p>Synchronizing QNC Enterprise CMS...</p>
    </div>
  );

  const TranslationSync = () => (
    <div className={styles.syncBox}>
      <Sparkles size={16} className={styles.syncIcon} />
      <span>Auto-Translation Mode</span>
      <div className={styles.syncBtns}>
        <button 
          className={`${styles.syncBtn} ${isDynamicSync ? styles.activeSync : ''}`}
          onClick={() => setIsDynamicSync(!isDynamicSync)}
          title="If enabled, changes to one language will automatically update the other."
        >
          {isDynamicSync ? 'Dynamic ON' : 'Dynamic OFF'}
        </button>
        <div className={styles.dividerSmall} />
        <button 
          className={`${styles.syncBtn} ${autoTranslateSource === 'en' ? styles.activeSync : ''}`}
          onClick={() => setAutoTranslateSource(autoTranslateSource === 'en' ? null : 'en')}
        >
          Force sync from EN
        </button>
        <button 
          className={`${styles.syncBtn} ${autoTranslateSource === 'ar' ? styles.activeSync : ''}`}
          onClick={() => setAutoTranslateSource(autoTranslateSource === 'ar' ? null : 'ar')}
        >
          Force sync from AR
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.dashboardView}>
      {error && (
        <div className={styles.errorAlert}>
          <AlertCircle size={20} />
          <span>{error}</span>
          <button onClick={() => fetchContent()}>Retry</button>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={view + selectedService}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className={styles.viewWrapper}
        >
          {view === 'dashboard' && (
            <div className={styles.welcomeGrid}>
              <div className={styles.welcomeCard}>
                <h2>Systems Overview</h2>
                <div className={styles.statsRow}>
                  <div className={styles.stat}>
                    <p className={styles.statVal}>{Object.keys(content.services).length}</p>
                    <p className={styles.statLabel}>Service Pillars</p>
                  </div>
                  <div className={styles.stat}>
                    <p className={styles.statVal}>{content.clients.length}</p>
                    <p className={styles.statLabel}>Active Partners</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {view === 'home' && (
            <div className={styles.formContainer}>
              <div className={styles.viewHeader}>
                <h1>Homepage Management</h1>
                <TranslationSync />
              </div>
              <div className={styles.tabsHeader}>
                <button onClick={() => setHomeTab('hero')} className={homeTab === 'hero' ? styles.activeTab : ''}>Hero & Intro</button>
                <button onClick={() => setHomeTab('capabilities')} className={homeTab === 'capabilities' ? styles.activeTab : ''}>Core Capabilities</button>
                <button onClick={() => setHomeTab('vision')} className={homeTab === 'vision' ? styles.activeTab : ''}>National Vision</button>
                <button onClick={() => setHomeTab('map')} className={homeTab === 'map' ? styles.activeTab : ''}>Operations Map</button>
                <button onClick={() => setHomeTab('partners')} className={homeTab === 'partners' ? styles.activeTab : ''}>Partners Suite</button>
              </div>

              {user?.role === 'viewer' && (
                <div className={styles.viewerNotice}>
                  <AlertCircle size={16} />
                  <span>You are in read-only mode (Viewer). Data synchronization is restricted.</span>
                </div>
              )}

              {homeTab === 'hero' && (
                <div className={styles.contentCard}>
                  <div className={styles.cardHeader}>
                    <h3>Homepage Hero Module</h3>
                    <span className={styles.badge}>Supports Video & Image</span>
                  </div>
                  <FileUpload 
                    label="Hero Background (Cinematic Video preferred)" 
                    currentImage={homeData.hero.video_url} 
                    onUploadSuccess={(url) => setHomeData({...homeData, hero: {...homeData.hero, video_url: url}})}
                  />
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label>Main Headline (EN)</label>
                      <input type="text" value={homeData.hero.title_en || ''} onChange={(e) => setHomeData({...homeData, hero: {...homeData.hero, title_en: e.target.value}})} />
                    </div>
                    <div className={styles.field}>
                      <label>Main Headline (AR)</label>
                      <input type="text" dir="rtl" value={homeData.hero.title_ar || ''} onChange={(e) => setHomeData({...homeData, hero: {...homeData.hero, title_ar: e.target.value}})} className={styles.rtlInput} />
                    </div>
                  </div>
                </div>
              )}

              {homeTab === 'capabilities' && (
                <div className={styles.contentCard}>
                  <div className={styles.cardHeader}>
                    <h3>Enterprise Capabilities Visualization</h3>
                    <p className={styles.hint}>Manage the hover-reveal images for each service pillar on the home page.</p>
                  </div>
                  <div className={styles.capabilitiesEditorGrid}>
                    {Object.keys(content.services).map((key) => (
                      <div key={key} className={styles.capItemEdit}>
                        <div className={styles.capMeta}>
                          <span className={styles.capKey}>{key.replace(/-/g, ' ')}</span>
                          {uploadingSvcs[key] && <span className={styles.miniLoading}>Saving...</span>}
                        </div>
                        <FileUpload 
                          currentImage={content.services[key].image}
                          onUploadSuccess={async (url: string) => {
                            setUploadingSvcs(prev => ({ ...prev, [key]: true }));
                            try {
                              // Update local state immediately
                              const updatedServices = { ...content.services };
                              updatedServices[key].image = url;
                              setContent({ ...content, services: updatedServices });
                              // Save individual service call
                              await adminApi.updateContent(key, { ...content.services[key], image: url });
                            } finally {
                              setUploadingSvcs(prev => ({ ...prev, [key]: false }));
                            }
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {homeTab === 'vision' && (
                <div className={styles.contentCard}>
                   <div className={styles.cardHeader}><h3>Saudi Vision 2030 Impact</h3></div>
                   <div className={styles.row}>
                      <FileUpload 
                        label="Architecture Visual (Parallax)" 
                        currentImage={homeData.vision.image_arch} 
                        onUploadSuccess={(url) => setHomeData({...homeData, vision: {...homeData.vision, image_arch: url}})}
                      />
                      <FileUpload 
                        label="Leadership Visual" 
                        currentImage={homeData.vision.image_leadership} 
                        onUploadSuccess={(url) => setHomeData({...homeData, vision: {...homeData.vision, image_leadership: url}})}
                      />
                   </div>
                   <div className={styles.row}>
                      <div className={styles.field}>
                        <label>Vision Headline (EN)</label>
                        <input type="text" value={homeData.vision.title_en} onChange={(e) => setHomeData({...homeData, vision: {...homeData.vision, title_en: e.target.value}})} />
                      </div>
                      <div className={styles.field}>
                        <label>Vision Headline (AR)</label>
                        <input type="text" dir="rtl" value={homeData.vision.title_ar} onChange={(e) => setHomeData({...homeData, vision: {...homeData.vision, title_ar: e.target.value}})} className={styles.rtlInput} />
                      </div>
                   </div>
                </div>
              )}

              {homeTab === 'map' && (
                <div className={styles.contentCard}>
                   <div className={styles.formHeader}>
                      <h3>National Operations Locations</h3>
                      {user?.role !== 'viewer' && (
                        <button onClick={() => setHomeData({...homeData, map: { ...homeData.map, locations: [...homeData.map.locations, { id: Date.now(), name: '', nameAr: '', x: 50, y: 50, projects: [] }] }})} className={styles.toolBtn}>
                          <Plus size={16} /> Add Location
                        </button>
                      )}
                   </div>
                   <div className={styles.locationsGrid}>
                      {homeData.map.locations.map((loc: any, idx: number) => (
                        <div key={loc.id} className={styles.locationEditorRow}>
                           <div className={styles.row}>
                              <input placeholder="City Name (EN)" value={loc.name} onChange={(e) => { const nl = [...homeData.map.locations]; nl[idx].name = e.target.value; setHomeData({...homeData, map: {...homeData.map, locations: nl}}); }} />
                              <input placeholder="City Name (AR)" dir="rtl" value={loc.nameAr} onChange={(e) => { const nl = [...homeData.map.locations]; nl[idx].nameAr = e.target.value; setHomeData({...homeData, map: {...homeData.map, locations: nl}}); }} />
                              <div className={styles.coordInputs}>
                                 <input type="number" placeholder="X%" value={loc.x} onChange={(e) => { const nl = [...homeData.map.locations]; nl[idx].x = parseInt(e.target.value); setHomeData({...homeData, map: {...homeData.map, locations: nl}}); }} />
                                 <input type="number" placeholder="Y%" value={loc.y} onChange={(e) => { const nl = [...homeData.map.locations]; nl[idx].y = parseInt(e.target.value); setHomeData({...homeData, map: {...homeData.map, locations: nl}}); }} />
                              </div>
                              <button onClick={() => setHomeData({...homeData, map: {...homeData.map, locations: homeData.map.locations.filter((_:any, i:number) => i !== idx)}})} className={styles.miniDelete}>×</button>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              )}

              {homeTab === 'partners' && (
                <div className={styles.contentCard}>
                   <div className={styles.formHeader}>
                      <h3>Major Clients Suite</h3>
                      {user?.role !== 'viewer' && (
                        <div className={styles.actions}>
                          <label className={styles.addBtn}>
                            <Plus size={18} /> Bulk Upload
                            <input type="file" multiple accept="image/*" onChange={handleBulkUpload} className={styles.hiddenFileInput} />
                          </label>
                        </div>
                      )}
                   </div>
                   <div className={styles.clientsGrid}>
                     {clientsData.map((client, idx) => (
                       <div key={idx} className={styles.clientCardMinimal}>
                          <FileUpload currentImage={client.src} onUploadSuccess={(url) => {
                             const nl = [...clientsData]; nl[idx].src = url; setClientsData(nl);
                          }} />
                          <button onClick={() => setClientsData(clientsData.filter((_, i) => i !== idx))} className={styles.deleteBtn}>×</button>
                       </div>
                     ))}
                   </div>
                </div>
              )}
            </div>
          )}

          {view === 'services' && (
            <div className={styles.servicesModule}>
              <div className={styles.moduleSidebar}>
                 {Object.keys(content.services).map((key) => (
                   <button 
                     key={key} 
                     onClick={() => setSelectedService(key)}
                     className={`${styles.sidebarItem} ${selectedService === key ? styles.active : ''}`}
                   >
                     {key.replace(/-/g, ' ')}
                   </button>
                 ))}
              </div>
              <div className={styles.moduleEditor}>
                 <div className={styles.contentCard}>
                    <div className={styles.formHeader}>
                       <h2 className={styles.moduleTitle}>{selectedService.replace(/-/g, ' ')}</h2>
                    </div>
                    <FileUpload 
                      label="Service Hero Asset"
                      currentImage={formData.image}
                      onUploadSuccess={(url) => setFormData({ ...formData, image: url })}
                      disabled={user?.role === 'viewer'}
                    />
                    <div className={styles.row}>
                      <div className={styles.field}>
                        <label>Title (EN)</label>
                        <input type="text" value={formData.title_en || ''} onChange={(e) => setFormData({...formData, title_en: e.target.value})} />
                      </div>
                      <div className={styles.field}>
                        <label>Title (AR)</label>
                        <input type="text" dir="rtl" value={formData.title_ar || ''} onChange={(e) => setFormData({...formData, title_ar: e.target.value})} className={styles.rtlInput} />
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {view === 'about' && (
            <div className={styles.formContainer}>
              <div className={styles.viewHeader}>
                <h1>Corporate Profile & Certificates</h1>
                <TranslationSync />
              </div>
               <div className={styles.tabsHeader}>
                <button onClick={() => setAboutTab('profile')} className={aboutTab === 'profile' ? styles.activeTab : ''}>Corporate Profile</button>
                <button onClick={() => setAboutTab('certificates')} className={aboutTab === 'certificates' ? styles.activeTab : ''}>Professional Certificates</button>
              </div>

              {aboutTab === 'profile' && (
                <div className={styles.contentCard}>
                  <div className={styles.cardHeader}><h3>Legacy & Identity</h3></div>
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label>Narrative (EN)</label>
                      <textarea rows={10} value={aboutData.profile.text_en || ''} onChange={(e) => setAboutData({...aboutData, profile: {...aboutData.profile, text_en: e.target.value}})} />
                    </div>
                    <div className={styles.field}>
                      <label>Narrative (AR)</label>
                      <textarea rows={10} dir="rtl" value={aboutData.profile.text_ar || ''} onChange={(e) => setAboutData({...aboutData, profile: {...aboutData.profile, text_ar: e.target.value}})} className={styles.rtlInput} />
                    </div>
                  </div>
                </div>
              )}

              {aboutTab === 'certificates' && (
                <div className={styles.contentCard}>
                   <div className={styles.formHeader}>
                      <h3>Quality & Standards</h3>
                      {user?.role !== 'viewer' && (
                        <button onClick={() => setAboutData({...aboutData, certificates: [...aboutData.certificates, { id: Date.now(), title_en: '', title_ar: '', image: '' }]})} className={styles.toolBtn}>
                          <Plus size={16} /> Add Certificate
                        </button>
                      )}
                   </div>
                   <div className={styles.certEditorGrid}>
                      {aboutData.certificates.map((cert: any, idx: number) => (
                        <div key={cert.id} className={styles.certEditCard}>
                           <FileUpload 
                            currentImage={cert.image} 
                            onUploadSuccess={(url) => { const nl = [...aboutData.certificates]; nl[idx].image = url; setAboutData({...aboutData, certificates: nl}); }} 
                           />
                           <div className={styles.certFields}>
                              <input placeholder="Cert Title (EN)" value={cert.title_en} onChange={(e) => { const nl = [...aboutData.certificates]; nl[idx].title_en = e.target.value; setAboutData({...aboutData, certificates: nl}); }} />
                              <input placeholder="Cert Title (AR)" dir="rtl" value={cert.title_ar} onChange={(e) => { const nl = [...aboutData.certificates]; nl[idx].title_ar = e.target.value; setAboutData({...aboutData, certificates: nl}); }} className={styles.rtlInput} />
                           </div>
                           <button onClick={() => setAboutData({...aboutData, certificates: aboutData.certificates.filter((_:any, i:number) => i !== idx)})} className={styles.deleteBtn}>×</button>
                        </div>
                      ))}
                   </div>
                </div>
              )}
            </div>
          )}

          {view === 'users' && user?.role === 'admin' && (
            <div className={styles.formContainer}>
               <div className={styles.contentCard}>
                  <div className={styles.cardHeader}>
                    <h3>Authorized Personnel</h3>
                  </div>
                  <table className={styles.userTable}>
                    <thead>
                      <tr><th>Username</th><th>Email</th><th>Role</th></tr>
                    </thead>
                    <tbody>
                      {usersList.map((u, i) => (
                        <tr key={i}><td>{u.username}</td><td>{u.email}</td><td>{u.role}</td></tr>
                      ))}
                    </tbody>
                  </table>
               </div>
               
               <div className={styles.contentCard}>
                  <h3>Create Account</h3>
                  <div className={styles.row}>
                    <div className={styles.field}><label>Username</label><input type="text" value={newUser.username} onChange={(e) => setNewUser({...newUser, username: e.target.value})} /></div>
                    <div className={styles.field}><label>Password</label><input type="password" value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})} /></div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.field}><label>Email</label><input type="email" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} /></div>
                    <div className={styles.field}>
                      <label>Role</label>
                      <select value={newUser.role} onChange={(e) => setNewUser({...newUser, role: e.target.value})}>
                        <option value="viewer">Viewer (Read Only)</option>
                        <option value="editor">Editor (Publish Access)</option>
                        <option value="admin">Super Admin</option>
                      </select>
                    </div>
                  </div>
               </div>
            </div>
          )}

          {view === 'careers' && (
            <div className={styles.formContainer}>
               <div className={styles.viewHeader}>
                <h1>Talent Acquisition</h1>
                <TranslationSync />
              </div>
               <div className={styles.contentCard}>
                  <div className={styles.formHeader}>
                    <h3>Enterprise Job Board</h3>
                    {user?.role !== 'viewer' && (
                      <button 
                        onClick={() => setCareersData({ ...careersData, open_roles: [...careersData.open_roles, { id: `role-${Date.now()}`, title_en: '', title_ar: '', department_en: '', department_ar: '', location_en: '', location_ar: '', description_en: '', description_ar: '' }] })}
                        className={styles.toolBtn}
                      >
                        <Plus size={18} /> Add Position
                      </button>
                    )}
                  </div>
                  
                  <div className={styles.rolesGrid}>
                     {careersData.open_roles.map((role: any, idx: number) => (
                       <div key={role.id} className={styles.jobEditCard}>
                          <div className={styles.jobHeader}>
                             <input 
                               className={styles.ghostInput} 
                               placeholder="Job Title (EN)" 
                               value={role.title_en} 
                               onChange={(e) => {
                                 const nr = [...careersData.open_roles]; nr[idx].title_en = e.target.value; setCareersData({...careersData, open_roles: nr});
                               }} 
                             />
                             <button 
                               onClick={() => setCareersData({...careersData, open_roles: careersData.open_roles.filter((_:any, i:number) => i !== idx)})} 
                               className={styles.deleteBtn}
                             >
                               <Trash2 size={16} />
                             </button>
                          </div>
                          <div className={styles.row}>
                            <div className={styles.field}><label>Department (EN)</label><input type="text" value={role.department_en} onChange={(e) => { const nr = [...careersData.open_roles]; nr[idx].department_en = e.target.value; setCareersData({...careersData, open_roles: nr}); }} /></div>
                            <div className={styles.field}><label>Location (EN)</label><input type="text" value={role.location_en} onChange={(e) => { const nr = [...careersData.open_roles]; nr[idx].location_en = e.target.value; setCareersData({...careersData, open_roles: nr}); }} /></div>
                          </div>
                          <div className={styles.field}><label>Description (EN)</label><textarea rows={2} value={role.description_en} onChange={(e) => { const nr = [...careersData.open_roles]; nr[idx].description_en = e.target.value; setCareersData({...careersData, open_roles: nr}); }} /></div>
                          
                          <hr className={styles.divider} />

                          <div className={styles.row}>
                             <div className={styles.field}><label>Title (AR)</label><input type="text" dir="rtl" value={role.title_ar} onChange={(e) => { const nr = [...careersData.open_roles]; nr[idx].title_ar = e.target.value; setCareersData({...careersData, open_roles: nr}); }} className={styles.rtlInput} /></div>
                             <div className={styles.field}><label>Dept (AR)</label><input type="text" dir="rtl" value={role.department_ar} onChange={(e) => { const nr = [...careersData.open_roles]; nr[idx].department_ar = e.target.value; setCareersData({...careersData, open_roles: nr}); }} className={styles.rtlInput} /></div>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          )}

          {view === 'settings' && user?.role === 'admin' && (
            <div className={styles.formContainer}>
               <div className={styles.contentCard}>
                  <div className={styles.cardHeader}>
                    <h3>Site Branding — Logo</h3>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label>Site Logo</label>
                      <p className={styles.fieldHint}>Upload a new logo to replace the default QNC logo everywhere on the website (Header, Footer, Loader).</p>
                      <FileUpload
                        label="Upload Logo (SVG, PNG, WEBP)"
                        currentImage={settingsData.logo || ''}
                        onUploadSuccess={(url) => setSettingsData({ ...settingsData, logo: url })}
                      />
                      {settingsData.logo && (
                        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <img src={settingsData.logo} alt="Current Logo" style={{ height: 48, objectFit: 'contain' }} />
                          <button
                            type="button"
                            onClick={() => setSettingsData({ ...settingsData, logo: '' })}
                            style={{ fontSize: '0.75rem', color: '#ff4d4d', background: 'none', border: 'none', cursor: 'pointer' }}
                          >
                            ✕ Remove logo (revert to default)
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
               </div>
               <div className={styles.contentCard}>
                  <div className={styles.cardHeader}>
                    <h3>Global Platform Configuration</h3>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label>Primary Contact Recipient Email</label>
                      <input 
                        type="email" 
                        placeholder="info@qudratnational.com" 
                        value={settingsData.contact_email || ''} 
                        onChange={(e) => setSettingsData({...settingsData, contact_email: e.target.value})} 
                      />
                      <p className={styles.fieldHint}>All inquiries from the Contact form will be sent here.</p>
                    </div>
                    <div className={styles.field}>
                      <label>Talent Acquisition (Careers) Email</label>
                      <input 
                        type="email" 
                        placeholder="hr@qudratnational.com" 
                        value={settingsData.careers_email || ''} 
                        onChange={(e) => setSettingsData({...settingsData, careers_email: e.target.value})} 
                      />
                      <p className={styles.fieldHint}>All resumes and applications will be sent to this address.</p>
                    </div>
                  </div>
               </div>
            </div>
          )}
          
          {view === 'partners' && (
            <div className={styles.formContainer}>
               <div className={styles.viewHeader}>
                <h1>Major Clients & Partners</h1>
                <p className={styles.viewDescription}>Manage the infinite marquee logos displayed on the homepage.</p>
              </div>
              <div className={styles.contentCard}>
                 <div className={styles.formHeader}>
                    <h3>Partner Selection Suite</h3>
                    <div className={styles.actions}>
                      <label className={styles.addBtn}>
                        <Plus size={18} /> Bulk Upload Logos
                        <input type="file" multiple accept="image/*" onChange={handleBulkUpload} className={styles.hiddenFileInput} />
                      </label>
                    </div>
                 </div>
                 <div className={styles.clientsGrid}>
                   {clientsData.map((client, idx) => (
                     <div key={idx} className={styles.clientCardMinimal}>
                        <FileUpload 
                          currentImage={client.src} 
                          onUploadSuccess={(url) => {
                           const nl = [...clientsData]; nl[idx].src = url; setClientsData(nl);
                          }} 
                        />
                        <div className={styles.clientMeta}>
                          <input 
                            placeholder="Partner Name" 
                            value={client.name || ''} 
                            onChange={(e) => {
                              const nl = [...clientsData]; nl[idx].name = e.target.value; setClientsData(nl);
                            }}
                          />
                        </div>
                        <button onClick={() => setClientsData(clientsData.filter((_, i) => i !== idx))} className={styles.deleteBtn}>×</button>
                     </div>
                   ))}
                   <button 
                    className={styles.addPlaceholderBtn}
                    onClick={() => setClientsData([...clientsData, { src: '', name: '', href: '#' }])}
                   >
                     <Plus size={32} />
                     <span>Add Partner</span>
                   </button>
                 </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className={styles.stickyActions}>
        <div className={styles.statusMsg}>
          {msg && <motion.span initial={{opacity:0}} animate={{opacity:1}} className={styles.successText}>{msg}</motion.span>}
        </div>
        {user?.role !== 'viewer' && (
          <button onClick={() => handleSave()} disabled={isSaving} className={styles.topSaveBtn}>
            {isSaving ? <Loader2 className={styles.spin} size={20} /> : <Save size={20} />}
            &nbsp;&nbsp;{isSaving ? 'Synching...' : 'SAVE CHANGES'}
          </button>
        )}
      </div>
    </div>
  );
}

export default function ContentEditor() {
  return (
    <Suspense fallback={<div>Loading editor...</div>}>
      <ContentEditorInner />
    </Suspense>
  );
}
