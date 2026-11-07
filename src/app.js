const express = require('express');
const app = express();
app.use(express.json());
app.use((req, res) => res.status(404).json({ message: 'Endpoint tidak ditemukan' }));
module.exports = app;
