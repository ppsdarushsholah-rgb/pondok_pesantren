<?php
require_once __DIR__ . '/config/koneksi.php';
require_once __DIR__ . '/includes/header.php';

// Ambil Program Pendidikan
$stmtProg = $pdo->query("SELECT * FROM tb_program ORDER BY urutan ASC, id ASC");
$programs = $stmtProg->fetchAll();

// Ambil Fasilitas Pesantren
$stmtFas = $pdo->query("SELECT * FROM tb_fasilitas ORDER BY id ASC LIMIT 6");
$fasilitas = $stmtFas->fetchAll();

// Ambil Berita Terbaru (3 item)
$stmtBerita = $pdo->query("SELECT * FROM tb_berita ORDER BY tanggal DESC LIMIT 3");
$beritaList = $stmtBerita->fetchAll();

// Ambil Galeri Terbaru (6 item)
$stmtGal = $pdo->query("SELECT * FROM tb_galeri ORDER BY tanggal DESC LIMIT 6");
$galeriList = $stmtGal->fetchAll();
?>

<!-- 1. HERO SECTION -->
<section id="beranda" class="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white overflow-hidden py-24 lg:py-32">
  <!-- Dekorasi Background -->
  <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:24px_24px]"></div>
  <div class="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-emerald-700/30 blur-3xl pointer-events-none"></div>
  <div class="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-amber-500/20 blur-3xl pointer-events-none"></div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <!-- Text Hero -->
      <div class="lg:col-span-7 space-y-6">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-700/60 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide">
          <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
          Penerimaan Santri Baru TA <?= htmlspecialchars($pengaturan['tahun_ajaran_psb']) ?> Dibuka!
        </div>

        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Menempa Generasi <span class="text-amber-400 underline decoration-emerald-500 decoration-wavy">Qur'ani</span> & Berakhlakul Karimah
        </h1>

        <p class="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl font-normal">
          <?= htmlspecialchars($pengaturan['tagline']) ?>. Perpaduan kurikulum salafiyah turots klasik, sanad tahfidz mutqina, serta pendidikan formal modern berwawasan global.
        </p>

        <div class="pt-3 flex flex-wrap gap-4 items-center">
          <a href="daftar.php" class="inline-flex items-center gap-2.5 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-amber-500/20 transition transform hover:-translate-y-0.5 text-base">
            <i data-lucide="sparkles" class="w-5 h-5"></i>
            Daftar Sekarang (PSB)
          </a>
          <a href="#profil" class="inline-flex items-center gap-2 bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-700 text-emerald-100 font-semibold px-6 py-3.5 rounded-xl transition">
            <i data-lucide="book-open" class="w-5 h-5 text-amber-400"></i>
            Jelajahi Profil Pesantren
          </a>
        </div>

        <!-- Highlight Angka -->
        <div class="pt-8 border-t border-emerald-800/70 grid grid-cols-3 gap-4 text-center sm:text-left">
          <div>
            <div class="text-2xl sm:text-3xl font-extrabold text-amber-400">1.200+</div>
            <div class="text-xs text-emerald-200">Santri Mukim Aktif</div>
          </div>
          <div>
            <div class="text-2xl sm:text-3xl font-extrabold text-amber-400">100%</div>
            <div class="text-xs text-emerald-200">Sanad Mutashil</div>
          </div>
          <div>
            <div class="text-2xl sm:text-3xl font-extrabold text-amber-400">Akreditasi A</div>
            <div class="text-xs text-emerald-200">SMP & SMA Unggulan</div>
          </div>
        </div>
      </div>

      <!-- Image / Card Pengasuh Hero -->
      <div class="lg:col-span-5">
        <div class="relative mx-auto max-w-md">
          <div class="absolute -inset-1.5 bg-gradient-to-r from-amber-400 to-emerald-500 rounded-3xl blur opacity-30"></div>
          <div class="relative bg-emerald-900/90 border border-emerald-700/80 p-5 rounded-3xl shadow-2xl backdrop-blur-sm">
            <div class="aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-emerald-950 relative">
              <img src="<?= htmlspecialchars($pengaturan['foto_pengasuh']) ?>" alt="<?= htmlspecialchars($pengaturan['nama_pengasuh']) ?>" class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent"></div>
              <div class="absolute bottom-3 left-3 right-3 text-white">
                <span class="bg-amber-500 text-emerald-950 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Pengasuh</span>
                <p class="font-bold text-base leading-tight mt-1"><?= htmlspecialchars($pengaturan['nama_pengasuh']) ?></p>
              </div>
            </div>
            <p class="text-xs text-emerald-200 italic leading-relaxed">
              "Ilmu tanpa adab bagaikan api tanpa kayu bakar. Di Darush Sholah, adab dan akhlak kami dahulukan sebelum pengetahuan."
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- 2. SAMBUTAN PENGASUH & PROFIL -->
<section id="profil" class="py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <!-- Foto Pengasuh -->
      <div class="lg:col-span-5 order-2 lg:order-1">
        <div class="relative rounded-3xl overflow-hidden shadow-xl border-4 border-emerald-50">
          <img src="<?= htmlspecialchars($pengaturan['foto_pengasuh']) ?>" alt="Pengasuh" class="w-full h-[450px] object-cover">
          <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-emerald-950 via-emerald-950/80 to-transparent p-6 text-white">
            <h3 class="text-xl font-bold text-amber-400"><?= htmlspecialchars($pengaturan['nama_pengasuh']) ?></h3>
            <p class="text-sm text-emerald-200"><?= htmlspecialchars($pengaturan['gelar_pengasuh']) ?></p>
          </div>
        </div>
      </div>

      <!-- Isi Sambutan & Visi -->
      <div class="lg:col-span-7 order-1 lg:order-2 space-y-6">
        <div class="inline-flex items-center gap-2 text-emerald-700 bg-emerald-50 font-bold text-xs px-3.5 py-1.5 rounded-full">
          <i data-lucide="message-square" class="w-4 h-4"></i> Kalimah Iftitah Pengasuh
        </div>
        
        <h2 class="text-2xl sm:text-3xl font-extrabold text-emerald-950 leading-tight">
          Menjaga Tradisi Salaf, Merajut Prestasi di Era Modern
        </h2>

        <div class="prose text-slate-600 text-sm sm:text-base leading-relaxed space-y-4">
          <p class="font-arabic text-xl text-emerald-900 text-right">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          <p><?= nl2br(htmlspecialchars($pengaturan['sambutan_pengasuh'])) ?></p>
        </div>

        <div class="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
            <h4 class="font-bold text-emerald-900 text-sm mb-1 flex items-center gap-2">
              <i data-lucide="compass" class="w-4 h-4 text-emerald-700"></i> Visi Pesantren
            </h4>
            <p class="text-xs text-slate-600 leading-relaxed"><?= htmlspecialchars($pengaturan['visi']) ?></p>
          </div>

          <div class="p-4 rounded-2xl bg-amber-50/70 border border-amber-100">
            <h4 class="font-bold text-amber-900 text-sm mb-1 flex items-center gap-2">
              <i data-lucide="target" class="w-4 h-4 text-amber-600"></i> Kurikulum Salaf & Formal
            </h4>
            <p class="text-xs text-slate-600 leading-relaxed">Penyelarasan Kitab Kuning Mu'tabarah dengan Kurikulum Nasional terakreditasi.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- 3. PROGRAM PENDIDIKAN -->
