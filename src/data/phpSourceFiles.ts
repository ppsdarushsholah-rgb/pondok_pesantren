/**
 * Bundel File Source Code PHP Native & Database MySQL
 * Untuk Viewer Kode & Download .ZIP Sekali Klik
 */

export interface PhpFileItem {
  path: string;
  name: string;
  category: 'Database' | 'Frontend' | 'Admin' | 'Config' | 'Panduan';
  description: string;
  code: string;
}

export const PHP_PROJECT_FILES: PhpFileItem[] = [
  {
    path: 'database.sql',
    name: 'database.sql',
    category: 'Database',
    description: 'Skema lengkap tabel MySQL (tb_admin, tb_pengaturan, tb_program, tb_fasilitas, tb_berita, tb_galeri, tb_pendaftar) beserta data awal.',
    code: `-- =======================================================
-- DATABASE SCHEMA & SEED DATA UNTUK PONDOK PESANTREN
-- PONDOK PESANTREN DARUSH SHOLAH
-- Format: MySQL / MariaDB (Kompatibel phpMyAdmin, XAMPP, Laragon, cPanel)
-- =======================================================

CREATE DATABASE IF NOT EXISTS \`pesantren_darushsholah\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`pesantren_darushsholah\`;

-- 1. Tabel Administrator
DROP TABLE IF EXISTS \`tb_admin\`;
CREATE TABLE \`tb_admin\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`username\` VARCHAR(50) NOT NULL UNIQUE,
  \`password\` VARCHAR(255) NOT NULL,
  \`nama_lengkap\` VARCHAR(100) NOT NULL,
  \`email\` VARCHAR(100) NOT NULL,
  \`level\` ENUM('superadmin', 'admin') DEFAULT 'admin',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO \`tb_admin\` (\`username\`, \`password\`, \`nama_lengkap\`, \`email\`, \`level\`) VALUES
('admin', '$2y$10$tZ2yYq.V9wV63W6f1Xw17.8U4H8wHq0N96aWj943Hk7FzJ168yIuK', 'Administrator Pesantren', 'ppsdarushsholah@gmail.com', 'superadmin');

-- 2. Tabel Pengaturan Website
DROP TABLE IF EXISTS \`tb_pengaturan\`;
CREATE TABLE \`tb_pengaturan\` (
  \`id\` INT PRIMARY KEY DEFAULT 1,
  \`nama_pesantren\` VARCHAR(150) NOT NULL,
  \`tagline\` VARCHAR(255) NOT NULL,
  \`nama_pengasuh\` VARCHAR(150) NOT NULL,
  \`gelar_pengasuh\` VARCHAR(100) NOT NULL,
  \`foto_pengasuh\` VARCHAR(255) DEFAULT 'pengasuh.jpg',
  \`sambutan_pengasuh\` TEXT NOT NULL,
  \`sejarah\` TEXT NOT NULL,
  \`visi\` TEXT NOT NULL,
  \`misi\` TEXT NOT NULL,
  \`alamat\` TEXT NOT NULL,
  \`telepon\` VARCHAR(30) NOT NULL,
  \`whatsapp\` VARCHAR(30) NOT NULL,
  \`email\` VARCHAR(100) NOT NULL,
  \`maps_embed\` TEXT,
  \`facebook\` VARCHAR(255) DEFAULT '#',
  \`instagram\` VARCHAR(255) DEFAULT '#',
  \`youtube\` VARCHAR(255) DEFAULT '#',
  \`tahun_ajaran_psb\` VARCHAR(20) DEFAULT '2025/2026',
  \`status_psb\` ENUM('Buka', 'Tutup') DEFAULT 'Buka',
  \`kuota_psb\` INT DEFAULT 250,
  \`biaya_daftar\` INT DEFAULT 150000,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO \`tb_pengaturan\` (
  \`id\`, \`nama_pesantren\`, \`tagline\`, \`nama_pengasuh\`, \`gelar_pengasuh\`, \`foto_pengasuh\`,
  \`sambutan_pengasuh\`, \`sejarah\`, \`visi\`, \`misi\`, \`alamat\`, \`telepon\`, \`whatsapp\`, \`email\`,
  \`facebook\`, \`instagram\`, \`youtube\`, \`tahun_ajaran_psb\`, \`status_psb\`, \`kuota_psb\`, \`biaya_daftar\`
) VALUES (
  1,
  'Pondok Pesantren Darush Sholah',
  'Mencetak Generasi Qur\\'ani, Berakhlakul Karimah, Tafaqquh Fiddin, dan Berwawasan Global',
  'KH. Ahmad Shodiq',
  'Pengasuh Pondok Pesantren Darush Sholah',
  'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800',
  'Assalamu\\'alaikum Warahmatullahi Wabarakatuh. Segala puji bagi Allah SWT yang senantiasa melimpahkan taufiq dan hidayah-Nya kepada kita semua...',
  'Pondok Pesantren Darush Sholah didirikan untuk menjadi oase keilmuan Islam dan kaderisasi ulama.',
  'Terwujudnya Generasi Mutafaqqih fiddin yang Berakhlakul Karimah, Unggul dalam Ilmu Al-Qur\\'an...',
  '1. Menyelenggarakan tahfidz Al-Qur\\'an bersanad muttashil.\\n2. Memperdalam kajian kitab kuning turots...',
  'Jl. Pesantren No. 01, Tegalbesar, Kaliwates, Kabupaten Jember, Jawa Timur 68132',
  '(0331) 487261', '081234567890', 'ppsdarushsholah@gmail.com',
  'https://facebook.com/ppsdarushsholah', 'https://instagram.com/ppsdarushsholah', 'https://youtube.com/@ppsdarushsholah',
  '2025/2026', 'Buka', 250, 150000
);

-- 3. Tabel Program
DROP TABLE IF EXISTS \`tb_program\`;
CREATE TABLE \`tb_program\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`nama_program\` VARCHAR(150) NOT NULL,
  \`tingkat\` VARCHAR(50) NOT NULL,
  \`deskripsi\` TEXT NOT NULL,
  \`kurikulum\` TEXT NOT NULL,
  \`target\` VARCHAR(255) NOT NULL,
  \`ikon\` VARCHAR(50) DEFAULT 'book-open',
  \`foto\` VARCHAR(255) DEFAULT '',
  \`urutan\` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO \`tb_program\` (\`nama_program\`, \`tingkat\`, \`deskripsi\`, \`kurikulum\`, \`target\`, \`ikon\`, \`foto\`, \`urutan\`) VALUES
('Tahfidzul Qur\\'an 30 Juz', 'Santri Putra & Putri', 'Bimbingan intensif hafalan Al-Qur\\'an bersanad.', 'Tahsin Jazariyyah, Tuhfatul Athfal, Muroja\\'ah', 'Khatam 30 Juz Mutqin & Sanad Qira\\'ah', 'quran', 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800', 1),
('Madrasah Diniyah Salafiyah', 'Ula, Wustho, Ulya', 'Kajian kitab-kitab kuning turots klasik bermadzhab Syafi\\'i.', 'Jurumiyah, Fathul Qorib, Tafsir Jalalain', 'Mampu membaca & memahami kitab gundul', 'book', 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=800', 2),
('Pendidikan Formal Terpadu (SMP & SMA)', 'Akreditasi A Unggul', 'Memadukan kurikulum nasional dengan kepesantrenan.', 'Kurikulum Merdeka + Penguatan Sains & IT', 'Lulusan diterima di PTN favorit dan Universitas Timur Tengah', 'graduation-cap', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800', 3);

-- 4. Tabel Berita
DROP TABLE IF EXISTS \`tb_berita\`;
CREATE TABLE \`tb_berita\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`judul\` VARCHAR(255) NOT NULL,
  \`slug\` VARCHAR(255) NOT NULL,
  \`kategori\` VARCHAR(50) NOT NULL DEFAULT 'Kegiatan',
  \`ringkasan\` TEXT NOT NULL,
  \`isi\` LONGTEXT NOT NULL,
  \`gambar\` VARCHAR(255) NOT NULL,
  \`penulis\` VARCHAR(100) DEFAULT 'Humas Pesantren',
  \`tanggal\` DATE NOT NULL,
  \`dilihat\` INT DEFAULT 0,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Tabel Pendaftar Santri Baru
DROP TABLE IF EXISTS \`tb_pendaftar\`;
CREATE TABLE \`tb_pendaftar\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`nomor_daftar\` VARCHAR(30) NOT NULL UNIQUE,
  \`nama_lengkap\` VARCHAR(150) NOT NULL,
  \`jenis_kelamin\` ENUM('Laki-laki', 'Perempuan') NOT NULL,
  \`tempat_lahir\` VARCHAR(100) NOT NULL,
  \`tanggal_lahir\` DATE NOT NULL,
  \`nisn\` VARCHAR(20) DEFAULT '',
  \`nik\` VARCHAR(20) DEFAULT '',
  \`nama_ayah\` VARCHAR(100) NOT NULL,
  \`nama_ibu\` VARCHAR(100) NOT NULL,
  \`no_hp_wali\` VARCHAR(30) NOT NULL,
  \`alamat\` TEXT NOT NULL,
  \`program_pilihan\` VARCHAR(100) NOT NULL,
  \`status\` ENUM('Menunggu Verifikasi', 'Diterima', 'Ditolak') DEFAULT 'Menunggu Verifikasi',
  \`tanggal_daftar\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
  },
  {
    path: 'config/koneksi.php',
    name: 'config/koneksi.php',
    category: 'Config',
    description: 'Koneksi database PDO MySQL, proteksi SQL Injection, dan fungsi helper.',
    code: `<?php
/**
 * Konfigurasi Database MySQL & Helper System
 * Pondok Pesantren Darush Sholah
 */

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'pesantren_darushsholah');

try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
} catch (PDOException $e) {
    die("Gagal Terhubung ke Database MySQL: " . htmlspecialchars($e->getMessage()));
}

