// frontend/src/App.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', age: '', email: '', id: null });
  const [showForm, setShowForm] = useState(false);

  const loadUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        await axios.put(`http://localhost:3001/api/users/${form.id}`, form);
      } else {
        await axios.post('http://localhost:3001/api/users', form);
      }
      setForm({ name: '', age: '', email: '', id: null });
      setShowForm(false);
      loadUsers();
    } catch (err) {
      console.error('Error saving user:', err);
    }
  };

  const handleEdit = (user) => {
    setForm(user);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/users/${id}`);
      loadUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crud Operation</h1>

      <button
        onClick={() => {
          setForm({ name: '', age: '', email: '', id: null });
          setShowForm(true);
        }}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        Add User
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-3 mb-6 border p-4 rounded shadow">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 border"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Age"
            className="w-full p-2 border"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              {form.id ? 'Update' : 'Add'} User
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="p-3 border rounded flex justify-between items-center">
            <span>
              {user.name} | {user.age} | {user.email}
            </span>
            <div className="space-x-2">
              <button onClick={() => handleEdit(user)} className="text-yellow-500">
                Edit
              </button>
              <button onClick={() => handleDelete(user.id)} className="text-red-500">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
