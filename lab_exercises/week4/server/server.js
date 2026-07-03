const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    printTimestampedLog('Connected to SQLite database.');
    initializeDatabase();
  }
});

function printTimestampedLog(msg) {
  console.log(`[${new Date().toISOString()}] ${msg}`);
}

function initializeDatabase() {
  db.serialize(() => {
    // Create Users table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        displayName TEXT,
        photoURL TEXT
      )
    `, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        printTimestampedLog('Users table initialized.');
        seedCreators();
      }
    });
  });
}

// Seed creator accounts from mock assets
function seedCreators() {
  const creators = [
    { username: 'leafwork', displayName: 'LeafWork Studios', email: 'leafwork@lootyard.com', password: 'password123' },
    { username: 'neonpulse', displayName: 'NeonPulse', email: 'neonpulse@lootyard.com', password: 'password123' },
    { username: 'stonearch', displayName: 'StoneArch', email: 'stonearch@lootyard.com', password: 'password123' },
    { username: 'anya_3d', displayName: 'Anya 3D', email: 'anya_3d@lootyard.com', password: 'password123' },
    { username: 'bladesmth', displayName: 'BladeSmith', email: 'bladesmth@lootyard.com', password: 'password123' },
    { username: 'wizardry', displayName: 'Wizardry FX', email: 'wizardry@lootyard.com', password: 'password123' }
  ];

  db.serialize(() => {
    db.all('SELECT COUNT(*) as count FROM users', [], (err, rows) => {
      if (err) {
        console.error('Error checking user count:', err.message);
        return;
      }

      if (rows[0].count === 0) {
        printTimestampedLog('Seeding default creator accounts...');
        const stmt = db.prepare(`
          INSERT INTO users (username, email, password, displayName, photoURL)
          VALUES (?, ?, ?, ?, ?)
        `);

        creators.forEach(c => {
          const photoURL = `https://api.dicebear.com/8.x/thumbs/svg?seed=${encodeURIComponent(c.username)}&backgroundColor=ffd2aa,fff0df,ffe4c4&shapeColor=ff9f4a,c0714a`;
          stmt.run(c.username, c.email, c.password, c.displayName, photoURL);
        });

        stmt.finalize((err) => {
          if (err) {
            console.error('Error finalising seed statement:', err.message);
          } else {
            printTimestampedLog('Creator accounts seeded successfully.');
          }
        });
      } else {
        printTimestampedLog('Users table already contains data. Skipping seed.');
      }
    });
  });
}

// --- API ENDPOINTS ---

// Sign Up Route
app.post('/api/signup', (req, res) => {
  const { email, password, username, displayName } = req.body;

  // Validation
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  if (!username || username.trim().length < 3) {
    return res.status(400).json({ error: 'Username must be at least 3 characters long.' });
  }
  if (!password || password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
  }

  // Insert user
  const cleanUsername = username.trim().toLowerCase();
  const cleanEmail = email.trim().toLowerCase();
  const name = displayName ? displayName.trim() : username.trim();
  const photoURL = `https://api.dicebear.com/8.x/thumbs/svg?seed=${encodeURIComponent(cleanUsername)}&backgroundColor=ffd2aa,fff0df,ffe4c4&shapeColor=ff9f4a,c0714a`;

  db.run(
    `INSERT INTO users (username, email, password, displayName, photoURL) VALUES (?, ?, ?, ?, ?)`,
    [cleanUsername, cleanEmail, password, name, photoURL],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed: users.email')) {
          return res.status(400).json({ error: 'An account with this email already exists.' });
        }
        if (err.message.includes('UNIQUE constraint failed: users.username')) {
          return res.status(400).json({ error: 'This username is already taken.' });
        }
        return res.status(500).json({ error: 'Database error. Please try again.' });
      }

      // Return created user
      res.status(201).json({
        id: this.lastID,
        username: cleanUsername,
        email: cleanEmail,
        displayName: name,
        photoURL
      });
    }
  );
});

// Login Route
app.post('/api/login', (req, res) => {
  const { identifier, password } = req.body; // identifier can be username or email

  if (!identifier || !identifier.trim()) {
    return res.status(400).json({ error: 'Please enter your username or email.' });
  }
  if (!password || !password.trim()) {
    return res.status(400).json({ error: 'Please enter your password.' });
  }

  const cleanId = identifier.trim().toLowerCase();

  db.get(
    `SELECT * FROM users WHERE username = ? OR email = ?`,
    [cleanId, cleanId],
    (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Database error. Please try again.' });
      }

      if (!user) {
        return res.status(400).json({ error: 'No account found with that username or email.' });
      }

      // Simple password check (plain text for simplicity, matching requirements)
      if (user.password !== password) {
        return res.status(400).json({ error: 'Incorrect password. Please try again.' });
      }

      // Login success
      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      });
    }
  );
});

// Serve frontend in production (optional, good practice)
app.use(express.static(path.join(__dirname, '../public')));

app.listen(PORT, () => {
  console.log(`Server is running locally on http://localhost:${PORT}`);
});
