import React, { useEffect, useState } from 'react';
import { fetchTasks, deleteTask, createTask } from '../api/tasks';
import { useAuth } from '../hooks/useAuth';

/**
 * Component that displays a list of tasks and allows CRUD operations.
 */
export default function TaskList() {
  const { logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load tasks on mount
  useEffect(() => {
    async function load() {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    try {
      const created = await createTask({
        title: newTitle,
        completed: false,
        userId: 1,
      });
      setTasks((prev) => [created, ...prev]);
      setNewTitle('');
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p style={styles.message}>Loading tasks…</p>;
  if (error) return <p style={styles.error}>Error: {error}</p>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2>Your Tasks</h2>
        <button onClick={logout} style={styles.logoutBtn}>
          Logout
        </button>
      </header>

      <form onSubmit={handleAdd} style={styles.addForm}>
        <input
          type="text"
          placeholder="New task title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.addBtn}>
          Add
        </button>
      </form>

      <ul style={styles.list}>
        {tasks.map((task) => (
          <li key={task.id} style={styles.item}>
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              {task.title}
            </span>
            <button
              onClick={() => handleDelete(task.id)}
              style={styles.deleteBtn}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '20px',
    border: '1px solid #eee',
    borderRadius: '8px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutBtn: {
    background: '#ff4d4f',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  addForm: {
    display: 'flex',
    marginTop: '20px',
    gap: '8px',
  },
  input: {
    flex: 1,
    padding: '8px',
    fontSize: '1rem',
  },
  addBtn: {
    padding: '8px 12px',
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    marginTop: '20px',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #f0f0f0',
  },
  deleteBtn: {
    background: 'transparent',
    border: 'none',
    color: '#ff4d4f',
    cursor: 'pointer',
    fontSize: '1.2rem',
  },
  message: {
    textAlign: 'center',
    marginTop: '40px',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
};