<?php
require_once __DIR__ . '/config/koneksi.php';

$sukses = false;
$pesan_error = '';
$data_pendaftar = null;

// Ambil opsi program untuk dropdown
$stmtPrograms = $pdo->query("SELECT nama_program FROM tb_program ORDER BY urutan ASC, id ASC");
$opsiProgram = $stmtPrograms->fetchAll();

// Handle Form Submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nama_lengkap    = clean($_POST['nama_lengkap'] ?? '');
    $jenis_kelamin   = clean($_POST['jenis_kelamin'] ?? '');
    $tempat_lahir    = clean($_POST['tempat_lahir'] ?? '');
    $tanggal_lahir   = clean($_POST['tanggal_lahir'] ?? '');
    $nisn            = clean($_POST['nisn'] ?? '');
    $nik             = clean($_POST['nik'] ?? '');
    $nama_ayah       = clean($_POST['nama_ayah'] ?? '');
    $nama_ibu        = clean($_POST['nama_ibu'] ?? '');
    $no_hp_wali      = clean($_POST['no_hp_wali'] ?? '');
    $alamat          = clean($_POST['alamat'] ?? '');
    $program_pilihan = clean($_POST['program_pilihan'] ?? '');

    if (empty($nama_lengkap) || empty($jenis_kelamin) || empty($tempat_lahir) || empty($tanggal_lahir) || empty($nama_ayah) || empty($no_hp_wali) || empty($alamat) || empty($program_pilihan)) {
        $pesan_error = 'Mohon lengkapi semua kolom bertanda bintang (*) yang wajib diisi.';
    } else {
        try {
            // Generate nomor pendaftaran unik: PSB-DS-YYYYMMDD-XXXX
            $nomor_daftar = 'PSB-DS-' . date('Y') . sprintf('%04d', rand(100, 9999));

            $sql = "INSERT INTO tb_pendaftar 
                    (nomor_daftar, nama_lengkap, jenis_kelamin, tempat_lahir, tanggal_lahir, nisn, nik, nama_ayah, nama_ibu, no_hp_wali, alamat, program_pilihan, status) 
                    VALUES (:nomor, :nama, :jk, :tempat, :tgl, :nisn, :nik, :ayah, :ibu, :hp, :alamat, :program, 'Menunggu Verifikasi')";
            
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':nomor'   => $nomor_daftar,
                ':nama'    => $nama_lengkap,
                ':jk'      => $jenis_kelamin,
                ':tempat'  => $tempat_lahir,
                ':tgl'     => $tanggal_lahir,
                ':nisn'    => $nisn,
                ':nik'     => $nik,
                ':ayah'    => $nama_ayah,
                ':ibu'     => $nama_ibu,
                ':hp'      => $no_hp_wali,
                ':alamat'  => $alamat,
                ':program' => $program_pilihan
            ]);

            $sukses = true;
            $data_pendaftar = [
                'nomor_daftar'    => $nomor_daftar,
                'nama_lengkap'    => $nama_lengkap,
                'program_pilihan' => $program_pilihan,
                'no_hp_wali'      => $no_hp_wali,
                'tanggal_daftar'  => date('Y-m-d H:i:s')
            ];
        } catch (PDOException $e) {
            $pesan_error = 'Terjadi kesalahan sistem saat menyimpan data: ' . $e->getMessage();
        }
    }
}

require_once __DIR__ . '/includes/header.php';
?>

