<?php
require_once __DIR__ . '/config/koneksi.php';
require_once __DIR__ . '/includes/header.php';

$kategori = clean($_GET['kategori'] ?? '');

$sql = "SELECT * FROM tb_galeri WHERE 1=1";
$params = [];
if (!empty($kategori)) {
    $sql .= " AND kategori = :kategori";
    $params[':kategori'] = $kategori;
}
$sql .= " ORDER BY tanggal DESC";

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$daftarGaleri = $stmt->fetchAll();

$stmtKat = $pdo->query("SELECT DISTINCT kategori FROM tb_galeri WHERE kategori != ''");
$listKategori = $stmtKat->fetchAll(PDO::FETCH_COLUMN);
?>

<div class="bg-slate-50 py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center max-w-2xl mx-auto mb-10 space-y-2">
      <span class="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100/60 px-3 py-1 rounded-full">Dokumentasi Pesantren</span>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-emerald-950">Galeri Foto & Aktivitas Santri</h1>
      <p class="text-sm text-slate-600">Potret keseharian, kegiatan belajar mengajar, halaqah tahfidz, dan ibadah di Pondok Pesantren Darush Sholah.</p>
    </div>

    <!-- Filter Kategori -->
    <div class="flex flex-wrap justify-center gap-2 mb-10">
      <a href="galeri.php" class="px-4 py-2 rounded-xl text-xs font-semibold <?= empty($kategori) ? 'bg-emerald-800 text-white shadow' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100' ?> transition">
        Semua Foto
      </a>
      <?php foreach ($listKategori as $kat): ?>
        <a href="galeri.php?kategori=<?= urlencode($kat) ?>" class="px-4 py-2 rounded-xl text-xs font-semibold <?= $kategori === $kat ? 'bg-emerald-800 text-white shadow' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100' ?> transition">
          <?= htmlspecialchars($kat) ?>
        </a>
      <?php endforeach; ?>
    </div>

    <!-- Grid Foto -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <?php foreach ($daftarGaleri as $g): ?>
      <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition group">
        <div class="aspect-[4/3] overflow-hidden bg-slate-100 relative">
          <img src="<?= htmlspecialchars($g['gambar']) ?>" alt="<?= htmlspecialchars($g['judul']) ?>" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
          <span class="absolute top-3 left-3 bg-emerald-950/80 text-amber-400 text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-sm">
            <?= htmlspecialchars($g['kategori']) ?>
          </span>
        </div>
        <div class="p-4">
          <h3 class="font-bold text-sm text-emerald-950 mb-1 line-clamp-2"><?= htmlspecialchars($g['judul']) ?></h3>
          <p class="text-[11px] text-slate-400 flex items-center gap-1">
            <i data-lucide="calendar" class="w-3 h-3"></i> <?= tgl_indo($g['tanggal']) ?>
          </p>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