<section id="program" class="py-20 bg-slate-50 border-y border-slate-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center max-w-3xl mx-auto mb-14 space-y-3">
      <span class="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100/60 px-3 py-1 rounded-full">Pendidikan Komprehensif</span>
      <h2 class="text-3xl font-extrabold text-emerald-950">Program Unggulan Pesantren</h2>
      <p class="text-sm text-slate-600">Disusun sistematis untuk membina kecerdasan spiritual, intelektual, dan karakter kepemimpinan santri.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <?php foreach ($programs as $prog): ?>
      <div class="bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
        <div>
          <div class="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-4 group-hover:bg-emerald-800 group-hover:text-amber-400 transition">
            <i data-lucide="<?= htmlspecialchars($prog['ikon'] ?: 'book-open') ?>" class="w-6 h-6"></i>
          </div>
          <span class="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md"><?= htmlspecialchars($prog['tingkat']) ?></span>
          <h3 class="text-lg font-bold text-emerald-950 mt-2 mb-2"><?= htmlspecialchars($prog['nama_program']) ?></h3>
          <p class="text-xs text-slate-600 leading-relaxed mb-4"><?= htmlspecialchars($prog['deskripsi']) ?></p>
        </div>

        <div class="pt-4 border-t border-slate-100 space-y-2">
          <div class="text-[11px] text-slate-500">
            <strong class="text-emerald-900 block">Kurikulum:</strong>
            <?= htmlspecialchars($prog['kurikulum']) ?>
          </div>
          <div class="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <i data-lucide="check-circle-2" class="w-3.5 h-3.5"></i> <?= htmlspecialchars($prog['target']) ?>
          </div>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- 4. FASILITAS PESANTREN -->
<section id="fasilitas" class="py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center max-w-3xl mx-auto mb-14 space-y-3">
      <span class="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100/60 px-3 py-1 rounded-full">Sarana & Prasarana</span>
      <h2 class="text-3xl font-extrabold text-emerald-950">Fasilitas Penunjang Santri</h2>
      <p class="text-sm text-slate-600">Lingkungan asri, representatif, dan kondusif untuk menunjang kegiatan ibadah, belajar, dan istirahat santri.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <?php foreach ($fasilitas as $fas): ?>
      <div class="rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition bg-white group">
        <div class="h-52 overflow-hidden bg-slate-100 relative">
          <img src="<?= htmlspecialchars($fas['foto']) ?>" alt="<?= htmlspecialchars($fas['nama_fasilitas']) ?>" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
          <span class="absolute top-3 left-3 bg-emerald-950/80 text-amber-400 text-xs font-semibold px-2.5 py-1 rounded-lg backdrop-blur-sm">
            <?= htmlspecialchars($fas['kategori']) ?>
          </span>
        </div>
        <div class="p-5">
          <h3 class="font-bold text-base text-emerald-950 mb-2"><?= htmlspecialchars($fas['nama_fasilitas']) ?></h3>
          <p class="text-xs text-slate-600 leading-relaxed"><?= htmlspecialchars($fas['deskripsi']) ?></p>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- 5. BERITA & ARTIKEL TERBARU -->
