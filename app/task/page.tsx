'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';

interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  createdAt: string;
}

export default function TaskListPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (err: any) {
      let errorMessage = 'Failed to load tasks';
      
      if (err.response) {
        // Server responded with error status (4xx, 5xx)
        errorMessage = err.response.data?.error || errorMessage;
      } else if (err.request) {
        // Request was made but no response received
        errorMessage = 'Network error - please check your connection';
      }
      
      setError(errorMessage);
      console.error('Fetch tasks error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete task');
    }
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
      <h1>Task List</h1>
      <Link href="/tasks/create">Create New Task</Link>
      
      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <span>Status: {task.status}</span>
              <Link href={`/tasks/edit/${task.id}`}>Edit</Link>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}