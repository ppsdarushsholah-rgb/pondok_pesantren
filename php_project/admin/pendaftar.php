<?php
require_once __DIR__ . '/../config/koneksi.php';
require_once __DIR__ . '/auth.php';

$pengaturan = getPengaturan($pdo);
$pesan = '';

// Handle Ubah Status
if (isset($_POST['ubah_status'])) {
    $id = (int)$_POST['id'];
    $status_baru = clean($_POST['status']);
    $stmt = $pdo->prepare("UPDATE tb_pendaftar SET status = :status WHERE id = :id");
    $stmt->execute([':status' => $status_baru, ':id' => $id]);
    $pesan = 'Status pendaftar berhasil diperbarui!';
}

// Handle Hapus Pendaftar
if (isset($_GET['hapus'])) {
    $id = (int)$_GET['hapus'];
    $stmt = $pdo->prepare("DELETE FROM tb_pendaftar WHERE id = :id");
    $stmt->execute([':id' => $id]);
    header("Location: pendaftar.php?pesan=Data+berhasil+dihapus");
    exit;
}

// Filter Status & Pencarian
$filter_status = clean($_GET['status'] ?? '');
$cari = clean($_GET['cari'] ?? '');

$sql = "SELECT * FROM tb_pendaftar WHERE 1=1";
$params = [];

if (!empty($filter_status)) {
    $sql .= " AND status = :status";
    $params[':status'] = $filter_status;
}

if (!empty($cari)) {
    $sql .= " AND (nama_lengkap LIKE :cari OR nomor_daftar LIKE :cari OR no_hp_wali LIKE :cari OR nama_ayah LIKE :cari)";
    $params[':cari'] = "%$cari%";
}

$sql .= " ORDER BY tanggal_daftar DESC";

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$daftarSantri = $stmt->fetchAll();

