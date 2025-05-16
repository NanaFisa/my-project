import api from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Task {
    id: number;
    title: string;
    description?: string;
    status: string;
    createdAt: string;
}

export default function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
            const response = await api.get('/tasks');
            setTasks(response.data);
        } catch (err) {
            setError('Failed to load tasks');
        } finally {
            setLoading(false);
        }
        };
        fetchTasks();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/tasks/${id}`);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (err) {
            setError('Failed to delete task');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
         <div>
      {tasks.map(task => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={() => handleDelete(task.id)}>Delete</button>
        </div>
      ))}
    </div>
    );
}