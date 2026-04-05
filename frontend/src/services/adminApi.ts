const API_BASE = 'http://localhost:4000/api/v1/admin';

export const adminApi = {
  async login(username: any, password: any) {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    
    // Store session
    if (typeof window !== 'undefined') {
      localStorage.setItem('qnc_admin_token', data.token);
      localStorage.setItem('qnc_admin_user', JSON.stringify(data.user));
    }
    
    return data;
  },

  async getAuthHeaders() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('qnc_admin_token') : null;
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  },

  async getUsers() {
    const headers = await this.getAuthHeaders();
    const res = await fetch(`${API_BASE}/users`, { headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch users');
    return data;
  },

  async createUser(userData: any) {
    const headers = await this.getAuthHeaders();
    const res = await fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers,
      body: JSON.stringify(userData)
    });
    return res.json();
  },

  async forgotPassword(email: any) {
    const res = await fetch(`${API_BASE}/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    return res.json();
  },

  async getContent() {
    const headers = await this.getAuthHeaders();
    const res = await fetch(`${API_BASE}/content`, { headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch content');
    return data;
  },

  async updateContent(key: any, data: any, autoTranslateSource?: string) {
    const headers = await this.getAuthHeaders();
    const res = await fetch(`${API_BASE}/content`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ key, data, autoTranslateSource })
    });
    return res.json();
  },

  async uploadImage(file: File) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('qnc_admin_token') : null;
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });
    if (!res.ok) {
      let errMsg = 'Upload failed';
      try { const d = await res.json(); errMsg = d.error || errMsg; } catch {}
      throw new Error(errMsg);
    }
    return res.json();
  },

  async uploadImages(files: FileList | File[]) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('qnc_admin_token') : null;
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('file', file);
    });

    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });
    if (!res.ok) {
      let errMsg = 'Bulk upload failed';
      try { const d = await res.json(); errMsg = d.error || errMsg; } catch {}
      throw new Error(errMsg);
    }
    return res.json();
  },

  // Public Access
  async getPublicService(slug: string) {
    const res = await fetch(`http://localhost:4000/api/v1/public/services/${slug}`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Service not found');
    return res.json();
  },

  async getPublicContent() {
    const res = await fetch(`http://localhost:4000/api/v1/public/content`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to fetch content');
    return res.json();
  },

  async changePassword(currentPassword: any, newPassword: any) {
    const headers = await this.getAuthHeaders();
    const res = await fetch(`${API_BASE}/change-password`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ currentPassword, newPassword })
    });
    return res.json();
  },

  async resetPassword(token: string, newPassword: any) {
    const res = await fetch(`${API_BASE}/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Reset failed');
    return data;
  }
};
