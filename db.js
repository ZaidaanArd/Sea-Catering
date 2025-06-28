// ============================
//      MySQL Database Pool
// ============================

const mysql = require('mysql2');

// Konfigurasi pool koneksi ke database MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',           
  password: '',           
  database: 'sea-catering',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export pool dengan promise-support
module.exports = pool.promise();