<section id="berita" class="py-20 bg-slate-50 border-t border-slate-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
      <div>
        <span class="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100/60 px-3 py-1 rounded-full">Kabar & Informasi</span>
        <h2 class="text-3xl font-extrabold text-emerald-950 mt-2">Warta Pondok Pesantren</h2>
      </div>
      <a href="berita.php" class="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800 hover:text-emerald-900 transition">
        Lihat Semua Berita <i data-lucide="arrow-right" class="w-4 h-4"></i>
      </a>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <?php foreach ($beritaList as $item): ?>
      <article class="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-md transition flex flex-col justify-between">
        <div>
          <div class="h-48 overflow-hidden bg-slate-100">
            <img src="<?= htmlspecialchars($item['gambar']) ?>" alt="<?= htmlspecialchars($item['judul']) ?>" class="w-full h-full object-cover hover:scale-105 transition duration-300">
          </div>
          <div class="p-5">
            <div class="flex items-center gap-2 text-xs text-slate-500 mb-2">
              <span class="text-emerald-700 font-semibold"><?= htmlspecialchars($item['kategori']) ?></span>
              <span>•</span>
              <span><?= tgl_indo($item['tanggal']) ?></span>
            </div>
            <h3 class="font-bold text-base text-emerald-950 leading-snug mb-2 hover:text-emerald-700 transition">
              <a href="berita-detail.php?id=<?= $item['id'] ?>"><?= htmlspecialchars($item['judul']) ?></a>
            </h3>
            <p class="text-xs text-slate-600 line-clamp-3 leading-relaxed"><?= htmlspecialchars($item['ringkasan']) ?></p>
          </div>
        </div>

        <div class="p-5 pt-0">
          <a href="berita-detail.php?id=<?= $item['id'] ?>" class="text-xs font-bold text-emerald-800 hover:text-amber-600 flex items-center gap-1 transition">
            Baca Selengkapnya <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
          </a>
        </div>
      </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- 6. GALERI KEGIATAN SANTRI -->
<section id="galeri" class="py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
      <div>
        <span class="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100/60 px-3 py-1 rounded-full">Dokumentasi Santri</span>
        <h2 class="text-3xl font-extrabold text-emerald-950 mt-2">Galeri Aktivitas Pesantren</h2>
      </div>
      <a href="galeri.php" class="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800 hover:text-emerald-900 transition">
        Lihat Semua Galeri <i data-lucide="arrow-right" class="w-4 h-4"></i>
      </a>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
      <?php foreach ($galeriList as $g): ?>
      <div class="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 shadow-sm">
        <img src="<?= htmlspecialchars($g['gambar']) ?>" alt="<?= htmlspecialchars($g['judul']) ?>" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
        <div class="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white">
          <span class="text-[10px] text-amber-400 font-semibold uppercase tracking-wider"><?= htmlspecialchars($g['kategori']) ?></span>
          <h4 class="text-xs sm:text-sm font-bold line-clamp-2"><?= htmlspecialchars($g['judul']) ?></h4>
          <span class="text-[10px] text-slate-300 mt-1"><?= tgl_indo($g['tanggal']) ?></span>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- 7. CTA DAFTAR SANTRI BARU (PSB) -->
<section class="py-20 bg-emerald-900 text-white relative overflow-hidden">
  <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:20px_20px]"></div>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
    <div class="inline-block bg-amber-400 text-emerald-950 font-extrabold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider">
      Pendaftaran Santri Baru Online TA <?= htmlspecialchars($pengaturan['tahun_ajaran_psb']) ?>
    </div>
    
    <h2 class="text-3xl sm:text-4xl font-extrabold text-white">
      Siap Menjadi Bagian Dari Generasi Penerus Ulama & Bangsa?
    </h2>

    <p class="text-emerald-100 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
      Daftarkan putra-putri Anda sekarang juga secara online dengan mudah dan cepat. Kuota terbatas hanya untuk <?= htmlspecialchars($pengaturan['kuota_psb']) ?> santri baru.
    </p>

    <div class="pt-4 flex flex-wrap justify-center gap-4">
      <a href="daftar.php" class="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-8 py-4 rounded-xl shadow-lg transition transform hover:-translate-y-0.5 text-base flex items-center gap-2">
        <i data-lucide="file-check" class="w-5 h-5"></i>
        Buka Formulir Pendaftaran
      </a>
      <a href="https://wa.me/<?= preg_replace('/[^0-9]/', '', $pengaturan['whatsapp']) ?>" target="_blank" class="bg-emerald-800 hover:bg-emerald-700 border border-emerald-600 text-white font-semibold px-6 py-4 rounded-xl transition flex items-center gap-2">
        <i data-lucide="help-circle" class="w-5 h-5 text-amber-400"></i>
        Konsultasi & Informasi PSB
      </a>
    </div>
  </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
