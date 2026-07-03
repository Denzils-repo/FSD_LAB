# LootYard Week 4 - Local Express & SQLite Authentication

This directory contains a fully functional, self-contained version of LootYard running on a local Node.js + Express backend with an SQLite database. It has been disconnected from Firebase to allow fully functional local signups and logins.

## Directory Structure

- `public/`: The frontend application files (HTML, CSS, JS, assets, models, and mock asset images).
- `server/`: The Express.js backend application.
  - `server.js`: Express routing and SQLite database interface.
  - `database.sqlite`: The SQLite database.
  - `package.json`: Dependencies (`express`, `sqlite3`, `cors`).

## Setup & Running Locally

### 1. Start the Backend Server
1. Open a terminal and navigate to the server folder:
   ```bash
   cd lab_exercises/week4/server
   ```
2. Run the start script:
   ```bash
   npm start
   ```
3. The server will start running locally at: **http://localhost:5000**
4. On startup, the database is initialized and pre-seeded with default creator accounts.

### 2. Run the Frontend
Since the server serves the `public/` directory statically on port `5000`, you can access the full site directly in your web browser at:
👉 **http://localhost:5000**

---

## Seeded Creator Accounts

Use any of these seeded creator accounts to test logging in:

| Username | Email | Password | Display Name |
|---|---|---|---|
| `leafwork` | `leafwork@lootyard.com` | `password123` | LeafWork Studios |
| `neonpulse` | `neonpulse@lootyard.com` | `password123` | NeonPulse |
| `stonearch` | `stonearch@lootyard.com` | `password123` | StoneArch |
| `anya_3d` | `anya_3d@lootyard.com` | `password123` | Anya 3D |
| `bladesmth` | `bladesmth@lootyard.com` | `password123` | BladeSmith |
| `wizardry` | `wizardry@lootyard.com` | `password123` | Wizardry FX |

---

## Edge Case Form Testing

The login and signup modals include front-end and back-end checks for:
- Missing username or password.
- Missing email or display name during registration.
- Passwords shorter than 6 characters.
- Duplicate email/username registration.
- Incorrect credentials (wrong password or non-existent username/email).
