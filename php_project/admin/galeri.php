<?php
require_once __DIR__ . '/../config/koneksi.php';
require_once __DIR__ . '/auth.php';

$pengaturan = getPengaturan($pdo);
$pesan = '';

// Hapus Foto
if (isset($_GET['hapus'])) {
    $id = (int)$_GET['hapus'];
    $stmt = $pdo->prepare("DELETE FROM tb_galeri WHERE id = :id");
    $stmt->execute([':id' => $id]);
    header("Location: galeri.php?pesan=Foto+berhasil+dihapus");
    exit;
}

// Tambah Foto Baru
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $judul    = clean($_POST['judul'] ?? '');
    $kategori = clean($_POST['kategori'] ?? 'Kegiatan');
    $gambar   = clean($_POST['gambar'] ?? '');
    $tanggal  = clean($_POST['tanggal'] ?? date('Y-m-d'));

    if (empty($judul) || empty($gambar)) {
        $pesan = "Judul dan URL Foto wajib diisi!";
    } else {
        $stmt = $pdo->prepare("INSERT INTO tb_galeri (judul, kategori, gambar, tanggal) VALUES (:judul, :kategori, :gambar, :tanggal)");
        $stmt->execute([
            ':judul'    => $judul,
            ':kategori' => $kategori,
            ':gambar'   => $gambar,
            ':tanggal'  => $tanggal
        ]);
        $pesan = "Foto galeri baru berhasil ditambahkan!";
    }
}

$stmtGaleri = $pdo->query("SELECT * FROM tb_galeri ORDER BY tanggal DESC");
$listGaleri = $stmtGaleri->fetchAll();
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kelola Galeri Foto | Admin <?= htmlspecialchars($pengaturan['nama_pesantren']) ?></title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
  </style>