<div class="bg-slate-100 py-12">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

    <?php if ($sukses && $data_pendaftar): ?>
      <!-- NOTIFIKASI SUKSES PENDAFTARAN -->
      <div class="bg-white rounded-3xl p-8 border-2 border-emerald-500 shadow-xl space-y-6">
        <div class="text-center space-y-2">
          <div class="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3">
            <i data-lucide="check-circle" class="w-10 h-10"></i>
          </div>
          <h2 class="text-2xl font-bold text-emerald-950">Alhamdulillah! Pendaftaran Berhasil Dikirim</h2>
          <p class="text-slate-600 text-sm">Data calon santri telah tersimpan di sistem database Penerimaan Santri Baru (PSB) Darush Sholah.</p>
        </div>

        <div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 space-y-3">
          <div class="flex justify-between items-center border-b border-emerald-200/60 pb-3">
            <span class="text-xs text-slate-500 font-medium">Nomor Registrasi:</span>
            <span class="text-base font-extrabold text-emerald-900 bg-white px-3 py-1 rounded-lg border border-emerald-300 font-mono"><?= htmlspecialchars($data_pendaftar['nomor_daftar']) ?></span>
          </div>
          <div class="flex justify-between items-center border-b border-emerald-200/60 pb-3">
            <span class="text-xs text-slate-500 font-medium">Nama Calon Santri:</span>
            <span class="text-sm font-bold text-slate-800"><?= htmlspecialchars($data_pendaftar['nama_lengkap']) ?></span>
          </div>
          <div class="flex justify-between items-center border-b border-emerald-200/60 pb-3">
            <span class="text-xs text-slate-500 font-medium">Program Pilihan:</span>
            <span class="text-sm font-semibold text-emerald-800"><?= htmlspecialchars($data_pendaftar['program_pilihan']) ?></span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-xs text-slate-500 font-medium">Status Berkas:</span>
            <span class="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">Menunggu Verifikasi Panitia</span>
          </div>
        </div>

        <div class="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
          <p class="font-bold flex items-center gap-1.5"><i data-lucide="info" class="w-4 h-4 text-amber-700"></i> Petunjuk Selanjutnya:</p>
          <p>1. Simpan atau catat <strong>Nomor Registrasi</strong> di atas untuk konfirmasi kehadiran atau pengecekan berkas.</p>
          <p>2. Panitia PSB akan menghubungi nomor WhatsApp Wali Santri (<strong><?= htmlspecialchars($data_pendaftar['no_hp_wali']) ?></strong>) untuk jadwal wawancara santri dan tes baca Al-Qur'an.</p>
        </div>

        <div class="flex flex-wrap gap-3 justify-center pt-2">
          <button onclick="window.print()" class="bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow">
            <i data-lucide="printer" class="w-4 h-4"></i> Cetak Bukti Pendaftaran
          </button>
          <a href="https://wa.me/<?= preg_replace('/[^0-9]/', '', $pengaturan['whatsapp']) ?>?text=Assalamualaikum%20Panitia%20PSB%2C%20saya%20sudah%20mendaftar%20online%20dengan%20No%3A%20<?= urlencode($data_pendaftar['nomor_daftar']) ?>%20atas%20nama%20<?= urlencode($data_pendaftar['nama_lengkap']) ?>" target="_blank" class="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow">
            <i data-lucide="message-circle" class="w-4 h-4"></i> Konfirmasi ke WhatsApp Panitia
          </a>
          <a href="daftar.php" class="border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-medium px-5 py-3 rounded-xl">
            Daftar Santri Lainnya
          </a>
        </div>
      </div>

    <?php else: ?>
      <!-- FORMULIR PENDAFTARAN -->
      <div class="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl space-y-8">
        <div class="border-b border-slate-200 pb-6 text-center sm:text-left">
          <span class="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">Penerimaan Santri Baru Online</span>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-3">Formulir Pendaftaran Calon Santri</h1>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">Isi formulir biodata calon santri dengan data valid sesuai Kartu Keluarga (KK) dan Akta Kelahiran.</p>
        </div>

        <?php if ($pesan_error): ?>
          <div class="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm flex items-center gap-2">
            <i data-lucide="alert-circle" class="w-5 h-5 text-red-600 shrink-0"></i>
            <span><?= $pesan_error ?></span>
          </div>
        <?php endif; ?>

        <form method="POST" action="daftar.php" class="space-y-6">
          <!-- Bagian 1: Data Pribadi Santri -->
          <div class="space-y-4">
            <h3 class="text-base font-bold text-emerald-950 flex items-center gap-2 border-b border-slate-100 pb-2">
              <i data-lucide="user" class="w-4 h-4 text-emerald-700"></i> A. Biodata Calon Santri
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="sm:col-span-2">
                <label class="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap Santri *</label>
                <input type="text" name="nama_lengkap" required placeholder="Contoh: Muhammad Ali Rasyid" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm">
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Jenis Kelamin *</label>
                <select name="jenis_kelamin" required class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm bg-white">
                  <option value="">-- Pilih Jenis Kelamin --</option>
                  <option value="Laki-laki">Laki-laki (Santri Putra)</option>
                  <option value="Perempuan">Perempuan (Santri Putri)</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Program Pendidikan Pilihan *</label>
                <select name="program_pilihan" required class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm bg-white">
                  <option value="">-- Pilih Program --</option>
                  <?php foreach ($opsiProgram as $p): ?>
                    <option value="<?= htmlspecialchars($p['nama_program']) ?>"><?= htmlspecialchars($p['nama_program']) ?></option>
                  <?php endforeach; ?>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Tempat Lahir *</label>
                <input type="text" name="tempat_lahir" required placeholder="Contoh: Jember" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm">
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Tanggal Lahir *</label>
                <input type="date" name="tanggal_lahir" required class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm">
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">NISN (Nomor Induk Siswa Nasional)</label>
                <input type="text" name="nisn" placeholder="10 digit NISN jika ada" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm">
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">NIK (Nomor Induk Kependudukan)</label>
                <input type="text" name="nik" placeholder="16 digit NIK Santri" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm">
              </div>
            </div>
          </div>

          <!-- Bagian 2: Data Orang Tua / Wali -->
          <div class="space-y-4 pt-4">
            <h3 class="text-base font-bold text-emerald-950 flex items-center gap-2 border-b border-slate-100 pb-2">
              <i data-lucide="users" class="w-4 h-4 text-emerald-700"></i> B. Data Orang Tua / Wali
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Nama Ayah Kandung *</label>
                <input type="text" name="nama_ayah" required placeholder="Nama lengkap ayah" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm">
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Nama Ibu Kandung</label>
                <input type="text" name="nama_ibu" placeholder="Nama lengkap ibu" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm">
              </div>

              <div class="sm:col-span-2">
                <label class="block text-xs font-semibold text-slate-700 mb-1">Nomor WhatsApp Aktif Wali *</label>
                <input type="tel" name="no_hp_wali" required placeholder="Contoh: 081234567890 (Pastikan aktif WhatsApp untuk verifikasi)" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm">
              </div>

              <div class="sm:col-span-2">
                <label class="block text-xs font-semibold text-slate-700 mb-1">Alamat Lengkap Domisili *</label>
                <textarea name="alamat" rows="3" required placeholder="Jalan, RT/RW, Dusun, Desa/Kelurahan, Kecamatan, Kabupaten/Kota, Provinsi" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"></textarea>
              </div>
            </div>
          </div>

          <!-- Persetujuan & Tombol Submit -->
          <div class="pt-4 border-t border-slate-200">
            <div class="flex items-start gap-3 mb-6">
              <input type="checkbox" id="persetujuan" required class="mt-1 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500">
              <label for="persetujuan" class="text-xs text-slate-600 leading-relaxed">
                Saya menyatakan dengan sungguh-sungguh bahwa data yang diisikan adalah benar dan bersedia mematuhi seluruh tata tertib serta ketentuan Pondok Pesantren Darush Sholah.
              </label>
            </div>

            <button type="submit" class="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-base">
              <i data-lucide="send" class="w-5 h-5 text-amber-400"></i>
              Kirim Formulir Pendaftaran Sekarang
            </button>
          </div>
        </form>
      </div>
    <?php endif; ?>

  </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
