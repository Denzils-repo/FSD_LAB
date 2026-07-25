import { useState, useEffect } from 'react';

export default function App() {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [students, setStudents] = useState([]);

  const fetchStudents = () => {
    fetch('http://localhost:5000/api/students')
      .then((res) => res.json())
      .then(setStudents);
  };

  useEffect(fetchStudents, []);

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

  return (
    <div>
      <h2>Simple Form using Express cors and sqlite</h2><br/>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required /><br/>
        <input value={course} onChange={(e) => setCourse(e.target.value)} placeholder="Course" required /><br/>
        <button type="submit">Submit</button>
      </form>

      <ul>
        {students.map((s) => (
          <li key={s.id}>{s.name} - {s.course}</li>
        ))}
      </ul>
    </div>
  );
}


