import React from 'react';
import { SambutanConfig } from '../types';
import { Quote, ShieldCheck } from 'lucide-react';

interface SambutanProps {
  config: SambutanConfig;
  isAdmin?: boolean;
  onOpenAdminPanel?: () => void;
}

export const Sambutan: React.FC<SambutanProps> = ({
  config,
  isAdmin,
  onOpenAdminPanel,
}) => {
  return (
    <section id="sambutan" className="py-16 lg:py-24 bg-gradient-to-b from-white to-emerald-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-emerald-100 relative overflow-hidden">
          {/* Subtle Background Badge */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-50 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Kyai Photo Column */}
            <div className="lg:col-span-5 text-center">
              <div className="relative inline-block mx-auto max-w-sm">
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-600 to-amber-500 rounded-2xl blur-xs opacity-70" />
                <div className="relative rounded-2xl overflow-hidden bg-white p-2 shadow-md">
                  <img
                    src={config.kiaiPhotoUrl}
                    alt={config.namaPengasuh}
                    className="w-full h-80 sm:h-96 object-cover object-top rounded-xl"
                  />
                  <div className="p-4 bg-emerald-900 text-white text-center rounded-b-xl mt-2">
                    <h3 className="text-lg font-bold text-amber-300">
                      {config.namaPengasuh}
                    </h3>
                    <p className="text-xs text-emerald-200 mt-0.5">
                      {config.gelarPengasuh}
                    </p>
                    <p className="text-[11px] text-emerald-300/80 font-mono mt-1">
                      {config.jabatan}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Greeting Content Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                <Quote className="w-3.5 h-3.5 text-amber-600" />
                <span>Sambutan Pengasuh Pesantren</span>
              </div>

              <div className="text-center sm:text-left">
                <p className="text-xl sm:text-2xl font-serif text-emerald-900 font-bold tracking-wide italic">
                  "{config.kutipanHeader || 'Bismillahirrohmanirrohim'}"
                </p>
              </div>

              <div className="prose prose-emerald text-slate-700 leading-relaxed text-sm sm:text-base space-y-3 whitespace-pre-line">
                {config.isiSambutan}
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="block text-sm font-bold text-slate-900">
                    {config.namaPengasuh}
                  </span>
                  <span className="text-xs text-emerald-700">
                    Pengasuh Pondok Pesantren
                  </span>
                </div>

                {isAdmin && onOpenAdminPanel && (
                  <button
                    onClick={onOpenAdminPanel}
                    className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <span>Edit Sambutan & Foto Pengasuh</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
