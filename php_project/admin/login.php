<?php
require_once __DIR__ . '/../config/koneksi.php';

$error = '';

// Jika sudah login, langsung ke dashboard admin
if (isset($_SESSION['admin_id'])) {
    header("Location: index.php");
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = clean($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if (empty($username) || empty($password)) {
        $error = 'Username dan Password wajib diisi!';
    } else {
        $stmt = $pdo->prepare("SELECT * FROM tb_admin WHERE username = :username LIMIT 1");
        $stmt->execute([':username' => $username]);
        $admin = $stmt->fetch();

        // Verifikasi password hash atau fallback plain admin123 jika baru import
        if ($admin && (password_verify($password, $admin['password']) || $password === 'admin123')) {
            $_SESSION['admin_id'] = $admin['id'];
            $_SESSION['admin_username'] = $admin['username'];
            $_SESSION['admin_nama'] = $admin['nama_lengkap'];
            $_SESSION['admin_level'] = $admin['level'];
            
            header("Location: index.php");
            exit;
        } else {
            $error = 'Username atau Password salah! Periksa kembali data login Anda.';
        }
    }
}

$pengaturan = getPengaturan($pdo);
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login Administrator | <?= htmlspecialchars($pengaturan['nama_pesantren']) ?></title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
  </style>
</head>
<body class="bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 min-h-screen flex items-center justify-center p-4">

  <div class="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-800/40">
    <!-- Header Box -->
    <div class="bg-emerald-900 p-8 text-center text-white relative">
      <div class="w-16 h-16 bg-amber-400 text-emerald-950 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
        <i data-lucide="shield-check" class="w-9 h-9"></i>
      </div>
      <h1 class="text-xl font-bold">PANEL ADMINISTRATOR</h1>
      <p class="text-xs text-emerald-200 mt-1"><?= htmlspecialchars($pengaturan['nama_pesantren']) ?></p>
    </div>

    <!-- Body Form -->
    <div class="p-8 space-y-6">
      <?php if ($error): ?>
        <div class="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
          <i data-lucide="alert-circle" class="w-4 h-4 shrink-0 text-red-500"></i>
          <span><?= htmlspecialchars($error) ?></span>
        </div>
      <?php endif; ?>

      <form method="POST" action="login.php" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Username Admin</label>
          <div class="relative">
            <i data-lucide="user" class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"></i>
            <input type="text" name="username" required placeholder="Masukkan username" value="admin" class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Password</label>
          <div class="relative">
            <i data-lucide="lock" class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"></i>
            <input type="password" name="password" required placeholder="Masukkan password" value="admin123" class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
          </div>
        </div>

        <div class="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900">
          <strong>Default Login:</strong><br>
          Username: <code class="bg-amber-100 px-1 py-0.5 rounded font-mono">admin</code> | Password: <code class="bg-amber-100 px-1 py-0.5 rounded font-mono">admin123</code>
        </div>

        <button type="submit" class="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 text-sm">
          <i data-lucide="log-in" class="w-4 h-4 text-amber-400"></i>
          Masuk ke Dashboard
        </button>
      </form>

      <div class="text-center pt-2">
        <a href="../index.php" class="text-xs text-slate-500 hover:text-emerald-700 font-medium inline-flex items-center gap-1">
          <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> Kembali ke Website Utama
        </a>
      </div>
    </div>
  </div>

  <script>
    lucide.createIcons();
  </script>
</body>
</html>
