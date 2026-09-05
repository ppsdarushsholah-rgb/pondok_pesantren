import React, { useState } from 'react';
import { BeritaItem } from '../types';
import { Newspaper, Calendar, User, ArrowRight, Pin, ShieldCheck } from 'lucide-react';

interface BeritaSectionProps {
  beritaList: BeritaItem[];
  onSelectBerita: (berita: BeritaItem) => void;
  isAdmin?: boolean;
  onOpenAdminPanel?: () => void;
}

export const BeritaSection: React.FC<BeritaSectionProps> = ({
  beritaList,
  onSelectBerita,
  isAdmin,
  onOpenAdminPanel,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('Semua');

  const categories = ['Semua', ...Array.from(new Set(beritaList.map((b) => b.kategori)))];

  const filtered = filterCategory === 'Semua'
    ? beritaList
    : beritaList.filter((b) => b.kategori === filterCategory);

  return (
    <section id="berita" className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
              Kabar Pesantren & Pengumuman
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950">
              Berita & Agenda Terbaru
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Informasi terkini kegiatan santri, prestasi, kajian, serta pengumuman penting pesantren.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && onOpenAdminPanel && (
              <button
                onClick={onOpenAdminPanel}
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors shadow-xs"
              >
                <ShieldCheck className="w-4 h-4" /> Kelola Berita (Admin)
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterCategory === cat
                  ? 'bg-emerald-800 text-amber-300 shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <article
              key={item.id}
              onClick={() => onSelectBerita(item)}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <img
                    src={item.imageUrl}
                    alt={item.judul}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-emerald-900/90 text-amber-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md">
                      {item.kategori}
                    </span>
                    {item.isPinned && (
                      <span className="bg-amber-500 text-emerald-950 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <Pin className="w-3 h-3" /> Utamakan
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" /> {item.tanggal}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-emerald-600" /> {item.penulis}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-emerald-950 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                    {item.judul}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {item.ringkasan}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs font-bold text-emerald-800">
                <span>Baca Selengkapnya</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber-500" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
