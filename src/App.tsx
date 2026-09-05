/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { WebsiteData, BeritaItem, PendaftarItem } from './types';
import {
  getStoredWebsiteData,
  saveStoredWebsiteData,
  resetToDefaultWebsiteData,
  getAdminAuthStatus,
  setAdminAuthStatus,
} from './utils/storage';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Sambutan } from './components/Sambutan';
import { ProfilVisiMisi } from './components/ProfilVisiMisi';
import { ProgramPendidikan } from './components/ProgramPendidikan';
import { Fasilitas } from './components/Fasilitas';
import { BeritaSection } from './components/BeritaSection';
import { GaleriSection } from './components/GaleriSection';
import { PendaftaranSection } from './components/PendaftaranSection';
import { KontakFooter } from './components/KontakFooter';

import { NewsDetailModal } from './components/NewsDetailModal';
import { PendaftaranModal } from './components/PendaftaranModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { PhpSourceModal } from './components/PhpSourceModal';

export default function App() {
  const [data, setData] = useState<WebsiteData>(() => getStoredWebsiteData());
  const [isAdmin, setIsAdmin] = useState<boolean>(() => getAdminAuthStatus());

  // Modal States
  const [selectedBerita, setSelectedBerita] = useState<BeritaItem | null>(null);
  const [isPsbModalOpen, setIsPsbModalOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState<boolean>(false);
  const [isPhpSourceModalOpen, setIsPhpSourceModalOpen] = useState<boolean>(false);

  // Sync state to storage
  const handleSaveData = (newData: WebsiteData) => {
    setData(newData);
    saveStoredWebsiteData(newData);
  };

  const handleResetDefault = () => {
    const defaultData = resetToDefaultWebsiteData();
    setData(defaultData);
  };

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    setAdminAuthStatus(true);
    setIsAdminPanelOpen(true);
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setAdminAuthStatus(false);
    setIsAdminPanelOpen(false);
  };

  const handleAddNewPendaftar = (newPendaftar: PendaftarItem) => {
    const updated = {
      ...data,
      pendaftar: [newPendaftar, ...data.pendaftar],
    };
    handleSaveData(updated);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-amber-400 selection:text-emerald-950">
      {/* Sticky Header Navbar */}
      <Navbar
        data={data}
        isAdmin={isAdmin}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
        onOpenPsbModal={() => setIsPsbModalOpen(true)}
        onOpenPhpSource={() => setIsPhpSourceModalOpen(true)}
      />

      {/* Main Website View */}
      <main>
        {/* 1. Hero Section */}
        <Hero
          config={data.hero}
          onOpenPsbModal={() => setIsPsbModalOpen(true)}
          isAdmin={isAdmin}
          onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
        />

        {/* 2. Sambutan Pengasuh */}
        <Sambutan
          config={data.sambutan}
          isAdmin={isAdmin}
          onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
        />

        {/* 3. Profil & Visi Misi */}
        <ProfilVisiMisi profil={data.profil} />

        {/* 4. Program Pendidikan */}
        <ProgramPendidikan
          programs={data.program}
          onOpenPsbModal={() => setIsPsbModalOpen(true)}
          isAdmin={isAdmin}
          onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
        />

        {/* 5. Fasilitas Pesantren */}
        <Fasilitas
          fasilitas={data.fasilitas}
          isAdmin={isAdmin}
          onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
        />

        {/* 6. Berita & Kegiatan */}
        <BeritaSection
          beritaList={data.berita}
          onSelectBerita={(item) => setSelectedBerita(item)}
          isAdmin={isAdmin}
          onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
        />

        {/* 7. Galeri Foto Activity */}
        <GaleriSection
          galeriList={data.galeri}
          isAdmin={isAdmin}
          onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
        />

        {/* 8. Pendaftaran Santri Baru (PSB) */}
        <PendaftaranSection
          psb={data.psb}
          onOpenPsbModal={() => setIsPsbModalOpen(true)}
          isAdmin={isAdmin}
          onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
        />
      </main>

      {/* Footer & Kontak */}
      <KontakFooter
        kontak={data.kontak}
        profil={data.profil}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        isAdmin={isAdmin}
        onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
      />

      {/* Modals */}
      <NewsDetailModal
        berita={selectedBerita}
        onClose={() => setSelectedBerita(null)}
      />

      <PendaftaranModal
        isOpen={isPsbModalOpen}
        onClose={() => setIsPsbModalOpen(false)}
        data={data}
        onSubmitSuccess={handleAddNewPendaftar}
      />

      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <AdminDashboard
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        data={data}
        onSaveData={handleSaveData}
        onResetDefault={handleResetDefault}
        onLogout={handleLogout}
      />

      {/* Modal Source Code PHP & MySQL */}
      <PhpSourceModal
        isOpen={isPhpSourceModalOpen}
        onClose={() => setIsPhpSourceModalOpen(false)}
      />
    </div>
  );
}
