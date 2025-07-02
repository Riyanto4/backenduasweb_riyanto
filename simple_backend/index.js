const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db'); // Pastikan db.js berisi konfigurasi MySQL yang benar
require('dotenv').config();


const app = express();

// GUNAKAN PORT DARI ENV (untuk Render) ATAU fallback ke 4000 secara lokal
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

// Route: cek server
app.get('/', (req, res) => {
    res.send('Server + MySQL sudah aktif');
});

// Route: ambil semua user
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Route: tambah user
app.post('/users', (req, res) => {
    const { name, email, tanggal_lahir, nomor_hp } = req.body;
    if (!name || !email || !tanggal_lahir || !nomor_hp) {
        return res.status(400).json({ message: 'Isi semua field!!!' });
    }

    const sql = 'INSERT INTO users (name, email, tanggal_lahir, nomor_hp) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, tanggal_lahir, nomor_hp], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, name, email, tanggal_lahir, nomor_hp });
    });
});

// Route: update user berdasarkan ID
app.put('/users/:id', (req, res) => {
    const { name, email, tanggal_lahir, nomor_hp } = req.body;
    const { id } = req.params;

    const sql = 'UPDATE users SET name = ?, email = ?, tanggal_lahir = ?, nomor_hp = ? WHERE id = ?';
    db.query(sql, [name, email, tanggal_lahir, nomor_hp, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User updated', result });
    });
});

// Route: hapus user
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User deleted', result });
    });
});

// Mulai server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
