# Bukti pengujian (isi screenshot asli dari komputermu)

Ambil screenshot dari Thunder Client **setelah server berjalan**. Harus terlihat method, URL, HTTP status, dan response.

1. `01_GET_200.png` — GET /products, daftar produk awal.
2. `02_GET_ID_200.png` — GET /products/1.
3. `03_GET_404.png` — GET /products/999.
4. `04_POST_201.png` — POST /products dengan body `{"name":"Penghapus","price":3000}`.
5. `05_POST_400.png` — POST dengan data kosong/tidak valid.
6. `06_PUT_200.png` — PUT /products/1 dengan body `{"name":"Buku Tulis","price":18000}`.
7. `07_DELETE_200.png` — DELETE /products/2.
8. `08_DB_SEBELUM.png` — Prisma Studio sebelum operasi POST/PUT/DELETE.
9. `09_DB_SESUDAH.png` — Prisma Studio setelah operasi tersebut (refresh untuk melihat perubahan).

Jangan mengklaim sebuah skenario berhasil sebelum screenshot dan status aktual diperiksa. Jangan memakai screenshot tugas lama sebagai bukti database Prisma baru.
