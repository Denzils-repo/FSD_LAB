import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, 'lootyard.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err);
  } else {
    console.log('Connected to SQLite database: lootyard.sqlite');
  }
});

// Helper for promise-based queries
const dbAll = (query, params = []) => new Promise((resolve, reject) => {
  db.all(query, params, (err, rows) => err ? reject(err) : resolve(rows));
});

const dbGet = (query, params = []) => new Promise((resolve, reject) => {
  db.get(query, params, (err, row) => err ? reject(err) : resolve(row));
});

const dbRun = (query, params = []) => new Promise((resolve, reject) => {
  db.run(query, params, function(err) { err ? reject(err) : resolve(this); });
});

// 1. READ ALL ASSETS
app.get('/api/assets', async (req, res) => {
  try {
    const { category, search, sort } = req.query;
    let query = 'SELECT * FROM assets WHERE 1=1';
    const params = [];

    if (category && category !== 'all') {
      query += ' AND category = ?';
      params.push(category);
    }

    if (search) {
      query += ' AND (LOWER(title) LIKE ? OR LOWER(description) LIKE ? OR LOWER(creator) LIKE ? OR LOWER(tags) LIKE ?)';
      const q = `%${search.toLowerCase().trim()}%`;
      params.push(q, q, q, q);
    }

    if (sort === 'popular') query += ' ORDER BY rating DESC';
    else if (sort === 'downloaded') query += ' ORDER BY downloadsCount DESC';
    else if (sort === 'newest') query += ' ORDER BY id DESC';
    else if (sort === 'oldest') query += ' ORDER BY id ASC';
    else query += ' ORDER BY id ASC';

    const rows = await dbAll(query, params);
    const assets = rows.map(r => ({
      ...r,
      tags: JSON.parse(r.tags || '[]')
    }));
    res.json(assets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. READ SINGLE ASSET
app.get('/api/assets/:id', async (req, res) => {
  try {
    const asset = await dbGet('SELECT * FROM assets WHERE id = ?', [req.params.id]);
    if (!asset) return res.status(404).json({ error: 'Asset not found' });
    asset.tags = JSON.parse(asset.tags || '[]');
    res.json(asset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. CREATE ASSET (Upload asset)
app.post('/api/assets', async (req, res) => {
  try {
    const { title, creator, category, description, tags, thumbnailUrl, badge } = req.body;
    const newId = `a_${Date.now()}`;
    const tagsJson = JSON.stringify(tags || []);
    const imgUrl = thumbnailUrl || '/lab_exercises/week2/assets/asset-sword.jpg';

    await dbRun(`
      INSERT INTO assets (id, title, creator, category, description, tags, thumbnailUrl, badge, status, rating, downloadsCount)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'available', 5.0, 1)
    `, [newId, title, creator || 'anonymous', category || 'props', description || '', tagsJson, imgUrl, badge || 'New']);

    const created = await dbGet('SELECT * FROM assets WHERE id = ?', [newId]);
    created.tags = JSON.parse(created.tags || '[]');
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. UPDATE ASSET (Edit Asset)
app.put('/api/assets/:id', async (req, res) => {
  try {
    const { title, category, description, tags } = req.body;
    const tagsJson = JSON.stringify(tags || []);
    await dbRun(`
      UPDATE assets
      SET title = COALESCE(?, title),
          category = COALESCE(?, category),
          description = COALESCE(?, description),
          tags = COALESCE(?, tags)
      WHERE id = ?
    `, [title, category, description, tagsJson, req.params.id]);

    const updated = await dbGet('SELECT * FROM assets WHERE id = ?', [req.params.id]);
    if (updated) updated.tags = JSON.parse(updated.tags || '[]');
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. DELETE ASSET (Delete Asset)
app.delete('/api/assets/:id', async (req, res) => {
  try {
    await dbRun('DELETE FROM assets WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: `Asset ${req.params.id} deleted successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ CREATORS
app.get('/api/creators', async (req, res) => {
  try {
    const creators = await dbAll('SELECT username, displayName, title, bio, avatar, rating, totalReviews, totalDownloads FROM creators');
    res.json(creators);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ SINGLE CREATOR
app.get('/api/creators/:username', async (req, res) => {
  try {
    const creator = await dbGet('SELECT username, displayName, title, bio, avatar, rating, totalReviews, totalDownloads FROM creators WHERE username = ?', [req.params.username]);
    if (!creator) return res.status(404).json({ error: 'Creator not found' });
    res.json(creator);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE CREATOR PROFILE (CRUD UPDATE for Creator)
app.put('/api/creators/:username', async (req, res) => {
  try {
    const { displayName, title, bio } = req.body;
    await dbRun(`
      UPDATE creators
      SET displayName = COALESCE(?, displayName),
          title = COALESCE(?, title),
          bio = COALESCE(?, bio)
      WHERE username = ?
    `, [displayName, title, bio, req.params.username]);

    const updated = await dbGet('SELECT username, displayName, title, bio, avatar, rating, totalReviews, totalDownloads FROM creators WHERE username = ?', [req.params.username]);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SQLITE USER AUTH: SIGNUP
app.post('/api/signup', async (req, res) => {
  try {
    const { username, email, password, displayName } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email and password are required' });
    }

    const cleanUsername = username.toLowerCase().trim().replace(/[^a-z0-9_]/g, '');
    const avatar = `https://api.dicebear.com/8.x/thumbs/svg?seed=${encodeURIComponent(cleanUsername)}&backgroundColor=ffd2aa,fff0df,ffe4c4&shapeColor=ff9f4a,c0714a`;

    await dbRun(`
      INSERT INTO creators (username, displayName, title, bio, avatar, email, password, rating, totalReviews, totalDownloads)
      VALUES (?, ?, '3D Artist', 'Independent game developer & asset creator on LootYard.', ?, ?, ?, 5.0, 0, 0)
    `, [cleanUsername, displayName || username, avatar, email, password]);

    const user = await dbGet('SELECT username, displayName, title, bio, avatar, email FROM creators WHERE username = ?', [cleanUsername]);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message.includes('UNIQUE') ? 'Username or Email already registered' : err.message });
  }
});

// SQLITE USER AUTH: LOGIN (default password: pass123)
app.post('/api/login', async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    if (!emailOrUsername || !password) {
      return res.status(400).json({ error: 'Email/Username and password are required' });
    }

    const queryTarget = emailOrUsername.toLowerCase().trim();
    const user = await dbGet(
      'SELECT username, displayName, title, bio, avatar, email FROM creators WHERE (LOWER(email) = ? OR LOWER(username) = ?) AND password = ?',
      [queryTarget, queryTarget, password]
    );

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials. Default password is pass123.' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ REVIEWS FOR ASSET
app.get('/api/reviews/:assetId', async (req, res) => {
  try {
    const reviews = await dbAll('SELECT * FROM reviews WHERE assetId = ?', [req.params.assetId]);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`LootYard SQLite REST API Server running at http://localhost:${PORT}`);
});
