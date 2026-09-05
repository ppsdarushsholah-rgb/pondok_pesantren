import React from 'react';
import { ProfilConfig } from '../types';
import { BookOpen, Target, HeartHandshake, History, CheckCircle2, ShieldAlert } from 'lucide-react';

interface ProfilVisiMisiProps {
  profil: ProfilConfig;
}

export const ProfilVisiMisi: React.FC<ProfilVisiMisiProps> = ({ profil }) => {
  return (
    <section id="profil" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Profil & Identitas Pesantren
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950">
            Mengenal {profil.namaPesantren}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Lembaga pendidikan Islam berijazah resmi dan bersanad keilmuan yang memadukan kedalaman tradisi salafiyah dengan kemajuan sains modern.
          </p>
        </div>

        {/* History & Identity Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-gradient-to-br from-emerald-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-10 shadow-lg space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <History className="w-48 h-48 text-amber-300" />
            </div>

            <div className="flex items-center gap-3 text-amber-400 font-semibold">
              <History className="w-6 h-6" />
              <span>Sejarah Singkat (Berdiri Sejak Tahun {profil.tahunBerdiri})</span>
            </div>

            <h3 className="text-2xl font-bold text-white leading-snug">
              Dedikasi Lebih Dari 3 Dekade Membina Akhlak & Ilmu Santri
            </h3>

            <p className="text-emerald-100/90 leading-relaxed text-sm sm:text-base font-light">
              {profil.sejarah}
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4 text-xs sm:text-sm border-t border-emerald-800">
              <div>
                <span className="block text-amber-300 font-bold text-lg">Kediri, Jawa Timur</span>
                <span className="text-emerald-300">Lokasi Pesantren</span>
              </div>
              <div>
                <span className="block text-amber-300 font-bold text-lg">Ahlussunnah wal Jama'ah</span>
                <span className="text-emerald-300">Haluan Keagamaan</span>
              </div>
            </div>
          </div>

          {/* Visi Card */}
          <div className="bg-amber-500/10 border border-amber-300/40 rounded-3xl p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-emerald-950 flex items-center justify-center font-bold mb-4 shadow-sm">
                <Target className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-emerald-950 mb-3">
                Visi Pesantren
              </h3>

              <p className="text-slate-800 leading-relaxed text-sm font-medium italic border-l-4 border-amber-500 pl-4 py-1 bg-white/60 rounded-r-xl">
                "{profil.visi}"
              </p>
            </div>

            <div className="pt-4 border-t border-amber-200 text-xs text-emerald-900 font-semibold flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Menjaga Keikhlasan, Keilmuan & Kemandirian</span>
            </div>
          </div>
        </div>

        {/* Misi Section */}
        <div className="bg-emerald-50/60 rounded-3xl p-8 sm:p-10 border border-emerald-100">
          <div className="max-w-3xl mb-8">
            <h3 className="text-2xl font-bold text-emerald-950 mb-2">
              Misi Utama Pesantren
            </h3>
            <p className="text-slate-600 text-sm">
              Langkah nyata Pondok Pesantren Darush Sholah dalam mewujudkan Visi Rabbani:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profil.misi.map((misiItem, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-emerald-100/80 shadow-xs flex items-start gap-3.5 hover:shadow-md transition-shadow"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-slate-800 text-sm font-medium leading-relaxed">
                  {misiItem}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
