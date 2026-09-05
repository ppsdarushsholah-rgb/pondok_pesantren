import { WebsiteData } from '../types';
import { defaultWebsiteData } from '../data/defaultData';

const STORAGE_KEY = 'pp_darush_sholah_website_data_v1';
const AUTH_KEY = 'pp_darush_sholah_admin_auth';

export function getStoredWebsiteData(): WebsiteData {
  try {
    const dataStr = localStorage.getItem(STORAGE_KEY);
    if (dataStr) {
      const parsed = JSON.parse(dataStr);
      // Ensure missing nested objects merge gracefully with default data
      return {
        ...defaultWebsiteData,
        ...parsed,
        hero: { ...defaultWebsiteData.hero, ...(parsed.hero || {}) },
        sambutan: { ...defaultWebsiteData.sambutan, ...(parsed.sambutan || {}) },
        profil: { ...defaultWebsiteData.profil, ...(parsed.profil || {}) },
        psb: { ...defaultWebsiteData.psb, ...(parsed.psb || {}) },
        kontak: { ...defaultWebsiteData.kontak, ...(parsed.kontak || {}) },
        berita: Array.isArray(parsed.berita) ? parsed.berita : defaultWebsiteData.berita,
        galeri: Array.isArray(parsed.galeri) ? parsed.galeri : defaultWebsiteData.galeri,
        program: Array.isArray(parsed.program) ? parsed.program : defaultWebsiteData.program,
        fasilitas: Array.isArray(parsed.fasilitas) ? parsed.fasilitas : defaultWebsiteData.fasilitas,
        pendaftar: Array.isArray(parsed.pendaftar) ? parsed.pendaftar : defaultWebsiteData.pendaftar,
      };
    }
  } catch (err) {
    console.error('Failed to load storage data, falling back to default:', err);
  }
  return defaultWebsiteData;
}

export function saveStoredWebsiteData(data: WebsiteData): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (err) {
    console.error('Failed to save website data to localStorage:', err);
    return false;
  }
}

export function resetToDefaultWebsiteData(): WebsiteData {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error(e);
  }
  return defaultWebsiteData;
}

// Image File to Base64 with canvas compression
export function fileToBase64Compressed(
  file: File,
  maxWidth = 1200,
  maxHeight = 900,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Export to WebP or JPEG
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

// Admin Authentication Utilities
export function getAdminAuthStatus(): boolean {
  try {
    return localStorage.getItem(AUTH_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setAdminAuthStatus(status: boolean): void {
  try {
    if (status) {
      localStorage.setItem(AUTH_KEY, 'true');
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  } catch (err) {
    console.error('Failed to update auth status:', err);
  }
}
