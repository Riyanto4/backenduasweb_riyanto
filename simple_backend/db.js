const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',        // ganti sesuai konfigurasi
    password: '',        // ganti sesuai konfigurasi
    database: 'simple_db' // pastikan DB ini sudah dibuat
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL ✅');
});

module.exports = connection;