<?php
require_once __DIR__ . '/../config/koneksi.php';
require_once __DIR__ . '/auth.php';

$pengaturan = getPengaturan($pdo);
$pesan = '';
$aksi = $_GET['aksi'] ?? 'list';

// Handle Hapus Berita
if ($aksi === 'hapus' && isset($_GET['id'])) {
    $id = (int)$_GET['id'];
    $stmt = $pdo->prepare("DELETE FROM tb_berita WHERE id = :id");
    $stmt->execute([':id' => $id]);
    header("Location: berita.php?pesan=Berita+berhasil+dihapus");
    exit;
}

// Handle Tambah / Edit Berita
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $judul     = clean($_POST['judul'] ?? '');
    $kategori  = clean($_POST['kategori'] ?? 'Kegiatan');
    $penulis   = clean($_POST['penulis'] ?? 'Humas Pesantren');
    $tanggal   = clean($_POST['tanggal'] ?? date('Y-m-d'));
    $ringkasan = clean($_POST['ringkasan'] ?? '');
    $isi       = $_POST['isi'] ?? ''; // rich text html
    $gambar    = clean($_POST['gambar'] ?? '');

    // Default placeholder jika gambar kosong
    if (empty($gambar)) {
        $gambar = 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&q=80&w=800';
    }

    $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $judul)));

    if (isset($_POST['edit_id']) && !empty($_POST['edit_id'])) {
        // Update
        $id = (int)$_POST['edit_id'];
        $sql = "UPDATE tb_berita SET judul = :judul, slug = :slug, kategori = :kat, ringkasan = :ring, isi = :isi, gambar = :gam, penulis = :pen, tanggal = :tgl WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':judul' => $judul,
            ':slug'  => $slug,
            ':kat'   => $kategori,
            ':ring'  => $ringkasan,
            ':isi'   => $isi,
            ':gam'   => $gambar,
            ':pen'   => $penulis,
            ':tgl'   => $tanggal,
            ':id'    => $id
        ]);
        $pesan = "Berita berhasil diperbarui!";
        $aksi = 'list';
    } else {
        // Insert Baru
        $sql = "INSERT INTO tb_berita (judul, slug, kategori, ringkasan, isi, gambar, penulis, tanggal, dilihat) VALUES (:judul, :slug, :kat, :ring, :isi, :gam, :pen, :tgl, 0)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':judul' => $judul,
            ':slug'  => $slug,
            ':kat'   => $kategori,
            ':ring'  => $ringkasan,
            ':isi'   => $isi,
            ':gam'   => $gambar,
            ':pen'   => $penulis,
            ':tgl'   => $tanggal
        ]);
        $pesan = "Berita baru berhasil diterbitkan!";
        $aksi = 'list';
    }
}

// Ambil Data Edit Jika Ada
$editData = null;
if ($aksi === 'edit' && isset($_GET['id'])) {
    $stmtE = $pdo->prepare("SELECT * FROM tb_berita WHERE id = :id LIMIT 1");
    $stmtE->execute([':id' => (int)$_GET['id']]);
    $editData = $stmtE->fetch();
}

