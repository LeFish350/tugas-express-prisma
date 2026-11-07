# Tugas Lanjutan Express.js + Prisma (SQLite)

API CRUD produk dengan **Express.js 5** dan **Prisma ORM 6.19.0**. Ini adalah kelanjutan dari proyek sebelumnya: data awal Buku dan Pulpen tetap digunakan, tetapi sekarang tersimpan permanen di database SQLite (bukan array JavaScript). SQLite adalah database sungguhan berbasis file, jadi tidak perlu menginstal server database tambahan.

## 1. Cara menjalankan di VS Code (Windows)

1. Extract ZIP; buka folder `tugas-express-prisma` dengan **File > Open Folder**.
2. Buka terminal VS Code di folder itu.
3. Pastikan Node.js dan npm sudah tersedia (`node -v` dan `npm -v`).
4. Jalankan perintah berikut satu per satu:

```bash
npm install
npm run db:setup
npm start
```

- `npm install`: memasang Express, Prisma, dan membuat Prisma Client.
- `npm run db:setup`: membuat tabel database (migration) lalu menambahkan data awal Buku dan Pulpen.
- `npm start`: menjalankan API di http://localhost:3000.
- Jika port 3000 masih dipakai proyek lama, hentikan server lama dengan **Ctrl+C** dulu. Jangan menjalankan dua server pada port yang sama.

**File database** setelah setup: `prisma/dev.db`. `.env` dalam ZIP sudah berisi `DATABASE_URL="file:./dev.db"`; saat GitHub upload, `.env` otomatis diabaikan. Jika cloning dari GitHub, salin `.env.example` menjadi `.env` terlebih dahulu (Windows PowerShell: `Copy-Item .env.example .env`).

## 2. Endpoint

| Method | URL | Fungsi | Respons sukses |
| --- | --- | --- | --- |
| GET | `/products` | Semua produk | 200 |
| GET | `/products/:id` | Produk berdasarkan ID | 200; 404 jika tidak ada |
| POST | `/products` | Membuat produk | 201 |
| PUT | `/products/:id` | Mengubah name dan price | 200; 404 jika tidak ada |
| DELETE | `/products/:id` | Menghapus berdasarkan ID | 200; 404 jika tidak ada |

Body JSON untuk POST dan PUT **sama**, tanpa ID. Contoh:

```json
{
  "name": "Penghapus",
  "price": 3000
}
```

Validasi: `name` wajib string yang tidak kosong; `price` wajib integer >= 0. Input tidak valid mengembalikan 400. ID invalid mengembalikan 400.

## 3. Bukti status HTTP di Thunder Client

Buka Thunder Client di VS Code dan buat request sesuai contoh di bawah (pastikan server `npm start` masih berjalan):

1. **GET** `http://localhost:3000/products` — 200 OK, berisi Buku dan Pulpen.
2. **GET** `http://localhost:3000/products/1` — 200 OK, berisi Buku.
3. **GET** `http://localhost:3000/products/999` — 404 Not Found, `Produk tidak ditemukan`.
4. **POST** `http://localhost:3000/products` — Body > JSON: `{"name":"Penghapus","price":3000}` — 201 Created, ID otomatis.
5. **POST gagal** — Body > JSON: `{"name":"","price":-1}` — 400 Bad Request.
6. **PUT** `http://localhost:3000/products/1` — Body > JSON: `{"name":"Buku Tulis","price":18000}` — 200 OK.
7. **DELETE** `http://localhost:3000/products/2` — 200 OK.
8. **GET** `http://localhost:3000/products` lagi — lihat data terkini sesudah perubahan.

**Penting:** Nomor ID POST bisa berbeda bila kamu pernah membuat/menghapus data. Gunakan ID nyata yang muncul pada respons POST. Semua perubahan persisten meskipun `npm start` dihentikan dan server dijalankan kembali.

## 4. Screenshot perubahan database (before & after)

Jalankan terminal VS Code **kedua** (server tetap hidup), kemudian:

```bash
npm run db:studio
```

Prisma Studio menampilkan tabel `Product` di browser. Ikuti langkah berikut:

1. Setelah `npm run db:setup`, buka tabel Product di Prisma Studio; ambil screenshot **sebelum**: Buku (15000), Pulpen (5000).
2. Di Thunder Client, lakukan POST Penghapus, PUT Buku menjadi Buku Tulis, dan DELETE Pulpen.
3. Refresh tampilan tabel Product pada Prisma Studio; ambil screenshot **sesudah**: Buku Tulis (18000), Penghapus (3000), dan Pulpen sudah tidak ada.
4. Simpan screenshot bersama hasil request di folder `BUKTI_PENGUJIAN/`.

Jika kamu sudah menguji dan database terlanjur berubah, screenshot awal tidak boleh direkayasa. Untuk mulai lagi dari kosong **hanya jika aman menghapus data latihan**: hentikan server dan Studio, hapus `prisma/dev.db`, jalankan `npm run db:setup`, kemudian ambil screenshot awal baru. Tindakan ini menghapus semua data latihan lokal.

## 5. Pengujian otomatis

```bash
npm test
```

Pengujian unit controller menggunakan fake Prisma dan tidak membutuhkan database maupun npm install untuk logika controller. Pengujian HTTP/database Prisma asli perlu dilakukan di komputermu setelah dependency terpasang; screenshot hasil itulah yang diserahkan.

## 6. Struktur

```text
tugas-express-prisma/
  prisma/
    schema.prisma
    seed.js
    migrations/.../migration.sql
  src/
    app.js
    db/prisma.js
    routes/productRoutes.js
    controllers/productController.js
  tests/controllers.test.js
  BUKTI_PENGUJIAN/README.md
  LAPORAN_TEMPLATE.docx
  PETUNJUK_GITHUB.md
  requests.http
  server.js
  package.json
  .env.example
```

## 7. Pengumpulan

- Repository GitHub yang benar-benar kamu buat dan publikasikan. Baca `PETUNJUK_GITHUB.md`.
- Isi identitas dan URL GitHub pada `LAPORAN_TEMPLATE.docx`.
- Lengkapi screenshot asli Thunder Client (berhasil, gagal validasi/404) dan Prisma Studio (before-after).
- Jangan unggah database `.db`, `node_modules`, atau `.env` ke repo.

Referensi resmi Prisma: https://www.prisma.io/docs/orm/v6/overview/databases/sqlite
