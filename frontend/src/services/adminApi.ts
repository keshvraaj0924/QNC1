const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
const API_BASE = `${BACKEND_URL}/api/v1/admin`;
const PUBLIC_BASE = `${BACKEND_URL}/api/v1/public`;

/**
 * Robust fetch wrapper to handle network failures gracefully.
 */
async function safeFetch(url: string, options: RequestInit = {}) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || `HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error: any) {
    if (error.name === 'TypeError') {
      console.warn(`[API] Network error at ${url}. Backend might be down.`);
      throw new Error('NETWORK_ERROR');
    }
    throw error;
  }
}

export const adminApi = {
  async login(username: any, password: any) {
    const data = await safeFetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    // Store session
    if (typeof window !== 'undefined' && data.token) {
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
    return safeFetch(`${API_BASE}/users`, { headers });
  },

  async createUser(userData: any) {
    const headers = await this.getAuthHeaders();
    return safeFetch(`${API_BASE}/users`, {
      method: 'POST',
      headers,
      body: JSON.stringify(userData)
    });
  },

  async forgotPassword(email: any) {
    return safeFetch(`${API_BASE}/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
  },

  async getContent() {
    const headers = await this.getAuthHeaders();
    return safeFetch(`${API_BASE}/content`, { headers });
  },

  async updateContent(key: any, data: any, autoTranslateSource?: string) {
    const headers = await this.getAuthHeaders();
    return safeFetch(`${API_BASE}/content`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ key, data, autoTranslateSource })
    });
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
      const d = await res.json().catch(() => ({}));
      throw new Error(d.error || 'Upload failed');
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
      const d = await res.json().catch(() => ({}));
      throw new Error(d.error || 'Bulk upload failed');
    }
    return res.json();
  },

  // Public Access
  async getPublicService(slug: string) {
    return safeFetch(`${PUBLIC_BASE}/services/${slug}`, {
      cache: 'no-store'
    });
  },

  async getPublicContent() {
    return safeFetch(`${PUBLIC_BASE}/content`, {
      cache: 'no-store'
    });
  },

  async changePassword(currentPassword: any, newPassword: any) {
    const headers = await this.getAuthHeaders();
    return safeFetch(`${API_BASE}/change-password`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ currentPassword, newPassword })
    });
  },

  async resetPassword(token: string, newPassword: any) {
    return safeFetch(`${API_BASE}/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword })
    });
  },

  async getNews() {
    const headers = await this.getAuthHeaders();
    return safeFetch(`${API_BASE}/news`, { headers }).catch(() => null);
  },

  async updateNews(newsData: any) {
    const headers = await this.getAuthHeaders();
    return safeFetch(`${API_BASE}/news`, {
      method: 'POST',
      headers,
      body: JSON.stringify(newsData)
    });
  }
};
