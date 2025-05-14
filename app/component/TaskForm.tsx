import api from "@/lib/api";
import { useState } from "react";

export default function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await api.post('/tasks', { title, description, status });
        alert('Task created!');
        setTitle('');
        setDescription('');
    } catch (err) {
        alert('Failed to create task');
    }
  };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit">Create Task</button>
        </form>
    );
}