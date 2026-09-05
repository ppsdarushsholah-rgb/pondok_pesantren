-- =======================================================
-- DATABASE SCHEMA & SEED DATA UNTUK PONDOK PESANTREN
-- PONDOK PESANTREN DARUSH SHOLAH
-- Format: MySQL / MariaDB (Kompatibel phpMyAdmin, XAMPP, Laragon, cPanel)
-- =======================================================

CREATE DATABASE IF NOT EXISTS `pesantren_darushsholah` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `pesantren_darushsholah`;

-- --------------------------------------------------------
-- 1. Tabel Administrator
-- --------------------------------------------------------
DROP TABLE IF EXISTS `tb_admin`;
CREATE TABLE `tb_admin` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `nama_lengkap` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `level` ENUM('superadmin', 'admin') DEFAULT 'admin',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Password default: admin123 (dihash dengan bcrypt password_hash)
INSERT INTO `tb_admin` (`username`, `password`, `nama_lengkap`, `email`, `level`) VALUES
('admin', '$2y$10$tZ2yYq.V9wV63W6f1Xw17.8U4H8wHq0N96aWj943Hk7FzJ168yIuK', 'Administrator Pesantren', 'ppsdarushsholah@gmail.com', 'superadmin');
-- Catatan: Hash di atas untuk password string: 'admin123'

