<?php
require_once __DIR__ . '/../config/koneksi.php';
$pengaturan = getPengaturan($pdo);
?>
  <!-- Footer Utama -->
  <footer class="bg-emerald-950 text-slate-300 pt-16 pb-8 border-t border-emerald-900" id="kontak">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <!-- Kolom 1: Profil Singkat -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-amber-500 text-emerald-950 flex items-center justify-center font-bold shadow">
              <i data-lucide="shield-check" class="w-6 h-6"></i>
            </div>
            <span class="font-bold text-lg text-white"><?= htmlspecialchars($pengaturan['nama_pesantren']) ?></span>
          </div>
          <p class="text-sm text-emerald-200/80 leading-relaxed">
            Membina generasi sholihin yang berakhlak mulia, hafidz Al-Qur'an, faqih fiddin, dan siap memimpin kemajuan bangsa.
          </p>
          <div class="flex space-x-3 pt-2">
            <a href="<?= htmlspecialchars($pengaturan['facebook']) ?>" target="_blank" class="w-9 h-9 rounded-full bg-emerald-900/80 hover:bg-amber-500 hover:text-emerald-950 flex items-center justify-center text-slate-300 transition">
              <i data-lucide="facebook" class="w-4 h-4"></i>
            </a>
            <a href="<?= htmlspecialchars($pengaturan['instagram']) ?>" target="_blank" class="w-9 h-9 rounded-full bg-emerald-900/80 hover:bg-amber-500 hover:text-emerald-950 flex items-center justify-center text-slate-300 transition">
              <i data-lucide="instagram" class="w-4 h-4"></i>
            </a>
            <a href="<?= htmlspecialchars($pengaturan['youtube']) ?>" target="_blank" class="w-9 h-9 rounded-full bg-emerald-900/80 hover:bg-amber-500 hover:text-emerald-950 flex items-center justify-center text-slate-300 transition">
              <i data-lucide="youtube" class="w-4 h-4"></i>
            </a>
          </div>
        </div>

        <!-- Kolom 2: Tautan Cepat -->
        <div>
          <h3 class="text-white font-bold text-base mb-4 border-l-4 border-amber-400 pl-3">Tautan Cepat</h3>
          <ul class="space-y-2.5 text-sm">
            <li><a href="index.php#beranda" class="hover:text-amber-400 transition flex items-center gap-1.5"><i data-lucide="chevron-right" class="w-3.5 h-3.5 text-amber-500"></i> Beranda</a></li>
            <li><a href="index.php#profil" class="hover:text-amber-400 transition flex items-center gap-1.5"><i data-lucide="chevron-right" class="w-3.5 h-3.5 text-amber-500"></i> Profil & Pengasuh</a></li>
            <li><a href="index.php#program" class="hover:text-amber-400 transition flex items-center gap-1.5"><i data-lucide="chevron-right" class="w-3.5 h-3.5 text-amber-500"></i> Program Unggulan</a></li>
            <li><a href="berita.php" class="hover:text-amber-400 transition flex items-center gap-1.5"><i data-lucide="chevron-right" class="w-3.5 h-3.5 text-amber-500"></i> Warta & Artikel</a></li>
            <li><a href="galeri.php" class="hover:text-amber-400 transition flex items-center gap-1.5"><i data-lucide="chevron-right" class="w-3.5 h-3.5 text-amber-500"></i> Galeri Dokumentasi</a></li>
            <li><a href="daftar.php" class="hover:text-amber-400 transition flex items-center gap-1.5 text-amber-300 font-semibold"><i data-lucide="chevron-right" class="w-3.5 h-3.5 text-amber-400"></i> Pendaftaran Santri Baru (PSB)</a></li>
          </ul>
        </div>

        <!-- Kolom 3: Kontak Resmi -->
        <div>
          <h3 class="text-white font-bold text-base mb-4 border-l-4 border-amber-400 pl-3">Sekretariat</h3>
          <ul class="space-y-3 text-sm text-emerald-100/80">
            <li class="flex items-start gap-2.5">
              <i data-lucide="map-pin" class="w-4 h-4 text-amber-400 shrink-0 mt-1"></i>
              <span><?= htmlspecialchars($pengaturan['alamat']) ?></span>
            </li>
            <li class="flex items-center gap-2.5">
              <i data-lucide="phone" class="w-4 h-4 text-amber-400 shrink-0"></i>
              <span>Telp: <?= htmlspecialchars($pengaturan['telepon']) ?></span>
            </li>
            <li class="flex items-center gap-2.5">
              <i data-lucide="message-circle" class="w-4 h-4 text-amber-400 shrink-0"></i>
              <span>WhatsApp: <?= htmlspecialchars($pengaturan['whatsapp']) ?></span>
            </li>
            <li class="flex items-center gap-2.5">
              <i data-lucide="mail" class="w-4 h-4 text-amber-400 shrink-0"></i>
              <span><?= htmlspecialchars($pengaturan['email']) ?></span>
            </li>
          </ul>
        </div>

        <!-- Kolom 4: PSB Info & Jam Layanan -->
        <div class="bg-emerald-900/60 p-5 rounded-2xl border border-emerald-800">
          <h3 class="text-white font-bold text-sm mb-2 flex items-center gap-2">
            <i data-lucide="calendar" class="w-4 h-4 text-amber-400"></i>
            Penerimaan Santri Baru
          </h3>
          <p class="text-xs text-emerald-200 mb-3">Tahun Ajaran <?= htmlspecialchars($pengaturan['tahun_ajaran_psb']) ?></p>
          <div class="inline-block bg-amber-400/20 text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-full mb-3 border border-amber-400/30">
            Status: Pendaftaran <?= htmlspecialchars($pengaturan['status_psb']) ?>
          </div>
          <p class="text-xs text-emerald-300/80 leading-relaxed mb-4">
            Layanan Kantor Sekretariat:<br>
            Setiap Hari: 08.00 - 16.00 WIB
          </p>
          <a href="daftar.php" class="block text-center w-full bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs py-2.5 rounded-xl transition">
            Isi Formulir Pendaftaran
          </a>
        </div>
      </div>

      <!-- Bottom Bar Copyright -->
      <div class="pt-8 border-t border-emerald-900/80 flex flex-col md:flex-row justify-between items-center text-xs text-emerald-400/70 gap-3">
        <p>&copy; <?= date('Y') ?> <?= htmlspecialchars($pengaturan['nama_pesantren']) ?>. Dikembangkan dengan PHP Native & MySQL.</p>
        <div class="flex items-center space-x-4">
          <a href="index.php" class="hover:text-white transition">Kebijakan Privasi</a>
          <span>•</span>
          <a href="admin/login.php" class="hover:text-amber-400 transition font-medium">Panel Admin</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Floating WhatsApp Action -->
  <a href="https://wa.me/<?= preg_replace('/[^0-9]/', '', $pengaturan['whatsapp']) ?>?text=Assalamualaikum%2C%20saya%20ingin%20menanyakan%20informasi%20Pondok%20Pesantren%20Darush%20Sholah" target="_blank" class="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl hover:scale-110 transition flex items-center gap-2 group" title="Chat WhatsApp Sekretariat">
    <i data-lucide="message-circle" class="w-6 h-6"></i>
    <span class="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-sm font-semibold pr-1">Chat WhatsApp</span>
  </a>

  <!-- Script Menu & Lucide -->
  <script>
    lucide.createIcons();
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (btn && menu) {
      btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
      });
    }
  </script>
</body>
</html>
