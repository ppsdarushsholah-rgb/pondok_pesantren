import React, { useState } from 'react';
import { WebsiteData, BeritaItem, GaleriItem, FasilitasItem, ProgramItem, PendaftarItem } from '../../types';
import { fileToBase64Compressed } from '../../utils/storage';
import { PesantrenLogo } from '../PesantrenLogo';
import {
  X,
  Upload,
  Image as ImageIcon,
  Edit3,
  Trash2,
  Plus,
  Save,
  RotateCcw,
  LogOut,
  Users,
  Newspaper,
  Layout,
  BookOpen,
  Building,
  GraduationCap,
  Phone,
  ShieldCheck,
  CheckCircle,
  FileText,
  Download,
  UploadCloud,
  Sparkles,
  Check,
  RefreshCw,
  Eye,
  Sliders
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  data: WebsiteData;
  onSaveData: (newData: WebsiteData) => void;
  onResetDefault: () => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  data,
  onSaveData,
  onResetDefault,
  onLogout,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<
    'logo' | 'hero' | 'sambutan' | 'berita' | 'galeri' | 'fasilitas' | 'psb' | 'pendaftar' | 'backup'
  >('logo');

  // Form states initialized with prop data
  const [websiteData, setWebsiteData] = useState<WebsiteData>(data);
  const [toastMessage, setToastMessage] = useState<string>('');

  // Editing state for Modal Items
  const [editingBerita, setEditingBerita] = useState<BeritaItem | null>(null);
  const [editingGaleri, setEditingGaleri] = useState<GaleriItem | null>(null);
  const [editingFasilitas, setEditingFasilitas] = useState<FasilitasItem | null>(null);

  // New Item states
  const [showAddBerita, setShowAddBerita] = useState(false);
  const [showAddGaleri, setShowAddGaleri] = useState(false);
  const [showAddFasilitas, setShowAddFasilitas] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleSaveAll = (updated: WebsiteData) => {
    setWebsiteData(updated);
    onSaveData(updated);
    showToast('Perubahan berhasil disimpan ke website!');
  };

  // Image Upload Handler Utility
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (base64Url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      showToast('Mengompresi & mengunggah gambar...');
      const base64 = await fileToBase64Compressed(file, 1200, 900, 0.82);
      onSuccess(base64);
      showToast('Gambar berhasil diunggah!');
    } catch (err) {
      console.error(err);
      alert('Gagal mengunggah gambar. Pastikan file berupa format foto yang valid (JPG/PNG).');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex flex-col animate-fadeIn overflow-hidden">
      {/* Top Admin Bar */}
      <header className="bg-emerald-950 text-white border-b border-emerald-800 px-4 sm:px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-emerald-950 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white leading-none">
              Panel Pengelola Website Pesantren
            </h2>
            <p className="text-xs text-amber-300 mt-0.5">
              Edit Teks, Berita, & Unggah Foto Langsung
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {toastMessage && (
            <span className="hidden md:inline-flex items-center gap-1.5 text-xs bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-400/30 animate-pulse">
              <CheckCircle className="w-3.5 h-3.5" /> {toastMessage}
            </span>
          )}

          <button
            onClick={() => {
              if (confirm('Kembalikan semua data ke pengaturan awal pesantren?')) {
                onResetDefault();
                onClose();
              }
            }}
            className="hidden sm:flex items-center gap-1 bg-emerald-900 hover:bg-emerald-800 text-emerald-200 hover:text-white text-xs px-3 py-2 rounded-xl border border-emerald-700/60 transition-colors"
            title="Reset Data Bawaan"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>

          <button
            onClick={onLogout}
            className="flex items-center gap-1 bg-rose-900/80 hover:bg-rose-800 text-rose-200 text-xs px-3 py-2 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Keluar
          </button>

          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white rounded-xl hover:bg-emerald-900 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Admin Content Layout */}
      <div className="flex-1 flex overflow-hidden bg-slate-100">
        {/* Sidebar Navigation */}
        <aside className="w-56 sm:w-64 bg-white border-r border-slate-200 p-3 sm:p-4 shrink-0 overflow-y-auto space-y-1">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 px-3 py-2">
            Menu Kelola Website
          </div>

          {[
            { id: 'logo', label: '1. Ganti Logo & Ikon', icon: Sparkles },
            { id: 'hero', label: '2. Banner Hero Utama', icon: Layout },
            { id: 'sambutan', label: '3. Sambutan Pengasuh', icon: BookOpen },
            { id: 'berita', label: '4. Berita & Kegiatan', icon: Newspaper },
            { id: 'galeri', label: '5. Galeri Foto', icon: ImageIcon },
            { id: 'fasilitas', label: '6. Fasilitas & Program', icon: Building },
            { id: 'psb', label: '7. Info PSB & Kontak', icon: Phone },
            { id: 'pendaftar', label: '8. Data Pendaftar PSB', icon: Users, badge: websiteData.pendaftar.length },
            { id: 'backup', label: '9. Cadangan & Reset Data', icon: Download },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-800 text-amber-300 shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-emerald-700'}`} />
                  <span className="truncate">{tab.label}</span>
                </div>
                {tab.badge !== undefined && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-amber-500 text-emerald-950' : 'bg-emerald-100 text-emerald-900'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Tab Body View */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {/* TAB 1: GANTI LOGO & IDENTITAS */}
          {activeTab === 'logo' && (
            <div className="max-w-4xl space-y-6 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-600">
                      <Sparkles className="w-5 h-5" />
                    </span>
                    <h3 className="text-xl font-bold text-emerald-950">Kelola & Ganti Logo Pesantren</h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Ubah icon logo pondok pesantren. Unggah foto langsung dari HP/komputer, gunakan tautan logo, atau pilih preset lambang resmi.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleSaveAll(websiteData)}
                  className="inline-flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-amber-300 font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer text-xs shrink-0"
                >
                  <Save className="w-4 h-4" /> Simpan Logo & Identitas
                </button>
              </div>

              {/* LIVE PREVIEW BANNER */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-emerald-700" /> Pratinjau Tampilan Logo Langsung (Real-Time)
                  </span>
                  <span className="text-[11px] text-emerald-700 font-medium">
                    Tampilan otomatis menyesuaikan di website
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Pratinjau Mode Terang / Navbar */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
                      <span>Tampilan di Navbar Atas (Latar Putih)</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px]">Header</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between overflow-hidden">
                      <PesantrenLogo
                        size="md"
                        logoUrl={websiteData.profil.logoUrl || '/logo.jpg'}
                        namaPesantren={websiteData.profil.namaPesantren}
                        showText={true}
                        textDark={true}
                      />
                    </div>
                  </div>

                  {/* Pratinjau Mode Gelap / Footer */}
                  <div className="p-4 rounded-2xl bg-emerald-950 text-white border border-emerald-800 shadow-xs space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-emerald-300/70">
                      <span>Tampilan di Footer & Dokumen (Latar Gelap)</span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-900 text-emerald-300 text-[10px]">Footer</span>
                    </div>
                    <div className="p-3 bg-emerald-900/60 rounded-xl border border-emerald-800 flex items-center justify-between overflow-hidden">
                      <PesantrenLogo
                        size="md"
                        logoUrl={websiteData.profil.logoUrl || '/logo.jpg'}
                        namaPesantren={websiteData.profil.namaPesantren}
                        showText={true}
                        textDark={false}
                      />
                    </div>
                  </div>
                </div>

                {/* Ukuran & Format Berbeda */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center gap-6 text-xs text-slate-600">
                  <span className="font-semibold text-slate-700">Variasi Ikon:</span>
                  <div className="flex items-center gap-2">
                    <PesantrenLogo size="sm" logoUrl={websiteData.profil.logoUrl || '/logo.jpg'} showText={false} />
                    <span className="text-[11px]">Kecil (40px)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PesantrenLogo size="md" logoUrl={websiteData.profil.logoUrl || '/logo.jpg'} showText={false} />
                    <span className="text-[11px]">Sedang (56px)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PesantrenLogo size="lg" logoUrl={websiteData.profil.logoUrl || '/logo.jpg'} showText={false} />
                    <span className="text-[11px]">Besar (80px)</span>
                  </div>
                </div>
              </div>

              {/* METODE PENGGANTIAN LOGO */}
              <div className="space-y-4 pt-2">
                <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-emerald-700" /> Metode Penggantian Logo
                </h4>

                {/* METODE 1: Unggah File Foto Langsung */}
                <div className="p-5 bg-emerald-50/70 rounded-2xl border-2 border-dashed border-emerald-300 hover:border-emerald-500 transition-colors">
                  <div className="flex flex-col sm:flex-row items-center gap-5">
                    <div className="w-24 h-24 rounded-2xl bg-black border-2 border-amber-400/80 p-1 flex items-center justify-center shadow-md shrink-0 overflow-hidden">
                      <img
                        src={websiteData.profil.logoUrl || '/logo.jpg'}
                        alt="Logo Saat Ini"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/logo.jpg';
                        }}
                      />
                    </div>

                    <div className="space-y-2 text-center sm:text-left flex-1">
                      <div className="font-bold text-sm text-emerald-950">
                        1. Unggah File Foto / Logo Baru dari Perangkat
                      </div>
                      <p className="text-xs text-emerald-800/80">
                        Mendukung format gambar foto: JPG, PNG, WEBP, atau JPEG. Foto langsung dikompresi dan dipasang ke seluruh halaman website.
                      </p>

                      <div className="pt-1 flex flex-wrap gap-2 justify-center sm:justify-start">
                        <label className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs cursor-pointer transition-all">
                          <Upload className="w-4 h-4 text-amber-300" />
                          <span>Pilih & Unggah File Logo Baru</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleImageUpload(e, (base64) => {
                                const updated = {
                                  ...websiteData,
                                  profil: { ...websiteData.profil, logoUrl: base64 },
                                };
                                setWebsiteData(updated);
                                onSaveData(updated);
                                showToast('Logo baru berhasil diunggah & disimpan!');
                              })
                            }
                          />
                        </label>

                        {websiteData.profil.logoUrl && websiteData.profil.logoUrl !== '/logo.jpg' && (
                          <button
                            type="button"
                            onClick={() => {
                              const updated = {
                                ...websiteData,
                                profil: {
                                  ...websiteData.profil,
                                  logoUrl: '/logo.jpg',
                                },
                              };
                              setWebsiteData(updated);
                              onSaveData(updated);
                              showToast('Logo dikembalikan ke default /logo.jpg');
                            }}
                            className="inline-flex items-center gap-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold px-3 py-2 rounded-xl transition-colors cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" /> Reset ke Default /logo.jpg
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* METODE 2: Pilihan Cepat / Preset Resmi */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="font-bold text-xs text-slate-800 flex items-center justify-between">
                    <span>2. Pilihan Cepat Preset Logo Resmi Pesantren</span>
                    <span className="text-[10px] text-slate-500 font-normal">Klik untuk langsung menerapkan</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        const updated = {
                          ...websiteData,
                          profil: {
                            ...websiteData.profil,
                            logoUrl: '/logo.jpg',
                          },
                        };
                        setWebsiteData(updated);
                        onSaveData(updated);
                        showToast('Logo Preset /logo.jpg diterapkan!');
                      }}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                        websiteData.profil.logoUrl === '/logo.jpg' || !websiteData.profil.logoUrl
                          ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-600/30'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-black border border-amber-400 p-0.5 shrink-0 overflow-hidden flex items-center justify-center">
                        <img src="/logo.jpg" alt="Preset 1" className="w-full h-full object-contain" />
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold text-slate-900 truncate">Foto Resmi Utama</div>
                        <div className="text-[10px] text-slate-500 truncate">Berkas /logo.jpg</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const updated = {
                          ...websiteData,
                          profil: {
                            ...websiteData.profil,
                            logoUrl: '/WhatsApp Image 2026-09-06 at 00.55.20.jpeg',
                          },
                        };
                        setWebsiteData(updated);
                        onSaveData(updated);
                        showToast('Logo WhatsApp Image diterapkan!');
                      }}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                        websiteData.profil.logoUrl === '/WhatsApp Image 2026-09-06 at 00.55.20.jpeg'
                          ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-600/30'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-black border border-amber-400 p-0.5 shrink-0 overflow-hidden flex items-center justify-center">
                        <img src="/WhatsApp Image 2026-09-06 at 00.55.20.jpeg" alt="WhatsApp Image" className="w-full h-full object-contain" />
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold text-slate-900 truncate">File WhatsApp Asli</div>
                        <div className="text-[10px] text-slate-500 truncate">Upload 00.55.20</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const updated = {
                          ...websiteData,
                          profil: {
                            ...websiteData.profil,
                            logoUrl: 'vector',
                          },
                        };
                        setWebsiteData(updated);
                        onSaveData(updated);
                        showToast('Logo Vector Emblem Emas diterapkan!');
                      }}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                        websiteData.profil.logoUrl === 'vector'
                          ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-600/30'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-amber-400 p-0.5 shrink-0 overflow-hidden flex items-center justify-center">
                        <PesantrenLogo size="sm" logoUrl="" showText={false} />
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold text-slate-900 truncate">Vector Emblem Emas</div>
                        <div className="text-[10px] text-slate-500 truncate">Grafis Tajam SVG</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* METODE 3: Input Tautan / URL Langsung */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700">
                    3. Atau Masukkan Tautan / Path URL Logo Secara Manual
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="/logo.jpg atau https://example.com/logo.png"
                      value={websiteData.profil.logoUrl || ''}
                      onChange={(e) =>
                        setWebsiteData({
                          ...websiteData,
                          profil: { ...websiteData.profil, logoUrl: e.target.value },
                        })
                      }
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-700"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        handleSaveAll(websiteData);
                      }}
                      className="bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 transition-colors cursor-pointer"
                    >
                      Terapkan & Simpan
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Tips: Anda dapat menggunakan gambar yang tersimpan di server lokal seperti <code className="text-emerald-700 font-mono">/logo.jpg</code> atau URL eksternal gambar.
                  </p>
                </div>
              </div>

              {/* IDENTITAS NAMA & SLOGAN PESANTREN */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-emerald-700" />
                  <h4 className="text-sm font-bold text-slate-800">Teks Identitas di Samping Logo</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nama Pesantren</label>
                    <input
                      type="text"
                      value={websiteData.profil.namaPesantren}
                      onChange={(e) =>
                        setWebsiteData({
                          ...websiteData,
                          profil: { ...websiteData.profil, namaPesantren: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-700"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">Tampil sebagai judul utama di header.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Singkatan / Lencana</label>
                    <input
                      type="text"
                      value={websiteData.profil.singkatan}
                      onChange={(e) =>
                        setWebsiteData({
                          ...websiteData,
                          profil: { ...websiteData.profil, singkatan: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-700"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">Contoh: PPS Darush Sholah - TQN 165</p>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Tahun Berdiri</label>
                    <input
                      type="text"
                      value={websiteData.profil.tahunBerdiri}
                      onChange={(e) =>
                        setWebsiteData({
                          ...websiteData,
                          profil: { ...websiteData.profil, tahunBerdiri: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                </div>
              </div>

              {/* TOMBOL SIMPAN BESAR */}
              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleSaveAll(websiteData)}
                  className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-amber-300 font-bold px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer text-sm"
                >
                  <Save className="w-5 h-5" /> Simpan Semua Perubahan Logo
                </button>
              </div>
            </div>
          )}
          {activeTab === 'hero' && (
            <div className="max-w-4xl space-y-6 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200">
              <div>
                <h3 className="text-xl font-bold text-emerald-950">Edit Banner Hero Utama</h3>
                <p className="text-xs text-slate-500">Ubah teks, judul, dan foto spanduk utama di bagian teratas website.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Judul Utama Hero</label>
                  <input
                    type="text"
                    value={websiteData.hero.title}
                    onChange={(e) =>
                      setWebsiteData({ ...websiteData, hero: { ...websiteData.hero, title: e.target.value } })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subjudul / Deskripsi Hero</label>
                  <textarea
                    rows={3}
                    value={websiteData.hero.subtitle}
                    onChange={(e) =>
                      setWebsiteData({ ...websiteData, hero: { ...websiteData.hero, subtitle: e.target.value } })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Teks Badge Pengumuman</label>
                  <input
                    type="text"
                    value={websiteData.hero.badge}
                    onChange={(e) =>
                      setWebsiteData({ ...websiteData, hero: { ...websiteData.hero, badge: e.target.value } })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                {/* Photo Upload Box for Hero */}
                <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-3">
                  <span className="block text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-emerald-700" /> Ganti Foto Spanduk Hero (Unggah File)
                  </span>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <img
                      src={websiteData.hero.imageUrl}
                      alt="Hero Preview"
                      className="w-full sm:w-48 h-28 object-cover rounded-xl border border-slate-300 shadow-xs"
                    />

                    <div className="space-y-2 flex-1">
                      <label className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs cursor-pointer transition-colors">
                        <Upload className="w-4 h-4 text-amber-300" />
                        <span>Pilih Foto dari Perangkat (Unggah)</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageUpload(e, (base64) =>
                              setWebsiteData({
                                ...websiteData,
                                hero: { ...websiteData.hero, imageUrl: base64 },
                              })
                            )
                          }
                        />
                      </label>

                      <p className="text-[11px] text-slate-500">
                        Atau masukkan URL gambar langsung:
                      </p>

                      <input
                        type="text"
                        value={websiteData.hero.imageUrl}
                        onChange={(e) =>
                          setWebsiteData({ ...websiteData, hero: { ...websiteData.hero, imageUrl: e.target.value } })
                        }
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => handleSaveAll(websiteData)}
                    className="flex items-center gap-2 bg-emerald-900 hover:bg-emerald-950 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors cursor-pointer shadow-md"
                  >
                    <Save className="w-4 h-4 text-amber-400" />
                    <span>Simpan Perubahan Banner Hero</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SAMBUTAN PENGASUH */}
          {activeTab === 'sambutan' && (
            <div className="max-w-4xl space-y-6 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200">
              <div>
                <h3 className="text-xl font-bold text-emerald-950">Edit Sambutan & Foto Pengasuh</h3>
                <p className="text-xs text-slate-500">Ubah nama, foto Kyai/Pengasuh, dan kalimat pesan sambutan.</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap Pengasuh</label>
                    <input
                      type="text"
                      value={websiteData.sambutan.namaPengasuh}
                      onChange={(e) =>
                        setWebsiteData({
                          ...websiteData,
                          sambutan: { ...websiteData.sambutan, namaPengasuh: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Gelar / Jabatan</label>
                    <input
                      type="text"
                      value={websiteData.sambutan.gelarPengasuh}
                      onChange={(e) =>
                        setWebsiteData({
                          ...websiteData,
                          sambutan: { ...websiteData.sambutan, gelarPengasuh: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kutipan Salam Pembuka</label>
                  <input
                    type="text"
                    value={websiteData.sambutan.kutipanHeader}
                    onChange={(e) =>
                      setWebsiteData({
                        ...websiteData,
                        sambutan: { ...websiteData.sambutan, kutipanHeader: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Isi Kalimat Sambutan Lengkap</label>
                  <textarea
                    rows={6}
                    value={websiteData.sambutan.isiSambutan}
                    onChange={(e) =>
                      setWebsiteData({
                        ...websiteData,
                        sambutan: { ...websiteData.sambutan, isiSambutan: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-700 font-sans"
                  />
                </div>

                {/* Kyai Photo Upload Box */}
                <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-3">
                  <span className="block text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-emerald-700" /> Ganti Foto Pengasuh / Kyai (Unggah File)
                  </span>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <img
                      src={websiteData.sambutan.kiaiPhotoUrl}
                      alt="Pengasuh Preview"
                      className="w-28 h-36 object-cover rounded-xl border border-slate-300 shadow-xs"
                    />

                    <div className="space-y-2 flex-1">
                      <label className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs cursor-pointer transition-colors">
                        <Upload className="w-4 h-4 text-amber-300" />
                        <span>Unggah Foto Pengasuh Baru</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageUpload(e, (base64) =>
                              setWebsiteData({
                                ...websiteData,
                                sambutan: { ...websiteData.sambutan, kiaiPhotoUrl: base64 },
                              })
                            )
                          }
                        />
                      </label>

                      <p className="text-[11px] text-slate-500">
                        Atau masukkan URL foto:
                      </p>

                      <input
                        type="text"
                        value={websiteData.sambutan.kiaiPhotoUrl}
                        onChange={(e) =>
                          setWebsiteData({
                            ...websiteData,
                            sambutan: { ...websiteData.sambutan, kiaiPhotoUrl: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => handleSaveAll(websiteData)}
                    className="flex items-center gap-2 bg-emerald-900 hover:bg-emerald-950 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors cursor-pointer shadow-md"
                  >
                    <Save className="w-4 h-4 text-amber-400" />
                    <span>Simpan Perubahan Sambutan</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BERITA & KEGIATAN */}
          {activeTab === 'berita' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <div>
                  <h3 className="text-xl font-bold text-emerald-950">Kelola Berita & Pengumuman</h3>
                  <p className="text-xs text-slate-500">Tambah berita baru, unggah foto berita, dan edit konten artikel.</p>
                </div>

                <button
                  onClick={() => setShowAddBerita(true)}
                  className="flex items-center gap-2 bg-emerald-900 hover:bg-emerald-950 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>Tambah Berita Baru</span>
                </button>
              </div>

              {/* Add New Berita Modal */}
              {showAddBerita && (
                <div className="bg-white p-6 rounded-3xl border-2 border-emerald-600 shadow-md space-y-4">
                  <h4 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-amber-600" /> Form Tambah Berita Baru
                  </h4>

                  <BeritaForm
                    onSave={(newItem: BeritaItem) => {
                      const updated = {
                        ...websiteData,
                        berita: [newItem, ...websiteData.berita],
                      };
                      handleSaveAll(updated);
                      setShowAddBerita(false);
                    }}
                    onCancel={() => setShowAddBerita(false)}
                    handleImageUpload={handleImageUpload}
                  />
                </div>
              )}

              {/* Berita List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {websiteData.berita.map((item) => (
                  <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex gap-4 items-center justify-between">
                    <img src={item.imageUrl} alt="" className="w-20 h-20 object-cover rounded-xl shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                        {item.kategori}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 truncate mt-1">{item.judul}</h4>
                      <p className="text-xs text-slate-500">{item.tanggal}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingBerita(item)}
                        className="p-2 text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg cursor-pointer"
                        title="Edit Berita"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Hapus berita ini?')) {
                            const updated = {
                              ...websiteData,
                              berita: websiteData.berita.filter((b) => b.id !== item.id),
                            };
                            handleSaveAll(updated);
                          }
                        }}
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                        title="Hapus Berita"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit Berita Modal */}
              {editingBerita && (
                <div className="fixed inset-0 z-50 bg-black/80 p-4 flex items-center justify-center">
                  <div className="bg-white p-6 sm:p-8 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-4">
                    <h4 className="text-lg font-bold text-emerald-950">Edit Berita Pesantren</h4>
                    <BeritaForm
                      initialData={editingBerita}
                      onSave={(updatedItem: BeritaItem) => {
                        const updated = {
                          ...websiteData,
                          berita: websiteData.berita.map((b) => (b.id === updatedItem.id ? updatedItem : b)),
                        };
                        handleSaveAll(updated);
                        setEditingBerita(null);
                      }}
                      onCancel={() => setEditingBerita(null)}
                      handleImageUpload={handleImageUpload}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: GALERI FOTO */}
          {activeTab === 'galeri' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <div>
                  <h3 className="text-xl font-bold text-emerald-950">Kelola Galeri Foto Activity</h3>
                  <p className="text-xs text-slate-500">Unggah foto kegiatan santri baru dan atur caption foto.</p>
                </div>

                <button
                  onClick={() => setShowAddGaleri(true)}
                  className="flex items-center gap-2 bg-emerald-900 hover:bg-emerald-950 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>Tambah Foto Galeri</span>
                </button>
              </div>

              {/* Add New Galeri Modal */}
              {showAddGaleri && (
                <div className="bg-white p-6 rounded-3xl border-2 border-emerald-600 shadow-md space-y-4">
                  <h4 className="text-lg font-bold text-emerald-950">Unggah Foto Galeri Baru</h4>
                  <GaleriForm
                    onSave={(newItem: GaleriItem) => {
                      const updated = {
                        ...websiteData,
                        galeri: [newItem, ...websiteData.galeri],
                      };
                      handleSaveAll(updated);
                      setShowAddGaleri(false);
                    }}
                    onCancel={() => setShowAddGaleri(false)}
                    handleImageUpload={handleImageUpload}
                  />
                </div>
              )}

              {/* Galeri Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {websiteData.galeri.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs p-3 space-y-2">
                    <img src={item.imageUrl} alt="" className="w-full h-36 object-cover rounded-xl" />
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                          {item.kategori}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1 mt-1">{item.judul}</h4>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm('Hapus foto dari galeri?')) {
                            const updated = {
                              ...websiteData,
                              galeri: websiteData.galeri.filter((g) => g.id !== item.id),
                            };
                            handleSaveAll(updated);
                          }
                        }}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: FASILITAS & PROGRAM */}
          {activeTab === 'fasilitas' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <h3 className="text-xl font-bold text-emerald-950">Kelola Fasilitas Pesantren</h3>
                <p className="text-xs text-slate-500">Ganti foto fasilitas dan deskripsi sarana pesantren.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {websiteData.fasilitas.map((fas) => (
                  <div key={fas.id} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                    <img src={fas.imageUrl} alt="" className="w-full h-40 object-cover rounded-xl" />
                    <h4 className="font-bold text-emerald-950">{fas.nama}</h4>
                    <p className="text-xs text-slate-600 line-clamp-2">{fas.deskripsi}</p>

                    <div className="pt-2">
                      <label className="inline-flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-3 py-2 rounded-xl cursor-pointer">
                        <Upload className="w-3.5 h-3.5 text-amber-300" />
                        <span>Ganti Foto Fasilitas (Unggah)</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageUpload(e, (base64) => {
                              const updatedFas = websiteData.fasilitas.map((f) =>
                                f.id === fas.id ? { ...f, imageUrl: base64 } : f
                              );
                              handleSaveAll({ ...websiteData, fasilitas: updatedFas });
                            })
                          }
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: INFO PSB & KONTAK */}
          {activeTab === 'psb' && (
            <div className="max-w-4xl space-y-6 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-emerald-950">Kelola Informasi PSB & Kontak</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tahun Ajaran PSB</label>
                  <input
                    type="text"
                    value={websiteData.psb.tahunAjaran}
                    onChange={(e) =>
                      setWebsiteData({ ...websiteData, psb: { ...websiteData.psb, tahunAjaran: e.target.value } })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Gelombang Pendaftaran</label>
                  <input
                    type="text"
                    value={websiteData.psb.gelombang}
                    onChange={(e) =>
                      setWebsiteData({ ...websiteData, psb: { ...websiteData.psb, gelombang: e.target.value } })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nomor WhatsApp Panitia</label>
                  <input
                    type="text"
                    value={websiteData.kontak.whatsapp}
                    onChange={(e) =>
                      setWebsiteData({ ...websiteData, kontak: { ...websiteData.kontak, whatsapp: e.target.value } })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Alamat Email Pesantren</label>
                  <input
                    type="text"
                    value={websiteData.kontak.email}
                    onChange={(e) =>
                      setWebsiteData({ ...websiteData, kontak: { ...websiteData.kontak, email: e.target.value } })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Alamat Lengkap Pesantren</label>
                <textarea
                  rows={2}
                  value={websiteData.kontak.alamat}
                  onChange={(e) =>
                    setWebsiteData({ ...websiteData, kontak: { ...websiteData.kontak, alamat: e.target.value } })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <button
                onClick={() => handleSaveAll(websiteData)}
                className="flex items-center gap-2 bg-emerald-900 hover:bg-emerald-950 text-white font-bold px-6 py-3 rounded-xl text-sm cursor-pointer shadow-md"
              >
                <Save className="w-4 h-4 text-amber-400" />
                <span>Simpan Info PSB & Kontak</span>
              </button>
            </div>
          )}

          {/* TAB 7: DATA PENDAFTAR SANTRI BARU */}
          {activeTab === 'pendaftar' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 flex justify-between items-center shadow-xs">
                <div>
                  <h3 className="text-xl font-bold text-emerald-950">Data Pendaftar Santri Baru (PSB Online)</h3>
                  <p className="text-xs text-slate-500">Total {websiteData.pendaftar.length} calon santri terdaftar.</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-xs">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-900 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">ID</th>
                      <th className="p-3">Nama Santri</th>
                      <th className="p-3">Program</th>
                      <th className="p-3">Wali / No. HP</th>
                      <th className="p-3">Tgl Daftar</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Aksi Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {websiteData.pendaftar.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-emerald-800">{p.id}</td>
                        <td className="p-3 font-bold text-slate-900">
                          {p.namaLengkap}
                          <span className="block text-[10px] font-normal text-slate-500">{p.jenisKelamin} | {p.asalSekolah}</span>
                        </td>
                        <td className="p-3">{p.pilihanProgram}</td>
                        <td className="p-3">
                          {p.namaWali}
                          <a href={`https://wa.me/${p.nomorHpWali.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="block text-emerald-700 font-mono underline">
                            {p.nomorHpWali}
                          </a>
                        </td>
                        <td className="p-3">{p.tanggalDaftar}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            p.status === 'Diterima' ? 'bg-emerald-100 text-emerald-800' :
                            p.status === 'Ditolak' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <select
                            value={p.status}
                            onChange={(e) => {
                              const updatedP = websiteData.pendaftar.map((item) =>
                                item.id === p.id ? { ...item, status: e.target.value as any } : item
                              );
                              handleSaveAll({ ...websiteData, pendaftar: updatedP });
                            }}
                            className="text-[11px] p-1 border border-slate-300 rounded-lg"
                          >
                            <option value="Menunggu">Menunggu</option>
                            <option value="Diterima">Diterima</option>
                            <option value="Berkas Kurang">Berkas Kurang</option>
                            <option value="Ditolak">Ditolak</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 8: BACKUP & RESTORE */}
          {activeTab === 'backup' && (
            <div className="max-w-2xl space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200">
              <h3 className="text-xl font-bold text-emerald-950">Backup & Restore Data Website</h3>

              <div className="space-y-4">
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-2">
                  <h4 className="font-bold text-emerald-950 text-sm">Unduh Cadangan (Backup JSON)</h4>
                  <p className="text-xs text-slate-600">Simpan seluruh isi website (termasuk foto & teks) ke file komputer.</p>
                  <button
                    onClick={() => {
                      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(websiteData, null, 2));
                      const downloadAnchor = document.createElement('a');
                      downloadAnchor.setAttribute("href", dataStr);
                      downloadAnchor.setAttribute("download", `backup_pesantren_${Date.now()}.json`);
                      document.body.appendChild(downloadAnchor);
                      downloadAnchor.click();
                      downloadAnchor.remove();
                    }}
                    className="flex items-center gap-2 bg-emerald-900 hover:bg-emerald-950 text-white font-bold px-4 py-2.5 rounded-xl text-xs cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-amber-300" />
                    <span>Download File JSON Backup</span>
                  </button>
                </div>

                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
                  <h4 className="font-bold text-amber-950 text-sm">Kembalikan Data Awal (Reset)</h4>
                  <p className="text-xs text-slate-700">Jika ingin meriset ulang seluruh isi ke kondisi default pesantren bawaan.</p>
                  <button
                    onClick={() => {
                      if (confirm('Riset ke data default pesantren?')) {
                        onResetDefault();
                        onClose();
                      }
                    }}
                    className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset Seluruh Data Website</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// Internal Form Helper Components
function BeritaForm({ initialData, onSave, onCancel, handleImageUpload }: any) {
  const [form, setForm] = useState(
    initialData || {
      id: `news-${Date.now()}`,
      judul: '',
      ringkasan: '',
      kontenLengkap: '',
      tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      kategori: 'Kegiatan Pesantren',
      penulis: 'Humas Pesantren',
      imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=800',
    }
  );

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">Judul Berita *</label>
        <input
          type="text"
          value={form.judul}
          onChange={(e) => setForm({ ...form, judul: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Kategori Berita</label>
          <input
            type="text"
            value={form.kategori}
            onChange={(e) => setForm({ ...form, kategori: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Penulis</label>
          <input
            type="text"
            value={form.penulis}
            onChange={(e) => setForm({ ...form, penulis: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">Ringkasan Pendek</label>
        <textarea
          rows={2}
          value={form.ringkasan}
          onChange={(e) => setForm({ ...form, ringkasan: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">Isi Berita Lengkap</label>
        <textarea
          rows={5}
          value={form.kontenLengkap}
          onChange={(e) => setForm({ ...form, kontenLengkap: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
        />
      </div>

      {/* Image upload box */}
      <div className="p-3 bg-emerald-50 rounded-xl space-y-2 border border-emerald-200">
        <label className="block text-xs font-bold text-emerald-950">Foto Utama Berita (Unggah File)</label>
        <div className="flex items-center gap-3">
          <img src={form.imageUrl} alt="" className="w-16 h-16 object-cover rounded-lg border" />
          <label className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-3 py-2 rounded-xl cursor-pointer">
            <Upload className="w-3.5 h-3.5 inline mr-1" /> Unggah Foto File
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                handleImageUpload(e, (base64: string) => setForm({ ...form, imageUrl: base64 }))
              }
            />
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-xs font-semibold text-slate-600">
          Batal
        </button>
        <button
          type="button"
          onClick={() => {
            if (!form.judul) return alert('Judul wajib diisi!');
            onSave(form);
          }}
          className="bg-emerald-900 text-white text-xs font-bold px-5 py-2 rounded-xl"
        >
          Simpan Berita
        </button>
      </div>
    </div>
  );
}

function GaleriForm({ onSave, onCancel, handleImageUpload }: any) {
  const [form, setForm] = useState({
    id: `gal-${Date.now()}`,
    judul: '',
    kategori: 'Kegiatan Santri',
    tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    imageUrl: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&q=80&w=800',
  });

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">Judul / Caption Foto *</label>
        <input
          type="text"
          value={form.judul}
          onChange={(e) => setForm({ ...form, judul: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">Kategori Foto</label>
        <input
          type="text"
          value={form.kategori}
          onChange={(e) => setForm({ ...form, kategori: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
        />
      </div>

      <div className="p-3 bg-emerald-50 rounded-xl space-y-2 border border-emerald-200">
        <label className="block text-xs font-bold text-emerald-950">Unggah File Foto Galeri *</label>
        <div className="flex items-center gap-3">
          <img src={form.imageUrl} alt="" className="w-20 h-20 object-cover rounded-lg border" />
          <label className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer">
            <Upload className="w-4 h-4 inline mr-1 text-amber-300" /> Pilih File Foto
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                handleImageUpload(e, (base64: string) => setForm({ ...form, imageUrl: base64 }))
              }
            />
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-xs font-semibold text-slate-600">
          Batal
        </button>
        <button
          type="button"
          onClick={() => {
            if (!form.judul) return alert('Judul foto wajib diisi!');
            onSave(form);
          }}
          className="bg-emerald-900 text-white text-xs font-bold px-5 py-2 rounded-xl"
        >
          Simpan ke Galeri
        </button>
      </div>
    </div>
  );
}