-- --------------------------------------------------------
-- 2. Tabel Pengaturan Website & Profil Pesantren
-- --------------------------------------------------------
DROP TABLE IF EXISTS `tb_pengaturan`;
CREATE TABLE `tb_pengaturan` (
  `id` INT PRIMARY KEY DEFAULT 1,
  `nama_pesantren` VARCHAR(150) NOT NULL,
  `tagline` VARCHAR(255) NOT NULL,
  `logo` VARCHAR(255) DEFAULT 'assets/logo.jpg',
  `nama_pengasuh` VARCHAR(150) NOT NULL,
  `gelar_pengasuh` VARCHAR(100) NOT NULL,
  `foto_pengasuh` VARCHAR(255) DEFAULT 'pengasuh.jpg',
  `sambutan_pengasuh` TEXT NOT NULL,
  `sejarah` TEXT NOT NULL,
  `visi` TEXT NOT NULL,
  `misi` TEXT NOT NULL,
  `alamat` TEXT NOT NULL,
  `telepon` VARCHAR(30) NOT NULL,
  `whatsapp` VARCHAR(30) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `maps_embed` TEXT,
  `facebook` VARCHAR(255) DEFAULT '#',
  `instagram` VARCHAR(255) DEFAULT '#',
  `youtube` VARCHAR(255) DEFAULT '#',
  `tahun_ajaran_psb` VARCHAR(20) DEFAULT '2025/2026',
  `status_psb` ENUM('Buka', 'Tutup') DEFAULT 'Buka',
  `kuota_psb` INT DEFAULT 250,
  `biaya_daftar` INT DEFAULT 150000,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `tb_pengaturan` (
  `id`, `nama_pesantren`, `tagline`, `nama_pengasuh`, `gelar_pengasuh`, `foto_pengasuh`,
  `sambutan_pengasuh`, `sejarah`, `visi`, `misi`, `alamat`, `telepon`, `whatsapp`, `email`,
  `facebook`, `instagram`, `youtube`, `tahun_ajaran_psb`, `status_psb`, `kuota_psb`, `biaya_daftar`
) VALUES (
  1,
  'Pondok Pesantren Salafiyah Darush Sholah',
  'Thoriqoh Qodiriyah wa Naqsyabandiyah (TQN 165) - Salafiyah & Modern Terpadu',
  'KH. Ahmad Shodiq',
  'Pengasuh Pondok Pesantren Darush Sholah',
  'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800',
  'Assalamu\'alaikum Warahmatullahi Wabarakatuh. Segala puji bagi Allah SWT yang senantiasa melimpahkan taufiq dan hidayah-Nya kepada kita semua. Di era globalisasi dengan arus digitalisasi yang masif, Pondok Pesantren Darush Sholah berkomitmen teguh merawat tradisi keilmuan salafussalihin, memperkuat akidah Ahlussunnah wal Jama\'ah an-Nahdliyyah, serta memadukannya dengan penguasaan sains, teknologi, dan kecakapan hidup modern. Kami menyambut putra-putri terbaik umat untuk bersama menimba berkah ilmu di pesantren tercinta ini.',
  'Pondok Pesantren Darush Sholah didirikan dengan niat lillahi ta\'ala untuk menjadi oase keilmuan Islam, pembinaan akhlak mulia, dan pengkaderan ulama masa depan.',
  'Terwujudnya Generasi Mutafaqqih fiddin yang Berakhlakul Karimah, Unggul dalam Ilmu Al-Qur\'an, Berwawasan Kebangsaan, dan Tangguh Menghadapi Perkembangan Zaman.',
  '1. Menyelenggarakan pendidikan tahfidz Al-Qur\'an berstandar sanad muttashil.\n2. Memperdalam kajian kitab-kitab turots (kitab kuning) bermadzhab Syafi\'i.\n3. Menanamkan nilai akhlak karimah melalui keteladanan salaf dan pembiasaan ibadah istiqomah.\n4. Membekali santri dengan penguasaan bahasa asing (Arab dan Inggris) serta literasi teknologi.\n5. Menumbuhkan jiwa kepemimpinan, kepedulian sosial, dan kecintaan pada tanah air.',
  'Jl. Pesantren No. 01, Tegalbesar, Kaliwates, Kabupaten Jember, Jawa Timur 68132',
  '(0331) 487261',
  '081234567890',
  'ppsdarushsholah@gmail.com',
  'https://facebook.com/ppsdarushsholah',
  'https://instagram.com/ppsdarushsholah',
  'https://youtube.com/@ppsdarushsholah',
  '2025/2026',
  'Buka',
  250,
  150000
);

-- --------------------------------------------------------
-- 3. Tabel Program Pendidikan
-- --------------------------------------------------------
DROP TABLE IF EXISTS `tb_program`;
CREATE TABLE `tb_program` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nama_program` VARCHAR(150) NOT NULL,
  `tingkat` VARCHAR(50) NOT NULL,
  `deskripsi` TEXT NOT NULL,
  `kurikulum` TEXT NOT NULL,
  `target` VARCHAR(255) NOT NULL,
  `ikon` VARCHAR(50) DEFAULT 'book-open',
  `foto` VARCHAR(255) DEFAULT '',
  `urutan` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `tb_program` (`nama_program`, `tingkat`, `deskripsi`, `kurikulum`, `target`, `ikon`, `foto`, `urutan`) VALUES
('Tahfidzul Qur\'an 30 Juz', 'Santri Putra & Putri', 'Program bimbingan intensif menghafal Al-Qur\'an dengan metode talaqqi dan muroja\'ah mutqin bersanad.', 'Tahsin Jazariyyah, Tuhfatul Athfal, Muroja\'ah Harian & Mingguan', 'Khatam 30 Juz Mutqin & Sanad Qira\'ah', 'quran', 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800', 1),
('Madrasah Diniyah Salafiyah', 'Ula, Wustho, Ulya', 'Pendalaman kitab-kitab kuning turots klasik bermadzhab Ahlussunnah wal Jama\'ah melatih nalar fiqih dan tasawuf.', 'Jurumiyah, Fathul Qorib, Tafsir Jalalain, Ihya Ulumiddin', 'Mampu membaca & memahami kitab gundul serta istinbath hukum', 'book', 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=800', 2),
('Pendidikan Formal Terpadu (SMP & SMA)', 'Akreditasi A Unggul', 'Memadukan kurikulum nasional Kementerian Pendidikan dan Kemenag dengan nilai-nilai kepesantrenan.', 'Kurikulum Merdeka + Penguatan Sains, IT, dan Bahasa Arab-Inggris', 'Lulusan diterima di PTN favorit dan Universitas Timur Tengah (Al-Azhar, Yaman)', 'graduation-cap', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800', 3),
('Pengembangan Bahasa Asing & Riset Digital', 'Bilingual Ekstrakurikuler', 'Santri dibiasakan muhadatsah bahasa Arab dan English conversation serta pelatihan coding dan multimedia islami.', 'Arabic & English Immersion, Public Speaking, Jurnalistik Santri', 'Cakap berpidato dwibahasa dan terampil menghasilkan karya digital dakwah', 'languages', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800', 4);

-- --------------------------------------------------------
-- 4. Tabel Fasilitas Pesantren
-- --------------------------------------------------------
DROP TABLE IF EXISTS `tb_fasilitas`;
CREATE TABLE `tb_fasilitas` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nama_fasilitas` VARCHAR(150) NOT NULL,
  `kategori` VARCHAR(50) DEFAULT 'Umum',
  `deskripsi` TEXT NOT NULL,
  `foto` VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `tb_fasilitas` (`nama_fasilitas`, `kategori`, `deskripsi`, `foto`) VALUES
('Masjid Jami\' Darush Sholah', 'Ibadah', 'Pusat spiritual berkapasitas 2.500 jamaah untuk sholat berjamaah 5 waktu, dzikir bersama, dan pengajian akbar.', 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&q=80&w=800'),
('Asrama Santri yang Nyaman & Teratur', 'Asrama', 'Gedung asrama bertingkat dengan sirkulasi udara bersih, lemari santri, dan pengawasan musyrif 24 jam.', 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800'),
('Perpustakaan Khazanah Turots & Sains', 'Akademik', 'Ribuan koleksi kitab kuning klasik, buku referensi modern, jurnal riset, dan fasilitas e-library.', 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800'),
('Laboratorium Komputer & Bahasa Digital', 'Teknologi', 'Fasilitas komputer terhubung internet sehat fiber optik untuk pembelajaran teknologi dan lab bahasa interaktif.', 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800'),
('Klinik Kesehatan Pesantren (Poskestren)', 'Kesehatan', 'Didukung oleh dokter dan perawat untuk pertolongan medis pertama dan pemeliharaan sanitasi santri.', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800'),
('Sarana Olahraga & Lapangan Terpadu', 'Olahraga', 'Lapangan futsal, basket, bulutangkis, panahan, dan area bela diri pencak silat Pagar Nusa.', 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=800');

-- --------------------------------------------------------
-- 5. Tabel Berita & Artikel
-- --------------------------------------------------------
DROP TABLE IF EXISTS `tb_berita`;
CREATE TABLE `tb_berita` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `judul` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `kategori` VARCHAR(50) NOT NULL DEFAULT 'Kegiatan',
  `ringkasan` TEXT NOT NULL,
  `isi` LONGTEXT NOT NULL,
  `gambar` VARCHAR(255) NOT NULL,
  `penulis` VARCHAR(100) DEFAULT 'Humas Pesantren',
  `tanggal` DATE NOT NULL,
  `dilihat` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `tb_berita` (`judul`, `slug`, `kategori`, `ringkasan`, `isi`, `gambar`, `penulis`, `tanggal`, `dilihat`) VALUES
('Peringatan Maulid Nabi Muhammad SAW dan Haflah Khotmil Qur\'an 2025', 'peringatan-maulid-nabi-dan-khotmil-quran-2025', 'Kegiatan', 'Ratusan santri dan wali santri menghadiri lantunan sholawat akbar serta wisuda tahfidz dengan penuh khidmat.', '<p>Pondok Pesantren Darush Sholah kembali menyelenggarakan Haflah Khotmil Qur\'an dan Peringatan Maulid Nabi Muhammad SAW dengan penuh berkah dan kekhidmatan. Acara tahunan ini diikuti oleh puluhan santri yang telah menyelesaikan setoran hafalan Al-Qur\'an 30 Juz serta ratusan santri madrasah diniyah.</p><p>Dalam mau\'idzah hasanahnya, Pengasuh KH. Ahmad Shodiq berpesan bahwa menjaga hafalan Al-Qur\'an adalah amanah seumur hidup yang harus diejawantahkan dalam tingkah laku sehari-hari, berbakti kepada orang tua, serta membawa manfaat seluas-luasnya bagi masyarakat.</p>', 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&q=80&w=800', 'Redaksi Pesantren', '2025-02-20', 432),
('Santri Darush Sholah Raih Medali Emas Musabaqah Qira\'atil Kutub Tingkat Provinsi', 'santri-raih-medali-emas-mqk-provinsi', 'Prestasi', 'Prestasi membanggakan kembali ditorehkan ananda Muhammad Farhan pada cabang Fiqih Wustho Kitab Fathul Qorib.', '<p>Kabar gembira menyelimuti keluarga besar Pondok Pesantren Darush Sholah. Delegasi santri dalam Musabaqah Qira\'atil Kutub (MQK) tingkat provinsi sukses meraih juara 1 dan berhak mewakili daerah ke tingkat Nasional.</p><p>Keberhasilan ini membuktikan bahwa metode pembelajaran kitab kuning salaf di pesantren tetap unggul, dinamis, dan relevan dalam mencetak kader ulama masa depan yang menguasai gramatika Arab dan substansi keilmuan Islam secara mendalam.</p>', 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&q=80&w=800', 'Humas Pesantren', '2025-02-10', 520),
('Sosialisasi Penerimaan Santri Baru (PSB) Tahun Ajaran 2025/2026 Dibuka', 'psb-tahun-ajaran-2025-2026-resmi-dibuka', 'Pengumuman', 'Pendaftaran santri baru jalur online dan offline resmi dibuka mulai tanggal 1 Februari dengan kuota terbatas.', '<p>Panitia Penerimaan Santri Baru (PSB) Pondok Pesantren Darush Sholah mengumumkan pembukaan pendaftaran santri baru untuk tahun ajaran 2025/2026. Calon santri dapat mendaftar secara mandiri melalui website resmi ini dengan mengisi formulir biodata lengkap.</p><p>Program yang tersedia meliputi Tahfidzul Qur\'an, Madrasah Diniyah Salafiyah, serta jenjang pendidikan formal SMP dan SMA Terpadu. Calon wali santri diharapkan mempersiapkan berkas seperti fotokopi KK, Akta Kelahiran, dan NISN saat verifikasi berkas.</p>', 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800', 'Panitia PSB', '2025-02-01', 980);

-- --------------------------------------------------------
-- 6. Tabel Galeri Foto
-- --------------------------------------------------------
DROP TABLE IF EXISTS `tb_galeri`;
CREATE TABLE `tb_galeri` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `judul` VARCHAR(150) NOT NULL,
  `kategori` VARCHAR(50) DEFAULT 'Kegiatan Santri',
  `gambar` VARCHAR(255) NOT NULL,
  `tanggal` DATE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `tb_galeri` (`judul`, `kategori`, `gambar`, `tanggal`) VALUES
('Kajian Kitab Kuning Ba\'da Shubuh Bersama Pengasuh', 'Pengajian', 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=800', '2025-02-15'),
('Halaqah Tahfidzul Qur\'an Sore Hari Santriwati', 'Tahfidz', 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800', '2025-02-18'),
('Latihan Hadrah dan Sholawat Jam\'iyyah Santri', 'Seni Budaya', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800', '2025-02-22'),
('Sholat Berjamaah di Masjid Pesantren', 'Ibadah', 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&q=80&w=800', '2025-02-24'),
('Praktikum Sains di Laboratorium Komputer Terpadu', 'Pendidikan', 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800', '2025-02-25'),
('Bakti Sosial dan Ro\'an (Kerja Bakti) Kebersihan Asrama', 'Karakter', 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800', '2025-02-27');

-- --------------------------------------------------------
-- 7. Tabel Pendaftar Santri Baru (PSB Online)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `tb_pendaftar`;
CREATE TABLE `tb_pendaftar` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nomor_daftar` VARCHAR(30) NOT NULL UNIQUE,
  `nama_lengkap` VARCHAR(150) NOT NULL,
  `jenis_kelamin` ENUM('Laki-laki', 'Perempuan') NOT NULL,
  `tempat_lahir` VARCHAR(100) NOT NULL,
  `tanggal_lahir` DATE NOT NULL,
  `nisn` VARCHAR(20) DEFAULT '',
  `nik` VARCHAR(20) DEFAULT '',
  `nama_ayah` VARCHAR(100) NOT NULL,
  `nama_ibu` VARCHAR(100) NOT NULL,
  `no_hp_wali` VARCHAR(30) NOT NULL,
  `alamat` TEXT NOT NULL,
  `program_pilihan` VARCHAR(100) NOT NULL,
  `status` ENUM('Menunggu Verifikasi', 'Diterima', 'Ditolak') DEFAULT 'Menunggu Verifikasi',
  `tanggal_daftar` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `catatan` TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `tb_pendaftar` (
  `nomor_daftar`, `nama_lengkap`, `jenis_kelamin`, `tempat_lahir`, `tanggal_lahir`,
  `nisn`, `nik`, `nama_ayah`, `nama_ibu`, `no_hp_wali`, `alamat`, `program_pilihan`, `status`
) VALUES
('PSB-DS-2025001', 'Muhammad Rayhan Al-Fatih', 'Laki-laki', 'Jember', '2012-05-14', '0123456789', '3509111405120001', 'Abdullah', 'Siti Aminah', '081298765432', 'Jl. Hayam Wuruk No. 45, Sempusari, Jember', 'Tahfidzul Qur\'an 30 Juz', 'Diterima'),
('PSB-DS-2025002', 'Aisyah Nur Fadhilah', 'Perempuan', 'Banyuwangi', '2012-09-20', '0123456790', '3510112009120002', 'H. Ahmad Mansur', 'Hj. Nurul Hidayah', '085233445566', 'Dusun Krajan RT 02 RW 01, Genteng, Banyuwangi', 'Pendidikan Formal Terpadu (SMP & SMA)', 'Menunggu Verifikasi');
