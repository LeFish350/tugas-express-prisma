# Tugas 3 — Manajemen Produk (Frontend + Express + Prisma)

Paket ini **ditambahkan di atas repository `tugas-express-prisma` yang sudah ada**, bukan proyek baru. Endpoint backend GET/POST/PUT/DELETE dan database Prisma tidak diubah. Gunakan branch **`tugas-3`** yang dibuat dari `main` menurut instruksi dosen.

## Yang dibangun

- Halaman `http://localhost:3000/` menampilkan produk berupa kartu (nama, ID, harga Rp, Edit, Hapus).
- Pencarian real-time berdasarkan nama produk (tanpa mengubah database).
- Pop-up Tambah Produk → `POST /products` (201).
- Pop-up Edit Produk → `PUT /products/:id` (200).
- Pop-up Hapus Produk dengan konfirmasi → `DELETE /products/:id` (200).
- Pesan ketika tidak ada produk, kegagalan server, atau validasi nama/harga.
- Tetap menggunakan SQLite + Prisma; data ditampilkan sesuai database aslinya, tidak hard-code contoh lima produk di slide.

## Cara paling mudah — Install bertahap sesuai commit atomic

**Pastikan terminal berada pada root repository `tugas-express-prisma`** dan gunakan PowerShell di VS Code. Jika belum ada branch, jalankan:

```powershell
git fetch origin
git switch main
git pull --ff-only origin main
git switch -c tugas-3
```

Ekstrak ZIP ini sekali, contohnya ke folder `Downloads\TUGAS3_FRONTEND_ATOMIC` dan salin **file `pasang_tahap.js`** atau jalankan lewat path lengkap.

Dari terminal root repository, jalankan tahap satu per satu (script hanya menyalin file sesuai tahap; **tidak** melakukan commit, push, atau menghapus file lain):

```powershell
node "$HOME\Downloads\TUGAS3_FRONTEND_ATOMIC\pasang_tahap.js" 1
git add src/app.js public/index.html public/styles.css
git commit -m "feat(tugas-3): add product management page"

node "$HOME\Downloads\TUGAS3_FRONTEND_ATOMIC\pasang_tahap.js" 2
git add public/index.html public/js/api.js public/js/format.mjs public/js/products.js
git commit -m "feat(tugas-3): display and search products"

node "$HOME\Downloads\TUGAS3_FRONTEND_ATOMIC\pasang_tahap.js" 3
git add public/index.html public/js/dialogs.js public/js/create.js
git commit -m "feat(tugas-3): add create product modal"

node "$HOME\Downloads\TUGAS3_FRONTEND_ATOMIC\pasang_tahap.js" 4
git add public/index.html public/js/edit.js
git commit -m "feat(tugas-3): add edit product modal"

node "$HOME\Downloads\TUGAS3_FRONTEND_ATOMIC\pasang_tahap.js" 5
git add public/index.html public/js/delete.js
git commit -m "feat(tugas-3): add delete confirmation modal"

node "$HOME\Downloads\TUGAS3_FRONTEND_ATOMIC\pasang_tahap.js" 6
git add tests/frontend.test.js TUGAS_3_README.md TUGAS_3_PR_TEMPLATE.md
git commit -m "test(tugas-3): add frontend validation tests and docs"
```

> **Penting:** `pasang_tahap.js` memastikan branch `tugas-3` dan working tree bersih sebelum memasang tahap. Jangan jalankan seluruh tahap sekaligus sebelum commit; setiap tahap untuk satu commit yang fokus. Jika folder ekstraksimu berbeda, sesuaikan alamat path dalam perintah.

## Jalankan dan uji

Karena kamu sebelumnya sudah memasang dependency di komputer, dari root proyek cukup:

```powershell
npm install
# hanya kalau belum ada file .env:
Copy-Item .env.example .env
npm run db:setup
npm test
npm start
```

**Jika database sudah berisi data yang ingin dipertahankan, jangan ulangi `npm run db:setup` tanpa perlu.** `db:setup` menjalankan seed yang dapat memperbarui data awal. Jalankan `npm start` saja setelah dependency dan DB sudah siap.

Buka `http://localhost:3000/` (halaman utama). Endpoint lama tetap ada: `http://localhost:3000/products`.

## Bukti pengujian untuk PR

Siapkan screenshot asli: (1) halaman awal berisi kartu, (2) pencarian, (3) pop-up Tambah sebelum dan setelah simpan, (4) pop-up Edit sebelum dan setelah simpan, (5) pop-up Hapus sebelum dan setelah konfirmasi, (6) Prisma Studio sebelum dan sesudah CRUD, (7) hasil `npm test`. Jangan menyatakan sukses sebelum mencoba semua fungsi di komputermu.

Upload evidence ke folder `Bukti Pengujian/tugas-3/` pada branch `tugas-3` dan buat commit terpisah:

```powershell
git add "Bukti Pengujian/tugas-3"
git commit -m "docs(tugas-3): add UI testing evidence"
```

Setelah semua commit dan bukti siap:

```powershell
git push -u origin tugas-3
```

Di GitHub: **Pull requests → New pull request → base: `main`, compare: `tugas-3`**; judul: `[Tugas 3] Halaman manajemen produk dan pop-up CRUD`. Isi deskripsi memakai `TUGAS_3_PR_TEMPLATE.md`. Klik **Create pull request**. Sesuai instruksi dosen, jika sudah siap pilih **Rebase and merge**. Salin URL PR yang benar (contoh format `https://github.com/LeFish350/tugas-express-prisma/pull/1`) ke Google Form tugas.

## Struktur tambahan

```
public/
  index.html
  styles.css
  js/
    api.js
    format.mjs
    products.js
    dialogs.js
    create.js
    edit.js
    delete.js
tests/frontend.test.js
TUGAS_3_README.md
TUGAS_3_PR_TEMPLATE.md
```

Semua input produk dari API ditampilkan dengan `textContent` untuk menghindari injeksi HTML. Validasi input frontend dan backend sama-sama dilakukan: nama tidak kosong dan harga bilangan bulat non-negatif.
