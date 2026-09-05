/**
 * Modal Viewer & Downloader Source Code PHP Native & Database MySQL
 */

import React, { useState } from 'react';
import { PHP_PROJECT_FILES, PhpFileItem } from '../data/phpSourceFiles';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import {
  Download,
  FileCode,
  Copy,
  Check,
  X,
  Database,
  Server,
  FolderTree,
  ExternalLink,
  BookOpen,
  Terminal,
  ShieldAlert,
} from 'lucide-react';

interface PhpSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhpSourceModal: React.FC<PhpSourceModalProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<PhpFileItem>(PHP_PROJECT_FILES[0]);
  const [copied, setCopied] = useState<boolean>(false);
  const [isZipping, setIsZipping] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'files' | 'panduan' | 'struktur'>('files');

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();

      // Buat folder proyek
      const rootFolder = zip.folder('pesantren_darushsholah_php_mysql');

      // Masukkan semua file PHP, SQL, dan README
      PHP_PROJECT_FILES.forEach((file) => {
        rootFolder?.file(file.path, file.code);
      });

      // Generate file zip
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'pesantren_darushsholah_php_mysql.zip');
    } catch (err) {
      console.error('Gagal membuat zip:', err);
      alert('Terjadi kesalahan saat mengompres berkas.');
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Modal */}
        <div className="bg-emerald-950 text-white p-6 flex flex-wrap justify-between items-center gap-4 border-b border-emerald-900">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center font-black shadow-md">
              <FileCode className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight text-white">Source Code PHP Native & Database MySQL</h2>
                <span className="bg-emerald-800 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Siap Pakai</span>
              </div>
              <p className="text-xs text-emerald-200 mt-0.5">
                Proyek lengkap PHP Native + MySQL PDO siap dijalankan di XAMPP, Laragon, atau Web Hosting cPanel.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadZip}
              disabled={isZipping}
              className="bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-emerald-950 font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl shadow transition flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {isZipping ? 'Mengompres...' : 'Download .ZIP (Lengkap)'}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-emerald-300 hover:text-white hover:bg-emerald-900 rounded-xl transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-100 px-6 py-2 border-b border-slate-200 flex space-x-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('files')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
              activeTab === 'files' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCode className="w-4 h-4 text-emerald-700" />
            Jelajahi Berkas & Kode ({PHP_PROJECT_FILES.length} File)
          </button>
          <button
            onClick={() => setActiveTab('panduan')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
              activeTab === 'panduan' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-600" />
            Panduan XAMPP & Hosting
          </button>
          <button
            onClick={() => setActiveTab('struktur')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
              activeTab === 'struktur' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FolderTree className="w-4 h-4 text-purple-600" />
            Struktur Proyek PHP
          </button>
        </div>

        {/* Tab 1: Berkas & Editor */}
        {activeTab === 'files' && (
          <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
            {/* List Berkas Kiri */}
            <div className="md:col-span-4 border-r border-slate-200 p-4 overflow-y-auto bg-slate-50/70 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-1">
                Pilih Berkas Proyek:
              </span>
              {PHP_PROJECT_FILES.map((file, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left p-3 rounded-xl transition flex items-start justify-between gap-2 border ${
                    selectedFile.path === file.path
                      ? 'bg-white border-emerald-500 shadow-sm'
                      : 'border-transparent hover:bg-white/60 text-slate-700'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-2">
                      {file.category === 'Database' ? (
                        <Database className="w-4 h-4 text-amber-600 shrink-0" />
                      ) : (
                        <FileCode className="w-4 h-4 text-emerald-700 shrink-0" />
                      )}
                      <span className="font-bold text-xs text-slate-900 truncate font-mono">{file.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-1">{file.description}</p>
                  </div>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                      file.category === 'Database'
                        ? 'bg-amber-100 text-amber-800'
                        : file.category === 'Admin'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {file.category}
                  </span>
                </button>
              ))}
            </div>

            {/* Viewer Kanan */}
            <div className="md:col-span-8 flex flex-col overflow-hidden bg-slate-900 text-slate-100">
              {/* Toolbar Viewer */}
              <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex justify-between items-center text-xs">
                <div className="flex items-center gap-2 font-mono text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  {selectedFile.path}
                </div>
                <button
                  onClick={handleCopy}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-medium transition"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> Tersalin!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Salin Kode
                    </>
                  )}
                </button>
              </div>

              {/* Box Kode */}
              <pre className="p-5 font-mono text-xs overflow-auto flex-1 leading-relaxed text-emerald-100/90 selection:bg-emerald-700">
                <code>{selectedFile.code}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Tab 2: Panduan Instalasi */}
        {activeTab === 'panduan' && (
          <div className="p-8 overflow-y-auto space-y-6 flex-1 text-slate-700">
            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl space-y-2">
              <h3 className="font-bold text-base text-emerald-950 flex items-center gap-2">
                <Server className="w-5 h-5 text-emerald-700" /> Cara Menjalankan di XAMPP / Laragon (Komputer / Laptop)
              </h3>
              <p className="text-xs text-slate-600">Ikuti 4 langkah mudah berikut untuk menjalankan proyek di komputer lokal Anda:</p>
              <ol className="list-decimal list-inside text-xs space-y-2 pt-2">
                <li>
                  Klik tombol <strong>Download .ZIP (Lengkap)</strong> di pojok kanan atas modal ini.
                </li>
                <li>
                  Ekstrak isi zip ke folder <code>C:/xampp/htdocs/pesantren/</code> (atau <code>C:/laragon/www/pesantren/</code>).
                </li>
                <li>
                  Buka browser ke <code>http://localhost/phpmyadmin</code>, buat database bernama <code>pesantren_darushsholah</code>, lalu Import berkas <code>database.sql</code>.
                </li>
                <li>
                  Buka website di browser: <code>http://localhost/pesantren/index.php</code>.
                </li>
              </ol>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl space-y-2">
              <h3 className="font-bold text-base text-amber-950 flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-amber-700" /> Cara Upload ke Web Hosting cPanel
              </h3>
              <ul className="list-disc list-inside text-xs space-y-2 text-slate-600">
                <li>Upload file zip ke folder <code>public_html</code> melalui <strong>File Manager cPanel</strong> lalu ekstrak.</li>
                <li>Buat database MySQL baru dan user database di menu <strong>MySQL Databases</strong> cPanel.</li>
                <li>Import <code>database.sql</code> melalui phpMyAdmin cPanel.</li>
                <li>Sesuaikan nama DB, user, dan password di file <code>config/koneksi.php</code>.</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-100 rounded-2xl text-xs space-y-1">
              <strong className="text-slate-900 block font-bold">🔐 Akun Administrator Default:</strong>
              <p>Username: <code className="bg-white px-2 py-0.5 rounded border border-slate-300 font-mono">admin</code> | Password: <code className="bg-white px-2 py-0.5 rounded border border-slate-300 font-mono">admin123</code></p>
              <p className="text-slate-500 text-[11px]">URL Login: <code>http://localhost/pesantren/admin/login.php</code></p>
            </div>
          </div>
        )}

        {/* Tab 3: Struktur Proyek */}
        {activeTab === 'struktur' && (
          <div className="p-8 overflow-y-auto space-y-4 flex-1">
            <h3 className="text-base font-bold text-slate-900">Peta Struktur Berkas PHP Native & MySQL</h3>
            <pre className="p-6 bg-slate-900 text-emerald-300 font-mono text-xs rounded-2xl leading-relaxed overflow-x-auto">
{`pesantren_darushsholah/
├── database.sql               <-- File skema & data MySQL (import ke phpMyAdmin)
├── README.md                  <-- Panduan instalasi dan konfigurasi
├── index.php                  <-- Halaman Beranda (Hero, Sambutan, Visi, Program, Fasilitas)
├── daftar.php                 <-- Formulir Pendaftaran Santri Baru (PSB) Online
├── berita.php                 <-- Daftar warta & artikel pesantren
├── berita-detail.php          <-- Halaman detail artikel warta
├── galeri.php                 <-- Galeri dokumentasi aktivitas santri
├── config/
│   └── koneksi.php            <-- Koneksi PDO MySQL & fungsi helper sanitasi
├── includes/
│   ├── header.php             <-- Header & navigasi responsif
│   └── footer.php             <-- Footer, kontak, & floating WhatsApp
└── admin/
    ├── login.php              <-- Form login administrator
    ├── auth.php               <-- Proteksi session admin
    ├── logout.php             <-- Logout & hancurkan session
    ├── index.php              <-- Dashboard statistik ringkasan
    ├── pendaftar.php          <-- Manajemen santri baru (verifikasi, terima, tolak)
    ├── berita.php             <-- CRUD artikel berita (tulis, edit, hapus)
    ├── galeri.php             <-- Kelola foto dokumentasi
    └── pengaturan.php         <-- Edit sambutan, visi misi, kontak, & status PSB`}
            </pre>
          </div>
        )}

        {/* Footer Modal */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap justify-between items-center gap-3 text-xs text-slate-500">
          <span>Folder berkas PHP juga tersimpan di direktori <code>/php_project/</code> pada sistem workspace.</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
