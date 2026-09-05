<?php
require_once __DIR__ . '/../config/koneksi.php';
require_once __DIR__ . '/auth.php';

$pesan = '';

// Handle Update Pengaturan
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nama_pesantren    = clean($_POST['nama_pesantren'] ?? '');
    $tagline           = clean($_POST['tagline'] ?? '');
    $logo              = clean($_POST['logo'] ?? 'assets/logo.jpg');
    $nama_pengasuh     = clean($_POST['nama_pengasuh'] ?? '');
    $gelar_pengasuh    = clean($_POST['gelar_pengasuh'] ?? '');
    $foto_pengasuh     = clean($_POST['foto_pengasuh'] ?? '');
    $sambutan_pengasuh = clean($_POST['sambutan_pengasuh'] ?? '');
    $visi              = clean($_POST['visi'] ?? '');
    $misi              = clean($_POST['misi'] ?? '');
    $alamat            = clean($_POST['alamat'] ?? '');
    $telepon           = clean($_POST['telepon'] ?? '');
    $whatsapp          = clean($_POST['whatsapp'] ?? '');
    $email             = clean($_POST['email'] ?? '');
    $facebook          = clean($_POST['facebook'] ?? '');
    $instagram         = clean($_POST['instagram'] ?? '');
    $youtube           = clean($_POST['youtube'] ?? '');
    $tahun_ajaran_psb  = clean($_POST['tahun_ajaran_psb'] ?? '2025/2026');
    $status_psb        = clean($_POST['status_psb'] ?? 'Buka');
    $kuota_psb         = (int)($_POST['kuota_psb'] ?? 250);

    // Handle Upload File Logo Baru jika ada
    if (isset($_FILES['file_logo']) && $_FILES['file_logo']['error'] === UPLOAD_ERR_OK) {
        $ext = strtolower(pathinfo($_FILES['file_logo']['name'], PATHINFO_EXTENSION));
        if (in_array($ext, ['jpg', 'jpeg', 'png', 'webp'])) {
            $dest = __DIR__ . '/../assets/logo.jpg';
            if (move_uploaded_file($_FILES['file_logo']['tmp_name'], $dest)) {
                $logo = 'assets/logo.jpg';
            }
        }
    }

    try {
        $pdo->query("ALTER TABLE tb_pengaturan ADD COLUMN IF NOT EXISTS logo VARCHAR(255) DEFAULT 'assets/logo.jpg'");
    } catch (Exception $e) {}

    $sql = "UPDATE tb_pengaturan SET 
            nama_pesantren = :nama_pesantren,
            tagline = :tagline,
            logo = :logo,
            nama_pengasuh = :nama_pengasuh,
            gelar_pengasuh = :gelar_pengasuh,
            foto_pengasuh = :foto_pengasuh,
            sambutan_pengasuh = :sambutan_pengasuh,
            visi = :visi,
            misi = :misi,
            alamat = :alamat,
            telepon = :telepon,
            whatsapp = :whatsapp,
            email = :email,
            facebook = :facebook,
            instagram = :instagram,
            youtube = :youtube,
            tahun_ajaran_psb = :tahun_ajaran_psb,
            status_psb = :status_psb,
            kuota_psb = :kuota_psb
            WHERE id = 1";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':nama_pesantren'    => $nama_pesantren,
        ':tagline'           => $tagline,
        ':logo'              => $logo,
        ':nama_pengasuh'     => $nama_pengasuh,
        ':gelar_pengasuh'    => $gelar_pengasuh,
        ':foto_pengasuh'     => $foto_pengasuh,
        ':sambutan_pengasuh' => $sambutan_pengasuh,
        ':visi'              => $visi,
        ':misi'              => $misi,
        ':alamat'            => $alamat,
        ':telepon'           => $telepon,
        ':whatsapp'          => $whatsapp,
        ':email'             => $email,
        ':facebook'          => $facebook,
        ':instagram'         => $instagram,
        ':youtube'           => $youtube,
        ':tahun_ajaran_psb'  => $tahun_ajaran_psb,
        ':status_psb'        => $status_psb,
        ':kuota_psb'         => $kuota_psb
    ]);

    $pesan = "Pengaturan profil, logo, & kontak pesantren berhasil disimpan!";
}

