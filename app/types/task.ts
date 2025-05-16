export interface Task {
  id: number;
  title: string;
  description?: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFormValues {
  title: string;
  description: string;
  status: string;
}