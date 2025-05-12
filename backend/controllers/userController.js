
const db = require('../db/db');

exports.getAllUsers = (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.createUser = (req, res) => {
  const { name, age, email } = req.body;
  db.query(
    'INSERT INTO users (name, age, email) VALUES (?, ?, ?)',
    [name, age, email],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'User added', id: result.insertId });
    }
  );
};

exports.updateUser = (req, res) => {
  const { name, age, email } = req.body;
  const { id } = req.params;
  db.query(
    'UPDATE users SET name = ?, age = ?, email = ? WHERE id = ?',
    [name, age, email, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'User updated' });
    }
  );
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'User deleted' });
  });
};
