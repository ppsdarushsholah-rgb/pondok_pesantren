# Website Pondok Pesantren Darush Sholah (PHP Native & MySQL)

Sistem Informasi & Website Profil Resmi Pondok Pesantren dilengkapi:
- **Penerimaan Santri Baru (PSB) Online** dengan generate No. Registrasi otomatis
- **Panel Administrasi Lengkap** (Dashboard statistik, manajemen santri baru, kelola berita & artikel, kelola galeri foto, pengaturan profil & sambutan pengasuh)
- **Database MySQL Terstruktur** dengan prepared statement (PDO) aman dari SQL Injection
- **Frontend Responsif** menggunakan Tailwind CSS & Lucide Icons

---

## 🚀 Panduan Instalasi di XAMPP / Laragon (Komputer / Laptop)

### 1. Ekstrak Berkas
Pindahkan seluruh isi folder `php_project` ke dalam folder web server Anda:
- **XAMPP**: `C:/xampp/htdocs/pesantren/`
- **Laragon**: `C:/laragon/www/pesantren/`

### 2. Import Database MySQL
1. Buka browser dan kunjungi `http://localhost/phpmyadmin`
2. Buat database baru dengan nama: `pesantren_darushsholah`
3. Klik tab **Import**, pilih file `database.sql` yang ada di dalam folder proyek ini, lalu klik **Kirim / Import**.

### 3. Konfigurasi Database (Jika Diperlukan)
File koneksi ada di `config/koneksi.php`:
```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'pesantren_darushsholah');
```
*Jika menggunakan password di MySQL Anda, sesuaikan nilai `DB_PASS`.*

### 4. Buka Website di Browser
- **Halaman Pengunjung (Publik)**: `http://localhost/pesantren/index.php`
- **Pendaftaran Santri Baru (PSB)**: `http://localhost/pesantren/daftar.php`
- **Panel Administrator**: `http://localhost/pesantren/admin/login.php`

---

## 🔐 Akun Login Administrator Default

- **URL Login Admin**: `http://localhost/pesantren/admin/login.php`
- **Username**: `admin`
- **Password**: `admin123`

*(Password dapat diubah kapan saja di tabel `tb_admin` menggunakan `password_hash`)*

---

## 🌐 Panduan Upload ke Web Hosting (cPanel)

1. Kompres seluruh file di folder ini menjadi file `.zip`.
2. Buka **cPanel Hosting** -> **File Manager** -> Buka folder `public_html`.
3. Upload file zip tadi lalu **Ekstrak** di `public_html`.
4. Buka menu **MySQL Databases** di cPanel:
   - Buat Database baru (contoh: `u123_pesantren`)
   - Buat User database & password (contoh: `u123_admin` / `Rahasia123!`)
   - Hubungkan User ke Database dengan hak akses **ALL PRIVILEGES**.
5. Buka **phpMyAdmin** di cPanel, pilih database yang baru dibuat, lalu import file `database.sql`.
6. Edit file `config/koneksi.php` melalui File Manager cPanel, sesuaikan nama database, user, dan password.
7. Website siap diakses secara online melalui nama domain Anda!
