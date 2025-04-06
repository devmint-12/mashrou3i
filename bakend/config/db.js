const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
  host: '193.203.168.154', // أو استخدم IP
  user: 'u200369391_mashru3i',
  password: 'DevL00pMint123$$$',
  database: 'u200369391_mashru3i',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

module.exports = db;
