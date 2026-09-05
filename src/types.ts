export interface HeroConfig {
  title: string;
  subtitle: string;
  badge: string;
  imageUrl: string;
  ctaTextPrimary: string;
  ctaLinkPrimary: string;
  ctaTextSecondary: string;
  ctaLinkSecondary: string;
}

export interface SambutanConfig {
  namaPengasuh: string;
  gelarPengasuh: string;
  jabatan: string;
  kiaiPhotoUrl: string;
  kutipanHeader: string;
  isiSambutan: string;
}

export interface ProfilConfig {
  namaPesantren: string;
  singkatan: string;
  tahunBerdiri: string;
  sejarah: string;
  visi: string;
  misi: string[];
}

export interface BeritaItem {
  id: string;
  judul: string;
  ringkasan: string;
  kontenLengkap: string;
  tanggal: string;
  kategori: string;
  penulis: string;
  imageUrl: string;
  isPinned?: boolean;
}

export interface GaleriItem {
  id: string;
  judul: string;
  kategori: string;
  tanggal: string;
  imageUrl: string;
}

export interface ProgramItem {
  id: string;
  nama: string;
  tingkat: string;
  deskripsi: string;
  keunggulan: string[];
  imageUrl: string;
}

export interface FasilitasItem {
  id: string;
  nama: string;
  deskripsi: string;
  imageUrl: string;
}

export interface SyaratPsb {
  judul: string;
  items: string[];
}

export interface PsbConfig {
  tahunAjaran: string;
  gelombang: string;
  kuotaPenerimaan: number;
  tanggalMulai: string;
  tanggalSelesai: string;
  kontakPanitia: string;
  biayaRegistrasi: string;
  syaratList: string[];
  alurSteps: { step: number; judul: string; deskripsi: string }[];
}

export interface KontakConfig {
  alamat: string;
  telepon: string;
  whatsapp: string;
  email: string;
  jamOperasional: string;
  googleMapEmbedUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
}

export interface PendaftarItem {
  id: string;
  namaLengkap: string;
  nik: string;
  jenisKelamin: 'Laki-laki' | 'Perempuan';
  tempatTanggalLahir: string;
  namaWali: string;
  nomorHpWali: string;
  pilihanProgram: string;
  alamatLengkap: string;
  asalSekolah: string;
  tanggalDaftar: string;
  status: 'Menunggu' | 'Diterima' | 'Berkas Kurang' | 'Ditolak';
}

export interface WebsiteData {
  hero: HeroConfig;
  sambutan: SambutanConfig;
  profil: ProfilConfig;
  berita: BeritaItem[];
  galeri: GaleriItem[];
  program: ProgramItem[];
  fasilitas: FasilitasItem[];
  psb: PsbConfig;
  kontak: KontakConfig;
  pendaftar: PendaftarItem[];
}
