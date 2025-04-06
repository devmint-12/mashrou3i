const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
  const { first_name, last_name, email, phone, password, confirm_password } = req.body;

  if (!first_name || !last_name || !email || !phone || !password || !confirm_password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (password !== confirm_password) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `INSERT INTO users (first_name, last_name, email, phone, password) VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [first_name, last_name, email, phone, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ message: "Email already registered." });
        }
        console.error(err);
        return res.status(500).json({ message: "Server error." });
      }

      res.status(201).json({ message: "User registered successfully." });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong." });
  }
};
