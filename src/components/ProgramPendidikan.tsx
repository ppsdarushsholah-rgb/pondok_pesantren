import React from 'react';
import { ProgramItem } from '../types';
import { BookOpen, CheckCircle, GraduationCap, ArrowRight, ShieldCheck } from 'lucide-react';

interface ProgramPendidikanProps {
  programs: ProgramItem[];
  onOpenPsbModal: () => void;
  isAdmin?: boolean;
  onOpenAdminPanel?: () => void;
}

export const ProgramPendidikan: React.FC<ProgramPendidikanProps> = ({
  programs,
  onOpenPsbModal,
  isAdmin,
  onOpenAdminPanel,
}) => {
  return (
    <section id="program" className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
              Pendidikan & Kurikulum
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950">
              Program Unggulan Pesantren
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Memadukan kurikulum salafiyah kajian kitab kuning dengan kurikulum pendidikan nasional berakreditasi A.
            </p>
          </div>

          {isAdmin && onOpenAdminPanel && (
            <button
              onClick={onOpenAdminPanel}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors shadow-xs"
            >
              <ShieldCheck className="w-4 h-4" /> Kelola Program (Admin)
            </button>
          )}
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/80 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image Container */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-100">
                  <img
                    src={prog.imageUrl}
                    alt={prog.nama}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 bg-emerald-900/90 text-amber-300 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md border border-emerald-700">
                    {prog.tingkat}
                  </span>
                  <h3 className="absolute bottom-4 left-4 right-4 text-xl font-bold text-white leading-snug drop-shadow-xs">
                    {prog.nama}
                  </h3>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-8 space-y-4">
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {prog.deskripsi}
                  </p>

                  <div className="pt-2 space-y-2">
                    <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                      Fasilitas & Keunggulan Program:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {prog.keunggulan.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-emerald-800 font-semibold flex items-center gap-1">
                  <GraduationCap className="w-4 h-4 text-amber-500" /> Terbuka PSB
                </span>
                <button
                  onClick={onOpenPsbModal}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 group-hover:translate-x-1 transition-all cursor-pointer"
                >
                  <span>Daftar Program Ini</span>
                  <ArrowRight className="w-4 h-4 text-amber-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
