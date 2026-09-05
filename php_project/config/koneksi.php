<?php
/**
 * Konfigurasi Database MySQL & Helper System
 * Pondok Pesantren Darush Sholah
 */

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Konfigurasi Database (Sesuaikan dengan setting XAMPP / cPanel Anda)
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'pesantren_darushsholah');

try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
} catch (PDOException $e) {
    // Jika koneksi gagal, tampilkan pesan ramah pemula
    die("<div style='font-family:sans-serif;padding:30px;background:#fef2f2;border:1px solid #f87171;color:#991b1b;border-radius:12px;max-width:600px;margin:50px auto;'>
        <h3 style='margin-top:0'>⚠️ Gagal Terhubung ke Database MySQL</h3>
        <p>Pastikan MySQL server di <strong>XAMPP / Laragon / Hosting</strong> sudah AKTIF dan database <code>pesantren_darushsholah</code> sudah dibuat/diimport dari file <code>database.sql</code>.</p>
        <p><small>Error detail: " . htmlspecialchars($e->getMessage()) . "</small></p>
    </div>");
}

/**
 * Base URL helper
 */
function base_url($path = '') {
    // Otomatis mendeteksi root folder saat ini
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https://" : "http://";
    $host = $_SERVER['HTTP_HOST'];
    $script = dirname($_SERVER['SCRIPT_NAME']);
    // Normalisasi slash
    $base = rtrim($protocol . $host . str_replace('\\', '/', $script), '/');
    
    // Jika path menuju subfolder admin, buang admin jika dipanggil dari sub
    return $base . ($path ? '/' . ltrim($path, '/') : '');
}

/**
 * Ambil data pengaturan pesantren
 */
function getPengaturan($pdo) {
    $stmt = $pdo->query("SELECT * FROM tb_pengaturan WHERE id = 1 LIMIT 1");
    return $stmt->fetch();
}

/**
 * Sanitasi string input
 */
function clean($data) {
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}

/**
 * Format Tanggal Indonesia
 */
function tgl_indo($tanggal) {
    if (!$tanggal || $tanggal == '0000-00-00') return '-';
    $bulan = [
        1 => 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    $pecahkan = explode('-', date('Y-m-d', strtotime($tanggal)));
    return (int)$pecahkan[2] . ' ' . $bulan[(int)$pecahkan[1]] . ' ' . $pecahkan[0];
}

/**
 * Format Rupiah
 */
function format_rupiah($angka) {
    return 'Rp ' . number_format($angka, 0, ',', '.');
}
