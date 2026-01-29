# 🚀 Panduan Deploy ke GitHub Pages

## Langkah 1: Buat Repository di GitHub

1. Buka https://github.com dan login ke akun Anda
2. Klik tombol **"+"** di pojok kanan atas, pilih **"New repository"**
3. Isi nama repository: `BelajarBersama_v2`
4. Pilih **Public** (wajib untuk GitHub Pages gratis)
5. **JANGAN** centang "Initialize this repository with a README"
6. Klik **"Create repository"**

## Langkah 2: Push Kode ke GitHub

Setelah repository dibuat, jalankan perintah berikut di terminal/PowerShell:

```powershell
# Ganti [username] dengan username GitHub Anda
git remote add origin https://github.com/[username]/BelajarBersama_v2.git
git branch -M main
git push -u origin main
```

## Langkah 3: Aktifkan GitHub Pages

1. Buka repository Anda di GitHub
2. Klik tab **"Settings"** (ikon gear)
3. Scroll ke bawah dan klik **"Pages"** di sidebar kiri
4. Di bagian **"Source"**:
   - Pilih branch: **main**
   - Pilih folder: **/ (root)**
5. Klik **"Save"**

## Langkah 4: Akses Website Anda

Setelah beberapa menit, website Anda akan aktif di:

```
https://[username].github.io/BelajarBersama_v2/
```

## 📝 Tips

- Setiap kali Anda melakukan perubahan, push ulang ke GitHub:
  ```powershell
  git add .
  git commit -m "Update aplikasi"
  git push
  ```

- GitHub Pages membutuhkan waktu 1-5 menit untuk memperbarui setelah push

## ❓ Troubleshooting

**Website tidak muncul?**
- Pastikan ada file `index.html` di root folder
- Cek apakah GitHub Pages sudah diaktifkan di Settings > Pages
- Tunggu beberapa menit karena kadang butuh waktu

**Error saat push?**
- Pastikan sudah login ke Git: `git config --global user.email "email@anda.com"`
- Pastikan URL remote benar: `git remote -v`

---

✅ Selamat! Aplikasi Anda sekarang bisa diakses oleh siapa saja di internet!
