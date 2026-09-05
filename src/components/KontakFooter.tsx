import React from 'react';
import { KontakConfig, WebsiteData } from '../types';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, MessageCircle, Heart } from 'lucide-react';
import { PesantrenLogo } from './PesantrenLogo';

interface KontakFooterProps {
  kontak: KontakConfig;
  profil: WebsiteData['profil'];
  onOpenLogin: () => void;
  isAdmin: boolean;
  onOpenAdminPanel: () => void;
}

export const KontakFooter: React.FC<KontakFooterProps> = ({
  kontak,
  profil,
  onOpenLogin,
  isAdmin,
  onOpenAdminPanel,
}) => {
  return (
    <footer id="kontak" className="bg-emerald-950 text-white pt-16 pb-8 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Col 1: Identity */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <PesantrenLogo
                size="md"
                logoUrl={profil.logoUrl || '/logo.jpg'}
                namaPesantren={profil.namaPesantren}
                showText={true}
                textDark={false}
              />
            </div>

            <p className="text-emerald-200/80 text-xs sm:text-sm leading-relaxed font-light">
              Lembaga Pendidikan Islam Terpadu yang berkomitmen mencetak santri berilmu, berakhlaqul karimah, dan berwawasan masa depan.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={kontak.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-900 hover:bg-amber-500 hover:text-emerald-950 text-emerald-100 flex items-center justify-center transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={kontak.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-900 hover:bg-amber-500 hover:text-emerald-950 text-emerald-100 flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={kontak.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-900 hover:bg-amber-500 hover:text-emerald-950 text-emerald-100 flex items-center justify-center transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${kontak.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-900 hover:bg-emerald-600 text-amber-300 flex items-center justify-center transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
              Tautan Pintas
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-200">
              <li><a href="#hero" className="hover:text-amber-300 transition-colors">Beranda Pesantren</a></li>
              <li><a href="#sambutan" className="hover:text-amber-300 transition-colors">Sambutan Pengasuh</a></li>
              <li><a href="#profil" className="hover:text-amber-300 transition-colors">Profil & Visi Misi</a></li>
              <li><a href="#program" className="hover:text-amber-300 transition-colors">Program Pendidikan</a></li>
              <li><a href="#fasilitas" className="hover:text-amber-300 transition-colors">Fasilitas Pesantren</a></li>
              <li><a href="#psb" className="hover:text-amber-300 transition-colors">Info Pendaftaran (PSB)</a></li>
            </ul>
          </div>

          {/* Col 3: Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
              Sekretariat & Kontak
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-emerald-200">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{kontak.alamat}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Telepon: {kontak.telepon}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: {kontak.whatsapp}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Email: {kontak.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{kontak.jamOperasional}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/80">
          <p>© {new Date().getFullYear()} {profil.namaPesantren}. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-4">
            {isAdmin ? (
              <button
                onClick={onOpenAdminPanel}
                className="text-amber-400 hover:underline font-semibold cursor-pointer"
              >
                Panel Admin (Aktif)
              </button>
            ) : (
              <button
                onClick={onOpenLogin}
                className="text-emerald-300 hover:text-amber-300 transition-colors cursor-pointer"
              >
                Area Pengelola / Login Admin
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
