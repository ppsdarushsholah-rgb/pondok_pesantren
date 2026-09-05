import React from 'react';
import { BeritaItem } from '../types';
import { X, Calendar, User, Share2 } from 'lucide-react';

interface NewsDetailModalProps {
  berita: BeritaItem | null;
  onClose: () => void;
}

export const NewsDetailModal: React.FC<NewsDetailModalProps> = ({ berita, onClose }) => {
  if (!berita) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto flex items-center justify-center animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 my-8">
        {/* Header Image */}
        <div className="relative h-64 sm:h-80 bg-slate-900">
          <img
            src={berita.imageUrl}
            alt={berita.judul}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white space-y-2">
            <span className="bg-amber-500 text-emerald-950 font-bold text-xs px-3 py-1 rounded-full">
              {berita.kategori}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold leading-snug drop-shadow-xs">
              {berita.judul}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-6 text-xs text-slate-500 border-b border-slate-100 pb-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-600" /> {berita.tanggal}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-emerald-600" /> Penulis: {berita.penulis}
            </span>
          </div>

          <div className="prose prose-emerald max-w-none text-slate-800 leading-relaxed text-sm sm:text-base whitespace-pre-line">
            {berita.kontenLengkap || berita.ringkasan}
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: berita.judul, text: berita.ringkasan, url: window.location.href });
                } else {
                  alert('Link berita telah siap untuk dibagikan!');
                }
              }}
              className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" /> Bagikan Berita
            </button>

            <button
              onClick={onClose}
              className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-5 py-2.5 rounded-xl cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
