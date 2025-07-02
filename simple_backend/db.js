const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,       // contoh: db4free.net
    user: process.env.DB_USER,       // contoh: riyanto123
    password: process.env.DB_PASSWORD, // contoh: 12345678
    database: process.env.DB_NAME     // contoh: simple_db
});

connection.connect((err) => {
    if (err) {
        console.error('❌ Gagal konek ke database:', err.message);
    } else {
        console.log('✅ Berhasil konek ke database MySQL');
    }
});

module.exports = connection;
