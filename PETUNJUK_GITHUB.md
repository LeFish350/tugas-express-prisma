# Cara mengumpulkan tautan GitHub

1. Pastikan folder kode ini sudah dijalankan dan diuji di komputermu.
2. Masuk ke github.com, login, lalu pilih **New repository**.
3. Nama repositori contoh: `tugas-express-prisma`. Pilih Public jika dosen perlu bisa membuka tanpa akses khusus.
4. Jangan centang "Add README" saat membuat repository kosong.
5. Buka terminal VS Code **di folder tugas-express-prisma**, lalu jalankan:

```bash
git init
git add .
git commit -m "Tugas CRUD Express Prisma SQLite"
git branch -M main
git remote add origin https://github.com/USERNAME/tugas-express-prisma.git
git push -u origin main
```

Ganti `USERNAME` dengan username GitHub milikmu. Jika Git meminta login, selesaikan autentikasi sesuai petunjuk.

6. Copy URL repository yang benar-benar sudah terpublikasi dan masukkan di laporan.
7. Periksa bahwa `.env`, `node_modules/`, dan `prisma/dev.db` **tidak** ikut terunggah karena tercantum di `.gitignore`.
8. Screenshot perubahan database dilampirkan dalam folder `BUKTI_PENGUJIAN` setelah kamu membuatnya sendiri.

Jika belum pernah memakai Git command-line, kamu juga boleh mengunggah folder kode lewat **GitHub Desktop**, atau menu **Add file -> Upload files** di situs GitHub (jangan ikutkan file `.env`, file database, dan folder `node_modules`).