</head>
<body class="bg-slate-100 text-slate-800 antialiased">

  <div class="min-h-screen flex flex-col md:flex-row">
    <!-- Sidebar -->
    <aside class="w-full md:w-64 bg-emerald-950 text-white flex-shrink-0 flex flex-col justify-between border-r border-emerald-900">
      <div>
        <div class="p-6 border-b border-emerald-900/80 flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold shadow">
            <i data-lucide="shield" class="w-6 h-6"></i>
          </div>
          <div>
            <h2 class="font-bold text-sm">DARUSH SHOLAH</h2>
            <span class="text-[11px] text-emerald-400">Admin Control Panel</span>
          </div>
        </div>

        <nav class="p-4 space-y-1.5 text-sm font-medium">
          <a href="index.php" class="flex items-center gap-3 px-4 py-3 rounded-xl text-emerald-200 hover:bg-emerald-900 hover:text-white transition">
            <i data-lucide="layout-dashboard" class="w-4 h-4"></i> Dashboard
          </a>
          <a href="pendaftar.php" class="flex items-center justify-between px-4 py-3 rounded-xl text-emerald-200 hover:bg-emerald-900 hover:text-white transition">
            <span class="flex items-center gap-3"><i data-lucide="users" class="w-4 h-4"></i> Santri Baru (PSB)</span>
          </a>
          <a href="berita.php" class="flex items-center gap-3 px-4 py-3 rounded-xl text-emerald-200 hover:bg-emerald-900 hover:text-white transition">
            <i data-lucide="newspaper" class="w-4 h-4"></i> Kelola Berita
          </a>
          <a href="galeri.php" class="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-800 text-amber-300 shadow">
            <i data-lucide="image" class="w-4 h-4"></i> Kelola Galeri Foto
          </a>
          <a href="pengaturan.php" class="flex items-center gap-3 px-4 py-3 rounded-xl text-emerald-200 hover:bg-emerald-900 hover:text-white transition">
            <i data-lucide="settings" class="w-4 h-4"></i> Pengaturan Website
          </a>
          <a href="../index.php" target="_blank" class="flex items-center gap-3 px-4 py-3 rounded-xl text-emerald-300/80 hover:bg-emerald-900 hover:text-white transition">
            <i data-lucide="external-link" class="w-4 h-4"></i> Buka Website
          </a>
        </nav>
      </div>

      <div class="p-4 border-t border-emerald-900/80 bg-emerald-950/60">
        <div class="flex items-center justify-between">
          <div class="text-xs">
            <p class="font-bold text-white"><?= htmlspecialchars($_SESSION['admin_nama'] ?? 'Admin') ?></p>
            <p class="text-emerald-400 text-[10px]"><?= htmlspecialchars($_SESSION['admin_username'] ?? 'admin') ?></p>
          </div>
          <a href="logout.php" onclick="return confirm('Logout?')" class="p-2 text-rose-300 hover:text-rose-100 rounded-lg transition">
            <i data-lucide="log-out" class="w-4 h-4"></i>
          </a>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6 md:p-10 overflow-y-auto">
      <div class="mb-8">
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900">Kelola Galeri Dokumentasi Santri</h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">Upload dan atur dokumentasi kegiatan santri pondok.</p>
      </div>

      <?php if ($pesan || isset($_GET['pesan'])): ?>
        <div class="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold mb-6 flex items-center gap-2">
          <i data-lucide="check-circle" class="w-4 h-4 text-emerald-600"></i>
          <?= htmlspecialchars($pesan ?: $_GET['pesan']) ?>
        </div>
      <?php endif; ?>

      <!-- Form Tambah Foto Baru -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-10">
        <h3 class="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <i data-lucide="upload" class="w-4 h-4 text-emerald-700"></i> Tambah Foto Galeri Baru
        </h3>

        <form method="POST" action="galeri.php" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="lg:col-span-2">
            <label class="block text-xs font-semibold text-slate-700 mb-1">Judul / Keterangan Foto *</label>
            <input type="text" name="judul" required placeholder="Contoh: Sholat Berjamaah Santri Putra" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500">
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Kategori</label>
            <select name="kategori" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white">
              <option value="Kegiatan Santri">Kegiatan Santri</option>
              <option value="Tahfidz">Tahfidz</option>
              <option value="Pengajian">Pengajian</option>
              <option value="Ibadah">Ibadah</option>
              <option value="Seni Budaya">Seni Budaya</option>
              <option value="Pendidikan">Pendidikan</option>
              <option value="Karakter">Karakter</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Tanggal</label>
            <input type="date" name="tanggal" value="<?= date('Y-m-d') ?>" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs">
          </div>

          <div class="sm:col-span-2 lg:col-span-3">
            <label class="block text-xs font-semibold text-slate-700 mb-1">URL Foto Gambar *</label>
            <input type="url" name="gambar" required placeholder="https://images.unsplash.com/..." class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs">
          </div>

          <div class="sm:col-span-2 lg:col-span-1 flex items-end">
            <button type="submit" class="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-2.5 rounded-xl text-xs shadow flex items-center justify-center gap-1.5">
              <i data-lucide="plus" class="w-4 h-4 text-amber-400"></i> Simpan Foto
            </button>
          </div>
        </form>
      </div>

      <!-- Grid Foto Galeri -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <?php foreach ($listGaleri as $g): ?>
        <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between group">
          <div>
            <div class="aspect-[4/3] bg-slate-100 overflow-hidden relative">
              <img src="<?= htmlspecialchars($g['gambar']) ?>" alt="" class="w-full h-full object-cover">
              <span class="absolute top-2 left-2 bg-emerald-950/80 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                <?= htmlspecialchars($g['kategori']) ?>
              </span>
            </div>
            <div class="p-3.5">
              <h4 class="font-bold text-xs text-slate-900 line-clamp-2 mb-1"><?= htmlspecialchars($g['judul']) ?></h4>
              <span class="text-[10px] text-slate-400"><?= tgl_indo($g['tanggal']) ?></span>
            </div>
          </div>

          <div class="p-3.5 pt-0 border-t border-slate-100 flex justify-end">
            <a href="galeri.php?hapus=<?= $g['id'] ?>" onclick="return confirm('Hapus foto ini dari galeri?')" class="text-rose-600 hover:text-rose-800 text-xs font-semibold flex items-center gap-1">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i> Hapus
            </a>
          </div>
        </div>
        <?php endforeach; ?>
      </div>
    </main>
  </div>

  <script>
    lucide.createIcons();
  </script>
</body>
</html>
