const express = require('express');
const router = express.Router();
const db = require('../database');

const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

// Get all users
router.get('/', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(rows);
  });
});

// Get single user
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM users WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(row);
  });
});

// Create user
router.post('/', (req, res) => {
  const { name, email, phone, company, street, city, zipcode, lat, lng } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email are required.' });
  if (!isValidEmail(email)) return res.status(400).json({ error: 'Invalid email format.' });

  const sql = `INSERT INTO users (name,email,phone,company,street,city,zipcode,lat,lng) VALUES (?,?,?,?,?,?,?,?,?)`;
  const params = [name,email,phone,company,street,city,zipcode,lat,lng];

  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'User created successfully', id: this.lastID });
  });
});

// Update user
router.put('/:id', (req, res) => {
  const { name, email, phone, company, street, city, zipcode, lat, lng } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email are required.' });
  if (!isValidEmail(email)) return res.status(400).json({ error: 'Invalid email format.' });

  const sql = `UPDATE users SET name=?, email=?, phone=?, company=?, street=?, city=?, zipcode=?, lat=?, lng=? WHERE id=?`;
  const params = [name,email,phone,company,street,city,zipcode,lat,lng,req.params.id];

  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'User updated successfully' });
  });
});

// Delete user
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM users WHERE id=?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  });
});

module.exports = router;
