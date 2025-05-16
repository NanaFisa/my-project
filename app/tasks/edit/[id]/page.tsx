'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import TaskForm from '@/app/component/TaskForm';
import api from '@/lib/api';

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();
  const [initialData, setInitialData] = useState<{
    title: string;
    description: string;
    status: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get(`/tasks/${params.id}`);
        setInitialData({
          title: response.data.title,
          description: response.data.description || '',
          status: response.data.status
        });
      } catch (err) {
        setError('Failed to load task. Please try again.');
        console.error('Fetch error:', err);
      }
    };
    
    if (params.id) {
      fetchTask();
    }
  }, [params.id]);

  const handleSubmit = async (formData: { 
    title: string; 
    description: string; 
    status: string 
  }) => {
    try {
      setIsSubmitting(true);
      await api.put(`/tasks/${params.id}`, formData);
      router.push('/tasks');
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Update error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!initialData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <TaskForm
        initialData={initialData}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        formTitle="Edit Task"
        submitText="Update Task"
        cancelButton
        onCancel={() => router.push('/tasks')}
      />
      {error && (
        <div className="max-w-2xl mx-auto mt-4">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p>{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}