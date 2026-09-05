import React from 'react';
import { PsbConfig } from '../types';
import { GraduationCap, CheckCircle2, PhoneCall, Calendar, ClipboardCheck, ArrowRight, ShieldCheck } from 'lucide-react';

interface PendaftaranSectionProps {
  psb: PsbConfig;
  onOpenPsbModal: () => void;
  isAdmin?: boolean;
  onOpenAdminPanel?: () => void;
}

export const PendaftaranSection: React.FC<PendaftaranSectionProps> = ({
  psb,
  onOpenPsbModal,
  isAdmin,
  onOpenAdminPanel,
}) => {
  return (
    <section id="psb" className="py-16 lg:py-24 bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-950 text-white relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>Pendaftaran Santri Baru (PSB Online)</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Penerimaan Santri Baru TA {psb.tahunAjaran}
          </h2>
          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            Bergabunglah menjadi bagian dari keluarga besar Pondok Pesantren Darush Sholah. Pendaftaran dibuka secara online dan offline.
          </p>
        </div>

        {/* Info Banner Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Calendar className="w-4 h-4" /> Periode & Gelombang
            </div>
            <p className="text-xl font-bold text-white">{psb.gelombang}</p>
            <p className="text-xs text-emerald-200">Batas Akhir: {psb.tanggalSelesai}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <ClipboardCheck className="w-4 h-4" /> Kuota Penerimaan
            </div>
            <p className="text-xl font-bold text-white">{psb.kuotaPenerimaan} Santri Putra & Putri</p>
            <p className="text-xs text-emerald-200">Registrasi: {psb.biayaRegistrasi}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <PhoneCall className="w-4 h-4" /> Helpdesk Panitia PSB
            </div>
            <p className="text-xl font-bold text-white">{psb.kontakPanitia}</p>
            <p className="text-xs text-emerald-200">Layanan Fast Response WhatsApp</p>
          </div>
        </div>

        {/* Alur Pendaftaran Steps */}
        <div className="bg-emerald-900/60 rounded-3xl p-8 border border-emerald-800 space-y-6">
          <h3 className="text-2xl font-bold text-amber-300 text-center">
            Alur Pendaftaran Santri Baru
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {psb.alurSteps.map((step) => (
              <div
                key={step.step}
                className="bg-emerald-950/80 p-5 rounded-2xl border border-emerald-800/80 space-y-2 relative"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-emerald-950 flex items-center justify-center font-extrabold text-sm mb-3 shadow-md">
                  {step.step}
                </div>
                <h4 className="text-sm font-bold text-white leading-tight">
                  {step.judul}
                </h4>
                <p className="text-xs text-emerald-200/80 leading-relaxed">
                  {step.deskripsi}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements & Action Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 bg-white text-slate-900 rounded-3xl p-8 shadow-xl space-y-4">
            <h3 className="text-xl font-bold text-emerald-950 border-b border-slate-100 pb-3">
              Persyaratan Dokumen & Berkas:
            </h3>

            <div className="space-y-2.5">
              {psb.syaratList.map((syarat, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{syarat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-amber-500 to-amber-600 text-emerald-950 rounded-3xl p-8 space-y-6 shadow-xl text-center lg:text-left">
            <h3 className="text-2xl font-extrabold leading-tight">
              Siap Menjadi Santri Rabbani Berakhlak Mulia?
            </h3>

            <p className="text-sm font-medium text-emerald-950/90 leading-relaxed">
              Isi formulir pendaftaran santri baru secara online sekarang juga untuk mengamankan kuota pendaftaran.
            </p>

            <div className="pt-2 space-y-3">
              <button
                onClick={onOpenPsbModal}
                className="w-full flex items-center justify-center gap-2 bg-emerald-950 hover:bg-emerald-900 text-white font-bold py-4 rounded-2xl shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <GraduationCap className="w-5 h-5 text-amber-400" />
                <span>Isi Formulir PSB Online</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {isAdmin && onOpenAdminPanel && (
                <button
                  onClick={onOpenAdminPanel}
                  className="w-full flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-emerald-950 font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" /> Kelola Informasi PSB (Admin)
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