function getPengaturan($pdo) {
    $stmt = $pdo->query("SELECT * FROM tb_pengaturan WHERE id = 1 LIMIT 1");
    return $stmt->fetch();
}

function clean($data) {
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}

function tgl_indo($tanggal) {
    if (!$tanggal || $tanggal == '0000-00-00') return '-';
    $bulan = [
        1 => 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    $pecahkan = explode('-', date('Y-m-d', strtotime($tanggal)));
    return (int)$pecahkan[2] . ' ' . $bulan[(int)$pecahkan[1]] . ' ' . $pecahkan[0];
}`
  },
  {
    path: 'index.php',
    name: 'index.php',
    category: 'Frontend',
    description: 'Halaman Utama Website (Hero, Sambutan Kiai, Visi Misi, Program, Fasilitas, Berita, Galeri).',
    code: `<?php
require_once __DIR__ . '/config/koneksi.php';
require_once __DIR__ . '/includes/header.php';

$stmtProg = $pdo->query("SELECT * FROM tb_program ORDER BY urutan ASC, id ASC");
$programs = $stmtProg->fetchAll();

$stmtFas = $pdo->query("SELECT * FROM tb_fasilitas ORDER BY id ASC LIMIT 6");
$fasilitas = $stmtFas->fetchAll();

$stmtBerita = $pdo->query("SELECT * FROM tb_berita ORDER BY tanggal DESC LIMIT 3");
$beritaList = $stmtBerita->fetchAll();

$stmtGal = $pdo->query("SELECT * FROM tb_galeri ORDER BY tanggal DESC LIMIT 6");
$galeriList = $stmtGal->fetchAll();
?>

<!-- Hero Section -->
<section class="bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white py-24">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div class="lg:col-span-7 space-y-6">
        <span class="bg-emerald-800/80 text-amber-300 text-xs px-3.5 py-1.5 rounded-full font-bold">
          Penerimaan Santri Baru TA <?= htmlspecialchars($pengaturan['tahun_ajaran_psb']) ?> Dibuka!
        </span>
        <h1 class="text-4xl lg:text-5xl font-extrabold leading-tight">
          Menempa Generasi <span class="text-amber-400">Qur'ani</span> & Berakhlakul Karimah
        </h1>
        <p class="text-emerald-100/90 text-lg leading-relaxed">
          <?= htmlspecialchars($pengaturan['tagline']) ?>
        </p>
        <div class="flex gap-4 pt-2">
          <a href="daftar.php" class="bg-amber-400 text-emerald-950 font-bold px-7 py-3.5 rounded-xl shadow-lg hover:bg-amber-300 transition">
            Daftar Sekarang (PSB)
          </a>
          <a href="#profil" class="bg-emerald-900 border border-emerald-700 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-emerald-800 transition">
            Profil Pesantren
          </a>
        </div>
      </div>
      <div class="lg:col-span-5">
        <div class="bg-emerald-900/90 border border-emerald-700 p-5 rounded-3xl shadow-2xl">
          <img src="<?= htmlspecialchars($pengaturan['foto_pengasuh']) ?>" class="w-full h-64 object-cover rounded-2xl mb-4">
          <h3 class="font-bold text-white text-lg"><?= htmlspecialchars($pengaturan['nama_pengasuh']) ?></h3>
          <p class="text-xs text-amber-300"><?= htmlspecialchars($pengaturan['gelar_pengasuh']) ?></p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Program, Fasilitas, Berita, Galeri ... -->
<?php require_once __DIR__ . '/includes/footer.php'; ?>`
  },
  {
    path: 'daftar.php',
    name: 'daftar.php',
    category: 'Frontend',
    description: 'Formulir Pendaftaran Santri Baru (PSB Online) otomatis simpan ke MySQL tb_pendaftar.',
    code: `<?php
require_once __DIR__ . '/config/koneksi.php';

$sukses = false;
$pesan_error = '';
$data_pendaftar = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nama_lengkap    = clean($_POST['nama_lengkap'] ?? '');
    $jenis_kelamin   = clean($_POST['jenis_kelamin'] ?? '');
    $tempat_lahir    = clean($_POST['tempat_lahir'] ?? '');
    $tanggal_lahir   = clean($_POST['tanggal_lahir'] ?? '');
    $nisn            = clean($_POST['nisn'] ?? '');
    $nik             = clean($_POST['nik'] ?? '');
    $nama_ayah       = clean($_POST['nama_ayah'] ?? '');
    $nama_ibu        = clean($_POST['nama_ibu'] ?? '');
    $no_hp_wali      = clean($_POST['no_hp_wali'] ?? '');
    $alamat          = clean($_POST['alamat'] ?? '');
    $program_pilihan = clean($_POST['program_pilihan'] ?? '');

    if (empty($nama_lengkap) || empty($no_hp_wali) || empty($program_pilihan)) {
        $pesan_error = 'Mohon lengkapi semua kolom wajib.';
    } else {
        $nomor_daftar = 'PSB-DS-' . date('Y') . sprintf('%04d', rand(100, 9999));
        $sql = "INSERT INTO tb_pendaftar (nomor_daftar, nama_lengkap, jenis_kelamin, tempat_lahir, tanggal_lahir, nisn, nik, nama_ayah, nama_ibu, no_hp_wali, alamat, program_pilihan, status)
                VALUES (:nomor, :nama, :jk, :tempat, :tgl, :nisn, :nik, :ayah, :ibu, :hp, :alamat, :prog, 'Menunggu Verifikasi')";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':nomor' => $nomor_daftar, ':nama' => $nama_lengkap, ':jk' => $jenis_kelamin,
            ':tempat' => $tempat_lahir, ':tgl' => $tanggal_lahir, ':nisn' => $nisn,
            ':nik' => $nik, ':ayah' => $nama_ayah, ':ibu' => $nama_ibu, ':hp' => $no_hp_wali,
            ':alamat' => $alamat, ':prog' => $program_pilihan
        ]);
        $sukses = true;
    }
}
require_once __DIR__ . '/includes/header.php';
?>
<!-- Tampilan Formulir PSB ... -->`
  },
  {
    path: 'admin/index.php',
    name: 'admin/index.php',
    category: 'Admin',
    description: 'Dashboard Admin: statistik pendaftar, berita, galeri, dan aksi cepat.',
    code: `<?php