$pengaturan = getPengaturan($pdo);
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pengaturan Website | Admin <?= htmlspecialchars($pengaturan['nama_pesantren']) ?></title>
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
          <a href="galeri.php" class="flex items-center gap-3 px-4 py-3 rounded-xl text-emerald-200 hover:bg-emerald-900 hover:text-white transition">
            <i data-lucide="image" class="w-4 h-4"></i> Kelola Galeri Foto
          </a>
          <a href="pengaturan.php" class="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-800 text-amber-300 shadow">
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
      <div class="mb-8">
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900">Pengaturan Website Pesantren</h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">Konfigurasi nama lembaga, sambutan kiai, kontak, dan status pendaftaran santri baru.</p>
      </div>

      <?php if ($pesan): ?>
        <div class="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold mb-6 flex items-center gap-2">
          <i data-lucide="check-circle" class="w-4 h-4 text-emerald-600"></i>
          <?= htmlspecialchars($pesan) ?>
        </div>
      <?php endif; ?>

      <form method="POST" action="pengaturan.php" enctype="multipart/form-data" class="space-y-8">
        <!-- 0. Logo & Lambang Resmi Pesantren -->
        <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
              <i data-lucide="sparkles" class="w-4 h-4 text-amber-500"></i> Logo & Lambang Resmi Pesantren
            </h3>
            <span class="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-medium">
              Tampil di Header & Footer
            </span>
          </div>

          <div class="flex flex-col sm:flex-row items-center gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <!-- Preview Logo Saat Ini -->
            <div class="w-24 h-24 rounded-2xl bg-black border-2 border-amber-400 p-1 flex items-center justify-center shadow-md shrink-0 overflow-hidden">
              <?php 
                $curr_logo = !empty($pengaturan['logo']) ? $pengaturan['logo'] : 'assets/logo.jpg';
              ?>
              <img src="<?= htmlspecialchars($curr_logo) ?>" alt="Logo Pesantren" class="w-full h-full object-contain" onerror="this.src='../assets/logo.jpg'; if(!this.complete) this.src='../WhatsApp Image 2026-09-06 at 00.55.20.jpeg';">
            </div>

            <div class="flex-1 space-y-3 text-center sm:text-left">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-0.5">Unggah Berkas Logo Baru</label>
                <p class="text-xs text-slate-500">Pilih file logo dari perangkat (JPG, PNG, atau WEBP). Berkas akan otomatis diperbarui ke seluruh website.</p>
              </div>
              <input type="file" name="file_logo" accept="image/*" class="text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-800 file:text-white hover:file:bg-emerald-900 cursor-pointer">
              
              <div>
                <label class="block text-xs font-semibold text-slate-700 mt-2 mb-1">Atau Path/Tautan File Logo</label>
                <input type="text" name="logo" value="<?= htmlspecialchars($curr_logo) ?>" placeholder="assets/logo.jpg atau link gambar" class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs">
              </div>
            </div>
          </div>
        </div>

        <!-- 1. Identitas Lembaga & PSB -->
        <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 class="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <i data-lucide="building" class="w-4 h-4 text-emerald-700"></i> Identitas Pesantren & Status PSB
          </h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Nama Pesantren</label>
              <input type="text" name="nama_pesantren" required value="<?= htmlspecialchars($pengaturan['nama_pesantren']) ?>" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm">
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Tagline / Slogan</label>
              <input type="text" name="tagline" required value="<?= htmlspecialchars($pengaturan['tagline']) ?>" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm">
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Status Pendaftaran Santri Baru (PSB)</label>
              <select name="status_psb" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white">
                <option value="Buka" <?= $pengaturan['status_psb'] === 'Buka' ? 'selected' : '' ?>>Dibuka (Pendaftaran Aktif)</option>
                <option value="Tutup" <?= $pengaturan['status_psb'] === 'Tutup' ? 'selected' : '' ?>>Ditutup (Pendaftaran Nonaktif)</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Tahun Ajaran PSB</label>
              <input type="text" name="tahun_ajaran_psb" value="<?= htmlspecialchars($pengaturan['tahun_ajaran_psb']) ?>" placeholder="2025/2026" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm">
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Kuota Santri Baru</label>
              <input type="number" name="kuota_psb" value="<?= (int)$pengaturan['kuota_psb'] ?>" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm">
            </div>
          </div>
        </div>

        <!-- 2. Pengasuh & Sambutan -->
        <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 class="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <i data-lucide="user-check" class="w-4 h-4 text-emerald-700"></i> Pengasuh & Kalimah Iftitah
          </h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Nama Pengasuh / Kiai</label>
              <input type="text" name="nama_pengasuh" required value="<?= htmlspecialchars($pengaturan['nama_pengasuh']) ?>" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm">
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Gelar / Jabatan</label>
              <input type="text" name="gelar_pengasuh" required value="<?= htmlspecialchars($pengaturan['gelar_pengasuh']) ?>" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm">
            </div>

            <div class="sm:col-span-2">
              <label class="block text-xs font-semibold text-slate-700 mb-1">URL Foto Pengasuh</label>
              <input type="url" name="foto_pengasuh" value="<?= htmlspecialchars($pengaturan['foto_pengasuh']) ?>" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm">
            </div>

            <div class="sm:col-span-2">
              <label class="block text-xs font-semibold text-slate-700 mb-1">Sambutan Pengasuh</label>
              <textarea name="sambutan_pengasuh" rows="5" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"><?= htmlspecialchars($pengaturan['sambutan_pengasuh']) ?></textarea>
            </div>
          </div>
        </div>

        <!-- 3. Kontak & Media Sosial -->
        <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 class="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <i data-lucide="phone" class="w-4 h-4 text-emerald-700"></i> Kontak & Media Sosial
          </h3>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Nomor Telepon Kantor</label>
              <input type="text" name="telepon" value="<?= htmlspecialchars($pengaturan['telepon']) ?>" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm">
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">WhatsApp PSB Resmi</label>
              <input type="text" name="whatsapp" value="<?= htmlspecialchars($pengaturan['whatsapp']) ?>" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm">
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Email Resmi</label>
              <input type="email" name="email" value="<?= htmlspecialchars($pengaturan['email']) ?>" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm">
            </div>

            <div class="sm:col-span-3">
              <label class="block text-xs font-semibold text-slate-700 mb-1">Alamat Lengkap Pesantren</label>
              <textarea name="alamat" rows="2" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"><?= htmlspecialchars($pengaturan['alamat']) ?></textarea>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Instagram URL</label>
              <input type="url" name="instagram" value="<?= htmlspecialchars($pengaturan['instagram']) ?>" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm">
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Facebook URL</label>
              <input type="url" name="facebook" value="<?= htmlspecialchars($pengaturan['facebook']) ?>" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm">
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">YouTube URL</label>
              <input type="url" name="youtube" value="<?= htmlspecialchars($pengaturan['youtube']) ?>" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm">
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <button type="submit" class="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-8 py-3 rounded-xl text-sm shadow-lg">
            Simpan Semua Pengaturan
          </button>
        </div>
      </form>
    </main>
  </div>

  <script>
    lucide.createIcons();
  </script>
</body>
</html>
