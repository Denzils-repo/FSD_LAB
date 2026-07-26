-- LootYard SQLite Database Schema

CREATE TABLE IF NOT EXISTS creators (
  username TEXT PRIMARY KEY,
  displayName TEXT NOT NULL,
  title TEXT,
  bio TEXT,
  avatar TEXT,
  email TEXT UNIQUE,
  password TEXT,
  rating REAL DEFAULT 4.8,
  totalReviews INTEGER DEFAULT 0,
  totalDownloads INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS assets (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  creator TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  tags TEXT, -- JSON array string
  thumbnailUrl TEXT NOT NULL,
  badge TEXT,
  status TEXT DEFAULT 'available',
  rating REAL DEFAULT 5.0,
  downloadsCount INTEGER DEFAULT 0,
  FOREIGN KEY (creator) REFERENCES creators(username)
);

CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  assetId TEXT NOT NULL,
  username TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  comment TEXT,
  createdAt TEXT DEFAULT '37d ago',
  FOREIGN KEY (assetId) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS commissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  creatorUsername TEXT NOT NULL,
  clientName TEXT NOT NULL,
  clientEmail TEXT NOT NULL,
  requirements TEXT NOT NULL,
  budget TEXT,
  deadline TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
