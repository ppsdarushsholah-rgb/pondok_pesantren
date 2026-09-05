import React, { useState } from 'react';
import { GaleriItem } from '../types';
import { Image, Eye, X, ShieldCheck } from 'lucide-react';

interface GaleriSectionProps {
  galeriList: GaleriItem[];
  isAdmin?: boolean;
  onOpenAdminPanel?: () => void;
}

export const GaleriSection: React.FC<GaleriSectionProps> = ({
  galeriList,
  isAdmin,
  onOpenAdminPanel,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [selectedPhoto, setSelectedPhoto] = useState<GaleriItem | null>(null);

  const categories = ['Semua', ...Array.from(new Set(galeriList.map((g) => g.kategori)))];

  const filtered = activeCategory === 'Semua'
    ? galeriList
    : galeriList.filter((g) => g.kategori === activeCategory);

  return (
    <section id="galeri" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Dokumentasi Kegiatan
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950">
              Galeri Foto Pesantren
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Momen-momen kebersamaan, pembelajaran, dan suasana kehidupannya santri di Pondok Pesantren Darush Sholah.
            </p>
          </div>

          {isAdmin && onOpenAdminPanel && (
            <button
              onClick={onOpenAdminPanel}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors shadow-xs"
            >
              <ShieldCheck className="w-4 h-4" /> Tambah & Upload Foto (Admin)
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-amber-500 text-emerald-950 font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group relative h-64 rounded-2xl overflow-hidden bg-slate-900 shadow-md cursor-pointer transform hover:-translate-y-1 transition-all duration-300"
            >
              <img
                src={item.imageUrl}
                alt={item.judul}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <span className="inline-block text-[10px] uppercase font-bold tracking-wider text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-md border border-amber-400/30">
                  {item.kategori}
                </span>
                <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">
                  {item.judul}
                </h3>
                <p className="text-[11px] text-emerald-200">{item.tanggal}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 flex items-center justify-center animate-fadeIn"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-emerald-950 rounded-2xl overflow-hidden shadow-2xl border border-emerald-800"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="max-h-[75vh] overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.judul}
                  className="max-h-[75vh] w-auto object-contain mx-auto"
                />
              </div>

              <div className="p-6 bg-emerald-950 text-white space-y-2">
                <div className="flex items-center gap-3">
                  <span className="bg-amber-500 text-emerald-950 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {selectedPhoto.kategori}
                  </span>
                  <span className="text-xs text-emerald-300">{selectedPhoto.tanggal}</span>
                </div>
                <h3 className="text-xl font-bold text-amber-300">
                  {selectedPhoto.judul}
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
