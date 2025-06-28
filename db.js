const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',        // default XAMPP/Laragon
  password: '',        // default XAMPP/Laragon biasanya kosong
  database: 'sea-catering',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();
