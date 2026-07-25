const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./database.db');
db.run('CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, course TEXT)');

app.get('/api/students', (req, res) => {
  db.all('SELECT * FROM students', (err, rows) => res.json(rows));
});

app.post('/api/students', (req, res) => {
  const { name, course } = req.body;
  db.run('INSERT INTO students (name, course) VALUES (?, ?)', [name, course], () => res.sendStatus(201));
});

app.listen(5000, () => console.log('Server running on port 5000'));

