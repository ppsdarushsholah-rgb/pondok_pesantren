import React from 'react';
import { HeroConfig } from '../types';
import { ArrowRight, GraduationCap, Sparkles, BookOpen, Users, Award, ShieldCheck } from 'lucide-react';

interface HeroProps {
  config: HeroConfig;
  onOpenPsbModal: () => void;
  isAdmin?: boolean;
  onOpenAdminPanel?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  config,
  onOpenPsbModal,
  isAdmin,
  onOpenAdminPanel,
}) => {
  return (
    <section id="hero" className="relative bg-emerald-950 text-white overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={config.imageUrl}
          alt="Pondok Pesantren Banner"
          className="w-full h-full object-cover object-center opacity-30 transform scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/80 to-emerald-900/60" />
      </div>

      {/* Decorative Islamic Pattern Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div className="max-w-3xl space-y-6">
          {/* Badge */}
          {config.badge && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-medium backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{config.badge}</span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight sm:leading-tight">
            {config.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-emerald-100 leading-relaxed max-w-2xl font-light">
            {config.subtitle}
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenPsbModal}
              className="flex items-center gap-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-emerald-950 font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-amber-500/20 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <GraduationCap className="w-5 h-5" />
              <span>{config.ctaTextPrimary || 'Daftar Santri Baru'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={config.ctaLinkSecondary || '#profil'}
              className="flex items-center gap-2 bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 font-medium px-6 py-3.5 rounded-xl border border-emerald-700/60 backdrop-blur-md transition-all"
            >
              <BookOpen className="w-5 h-5 text-amber-400" />
              <span>{config.ctaTextSecondary || 'Jelajahi Profil'}</span>
            </a>

            {isAdmin && onOpenAdminPanel && (
              <button
                onClick={onOpenAdminPanel}
                className="flex items-center gap-2 bg-emerald-800/90 hover:bg-amber-500 hover:text-emerald-950 text-amber-300 border border-amber-400/50 px-4 py-3.5 rounded-xl text-xs font-semibold transition-all cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Edit Hero Banner (Admin)</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-16 pt-10 border-t border-emerald-800/60 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 bg-emerald-900/40 p-4 rounded-2xl border border-emerald-800/40 backdrop-blur-xs">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-2xl font-bold text-white">1.850+</span>
              <span className="text-xs text-emerald-200">Santri Putra & Putri</span>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-emerald-900/40 p-4 rounded-2xl border border-emerald-800/40 backdrop-blur-xs">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-2xl font-bold text-white">85+</span>
              <span className="text-xs text-emerald-200">Pengajar & Ustadz</span>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-emerald-900/40 p-4 rounded-2xl border border-emerald-800/40 backdrop-blur-xs">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-2xl font-bold text-white">100%</span>
              <span className="text-xs text-emerald-200">Sanad Mutashil</span>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-emerald-900/40 p-4 rounded-2xl border border-emerald-800/40 backdrop-blur-xs">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-2xl font-bold text-white">Akreditasi A</span>
              <span className="text-xs text-emerald-200">SMP & SMA Plus</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
