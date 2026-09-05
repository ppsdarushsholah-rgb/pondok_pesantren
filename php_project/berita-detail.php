<?php
require_once __DIR__ . '/config/koneksi.php';

$id = (int)($_GET['id'] ?? 0);

// Ambil detail berita
$stmt = $pdo->prepare("SELECT * FROM tb_berita WHERE id = :id LIMIT 1");
$stmt->execute([':id' => $id]);
$berita = $stmt->fetch();

if (!$berita) {
    header("Location: berita.php");
    exit;
}

// Update hitungan dilihat (views counter)
$pdo->prepare("UPDATE tb_berita SET dilihat = dilihat + 1 WHERE id = :id")->execute([':id' => $id]);

// Ambil 3 berita terkait lainnya
$stmtTerkait = $pdo->prepare("SELECT * FROM tb_berita WHERE id != :id ORDER BY tanggal DESC LIMIT 3");
$stmtTerkait->execute([':id' => $id]);
$beritaTerkait = $stmtTerkait->fetchAll();

require_once __DIR__ . '/includes/header.php';
?>

<div class="bg-slate-50 py-12">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-xs text-slate-500 mb-6">
      <a href="index.php" class="hover:text-emerald-800">Beranda</a>
      <span>/</span>
      <a href="berita.php" class="hover:text-emerald-800">Warta Pesantren</a>
      <span>/</span>
      <span class="text-slate-700 font-medium truncate"><?= htmlspecialchars($berita['judul']) ?></span>
    </nav>

    <!-- Konten Artikel -->
    <article class="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
      <div class="space-y-3">
        <span class="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
          <?= htmlspecialchars($berita['kategori']) ?>
        </span>
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-emerald-950 leading-tight">
          <?= htmlspecialchars($berita['judul']) ?>
        </h1>
        <div class="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-b border-slate-100 pb-4">
          <span class="flex items-center gap-1.5"><i data-lucide="user" class="w-4 h-4 text-emerald-700"></i> <?= htmlspecialchars($berita['penulis']) ?></span>
          <span class="flex items-center gap-1.5"><i data-lucide="calendar" class="w-4 h-4 text-emerald-700"></i> <?= tgl_indo($berita['tanggal']) ?></span>
          <span class="flex items-center gap-1.5"><i data-lucide="eye" class="w-4 h-4 text-emerald-700"></i> Dilihat <?= (int)$berita['dilihat'] + 1 ?> kali</span>
        </div>
      </div>

      <!-- Gambar Utama -->
      <div class="rounded-2xl overflow-hidden shadow-sm aspect-video bg-slate-100">
        <img src="<?= htmlspecialchars($berita['gambar']) ?>" alt="<?= htmlspecialchars($berita['judul']) ?>" class="w-full h-full object-cover">
      </div>

      <!-- Ringkasan Highlight -->
      <div class="p-4 bg-emerald-50/70 border-l-4 border-emerald-600 rounded-r-xl text-xs sm:text-sm text-emerald-900 italic font-medium leading-relaxed">
        <?= htmlspecialchars($berita['ringkasan']) ?>
      </div>

      <!-- Isi Artikel Lengkap -->
      <div class="prose prose-emerald max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 pt-2">
        <?= $berita['isi'] ?>
      </div>

      <!-- Bagikan Artikel -->
      <div class="pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span class="text-xs font-semibold text-slate-600">Bagikan artikel ini ke media sosial:</span>
        <div class="flex gap-2">
          <a href="https://api.whatsapp.com/send?text=<?= urlencode($berita['judul'] . ' - ' . (isset($_SERVER['HTTPS']) ? 'https://' : 'http://') . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']) ?>" target="_blank" class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5">
            <i data-lucide="share-2" class="w-3.5 h-3.5"></i> WhatsApp
          </a>
          <a href="berita.php" class="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5">
            <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> Kembali ke Berita
          </a>
        </div>
      </div>
    </article>

    <!-- Berita Terkait -->
    <?php if (count($beritaTerkait) > 0): ?>
    <div class="mt-12 space-y-4">
      <h3 class="text-xl font-bold text-emerald-950">Warta Pesantren Lainnya</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <?php foreach ($beritaTerkait as $bt): ?>
        <div class="bg-white rounded-2xl p-4 border border-slate-200 hover:shadow-md transition group">
          <div class="h-32 rounded-xl overflow-hidden bg-slate-100 mb-3">
            <img src="<?= htmlspecialchars($bt['gambar']) ?>" alt="<?= htmlspecialchars($bt['judul']) ?>" class="w-full h-full object-cover group-hover:scale-105 transition">
          </div>
          <span class="text-[10px] font-bold text-emerald-700 uppercase"><?= htmlspecialchars($bt['kategori']) ?></span>
          <h4 class="font-bold text-sm text-slate-800 line-clamp-2 mt-1 mb-2 group-hover:text-emerald-700">
            <a href="berita-detail.php?id=<?= $bt['id'] ?>"><?= htmlspecialchars($bt['judul']) ?></a>
          </h4>
          <span class="text-[10px] text-slate-400"><?= tgl_indo($bt['tanggal']) ?></span>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
    <?php endif; ?>

  </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
