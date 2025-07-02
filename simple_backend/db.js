const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost', // Ganti dengan host dari database online (contoh: db4free.net)
    user: 'your_username',
    password: 'your_password',
    database: 'your_database'
});

db.connect((err) => {
    if (err) {
        console.error('Koneksi ke database gagal:', err.message);
    } else {
        console.log('Terhubung ke database');
    }
});

module.exports = db;
