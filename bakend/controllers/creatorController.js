const db = require('../config/db');
const bcrypt = require('bcrypt');

const registerCreator = async (req, res) => {
  const { first_name, last_name, email, phone, password, confirm_password, business_type } = req.body;

  if (password !== confirm_password) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      'INSERT INTO creators (first_name, last_name, email, phone, password, business_type) VALUES (?, ?, ?, ?, ?, ?)',
      [first_name, last_name, email, phone, hashedPassword, business_type],
      (err, result) => {
        if (err) return res.status(500).json({ message: 'Error registering creator', error: err });
        res.status(201).json({ message: 'Creator registered successfully' });
      }
    );
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

module.exports = { registerCreator };