require_once __DIR__ . '/../config/koneksi.php';
require_once __DIR__ . '/auth.php';

$pengaturan = getPengaturan($pdo);
$totalPendaftar = $pdo->query("SELECT COUNT(*) FROM tb_pendaftar")->fetchColumn();
$menunggu = $pdo->query("SELECT COUNT(*) FROM tb_pendaftar WHERE status = 'Menunggu Verifikasi'")->fetchColumn();
$totalBerita = $pdo->query("SELECT COUNT(*) FROM tb_berita")->fetchColumn();
$totalGaleri = $pdo->query("SELECT COUNT(*) FROM tb_galeri")->fetchColumn();
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Dashboard Admin | <?= htmlspecialchars($pengaturan['nama_pesantren']) ?></title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100">
  <div class="flex">
    <!-- Sidebar & Konten Utama Dashboard -->
  </div>
</body>
</html>`
  },
  {
    path: 'admin/pendaftar.php',
    name: 'admin/pendaftar.php',
    category: 'Admin',
    description: 'Kelola pendaftar santri baru: verifikasi berkas, ubah status Diterima/Ditolak, cetak laporan.',
    code: `<?php
require_once __DIR__ . '/../config/koneksi.php';
require_once __DIR__ . '/auth.php';

if (isset($_POST['ubah_status'])) {
    $stmt = $pdo->prepare("UPDATE tb_pendaftar SET status = :status WHERE id = :id");
    $stmt->execute([':status' => $_POST['status'], ':id' => (int)$_POST['id']]);
}

$stmt = $pdo->query("SELECT * FROM tb_pendaftar ORDER BY tanggal_daftar DESC");
$santri = $stmt->fetchAll();
?>`
  },
  {
    path: 'README.md',
    name: 'README.md',
    category: 'Panduan',
    description: 'Panduan lengkap cara instalasi di XAMPP, Laragon, atau cPanel Web Hosting.',
    code: `# Panduan Instalasi Website Pesantren Darush Sholah
1. Copy folder php_project ke htdocs (XAMPP) atau public_html (cPanel).
2. Buat database 'pesantren_darushsholah' di phpMyAdmin dan Import file 'database.sql'.
3. Sesuaikan koneksi di config/koneksi.php.
4. Login admin: username: admin / password: admin123`
  }
];
