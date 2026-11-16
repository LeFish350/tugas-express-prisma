## Ringkasan Perubahan

- Menambahkan halaman Manajemen Produk sesuai referensi Tugas 3.
- Menampilkan daftar produk dari GET `/products` dalam kartu dan menyediakan pencarian berdasarkan nama.
- Menambahkan pop-up Tambah, Edit, dan Hapus yang memanggil API Express + Prisma yang sudah ada.
- Menangani validasi, pesan keberhasilan, dan kesalahan API.

## Bukti Pengujian

> Ganti hasil aktual dan link screenshot setelah benar-benar diuji. Jangan mengklaim sukses sebelum diuji di komputer sendiri.

| Skenario | Hasil yang Diharapkan | Hasil Aktual |
|---|---|---|
| Membuka `http://localhost:3000/` | Kartu produk tampil dari database | *(isi setelah pengujian)* |
| Mencari nama produk | Daftar difilter sesuai kata kunci | *(isi setelah pengujian)* |
| Tambah produk valid | Pop-up tertutup, produk muncul dan tersimpan | *(isi setelah pengujian)* |
| Tambah produk tidak valid | Validasi ditampilkan; data tidak disimpan | *(isi setelah pengujian)* |
| Edit produk | Nama dan harga berubah di halaman dan Prisma Studio | *(isi setelah pengujian)* |
| Batal hapus | Produk tetap ada | *(isi setelah pengujian)* |
| Konfirmasi hapus | Produk terhapus di halaman dan Prisma Studio | *(isi setelah pengujian)* |
| Menjalankan `npm test` | Semua pengujian lulus | *(isi hasil terminal)* |

### Screenshot / evidence

- [ ] Halaman utama dan pencarian
- [ ] Tambah produk (popup + sesudah)
- [ ] Edit produk (popup + sesudah)
- [ ] Hapus produk (popup + sesudah)
- [ ] Prisma Studio sebelum dan sesudah
- [ ] Hasil `npm test`

> Sertakan link gambar Markdown di sini, misalnya `![Daftar produk](Bukti%20Pengujian/tugas-3/01-halaman-utama.png)` apabila path tersebut sesuai dengan letak file di GitHub.
