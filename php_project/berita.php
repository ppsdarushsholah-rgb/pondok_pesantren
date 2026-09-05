<?php
require_once __DIR__ . '/config/koneksi.php';
require_once __DIR__ . '/includes/header.php';

// Fitur pencarian & kategori
$cari = clean($_GET['cari'] ?? '');
$kategori = clean($_GET['kategori'] ?? '');

$sql = "SELECT * FROM tb_berita WHERE 1=1";
$params = [];

if (!empty($cari)) {
    $sql .= " AND (judul LIKE :cari OR ringkasan LIKE :cari OR isi LIKE :cari)";
    $params[':cari'] = "%$cari%";
}

if (!empty($kategori)) {
    $sql .= " AND kategori = :kategori";
    $params[':kategori'] = $kategori;
}

$sql .= " ORDER BY tanggal DESC";

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$daftarBerita = $stmt->fetchAll();

// Ambil list kategori unik
$stmtKat = $pdo->query("SELECT DISTINCT kategori FROM tb_berita WHERE kategori != ''");
$listKategori = $stmtKat->fetchAll(PDO::FETCH_COLUMN);
?>

<div class="bg-slate-50 py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header Title -->
    <div class="text-center max-w-2xl mx-auto mb-10 space-y-2">
      <span class="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100/60 px-3 py-1 rounded-full">Kabar Pesantren</span>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-emerald-950">Warta & Artikel Terbaru</h1>
      <p class="text-sm text-slate-600">Informasi resmi kegiatan santri, prestasi akademik, kajian turots, dan agenda pondok.</p>
    </div>

    <!-- Filter & Search Bar -->
    <div class="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm mb-10 flex flex-col md:flex-row gap-4 justify-between items-center">
      <form method="GET" action="berita.php" class="w-full md:w-auto flex-1 flex gap-2">
        <div class="relative flex-1">
          <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"></i>
          <input type="text" name="cari" value="<?= htmlspecialchars($cari) ?>" placeholder="Cari judul berita atau kegiatan..." class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500">
        </div>
        <button type="submit" class="bg-emerald-800 hover:bg-emerald-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition">
          Cari
        </button>
      </form>

      <!-- Kategori Filter -->
      <div class="flex flex-wrap gap-2 w-full md:w-auto">
        <a href="berita.php" class="px-3.5 py-1.5 rounded-xl text-xs font-semibold <?= empty($kategori) ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200' ?> transition">
          Semua
        </a>
        <?php foreach ($listKategori as $kat): ?>
          <a href="berita.php?kategori=<?= urlencode($kat) ?>" class="px-3.5 py-1.5 rounded-xl text-xs font-semibold <?= $kategori === $kat ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200' ?> transition">
            <?= htmlspecialchars($kat) ?>
          </a>
        <?php endforeach; ?>
      </div>
    </div>

    <!-- List Berita Grid -->
    <?php if (count($daftarBerita) > 0): ?>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <?php foreach ($daftarBerita as $b): ?>
        <article class="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition flex flex-col justify-between group">
          <div>
            <div class="h-52 overflow-hidden bg-slate-100 relative">
              <img src="<?= htmlspecialchars($b['gambar']) ?>" alt="<?= htmlspecialchars($b['judul']) ?>" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
              <span class="absolute top-3 left-3 bg-emerald-950/80 text-amber-400 text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-sm">
                <?= htmlspecialchars($b['kategori']) ?>
              </span>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 text-xs text-slate-400 mb-2.5">
                <i data-lucide="calendar" class="w-3.5 h-3.5"></i>
                <span><?= tgl_indo($b['tanggal']) ?></span>
                <span>•</span>
                <i data-lucide="user" class="w-3.5 h-3.5"></i>
                <span><?= htmlspecialchars($b['penulis'] ?: 'Redaksi') ?></span>
              </div>
              <h2 class="text-lg font-bold text-emerald-950 leading-snug mb-3 hover:text-emerald-700 transition line-clamp-2">
                <a href="berita-detail.php?id=<?= $b['id'] ?>"><?= htmlspecialchars($b['judul']) ?></a>
              </h2>
              <p class="text-xs text-slate-600 line-clamp-3 leading-relaxed"><?= htmlspecialchars($b['ringkasan']) ?></p>
            </div>
          </div>

          <div class="p-6 pt-0 border-t border-slate-100 flex justify-between items-center">
            <a href="berita-detail.php?id=<?= $b['id'] ?>" class="text-xs font-bold text-emerald-800 hover:text-amber-600 flex items-center gap-1 transition">
              Baca Selengkapnya <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </a>
            <span class="text-[11px] text-slate-400 flex items-center gap-1">
              <i data-lucide="eye" class="w-3.5 h-3.5"></i> <?= (int)$b['dilihat'] ?>
            </span>
          </div>
        </article>
        <?php endforeach; ?>
      </div>
    <?php else: ?>
      <div class="bg-white rounded-2xl p-12 text-center max-w-md mx-auto border border-slate-200">
        <div class="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
          <i data-lucide="inbox" class="w-6 h-6"></i>
        </div>
        <h3 class="font-bold text-slate-800 mb-1">Berita Tidak Ditemukan</h3>
        <p class="text-xs text-slate-500 mb-4">Tidak ada berita yang sesuai dengan kata kunci atau filter kategori yang dipilih.</p>
        <a href="berita.php" class="inline-block bg-emerald-800 text-white text-xs font-semibold px-4 py-2 rounded-xl">Reset Pencarian</a>
      </div>
    <?php endif; ?>
  </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
