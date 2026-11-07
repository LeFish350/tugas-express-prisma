# Bukti Pengujian CRUD Prisma

Folder ini berisi dokumentasi hasil pengujian REST API menggunakan **Express.js, Prisma ORM, SQLite, dan Thunder Client**.

## Hasil Pengujian

| File | Keterangan | Status |
|---|---|---|
| 1.png | GET - Menampilkan seluruh produk | 200 OK |
| 2.png | POST - Menambahkan produk baru | 201 Created |
| 3.png | Database setelah POST (produk berhasil ditambahkan) | Berhasil |
| 4.png | PUT - Mengubah data produk | 200 OK |
| 5.png | Database setelah PUT (data berhasil diperbarui) | Berhasil |
| 6.png | DELETE - Menghapus produk | 200 OK |
| 7.png | Database setelah DELETE (produk berhasil dihapus) | Berhasil |
| 8.png | GET - Produk tidak ditemukan | 404 Not Found |
| 9.png | POST - Validasi input tidak valid | 400 Bad Request |

> **Catatan:** Sesuaikan nomor file dengan isi screenshot yang sebenarnya.

## Dokumentasi Perubahan Database

### 1. POST - Menambahkan Produk

Produk baru ditambahkan dengan data:
- **Nama:** Penghapus
- **Harga:** 3000
- **ID:** 3

Hasil: Produk berhasil ditambahkan ke database dengan status **201 Created**.

### 2. PUT - Memperbarui Produk

Data produk dengan ID 3 diperbarui:
- **Nama sebelumnya:** Penghapus
- **Nama baru:** Penghapus Putih
- **Harga sebelumnya:** 3000
- **Harga baru:** 4000

Hasil: Data berhasil diperbarui dengan status **200 OK**.

### 3. DELETE - Menghapus Produk

Produk dengan ID 3 dihapus dari database.

Hasil: Produk berhasil dihapus dengan status **200 OK**.

### 4. Pengujian Error

- **404 Not Found:** Terjadi ketika ID produk tidak ditemukan.
- **400 Bad Request:** Terjadi ketika input tidak valid, seperti nama kosong dan harga negatif.

## Kesimpulan

Berdasarkan hasil pengujian, seluruh operasi CRUD (Create, Read, Update, Delete) pada REST API menggunakan Express.js dan Prisma ORM berhasil dijalankan.

Perubahan data telah diverifikasi melalui Prisma Studio, sedangkan pengujian endpoint dilakukan menggunakan Thunder Client.

API juga berhasil menangani kesalahan berupa data tidak ditemukan dan input yang tidak valid.
