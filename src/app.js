const express = require('express');
const path = require('path');
const prisma = require('./db/prisma');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json());
// Tugas 3: tampilkan halaman Manajemen Produk pada http://localhost:3000/.
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/products', productRoutes(prisma));

app.use((req, res) => res.status(404).json({ message: 'Endpoint tidak ditemukan' }));
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Format JSON tidak valid' });
  }
  console.error('Server error:', err);
  return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
});

module.exports = app;
