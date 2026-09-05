<?php
require_once __DIR__ . '/../config/koneksi.php';
$pengaturan = getPengaturan($pdo);
$current_page = basename($_SERVER['PHP_SELF']);
?>
<!DOCTYPE html>
<html lang="id" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= htmlspecialchars($pengaturan['nama_pesantren']) ?> | <?= htmlspecialchars($pengaturan['tagline']) ?></title>
  <meta name="description" content="<?= htmlspecialchars(substr($pengaturan['sejarah'], 0, 160)) ?>">
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            emerald: {
              50: '#ecfdf5',
              100: '#d1fae5',
              600: '#059669',
              700: '#047857',
              800: '#065f46',
              900: '#064e3b',
              950: '#022c22',
            },
            amber: {
              400: '#fbbf24',
              500: '#f59e0b',
              600: '#d97706',
            }
          }
        }
      }
    }
  </script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Amiri:wght@400;700&display=swap');
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .font-arabic { font-family: 'Amiri', serif; }
  </style>
</head>
<body class="bg-slate-50 text-slate-800 antialiased selection:bg-amber-400 selection:text-emerald-950">

  <!-- Top Bar Hijau Tua -->
  <div class="bg-emerald-950 text-emerald-100 text-xs py-2 px-4 border-b border-emerald-900 hidden md:block">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <div class="flex items-center space-x-6">
        <span class="flex items-center gap-1.5"><i data-lucide="phone" class="w-3.5 h-3.5 text-amber-400"></i> <?= htmlspecialchars($pengaturan['telepon']) ?></span>
        <span class="flex items-center gap-1.5"><i data-lucide="mail" class="w-3.5 h-3.5 text-amber-400"></i> <?= htmlspecialchars($pengaturan['email']) ?></span>
        <span class="flex items-center gap-1.5"><i data-lucide="map-pin" class="w-3.5 h-3.5 text-amber-400"></i> <?= htmlspecialchars($pengaturan['alamat']) ?></span>
      </div>
      <div class="flex items-center space-x-4">
        <span class="bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full font-semibold">PSB TA <?= htmlspecialchars($pengaturan['tahun_ajaran_psb']) ?>: <?= htmlspecialchars($pengaturan['status_psb']) ?></span>
        <a href="admin/login.php" class="text-emerald-200 hover:text-white flex items-center gap-1 font-medium transition">
          <i data-lucide="lock" class="w-3.5 h-3.5"></i> Login Admin
        </a>
      </div>
    </div>
  </div>

  <!-- Navbar Utama Sticky -->
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-emerald-100 transition">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo Resmi -->
        <a href="index.php" class="flex items-center gap-3 group">
          <div class="w-12 h-12 rounded-2xl overflow-hidden bg-black border-2 border-amber-400/80 shadow-md flex items-center justify-center p-0.5 group-hover:scale-105 transition transform shrink-0">
            <?php $current_logo = !empty($pengaturan['logo']) ? $pengaturan['logo'] : (file_exists(__DIR__ . '/../assets/logo.jpg') ? 'assets/logo.jpg' : 'WhatsApp Image 2026-09-06 at 00.55.20.jpeg'); ?>
            <img src="<?= htmlspecialchars($current_logo) ?>" alt="Logo Resmi PPS Darush Sholah" class="w-full h-full object-contain" onerror="this.src='assets/logo.jpg'; if(!this.complete) this.src='WhatsApp Image 2026-09-06 at 00.55.20.jpeg';">
          </div>
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block leading-tight">Pondok Pesantren Salafiyah</span>
            <h1 class="font-extrabold text-lg text-emerald-950 leading-tight group-hover:text-emerald-700 transition">DARUSH SHOLAH</h1>
            <div class="flex items-center gap-1.5 mt-0.5">
              <span class="bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded text-[9px] border border-amber-300">TQN 165</span>
              <span class="text-[10px] text-emerald-700 font-medium">Salaf & Modern Terpadu</span>
            </div>
          </div>
        </a>

        <!-- Menu Desktop -->
        <nav class="hidden lg:flex items-center space-x-1 font-medium text-sm text-slate-700">
          <a href="index.php#beranda" class="px-3 py-2 rounded-lg hover:text-emerald-800 hover:bg-emerald-50 transition">Beranda</a>
          <a href="index.php#profil" class="px-3 py-2 rounded-lg hover:text-emerald-800 hover:bg-emerald-50 transition">Profil & Sambutan</a>
          <a href="index.php#program" class="px-3 py-2 rounded-lg hover:text-emerald-800 hover:bg-emerald-50 transition">Program Pendidikan</a>
          <a href="index.php#fasilitas" class="px-3 py-2 rounded-lg hover:text-emerald-800 hover:bg-emerald-50 transition">Fasilitas</a>
          <a href="berita.php" class="px-3 py-2 rounded-lg hover:text-emerald-800 hover:bg-emerald-50 transition">Berita & Kegiatan</a>
          <a href="galeri.php" class="px-3 py-2 rounded-lg hover:text-emerald-800 hover:bg-emerald-50 transition">Galeri</a>
          <a href="index.php#kontak" class="px-3 py-2 rounded-lg hover:text-emerald-800 hover:bg-emerald-50 transition">Kontak</a>
        </nav>

        <!-- CTA Buttons -->
        <div class="hidden lg:flex items-center space-x-3">
          <a href="daftar.php" class="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5">
            <i data-lucide="user-plus" class="w-4 h-4 text-amber-400"></i>
            Daftar Santri Baru
          </a>
        </div>

        <!-- Tombol Menu Mobile -->
        <div class="flex items-center gap-2 lg:hidden">
          <a href="daftar.php" class="bg-emerald-800 text-white text-xs font-semibold px-3 py-2 rounded-lg">PSB Online</a>
          <button id="mobile-menu-btn" class="p-2 text-slate-600 hover:text-emerald-900 focus:outline-none">
            <i data-lucide="menu" class="w-6 h-6"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Nav Drawer -->
    <div id="mobile-menu" class="hidden lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
      <a href="index.php#beranda" class="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-emerald-50">Beranda</a>
      <a href="index.php#profil" class="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-emerald-50">Profil & Sambutan</a>
      <a href="index.php#program" class="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-emerald-50">Program Pendidikan</a>
      <a href="index.php#fasilitas" class="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-emerald-50">Fasilitas</a>
      <a href="berita.php" class="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-emerald-50">Berita</a>
      <a href="galeri.php" class="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-emerald-50">Galeri Foto</a>
      <a href="index.php#kontak" class="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-emerald-50">Kontak</a>
      <div class="pt-3 border-t border-slate-100 flex flex-col gap-2">
        <a href="daftar.php" class="w-full text-center bg-emerald-800 text-white py-2.5 rounded-xl font-bold">Daftar Santri Baru (PSB)</a>
        <a href="admin/login.php" class="w-full text-center border border-slate-300 text-slate-700 py-2 rounded-xl text-sm font-medium">Masuk Panel Admin</a>
      </div>
    </div>
  </header>
