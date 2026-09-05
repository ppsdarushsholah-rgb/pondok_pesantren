import React from 'react';
import { FasilitasItem } from '../types';
import { Building2, ShieldCheck } from 'lucide-react';

interface FasilitasProps {
  fasilitas: FasilitasItem[];
  isAdmin?: boolean;
  onOpenAdminPanel?: () => void;
}

export const Fasilitas: React.FC<FasilitasProps> = ({
  fasilitas,
  isAdmin,
  onOpenAdminPanel,
}) => {
  return (
    <section id="fasilitas" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Sarana & Prasarana
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950">
              Fasilitas Pesantren Modern
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Dukungan lingkungan belajar, asrama, dan fasilitas olahraga yang bersih, representative, serta aman bagi perkembangan santri.
            </p>
          </div>

          {isAdmin && onOpenAdminPanel && (
            <button
              onClick={onOpenAdminPanel}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors shadow-xs"
            >
              <ShieldCheck className="w-4 h-4" /> Edit Fasilitas & Upload Foto
            </button>
          )}
        </div>

        {/* Fasilitas Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fasilitas.map((fas) => (
            <div
              key={fas.id}
              className="bg-slate-50 rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              <div className="relative h-48 overflow-hidden bg-slate-200">
                <img
                  src={fas.imageUrl}
                  alt={fas.nama}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5 space-y-2">
                <h3 className="text-lg font-bold text-emerald-950 group-hover:text-emerald-700 transition-colors">
                  {fas.nama}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {fas.deskripsi}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
