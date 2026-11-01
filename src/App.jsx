import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState(() => {
    return JSON.parse(localStorage.getItem('students')) || [];
  });

  const [name, setName] = useState('');
  const [roll, setRoll] = useState('');
  const [course, setCourse] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  function handleSubmit(e) {
    e.preventDefault();

    if (editId !== null) {
      setStudents(students.map(s =>
        s.id === editId ? { ...s, name, roll, course } : s
      ));
      setEditId(null);
    } else {
      setStudents([...students, {
        id: Date.now(),
        name,
        roll,
        course
      }]);
    }

    setName('');
    setRoll('');
    setCourse('');
  }

  function handleEdit(student) {
    setName(student.name);
    setRoll(student.roll);
    setCourse(student.course);
    setEditId(student.id);
  }

  function handleDelete(id) {
    setStudents(students.filter(s => s.id !== id));
  }

  return (
    <div className="container">
      <h1>Student Management System</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Roll Number"
          value={roll}
          onChange={e => setRoll(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Course"
          value={course}
          onChange={e => setCourse(e.target.value)}
          required
        />

        <button type="submit">
          {editId !== null ? 'Update Student' : 'Add Student'}
        </button>
      </form>

      <h2>Student Records</h2>

      {students.length === 0 ? (
        <p>No students added yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll No.</th>
              <th>Course</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.roll}</td>
                <td>{student.course}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleEdit(student)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;