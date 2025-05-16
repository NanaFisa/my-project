'use client';

import { useRouter } from 'next/navigation';
import TaskForm from '@/app/component/TaskForm';
import api from '@/lib/api';
import { useState } from 'react';

export default function CreateTaskPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (formData: { 
    title: string; 
    description: string; 
    status: string 
  }) => {
    try {
      setIsSubmitting(true);
      await api.post('/tasks', formData);
      router.push('/tasks');
    } catch (err) {
      setError('Failed to create task. Please try again.');
      console.error('Create error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <TaskForm
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        formTitle="Create New Task"
        submitText="Create Task"
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