// Ambil Semua Berita untuk List
$stmtAll = $pdo->query("SELECT * FROM tb_berita ORDER BY tanggal DESC");
$listBerita = $stmtAll->fetchAll();
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kelola Berita & Warta | Admin <?= htmlspecialchars($pengaturan['nama_pesantren']) ?></title>
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
          <a href="berita.php" class="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-800 text-amber-300 shadow">
            <i data-lucide="newspaper" class="w-4 h-4"></i> Kelola Berita
          </a>
          <a href="galeri.php" class="flex items-center gap-3 px-4 py-3 rounded-xl text-emerald-200 hover:bg-emerald-900 hover:text-white transition">
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
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900">Kelola Warta & Artikel Pesantren</h1>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">Publikasi warta santri, prestasi, kajian, dan maklumat resmi pondok.</p>
        </div>

        <?php if ($aksi === 'list'): ?>
          <a href="berita.php?aksi=tambah" class="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow flex items-center gap-2">
            <i data-lucide="plus-circle" class="w-4 h-4 text-amber-400"></i> Tulis Artikel Baru
          </a>
        <?php else: ?>
          <a href="berita.php" class="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-2">
            <i data-lucide="arrow-left" class="w-4 h-4"></i> Kembali ke Daftar Berita
          </a>
        <?php endif; ?>
      </div>

      <?php if ($pesan || isset($_GET['pesan'])): ?>
        <div class="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold mb-6 flex items-center gap-2">
          <i data-lucide="check-circle" class="w-4 h-4 text-emerald-600"></i>
          <?= htmlspecialchars($pesan ?: $_GET['pesan']) ?>
        </div>
      <?php endif; ?>

      <?php if ($aksi === 'tambah' || $aksi === 'edit'): ?>
        <!-- FORM TAMBAH / EDIT -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
          <h3 class="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-3">
            <?= $aksi === 'edit' ? 'Edit Artikel Berita' : 'Tulis Artikel Berita Baru' ?>
          </h3>

          <form method="POST" action="berita.php" class="space-y-4">
            <?php if ($editData): ?>
              <input type="hidden" name="edit_id" value="<?= $editData['id'] ?>">
            <?php endif; ?>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Judul Artikel *</label>
              <input type="text" name="judul" required value="<?= htmlspecialchars($editData['judul'] ?? '') ?>" placeholder="Masukkan judul berita yang menarik" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Kategori</label>
                <select name="kategori" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white">
                  <?php 
                  $katArr = ['Kegiatan', 'Prestasi', 'Pengumuman', 'Kajian Turots', 'Opini'];
                  $curKat = $editData['kategori'] ?? 'Kegiatan';
                  foreach ($katArr as $k):
                  ?>
                    <option value="<?= $k ?>" <?= $curKat === $k ? 'selected' : '' ?>><?= $k ?></option>
                  <?php endforeach; ?>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Penulis / Redaksi</label>
                <input type="text" name="penulis" value="<?= htmlspecialchars($editData['penulis'] ?? 'Humas Pesantren') ?>" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm">
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Tanggal Publikasi</label>
                <input type="date" name="tanggal" value="<?= htmlspecialchars($editData['tanggal'] ?? date('Y-m-d')) ?>" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm">
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">URL Gambar Utama (Cover Foto)</label>
              <input type="url" name="gambar" value="<?= htmlspecialchars($editData['gambar'] ?? '') ?>" placeholder="https://images.unsplash.com/..." class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm">
              <span class="text-[11px] text-slate-400 mt-1 block">Bisa gunakan link gambar langsung (CDN/Unsplash/Imgur).</span>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Ringkasan Singkat (Lead Paragraph)</label>
              <textarea name="ringkasan" rows="2" required placeholder="Tuliskan intisari warta dalam 1-2 kalimat" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"><?= htmlspecialchars($editData['ringkasan'] ?? '') ?></textarea>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Isi Artikel Lengkap</label>
              <textarea name="isi" rows="8" required placeholder="Tulis paragraf berita lengkap di sini (bisa gunakan tag <p> atau teks biasa)..." class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-sans"><?= htmlspecialchars($editData['isi'] ?? '') ?></textarea>
            </div>

            <div class="pt-4 flex justify-end gap-3">
              <a href="berita.php" class="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50">Batal</a>
              <button type="submit" class="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow">
                Simpan & Publikasikan
              </button>
            </div>
          </form>
        </div>

      <?php else: ?>
        <!-- TABEL LIST BERITA -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-slate-700">
              <thead class="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th class="px-6 py-3.5">Gambar</th>
                  <th class="px-6 py-3.5">Judul Berita</th>
                  <th class="px-6 py-3.5">Kategori</th>
                  <th class="px-6 py-3.5">Tanggal</th>
                  <th class="px-6 py-3.5">Dilihat</th>
                  <th class="px-6 py-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <?php if (count($listBerita) > 0): ?>
                  <?php foreach ($listBerita as $b): ?>
                  <tr class="hover:bg-slate-50 transition">
                    <td class="px-6 py-4">
                      <img src="<?= htmlspecialchars($b['gambar']) ?>" alt="" class="w-14 h-10 object-cover rounded-lg bg-slate-100">
                    </td>
                    <td class="px-6 py-4">
                      <p class="font-bold text-slate-900 line-clamp-1"><?= htmlspecialchars($b['judul']) ?></p>
                      <p class="text-[11px] text-slate-500 line-clamp-1"><?= htmlspecialchars($b['ringkasan']) ?></p>
                    </td>
                    <td class="px-6 py-4">
                      <span class="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md"><?= htmlspecialchars($b['kategori']) ?></span>
                    </td>
                    <td class="px-6 py-4 text-slate-500"><?= tgl_indo($b['tanggal']) ?></td>
                    <td class="px-6 py-4 font-mono"><?= (int)$b['dilihat'] ?></td>
                    <td class="px-6 py-4 text-right space-x-2">
                      <a href="berita.php?aksi=edit&id=<?= $b['id'] ?>" class="text-emerald-800 hover:text-emerald-950 font-bold">Edit</a>
                      <a href="berita.php?aksi=hapus&id=<?= $b['id'] ?>" onclick="return confirm('Hapus artikel ini?')" class="text-rose-600 hover:text-rose-800">Hapus</a>
                    </td>
                  </tr>
                  <?php endforeach; ?>
                <?php else: ?>
                  <tr>
                    <td colspan="6" class="px-6 py-8 text-center text-slate-400">Belum ada berita yang diterbitkan.</td>
                  </tr>
                <?php endif; ?>
              </tbody>
            </table>
          </div>
        </div>
      <?php endif; ?>

    </main>
  </div>

  <script>
    lucide.createIcons();
  </script>
</body>
</html>
