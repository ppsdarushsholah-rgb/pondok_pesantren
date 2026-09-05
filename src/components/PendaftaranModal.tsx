import React, { useState } from 'react';
import { PendaftarItem, WebsiteData } from '../types';
import { X, GraduationCap, CheckCircle2, User, Phone, MapPin, Building, Calendar } from 'lucide-react';

interface PendaftaranModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: WebsiteData;
  onSubmitSuccess: (newPendaftar: PendaftarItem) => void;
}

export const PendaftaranModal: React.FC<PendaftaranModalProps> = ({
  isOpen,
  onClose,
  data,
  onSubmitSuccess,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    namaLengkap: '',
    nik: '',
    jenisKelamin: 'Laki-laki' as 'Laki-laki' | 'Perempuan',
    tempatTanggalLahir: '',
    namaWali: '',
    nomorHpWali: '',
    pilihanProgram: data.program[0]?.nama || 'Program Tahfidz Al-Qur\'an',
    alamatLengkap: '',
    asalSekolah: '',
  });

  const [submitted, setSubmitted] = useState<PendaftarItem | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.namaLengkap || !formData.nomorHpWali) {
      alert('Mohon isi nama lengkap dan nomor HP WhatsApp wali santri.');
      return;
    }

    const newRecord: PendaftarItem = {
      id: `psb-${Date.now().toString().slice(-4)}`,
      ...formData,
      tanggalDaftar: new Date().toISOString().split('T')[0],
      status: 'Menunggu',
    };

    onSubmitSuccess(newRecord);
    setSubmitted(newRecord);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto flex items-center justify-center animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 p-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-emerald-950 flex items-center justify-center font-bold">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Formulir Pendaftaran Santri Baru</h3>
              <p className="text-xs text-amber-300">Tahun Ajaran {data.psb.tahunAjaran}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-emerald-200 hover:text-white rounded-full hover:bg-emerald-800 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {submitted ? (
          /* Submitted Success View */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-extrabold text-emerald-950">
                Pendaftaran Berhasil Terkirim!
              </h4>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                Terima kasih. Data pendaftaran calon santri an. <strong className="text-emerald-900">{submitted.namaLengkap}</strong> telah terdata di sistem PSB Pesantren.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl max-w-sm mx-auto text-left text-xs text-amber-900 space-y-1">
              <p className="font-bold text-amber-950">Nomor Registrasi: <span className="text-emerald-900 font-mono text-sm">{submitted.id}</span></p>
              <p>Program Choice: {submitted.pilihanProgram}</p>
              <p>Panitia akan segera menghubungi nomor WhatsApp Wali ({submitted.nomorHpWali}) untuk verifikasi tes seleksi.</p>
            </div>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => {
                  setSubmitted(null);
                  onClose();
                }}
                className="bg-emerald-900 hover:bg-emerald-950 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
              >
                Selesai & Tutup
              </button>
            </div>
          </div>
        ) : (
          /* Form Inputs */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Lengkap Santri *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Sesuai Akta Kelahiran"
                  value={formData.namaLengkap}
                  onChange={(e) => setFormData({ ...formData, namaLengkap: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  NIK (Nomor Induk Kependudukan)
                </label>
                <input
                  type="text"
                  placeholder="16 Digit NIK"
                  value={formData.nik}
                  onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Jenis Kelamin *
                </label>
                <select
                  value={formData.jenisKelamin}
                  onChange={(e) => setFormData({ ...formData, jenisKelamin: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                >
                  <option value="Laki-laki">Laki-laki (Santri Putra)</option>
                  <option value="Perempuan">Perempuan (Santri Putri)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tempat & Tanggal Lahir
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Kediri, 15 Juli 2011"
                  value={formData.tempatTanggalLahir}
                  onChange={(e) => setFormData({ ...formData, tempatTanggalLahir: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Orang Tua / Wali *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nama Ayah/Ibu/Wali"
                  value={formData.namaWali}
                  onChange={(e) => setFormData({ ...formData, namaWali: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nomor HP / WhatsApp Wali *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0812xxxxxxxx"
                  value={formData.nomorHpWali}
                  onChange={(e) => setFormData({ ...formData, nomorHpWali: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Pilihan Program Pendidikan *
              </label>
              <select
                value={formData.pilihanProgram}
                onChange={(e) => setFormData({ ...formData, pilihanProgram: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
              >
                {data.program.map((p) => (
                  <option key={p.id} value={p.nama}>
                    {p.nama} ({p.tingkat})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Asal Sekolah Sebelumnya
                </label>
                <input
                  type="text"
                  placeholder="Contoh: SD/MI/SMP Asal"
                  value={formData.asalSekolah}
                  onChange={(e) => setFormData({ ...formData, asalSekolah: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Alamat Lengkap Tempat Tinggal
                </label>
                <input
                  type="text"
                  placeholder="Kecamatan, Kota/Kabupaten, Provinsi"
                  value={formData.alamatLengkap}
                  onChange={(e) => setFormData({ ...formData, alamatLengkap: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="bg-emerald-900 hover:bg-emerald-950 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors shadow-md cursor-pointer"
              >
                Kirim Pendaftaran
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
