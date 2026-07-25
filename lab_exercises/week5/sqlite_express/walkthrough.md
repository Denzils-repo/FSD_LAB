# Detailed Explanation: SQLite + Express Backend & React Frontend

This guide breaks down every section of **`server.js`** and **`App.jsx`** to explain how the database, backend routes, and frontend state work together.

---

## 1. Backend Code Breakdown (`sqlite_express/server/server.js`)

```javascript
const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');
```
- **`express`**: Node.js web framework for creating HTTP routes and handling API requests.
- **`sqlite3`**: Database driver allowing Node.js to read and write to a local SQLite database file.
- **`cors`**: Middleware enabling Cross-Origin Resource Sharing so the React frontend (running on `localhost:5173`) can communicate with Express (running on `localhost:5000`).

```javascript
const app = express();
app.use(cors());
app.use(express.json());
```
- **`app = express()`**: Creates the web application instance.
- **`app.use(cors())`**: Tells Express to allow requests from external origins (our React app).
- **`app.use(express.json())`**: Parses incoming request bodies with `Content-Type: application/json` into `req.body`.

```javascript
const db = new sqlite3.Database('./database.db');
db.run('CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, course TEXT)');
```
- **`new sqlite3.Database('./database.db')`**: Opens connection to `database.db`. If the file doesn't exist, SQLite automatically creates it.
- **`db.run(...)`**: Executes an SQL query. Here it ensures a table named `students` exists with auto-incrementing `id`, `name`, and `course` text columns.

```javascript
app.get('/api/students', (req, res) => {
  db.all('SELECT * FROM students', (err, rows) => res.json(rows));
});
```
- **`app.get('/api/students')`**: Defines a GET route to retrieve student records.
- **`db.all(...)`**: Runs SQL `SELECT * FROM students` to fetch all rows and returns them as a JSON array (`res.json(rows)`).

```javascript
app.post('/api/students', (req, res) => {
  const { name, course } = req.body;
  db.run('INSERT INTO students (name, course) VALUES (?, ?)', [name, course], () => res.sendStatus(201));
});
```
- **`app.post('/api/students')`**: Defines a POST route to insert new data.
- **`const { name, course } = req.body`**: Extracts form values sent from frontend.
- **`db.run('INSERT...', [name, course])`**: Uses parameterized SQL queries (`?`) to prevent SQL injection vulnerabilities.
- **`res.sendStatus(201)`**: Responds with HTTP status `201 Created` upon successful insertion.

```javascript
app.listen(5000, () => console.log('Server running on port 5000'));
```
- Starts the web server on port `5000`.

---

## 2. Frontend Code Breakdown (`sqlite_express/demo/src/App.jsx`)

```jsx
import { useState, useEffect } from 'react';
```
- Imports React hooks:
  - **`useState`**: Stores component data (inputs and student list).
  - **`useEffect`**: Triggers side-effects (like fetching data when page loads).

```jsx
const [name, setName] = useState('');
const [course, setCourse] = useState('');
const [students, setStudents] = useState([]);
```
- Creates state variables:
  - `name` & `course`: Bind to input fields.
  - `students`: Holds array of enrolled student objects fetched from server.

```jsx
const fetchStudents = () => {
  fetch('http://localhost:5000/api/students')
    .then((res) => res.json())
    .then(setStudents);
};

useEffect(fetchStudents, []);
```
- **`fetchStudents()`**: Makes HTTP GET request to Express backend, converts response to JSON, and updates `students` state.
- **`useEffect(fetchStudents, [])`**: Passes empty dependency array `[]` so `fetchStudents` runs once when component mounts.

```jsx
const handleSubmit = (e) => {
  e.preventDefault();
  fetch('http://localhost:5000/api/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, course }),
  }).then(() => {
    alert('Submitted!');
    setName('');
    setCourse('');
    fetchStudents();
  });
};
```
- **`e.preventDefault()`**: Prevents standard HTML form reload behavior.
- **`fetch(..., { method: 'POST', ... })`**: Sends form input data formatted as JSON payload.
- **`.then(...)`**: Once database insertion finishes:
  1. Shows `alert('Submitted!')` popup.
  2. Clears input fields (`setName('')`, `setCourse('')`).
  3. Calls `fetchStudents()` to update UI list automatically.

```jsx
return (
  <div>
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input value={course} onChange={(e) => setCourse(e.target.value)} placeholder="Course" required />
      <button type="submit">Submit</button>
    </form>

    <ul>
      {students.map((s) => (
        <li key={s.id}>{s.name} - {s.course}</li>
      ))}
    </ul>
  </div>
);
```
- **`<form onSubmit={handleSubmit}>`**: Binds form submission to handler.
- **`<input value={...} onChange={...}>`**: Controlled input elements updating state on every keystroke.
- **`{students.map((s) => ...)}`**: Loops over `students` array and renders a `<li>` item for each student row.
