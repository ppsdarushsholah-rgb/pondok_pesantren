import React, { useState } from 'react';
import {
  BookOpen,
  Menu,
  X,
  Lock,
  UserCheck,
  Phone,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { WebsiteData } from '../types';
import { PesantrenLogo } from './PesantrenLogo';

interface NavbarProps {
  data: WebsiteData;
  isAdmin: boolean;
  onOpenLogin: () => void;
  onOpenAdminPanel: () => void;
  onOpenPsbModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  data,
  isAdmin,
  onOpenLogin,
  onOpenAdminPanel,
  onOpenPsbModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Beranda', href: '#hero' },
    { name: 'Sambutan', href: '#sambutan' },
    { name: 'Profil & Visi', href: '#profil' },
    { name: 'Program', href: '#program' },
    { name: 'Fasilitas', href: '#fasilitas' },
    { name: 'Berita', href: '#berita' },
    { name: 'Galeri', href: '#galeri' },
    { name: 'PSB (Pendaftaran)', href: '#psb' },
    { name: 'Kontak', href: '#kontak' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      {/* Top Banner Bar */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-amber-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> PSB TA {data.psb.tahunAjaran}
            </span>
            <span className="hidden md:inline text-emerald-300">|</span>
            <span className="hidden md:inline text-emerald-200">
              Gelombang: {data.psb.gelombang}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <a
              href={`https://wa.me/${data.kontak.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-400" /> {data.kontak.whatsapp}
            </a>
            {isAdmin ? (
              <button
                onClick={onOpenAdminPanel}
                className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold px-2.5 py-0.5 rounded-full transition-all cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Panel Admin
              </button>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-1 text-emerald-200 hover:text-white transition-colors cursor-pointer"
              >
                <Lock className="w-3 h-3 text-amber-400" /> Login Admin
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo Resmi Pondok Pesantren Salafiyah Darush Sholah */}
        <a href="#hero" className="flex items-center group py-0.5">
          <PesantrenLogo
            size="md"
            logoUrl={data.profil.logoUrl || '/logo.jpg'}
            namaPesantren={data.profil.namaPesantren}
            showText={true}
            textDark={true}
          />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3 py-1.5 text-sm font-medium text-slate-700 hover:text-emerald-800 hover:bg-emerald-50/80 rounded-lg transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={onOpenPsbModal}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-900 hover:to-emerald-800 text-white font-semibold px-4 py-2 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer text-sm"
          >
            <GraduationCap className="w-4 h-4 text-amber-300" />
            <span>Daftar Santri</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg focus:outline-hidden"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-emerald-100 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-fadeIn">
          {/* Mobile Official Logo Header */}
          <div className="pb-2 mb-1 border-b border-emerald-100/60">
            <PesantrenLogo
              size="sm"
              logoUrl={data.profil.logoUrl || '/logo.jpg'}
              namaPesantren={data.profil.namaPesantren}
              showText={true}
              textDark={true}
            />
          </div>

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 rounded-lg transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPsbModal();
              }}
              className="w-full flex items-center justify-center gap-2 bg-emerald-800 text-white font-semibold py-2.5 rounded-xl shadow-xs"
            >
              <GraduationCap className="w-4 h-4 text-amber-300" />
              <span>Daftar Santri Baru (PSB)</span>
            </button>

            {isAdmin ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminPanel();
                }}
                className="w-full flex items-center justify-center gap-2 bg-amber-500 text-emerald-950 font-bold py-2 rounded-xl"
              >
                <ShieldCheck className="w-4 h-4" /> Buka Panel Admin
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-800 font-medium py-2 rounded-xl"
              >
                <Lock className="w-4 h-4 text-emerald-700" /> Login Admin Pesantren
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
