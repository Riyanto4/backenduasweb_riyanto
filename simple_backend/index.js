const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();
const PORT = 4000;

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

//Route: edit sesuai id
app.put('/users/:id', (req, res) => {
    const { name, email, tanggal_lahir, nomor_hp } = req.body;
    const { id } = req.params;

    //console.log('Edit data ID:', id, 'Body:', req.body);

    const sql = 'UPDATE users SET name = ?, email = ?, tanggal_lahir = ?, nomor_hp = ? WHERE id = ?';
    db.query(sql, [name, email, tanggal_lahir, nomor_hp, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User updated', result });
    });
});

//Route: hapus data
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User deleted', result });
    });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
