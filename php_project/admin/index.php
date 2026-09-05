<?php
require_once __DIR__ . '/../config/koneksi.php';
require_once __DIR__ . '/auth.php';

$pengaturan = getPengaturan($pdo);

// Statistik
$totalPendaftar = $pdo->query("SELECT COUNT(*) FROM tb_pendaftar")->fetchColumn();
$menungguPendaftar = $pdo->query("SELECT COUNT(*) FROM tb_pendaftar WHERE status = 'Menunggu Verifikasi'")->fetchColumn();
$diterimaPendaftar = $pdo->query("SELECT COUNT(*) FROM tb_pendaftar WHERE status = 'Diterima'")->fetchColumn();
$totalBerita = $pdo->query("SELECT COUNT(*) FROM tb_berita")->fetchColumn();
$totalGaleri = $pdo->query("SELECT COUNT(*) FROM tb_galeri")->fetchColumn();

// 5 Pendaftar Terbaru
$stmtTerbaru = $pdo->query("SELECT * FROM tb_pendaftar ORDER BY tanggal_daftar DESC LIMIT 5");
$pendaftarTerbaru = $stmtTerbaru->fetchAll();
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard Admin | <?= htmlspecialchars($pengaturan['nama_pesantren']) ?></title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
  </style>
</head>
<body class="bg-slate-100 text-slate-800 antialiased">

  <div class="min-h-screen flex flex-col md:flex-row">
    <!-- Sidebar Admin -->
    <aside class="w-full md:w-64 bg-emerald-950 text-white flex-shrink-0 flex flex-col justify-between border-r border-emerald-900">
      <div>
        <div class="p-6 border-b border-emerald-900/80 flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold shadow">
            <i data-lucide="shield" class="w-6 h-6"></i>
          </div>
          <div>
            <h2 class="font-bold text-sm tracking-wide">DARUSH SHOLAH</h2>
            <span class="text-[11px] text-emerald-400">Admin Control Panel</span>
          </div>
        </div>

        <nav class="p-4 space-y-1.5 text-sm font-medium">
          <a href="index.php" class="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-800 text-amber-300 shadow">
            <i data-lucide="layout-dashboard" class="w-4 h-4"></i> Dashboard
          </a>
          <a href="pendaftar.php" class="flex items-center justify-between px-4 py-3 rounded-xl text-emerald-200 hover:bg-emerald-900 hover:text-white transition">
            <span class="flex items-center gap-3"><i data-lucide="users" class="w-4 h-4"></i> Santri Baru (PSB)</span>
            <?php if ($menungguPendaftar > 0): ?>
              <span class="bg-amber-500 text-emerald-950 text-[10px] font-bold px-2 py-0.5 rounded-full"><?= $menungguPendaftar ?></span>
            <?php endif; ?>
          </a>
          <a href="berita.php" class="flex items-center gap-3 px-4 py-3 rounded-xl text-emerald-200 hover:bg-emerald-900 hover:text-white transition">
            <i data-lucide="newspaper" class="w-4 h-4"></i> Kelola Berita
          </a>
          <a href="galeri.php" class="flex items-center gap-3 px-4 py-3 rounded-xl text-emerald-200 hover:bg-emerald-900 hover:text-white transition">
            <i data-lucide="image" class="w-4 h-4"></i> Kelola Galeri Foto
          </a>
          <a href="pengaturan.php" class="flex items-center gap-3 px-4 py-3 rounded-xl text-emerald-200 hover:bg-emerald-900 hover:text-white transition">
            <i data-lucide="settings" class="w-4 h-4"></i> Pengaturan Website
          </a>
          <a href="../index.php" target="_blank" class="flex items-center gap-3 px-4 py-3 rounded-xl text-emerald-300/80 hover:bg-emerald-900 hover:text-white transition">
            <i data-lucide="external-link" class="w-4 h-4"></i> Buka Website Publik
          </a>
        </nav>
      </div>

      <!-- User Info & Logout -->
      <div class="p-4 border-t border-emerald-900/80 bg-emerald-950/60">
        <div class="flex items-center justify-between">
          <div class="text-xs">
            <p class="font-bold text-white"><?= htmlspecialchars($_SESSION['admin_nama'] ?? 'Admin') ?></p>
            <p class="text-emerald-400 text-[10px]"><?= htmlspecialchars($_SESSION['admin_username'] ?? 'admin') ?></p>
          </div>
          <a href="logout.php" onclick="return confirm('Apakah Anda yakin ingin logout?')" class="p-2 text-rose-300 hover:text-rose-100 hover:bg-rose-900/40 rounded-lg transition" title="Logout">
            <i data-lucide="log-out" class="w-4 h-4"></i>
          </a>
        </div>
      </div>
    </aside>

    <!-- Content Area -->
    <main class="flex-1 p-6 md:p-10 overflow-y-auto">
      <!-- Topbar -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900">Dashboard Utama</h1>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">Selamat datang kembali, <strong><?= htmlspecialchars($_SESSION['admin_nama'] ?? 'Admin') ?></strong> di sistem pengelolaan pesantren.</p>
        </div>
        <div class="flex items-center gap-3">
          <a href="pendaftar.php" class="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow flex items-center gap-2">
            <i data-lucide="user-plus" class="w-4 h-4 text-amber-400"></i> Kelola Pendaftar
          </a>
          <a href="berita.php?aksi=tambah" class="bg-amber-500 hover:bg-amber-400 text-emerald-950 text-xs font-bold px-4 py-2.5 rounded-xl shadow flex items-center gap-2">
            <i data-lucide="plus-circle" class="w-4 h-4"></i> Tulis Berita Baru
          </a>
        </div>
      </div>

      <!-- Grid Statistik -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <!-- Total Pendaftar -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Pendaftar</p>
            <h3 class="text-3xl font-extrabold text-slate-900 mt-1"><?= $totalPendaftar ?></h3>
            <span class="text-[11px] text-emerald-600 font-medium">Santri Terdaftar</span>
          </div>
          <div class="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <i data-lucide="users" class="w-6 h-6"></i>
          </div>
        </div>

        <!-- Menunggu Verifikasi -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Menunggu Review</p>
            <h3 class="text-3xl font-extrabold text-amber-600 mt-1"><?= $menungguPendaftar ?></h3>
            <span class="text-[11px] text-amber-700 font-medium">Perlu Divalidasi</span>
          </div>
          <div class="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <i data-lucide="clock" class="w-6 h-6"></i>
          </div>
        </div>

        <!-- Berita Dipublish -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Berita</p>
            <h3 class="text-3xl font-extrabold text-slate-900 mt-1"><?= $totalBerita ?></h3>
            <span class="text-[11px] text-slate-500 font-medium">Artikel & Pengumuman</span>
          </div>
          <div class="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <i data-lucide="newspaper" class="w-6 h-6"></i>
          </div>
        </div>

        <!-- Galeri Foto -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Galeri Foto</p>
            <h3 class="text-3xl font-extrabold text-slate-900 mt-1"><?= $totalGaleri ?></h3>
            <span class="text-[11px] text-slate-500 font-medium">Dokumentasi Santri</span>
          </div>
          <div class="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
            <i data-lucide="image" class="w-6 h-6"></i>
          </div>
        </div>
      </div>

      <!-- Tabel Pendaftar Terbaru -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
        <div class="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 class="font-bold text-base text-slate-900">Pendaftar Santri Baru Terbaru</h3>
            <p class="text-xs text-slate-500">5 data registrasi online terakhir</p>
          </div>
          <a href="pendaftar.php" class="text-xs font-bold text-emerald-800 hover:text-emerald-950 transition flex items-center gap-1">
            Lihat Semua <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </a>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs text-slate-700">
            <thead class="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th class="px-6 py-3.5">No. Daftar</th>
                <th class="px-6 py-3.5">Nama Santri</th>
                <th class="px-6 py-3.5">Program</th>
                <th class="px-6 py-3.5">No. WhatsApp</th>
                <th class="px-6 py-3.5">Status</th>
                <th class="px-6 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <?php if (count($pendaftarTerbaru) > 0): ?>
                <?php foreach ($pendaftarTerbaru as $p): ?>
                <tr class="hover:bg-slate-50 transition">
                  <td class="px-6 py-4 font-mono font-bold text-emerald-900"><?= htmlspecialchars($p['nomor_daftar']) ?></td>
                  <td class="px-6 py-4 font-semibold text-slate-900"><?= htmlspecialchars($p['nama_lengkap']) ?></td>
                  <td class="px-6 py-4 text-slate-600"><?= htmlspecialchars($p['program_pilihan']) ?></td>
                  <td class="px-6 py-4 font-mono"><?= htmlspecialchars($p['no_hp_wali']) ?></td>
                  <td class="px-6 py-4">
                    <?php if ($p['status'] === 'Diterima'): ?>
                      <span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full">Diterima</span>
                    <?php elseif ($p['status'] === 'Ditolak'): ?>
                      <span class="bg-rose-100 text-rose-800 text-[10px] font-bold px-2.5 py-1 rounded-full">Ditolak</span>
                    <?php else: ?>
                      <span class="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full">Menunggu</span>
                    <?php endif; ?>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <a href="pendaftar.php?id=<?= $p['id'] ?>" class="text-xs text-emerald-800 hover:text-emerald-950 font-bold">Detail</a>
                  </td>
                </tr>
                <?php endforeach; ?>
              <?php else: ?>
                <tr>
                  <td colspan="6" class="px-6 py-8 text-center text-slate-400">Belum ada data pendaftar baru.</td>
                </tr>
              <?php endif; ?>
            </tbody>
          </table>
        </div>
      </div>

    </main>
  </div>

  <script>
    lucide.createIcons();
  </script>
</body>
</html>
