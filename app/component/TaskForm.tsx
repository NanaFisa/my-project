import api from "@/lib/api";
import { FormEvent, useState } from "react";

interface TaskFormProps {
  initialData?: {
    title: string;
    description: string;
    status: string;
  };

  onSubmit: (data: {
    title: string;
    description: string;
    status: string;
  }) => void;
  isSubmitting?: boolean;
  formTitle?: string;
  submitText?: string;
  cancelButton?: boolean;
  onCancel?: () => void;
}

export default function TaskForm({
initialData = {
    title: '',
    description: '',
    status: 'pending'
  },
  onSubmit,
  isSubmitting = false,
  formTitle = 'Task Form',
  submitText = 'Submit',
  cancelButton = false,
  onCancel = () => {} 
}: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: initialData.title,
    description: initialData.description,
    status: initialData.status
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{formTitle}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title <span>*</span></label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:rinf-2 focus:ring-blue-500 transition-all text-black"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="Enter task description"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select id="status" name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all text-black">
            <option value="pending" className="text-yellow-600">Pending</option>
            <option value="in-progress" className="text-blue-600">In Progress</option>
            <option value="completed" className="text-green-600">Completed</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          {cancelButton && (
            <button type="button" onClick={onCancel} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
          )}
          <button type="submit" disabled={isSubmitting} className={`px-4 py-2 rounded-lg text-black transition-colors ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600:bg-blue-700'}`}>{isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Processing...
            </span>
          ) : (submitText)}</button>
        </div>

      </form>
    </div>
  );
}