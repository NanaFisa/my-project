'use client'; // Mark as Client Component

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import TaskForm from '@/app/component/TaskForm';
import { TaskFormValues } from '@/app/types/task';
import Link from 'next/link';

export default function EditTaskPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [task, setTask] = useState<TaskFormValues | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch task data on component mount
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get(`/tasks/${params.id}`);
        setTask({
          title: response.data.title,
          description: response.data.description || '',
          status: response.data.status
        });
      } catch (err) {
        setError('Failed to load task. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [params.id]);

  // Handle form submission
  const handleSubmit = async (data: TaskFormValues) => {
    try {
      await api.put(`/tasks/${params.id}`, data);
      router.push('/tasks');
    } catch (err) {
      setError('Failed to update task. Please try again.');
    }
  };

  if (loading) return <div className="text-center py-8">Loading task...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;
  if (!task) return <div className="text-center py-8">Task not found</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Task</h1>
        <Link 
          href="/tasks"
          className="text-blue-500 hover:underline text-sm"
        >
          &larr; Back to tasks
        </Link>
      </div>
      <TaskForm 
        defaultValues={task} 
        onSubmit={handleSubmit} 
        submitText="Update Task"
      />
    </div>
  );
}