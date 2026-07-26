import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MOCK_ASSETS, MOCK_REVIEWS, MOCK_CREATORS } from '../src/data/mockAssets.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'lootyard.sqlite');
const schemaPath = path.join(__dirname, 'schema.sql');

if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
  console.log('Removed existing database file for fresh seed.');
}

const db = new sqlite3.Database(dbPath);

const schema = fs.readFileSync(schemaPath, 'utf8');

db.serialize(() => {
  // Execute schema
  db.exec(schema, (err) => {
    if (err) {
      console.error('Error executing schema:', err);
      process.exit(1);
    }
    console.log('Schema executed successfully.');
  });

  // Consolidate all distinct creators from MOCK_CREATORS and MOCK_ASSETS
  const creatorsMap = {};

  MOCK_CREATORS.forEach(c => {
    creatorsMap[c.name] = {
      username: c.name,
      displayName: c.displayName || c.name,
      title: c.role || '3D Character Artist',
      bio: c.bio || 'Crafting detailed and engine-ready game assets for indie developers.',
      avatar: c.avatar || `https://api.dicebear.com/8.x/thumbs/svg?seed=${encodeURIComponent(c.name)}&backgroundColor=ffd2aa,fff0df,ffe4c4&shapeColor=ff9f4a,c0714a`,
      email: `${c.name}@lootyard.io`,
      password: 'pass123',
      rating: c.rating || 4.8,
      totalReviews: 12,
      totalDownloads: 4800,
    };
  });

  MOCK_ASSETS.forEach(a => {
    const u = a.creator || 'leafwork';
    if (!creatorsMap[u]) {
      creatorsMap[u] = {
        username: u,
        displayName: `@${u}`,
        title: `${a.category} Specialist`,
        bio: `Crafting high-quality ${a.category} and stylized 3D assets on LootYard.`,
        avatar: `https://api.dicebear.com/8.x/thumbs/svg?seed=${encodeURIComponent(u)}&backgroundColor=ffd2aa,fff0df,ffe4c4&shapeColor=ff9f4a,c0714a`,
        email: `${u}@lootyard.io`,
        password: 'pass123',
        rating: a.rating || 5.0,
        totalReviews: 8,
        totalDownloads: 1200,
      };
    }
  });

  const allCreators = Object.values(creatorsMap);

  // Seed Creators with Email & Password ('pass123')
  const stmtCreator = db.prepare(`
    INSERT INTO creators (username, displayName, title, bio, avatar, email, password, rating, totalReviews, totalDownloads)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  allCreators.forEach(c => {
    stmtCreator.run(
      c.username,
      c.displayName,
      c.title,
      c.bio,
      c.avatar,
      c.email,
      c.password,
      c.rating,
      c.totalReviews,
      c.totalDownloads
    );
  });
  stmtCreator.finalize();
  console.log(`Seeded ${allCreators.length} creators with 'pass123' credentials.`);

  // Seed Assets
  const stmtAsset = db.prepare(`
    INSERT INTO assets (id, title, creator, category, description, tags, thumbnailUrl, badge, status, rating, downloadsCount)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  MOCK_ASSETS.forEach((a, i) => {
    stmtAsset.run(
      a.id,
      a.title,
      a.creator,
      a.category,
      a.description,
      JSON.stringify(a.tags || []),
      a.thumbnailUrl,
      a.badge || null,
      a.status || 'available',
      a.rating || 5.0,
      a.downloadsCount || (i * 37) % 800 + 200
    );
  });
  stmtAsset.finalize();
  console.log(`Seeded ${MOCK_ASSETS.length} assets.`);

  // Seed Reviews
  const stmtReview = db.prepare(`
    INSERT INTO reviews (assetId, username, rating, comment, createdAt)
    VALUES (?, ?, ?, ?, ?)
  `);

  Object.entries(MOCK_REVIEWS || {}).forEach(([assetId, revs]) => {
    revs.forEach(r => {
      stmtReview.run(assetId, r.username, r.rating, r.comment, r.createdAt || '37d ago');
    });
  });

  stmtReview.run('a1', 'cyber_dev', 5, 'Highly detailed emission maps! The neon details look killer.', '37d ago');
  stmtReview.run('a1', 'mercury', 5, 'Mixamo rigging retargeting works beautifully.', '40d ago');
  stmtReview.run('a4', 'cyber_dev', 5, 'Fully rigged and modular armor pieces.', '37d ago');
  stmtReview.run('a4', 'mercury', 5, 'Looks killer in Unreal Engine 5!', '40d ago');

  stmtReview.finalize();
  console.log('Seeded reviews.');
});

db.close(() => {
  console.log('Database seeding complete: lootyard.sqlite');
});