// Detail jika diminta
$detailSantri = null;
if (isset($_GET['id'])) {
    $stmtD = $pdo->prepare("SELECT * FROM tb_pendaftar WHERE id = :id LIMIT 1");
    $stmtD->execute([':id' => (int)$_GET['id']]);
    $detailSantri = $stmtD->fetch();
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kelola Pendaftar Santri | <?= htmlspecialchars($pengaturan['nama_pesantren']) ?></title>
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
          <a href="pendaftar.php" class="flex items-center justify-between px-4 py-3 rounded-xl bg-emerald-800 text-amber-300 shadow">
            <span class="flex items-center gap-3"><i data-lucide="users" class="w-4 h-4"></i> Santri Baru (PSB)</span>
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
          <a href="logout.php" onclick="return confirm('Logout?')" class="p-2 text-rose-300 hover:text-rose-100 rounded-lg transition" title="Logout">
            <i data-lucide="log-out" class="w-4 h-4"></i>
          </a>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6 md:p-10 overflow-y-auto">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900">Manajemen Pendaftar Santri Baru</h1>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">Kelola data calon santri, verifikasi berkas, dan status penerimaan.</p>
        </div>
        <button onclick="window.print()" class="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow flex items-center gap-2">
          <i data-lucide="printer" class="w-4 h-4"></i> Cetak / Ekspor Laporan
        </button>
      </div>

      <?php if ($pesan || isset($_GET['pesan'])): ?>
        <div class="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold mb-6 flex items-center gap-2">
          <i data-lucide="check-circle" class="w-4 h-4 text-emerald-600"></i>
          <?= htmlspecialchars($pesan ?: $_GET['pesan']) ?>
        </div>
      <?php endif; ?>

      <!-- Filter & Search Bar -->
      <div class="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
        <form method="GET" action="pendaftar.php" class="w-full md:w-auto flex-1 flex gap-2">
          <div class="relative flex-1">
            <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"></i>
            <input type="text" name="cari" value="<?= htmlspecialchars($cari) ?>" placeholder="Cari nama santri, no registrasi, atau orang tua..." class="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500">
          </div>
          <button type="submit" class="bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2 rounded-xl text-xs font-semibold">Cari</button>
        </form>

        <div class="flex items-center gap-2 w-full md:w-auto">
          <span class="text-xs text-slate-500">Status:</span>
          <a href="pendaftar.php" class="px-3 py-1.5 rounded-lg text-xs font-semibold <?= empty($filter_status) ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200' ?>">Semua</a>
          <a href="pendaftar.php?status=Menunggu+Verifikasi" class="px-3 py-1.5 rounded-lg text-xs font-semibold <?= $filter_status === 'Menunggu Verifikasi' ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200' ?>">Menunggu</a>
          <a href="pendaftar.php?status=Diterima" class="px-3 py-1.5 rounded-lg text-xs font-semibold <?= $filter_status === 'Diterima' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200' ?>">Diterima</a>
          <a href="pendaftar.php?status=Ditolak" class="px-3 py-1.5 rounded-lg text-xs font-semibold <?= $filter_status === 'Ditolak' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200' ?>">Ditolak</a>
        </div>
      </div>

      <!-- Detail Modal Santri Jika Dipilih -->
      <?php if ($detailSantri): ?>
        <div class="bg-white rounded-3xl p-6 border-2 border-emerald-500 shadow-xl mb-8 space-y-4">
          <div class="flex justify-between items-start border-b border-slate-100 pb-4">
            <div>
              <span class="text-[11px] font-bold text-emerald-700 uppercase bg-emerald-50 px-2.5 py-1 rounded-full">Detail Santri</span>
              <h3 class="text-xl font-bold text-slate-900 mt-1"><?= htmlspecialchars($detailSantri['nama_lengkap']) ?> (<?= htmlspecialchars($detailSantri['nomor_daftar']) ?>)</h3>
            </div>
            <a href="pendaftar.php" class="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
              <i data-lucide="x" class="w-5 h-5"></i>
            </a>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div class="p-3 bg-slate-50 rounded-xl space-y-1">
              <span class="text-slate-400 block font-medium">Program Pilihan:</span>
              <strong class="text-emerald-900 text-sm"><?= htmlspecialchars($detailSantri['program_pilihan']) ?></strong>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl space-y-1">
              <span class="text-slate-400 block font-medium">Jenis Kelamin / Lahir:</span>
              <strong><?= htmlspecialchars($detailSantri['jenis_kelamin']) ?></strong> / <?= htmlspecialchars($detailSantri['tempat_lahir']) ?>, <?= tgl_indo($detailSantri['tanggal_lahir']) ?>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl space-y-1">
              <span class="text-slate-400 block font-medium">NISN / NIK:</span>
              <strong>NISN: <?= htmlspecialchars($detailSantri['nisn'] ?: '-') ?></strong><br>
              <strong>NIK: <?= htmlspecialchars($detailSantri['nik'] ?: '-') ?></strong>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl space-y-1">
              <span class="text-slate-400 block font-medium">Orang Tua / Wali:</span>
              Ayah: <strong><?= htmlspecialchars($detailSantri['nama_ayah']) ?></strong><br>
              Ibu: <strong><?= htmlspecialchars($detailSantri['nama_ibu'] ?: '-') ?></strong>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl space-y-1">
              <span class="text-slate-400 block font-medium">No. WhatsApp Wali:</span>
              <a href="https://wa.me/<?= preg_replace('/[^0-9]/', '', $detailSantri['no_hp_wali']) ?>" target="_blank" class="text-emerald-700 font-bold flex items-center gap-1">
                <i data-lucide="message-circle" class="w-3.5 h-3.5"></i> <?= htmlspecialchars($detailSantri['no_hp_wali']) ?>
              </a>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl space-y-1">
              <span class="text-slate-400 block font-medium">Tanggal Pendaftaran:</span>
              <strong><?= date('d M Y H:i', strtotime($detailSantri['tanggal_daftar'])) ?> WIB</strong>
            </div>
            <div class="md:col-span-3 p-3 bg-slate-50 rounded-xl space-y-1">
              <span class="text-slate-400 block font-medium">Alamat Lengkap:</span>
              <p><?= nl2br(htmlspecialchars($detailSantri['alamat'])) ?></p>
            </div>
          </div>

          <!-- Form Ubah Status -->
          <form method="POST" action="pendaftar.php" class="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
            <input type="hidden" name="id" value="<?= $detailSantri['id'] ?>">
            <span class="text-xs font-semibold text-slate-700">Ubah Status Penerimaan:</span>
            <select name="status" class="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold bg-white">
              <option value="Menunggu Verifikasi" <?= $detailSantri['status'] === 'Menunggu Verifikasi' ? 'selected' : '' ?>>Menunggu Verifikasi</option>
              <option value="Diterima" <?= $detailSantri['status'] === 'Diterima' ? 'selected' : '' ?>>Diterima</option>
              <option value="Ditolak" <?= $detailSantri['status'] === 'Ditolak' ? 'selected' : '' ?>>Ditolak</option>
            </select>
            <button type="submit" name="ubah_status" class="bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-1.5 rounded-lg text-xs font-bold">
              Simpan Perubahan
            </button>
            <a href="pendaftar.php?hapus=<?= $detailSantri['id'] ?>" onclick="return confirm('Hapus data pendaftar ini secara permanen?')" class="text-rose-600 hover:text-rose-800 text-xs font-semibold ml-auto">
              Hapus Data
            </a>
          </form>
        </div>
      <?php endif; ?>

      <!-- Tabel Pendaftar -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs text-slate-700">
            <thead class="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th class="px-6 py-3.5">No. Registrasi</th>
                <th class="px-6 py-3.5">Nama Santri</th>
                <th class="px-6 py-3.5">JK</th>
                <th class="px-6 py-3.5">Program</th>
                <th class="px-6 py-3.5">Nama Wali</th>
                <th class="px-6 py-3.5">No. WhatsApp</th>
                <th class="px-6 py-3.5">Status</th>
                <th class="px-6 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <?php if (count($daftarSantri) > 0): ?>
                <?php foreach ($daftarSantri as $s): ?>
                <tr class="hover:bg-slate-50 transition">
                  <td class="px-6 py-4 font-mono font-bold text-emerald-900"><?= htmlspecialchars($s['nomor_daftar']) ?></td>
                  <td class="px-6 py-4 font-bold text-slate-900"><?= htmlspecialchars($s['nama_lengkap']) ?></td>
                  <td class="px-6 py-4"><?= $s['jenis_kelamin'] === 'Laki-laki' ? 'L' : 'P' ?></td>
                  <td class="px-6 py-4 text-slate-600"><?= htmlspecialchars($s['program_pilihan']) ?></td>
                  <td class="px-6 py-4"><?= htmlspecialchars($s['nama_ayah']) ?></td>
                  <td class="px-6 py-4 font-mono">
                    <a href="https://wa.me/<?= preg_replace('/[^0-9]/', '', $s['no_hp_wali']) ?>" target="_blank" class="text-emerald-700 hover:underline flex items-center gap-1">
                      <?= htmlspecialchars($s['no_hp_wali']) ?>
                    </a>
                  </td>
                  <td class="px-6 py-4">
                    <?php if ($s['status'] === 'Diterima'): ?>
                      <span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Diterima</span>
                    <?php elseif ($s['status'] === 'Ditolak'): ?>
                      <span class="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Ditolak</span>
                    <?php else: ?>
                      <span class="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Menunggu</span>
                    <?php endif; ?>
                  </td>
                  <td class="px-6 py-4 text-right space-x-2">
                    <a href="pendaftar.php?id=<?= $s['id'] ?>" class="text-xs text-emerald-800 hover:text-emerald-950 font-bold">Detail</a>
                    <a href="pendaftar.php?hapus=<?= $s['id'] ?>" onclick="return confirm('Hapus pendaftar ini?')" class="text-xs text-rose-600 hover:text-rose-800">Hapus</a>
                  </td>
                </tr>
                <?php endforeach; ?>
              <?php else: ?>
                <tr>
                  <td colspan="8" class="px-6 py-12 text-center text-slate-400">Tidak ada data pendaftar yang cocok.</td>
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
